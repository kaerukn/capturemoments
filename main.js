const correctPassword = "10-31-2025";

// PASSWORD
function checkPassword() {
    const input = document.getElementById("password").value;

    if (input === correctPassword) {
        document.getElementById("password-section").style.display = "none";
        document.getElementById("content").style.display = "block";
        loadMessages();
        loadGoals();
    } else {
        document.getElementById("error").style.display = "block";
    }
}

// SHOW PASSWORD
document.getElementById("toggle").addEventListener("change", () => {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
});

// ENTER BUTTON
document.getElementById("enterBtn").addEventListener("click", checkPassword);

// MESSAGES
const messages = {
    1: ["message here", ""],
    2: ["message here", ""],
    3: ["message here", ""],
    4: ["message here", ""],
    5: ["message here", ""]
};

function loadMessages() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`message${i}a`).textContent = messages[i][0];
        document.getElementById(`message${i}b`).textContent = messages[i][1];
    }
}

function toggleMessages(num) {
    const row = document.querySelector(`#message${num}a`).closest(".message-row");
    row.classList.toggle("active");
}

// DATABASE (bucket)
const client = supabase.createClient("YOUR_PROJECT_URL", "YOUR_ANON_KEY");

let goals = [];

// LOAD
async function loadGoals() {
    const { data } = await client.from("goals").select();
    goals = data || [];
    renderGoals();
}

// ADD
async function addGoal() {
    const input = document.getElementById("goalInput");
    const text = input.value.trim();
    if (!text) return;

    await client.from("goals").insert([{ text, completed: false }]);
    input.value = "";
    loadGoals();
}

// TOGGLE
async function toggleGoal(index) {
    const goal = goals[index];
    await client.from("goals")
        .update({ completed: !goal.completed })
        .eq("id", goal.id);

    loadGoals();
}

// DELETE
async function deleteGoal(index) {
    const goal = goals[index];
    await client.from("goals").delete().eq("id", goal.id);
    loadGoals();
}

// RENDER
function renderGoals() {
    const list = document.getElementById("goalList");
    list.innerHTML = "";

    let completed = 0;

    goals.forEach((goal, index) => {
        const li = document.createElement("li");

        if (goal.completed) {
            li.classList.add("completed");
            completed++;
        }

        const span = document.createElement("span");
        span.textContent = goal.text;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = goal.completed;
        checkbox.onchange = () => toggleGoal(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteGoal(index);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateProgress(completed);
}

// PROGRESS
function updateProgress(done) {
    const total = goals.length;
    const percent = total === 0 ? 0 : (done / total) * 100;

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").textContent =
        total === 0 ? "No goals yet" :
        done + " of " + total + " completed";
}

// REALTIME
client
  .channel("public:goals")
  .on("postgres_changes", { event: "*", schema: "public", table: "goals" }, () => {
      loadGoals();
  })
  .subscribe();

// INITIAL
loadGoals();
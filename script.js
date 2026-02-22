const SUPABASE_URL = "YOUR_PROJECT_URL";
const SUPABASE_KEY = "YOUR_ANON_KEY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* SIDEBAR */
function toggleSidebar() {
    document.getElementById("side-menu").classList.toggle("visible");
}

function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* PASSWORD */
const correctPassword = "10-31-2025";

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

/* PASSWORD TOGGLE */
document.getElementById("toggle").addEventListener("change", () => {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
});

/* MESSAGES */

async function loadMessages() {
    const { data } = await client.from("messages").select();
    data?.forEach(row => {
        const el = document.getElementById(row.key);
        if (el) el.textContent = row.content || "";
    });
}

/* realtime */
client
  .channel('public:messages')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, payload => {
      const row = payload.new;
      const el = document.getElementById(row.key);
      if (el) el.textContent = row.content || "";
  })
  .subscribe();

/* TOGGLE MONTH */
function toggleMessages(num) {
    const box = document.querySelector(`#message${num}a`).closest(".message-box");
    box.classList.toggle("active");
}

/* EDIT */
function editMessage(id) {
    const el = document.getElementById(id);
    el.contentEditable = true;
    el.focus();

    el.onblur = () => el.contentEditable = false;
}

/* POST */
async function postMessage(id) {
    const el = document.getElementById(id);
    await client
        .from("messages")
        .update({ content: el.textContent })
        .eq("key", id);

    alert("Posted!");
}

/* BUCKET LIST */

let goals = [];

async function loadGoals() {
    const { data } = await client.from("goals").select();
    goals = data || [];
    renderGoals();
}

async function addGoal() {
    const input = document.getElementById("goalInput");
    const text = input.value.trim();
    if (!text) return;

    await client.from("goals").insert([{ text, completed: false }]);
    input.value = "";
    loadGoals();
}

async function toggleGoal(index) {
    const goal = goals[index];
    await client
        .from("goals")
        .update({ completed: !goal.completed })
        .eq("id", goal.id);

    loadGoals();
}

async function deleteGoal(index) {
    const goal = goals[index];
    await client.from("goals").delete().eq("id", goal.id);
    loadGoals();
}

function renderGoals() {
    const list = document.getElementById("goalList");
    list.innerHTML = "";

    let completed = 0;

    goals.forEach((goal) => {
        const li = document.createElement("li");

        if (goal.completed) {
            li.classList.add("completed");
            completed++;
        }

        const span = document.createElement("span");
        span.textContent = goal.text;

        const doneBtn = document.createElement("button");
        doneBtn.textContent = goal.completed ? "Undo" : "Done";
        doneBtn.onclick = () => toggleGoal(goals.indexOf(goal));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteGoal(goals.indexOf(goal));

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateProgress(completed);
}

function updateProgress(done) {
    const total = goals.length;
    const percent = total === 0 ? 0 : (done / total) * 100;

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").textContent =
        total === 0 ? "No goals yet" :
        done + " of " + total + " completed";
}

/* INITIAL */
loadGoals();
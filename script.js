const SUPABASE_URL = "https://icfwdovgrtgxyrnhuqwm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZndkb3ZncnRneHlybmh1cXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTY3ODksImV4cCI6MjA4NzMzMjc4OX0.v7hXK2t56FKZAcNSFr37OYyRAImUGDUYrG-euotiQGg";
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

/* MESSAGES */

async function loadMessages() {
    const { data } = await client.from("messages").select();
    data?.forEach(row => {
        const el = document.getElementById(row.key);
        if (el) el.textContent = row.content || "";
    });
}

/* realtime sync */
client
  .channel('public:messages')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, payload => {
      const row = payload.new;
      const el = document.getElementById(row.key);
      if (el) el.textContent = row.content || "";
  })
  .subscribe();

/* EDIT MODE */
function editMessage(id) {
    const el = document.getElementById(id);
    el.contentEditable = true;
    el.focus();

    el.onblur = () => {
        el.contentEditable = false;
    };
}

/* POST (save) */
async function postMessage(id) {
    const el = document.getElementById(id);
    if (!el) return;

    await client
        .from("messages")
        .update({ content: el.textContent })
        .eq("key", id);

    alert("Posted!");
}

/* TOGGLE MESSAGE ROW */
function toggleMessages(num) {
    const row = document.querySelector(`#message${num}a`).closest(".message-row");
    row.classList.toggle("active");
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

    goals.forEach((goal, index) => {
        const li = document.createElement("li");

        if (goal.completed) {
            li.classList.add("completed");
            completed++;
        }

        const span = document.createElement("span");
        span.textContent = goal.text;

        const doneBtn = document.createElement("button");
        doneBtn.textContent = goal.completed ? "Undo" : "Done";
        doneBtn.onclick = () => toggleGoal(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteGoal(index);

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
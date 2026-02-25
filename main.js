const correctPassword = "10-31-2025";
let goals = [];

/* SIDEBAR */
function toggleSidebar() {
    document.getElementById("side-menu").classList.toggle("visible");
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
    toggleSidebar();
}

/* PASSWORD */
document.getElementById("togglePassword").addEventListener("change", function () {
    const password = document.getElementById("password");
    password.type = this.checked ? "text" : "password";
});

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

/* MONTH TOGGLE */
function toggleMonth(num) {
    const month = document.getElementById("month" + num);
    month.classList.toggle("active");

    document.getElementById("letter" + num + "a").style.display = "none";
    document.getElementById("letter" + num + "b").style.display = "none";
}

/* SHOW LETTER */
function showLetter(num, person) {
    const letterA = document.getElementById("letter" + num + "a");
    const letterB = document.getElementById("letter" + num + "b");

    letterA.style.display = "none";
    letterB.style.display = "none";

    if (person === "a") letterA.style.display = "block";
    else letterB.style.display = "block";
}

/* FILTER */
function filterYear(year) {
    document.querySelectorAll('.message-box').forEach(box => {
        box.style.display =
            year === 'all' || box.dataset.year === year ? "block" : "none";
    });
}

/* LOAD LETTERS */
const messages = {
    1: ["October letter A", "October letter B"],
    2: ["November letter A", "November letter B"],
    3: ["December letter A", "December letter B"],
    4: ["January letter A", "January letter B"],
    5: ["Valentines letter A", "Valentines letter B"]
};

function loadMessages() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`letter${i}a`).textContent = messages[i][0];
        document.getElementById(`letter${i}b`).textContent = messages[i][1];
    }
}

/* SUPABASE */
const SUPABASE_URL = "https://icfwdovgrtgxyrnhuqwm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZndkb3ZncnRneHlybmh1cXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTY3ODksImV4cCI6MjA4NzMzMjc4OX0.v7hXK2t56FKZAcNSFr37OYyRAImUGDUYrG-euotiQGg";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadGoals() {
    const { data } = await client.from("goals").select();
    goals = data || [];
    renderGoals();
}

async function addGoal() {
    const input = document.getElementById("goalInput");
    if (!input.value.trim()) return;

    await client.from("goals").insert([{ text: input.value, completed: false }]);
    input.value = "";
    loadGoals();
}

async function toggleGoal(index) {
    const goal = goals[index];
    await client.from("goals")
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

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = goal.completed;
        checkbox.onchange = () => toggleGoal(index);

        const span = document.createElement("span");
        span.textContent = goal.text;

        const del = document.createElement("button");
        del.textContent = "X";
        del.onclick = () => deleteGoal(index);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(del);
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
const SUPABASE_URL = "https://icfwdovgrtgxyrnhuqwm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZndkb3ZncnRneHlybmh1cXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTY3ODksImV4cCI6MjA4NzMzMjc4OX0.v7hXK2t56FKZAcNSFr37OYyRAImUGDUYrG-euotiQGg";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const correctPassword = "10-31-2025";
const toggle = document.getElementById("toggle");
let goals = [];

/* SIDEBAR */
function toggleSidebar() {
    document.getElementById("side-menu").classList.toggle("visible");
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");
    toggleSidebar();
}

/* PASSWORD CHECK */
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

/* MESSAGES DATA */
const messages = {
    1: [
        "Hi Ali, we finally became official, and honestly, I still can’t fully believe it. Having you in my life feels unreal because you are everything I’ve ever hoped for and more. I love you so much, Ali.",
        ""
    ],
    2: [
        "Happy First Monthsary, Ali! I am so thankful to have you in my life.",
        "I love you so much."
    ],
    3: [
        "Happy Second Monthsary to us, baby.",
        "I will always love you."
    ],
    4: [
        "Happy Third Monthsary, my love.",
        "You mean everything to me."
    ],
    5: [
        "Happy Valentine’s Day, baby!",
        ""
    ]
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
    row.querySelector(".messages").scrollTop = 0;
}

function filterYear(year) {
    document.querySelectorAll('.message-box').forEach(box => {
        box.style.display =
            year === 'all' || box.dataset.year === year ? "block" : "none";
    });
}

/* PASSWORD TOGGLE */
toggle.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        toggle.textContent = "hide";
    } else {
        password.type = "password";
        toggle.textContent = "Show";
    }
});

/* BUCKET LIST (SUPABASE SYNC) */

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

function updateProgress(done) {
    const total = goals.length;
    const percent = total === 0 ? 0 : (done / total) * 100;

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").textContent =
        total === 0 ? "No goals yet" :
        done + " of " + total + " completed";
}

/* INITIAL LOAD */
loadGoals();
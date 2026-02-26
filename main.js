const correctPassword = "10-31-2025";
let goals = [];

/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {

    /* ELEMENTS */
    const enterBtn = document.getElementById("enterBtn");
    const toggle = document.getElementById("toggle");
    const password = document.getElementById("password");

    const hamburger = document.getElementById("hamburger");
    const messageButtons = document.querySelectorAll(".message-box > button");
    const yearButtons = document.querySelectorAll(".navbar button");
    const bucketAddBtn = document.querySelector("#bucket-page button");

    /* PASSWORD */
    enterBtn.addEventListener("click", checkPassword);

    toggle.addEventListener("change", () => {
        password.type = toggle.checked ? "text" : "password";
    });

    /* SIDEBAR */
    hamburger.addEventListener("click", toggleSidebar);

    document
        .querySelector("button[onclick*='messages-page']")
        ?.addEventListener("click", () => showPage("messages-page"));

    document
        .querySelector("button[onclick*='bucket-page']")
        ?.addEventListener("click", () => showPage("bucket-page"));

    /* YEAR FILTER */
    yearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const text = btn.textContent.toLowerCase();

            if (text.includes("all")) filterYear("all");
            else if (text.includes("1st")) filterYear("first");
            else filterYear("special");
        });
    });

    /* MESSAGE TOGGLE */
    messageButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            toggleMessages(index + 1);
        });
    });

    /* BUCKET LIST */
    bucketAddBtn.addEventListener("click", addGoal);

});


/* =========================
   SIDEBAR
========================= */
function toggleSidebar() {
    document.getElementById("side-menu").classList.toggle("visible");
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page =>
        page.classList.remove("active")
    );

    document.getElementById(pageId).classList.add("active");
    toggleSidebar();
}


/* =========================
   PASSWORD
========================= */
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


/* =========================
   MESSAGES
========================= */

const messages = {
    1: ["Letter 1 text here", ""],
    2: ["Letter 2A", "Letter 2B"],
    3: ["Letter 3A", "Letter 3B"],
    4: ["Letter 4A", "Letter 4B"],
    5: ["Valentine letter", ""],
    6: ["Fourth monthsary letter", ""]
};

function loadMessages() {
    for (let i = 1; i <= 6; i++) {
        const a = document.getElementById(`message${i}a`);
        const b = document.getElementById(`message${i}b`);

        if (a) a.textContent = messages[i][0];
        if (b) b.textContent = messages[i][1];
    }
}

function toggleMessages(num) {
    const row = document.querySelector(`#message${num}a`).closest(".message-row");
    row.classList.toggle("active");
    row.querySelector(".messages").scrollTop = 0;
}

function filterYear(year) {
    document.querySelectorAll(".message-box").forEach(box => {
        box.style.display =
            year === "all" || box.dataset.year === year
                ? "block"
                : "none";
    });
}


/* =========================
   SUPABASE BUCKET LIST
========================= */

const SUPABASE_URL = "YOUR_URL";
const SUPABASE_KEY = "YOUR_KEY";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = goal.completed;
        checkbox.onchange = () => toggleGoal(index);

        const span = document.createElement("span");
        span.textContent = goal.text;

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
        total === 0
            ? "No goals yet"
            : `${done} of ${total} completed`;
}
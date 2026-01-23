const correctPassword = "10-31-2025";

/* YOUR MESSAGES – ONLY YOU EDIT THESE */
const messages = {
    1: [
        "This is the first message for button one 🤍",
        "This is the second message for button one 🌸"
    ],
    2: [
        "Button two message one ✨",
        "Button two message two 💕"
    ],
    3: [
        "Third button, first note 💌",
        "Third button, second note 🌙"
    ],
    4: [
        "Fourth button message one 🌷",
        "Fourth button message two 🫶"
    ]
};

/* PASSWORD CHECK */
function checkPassword() {
    const input = document.getElementById("password").value;
    if (input === correctPassword) {
        document.getElementById("password-section").style.display = "none";
        document.getElementById("content").style.display = "block";
        loadMessages();
    } else {
        document.getElementById("error").style.display = "block";
    }
}

/* LOAD MESSAGES */
function loadMessages() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`message${i}a`).textContent = messages[i][0];
        document.getElementById(`message${i}b`).textContent = messages[i][1];
    }
}

/* TOGGLE WITH ANIMATION */
function toggleMessages(num) {
    const row = document.querySelector(`#message${num}a`).closest(".message-row");
    row.classList.toggle("active");
}

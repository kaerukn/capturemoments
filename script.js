const correctPassword = "10-31-2025";

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

/* LOAD SAVED MESSAGES */
function loadMessages() {
    for (let i = 1; i <= 4; i++) {
        const msgA = localStorage.getItem("message" + i + "a");
        const msgB = localStorage.getItem("message" + i + "b");
        document.getElementById("message" + i + "a").textContent = msgA || "Click edit to write something special 🤍";
        document.getElementById("message" + i + "b").textContent = msgB || "Click edit to write another special note 🤍";
    }
}

function toggleMessages(num) {
    const row = document.querySelector(`#message${num}a`).closest(".message-row");
    row.classList.toggle("active"); // add/remove active class
}

/* EDIT BOTH MESSAGES */
function editMessages(num) {
    const msgA = document.getElementById("message" + num + "a");
    const msgB = document.getElementById("message" + num + "b");
    const editA = document.getElementById("edit" + num + "a");
    const editB = document.getElementById("edit" + num + "b");

    editA.value = msgA.textContent;
    editB.value = msgB.textContent;
    editA.style.display = "block";
    editB.style.display = "block";
}

/* SAVE BOTH MESSAGES */
function saveMessages(num) {
    const editA = document.getElementById("edit" + num + "a");
    const editB = document.getElementById("edit" + num + "b");
    const msgA = document.getElementById("message" + num + "a");
    const msgB = document.getElementById("message" + num + "b");

    msgA.textContent = editA.value;
    msgB.textContent = editB.value;

    localStorage.setItem("message" + num + "a", editA.value);
    localStorage.setItem("message" + num + "b", editB.value);

    editA.style.display = "none";
    editB.style.display = "none";
}

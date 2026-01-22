const correctPassword = "10-31-2025";

/* DEFAULT DATA */
const defaultMedia = {
    oct: {
        message1: "Dear Ali, I just want to say na I'm so lucky that I met you.",
        message2: "",
        image: "images/OctPic.jpg"
    },
    nov: {
        message1: "Happy First Monthsary babyy!",
        message2: "",
        image: "images/NovPic.jpeg"
    },
    dec: {
        message1: "Happy Second Monthsary Babyyy!",
        message2: "",
        image: "images/DecPic.png"
    },
    jan: {
        message1: "Happy Third Monthsary babyyy!",
        message2: "",
        image: "images/JanPic.jpeg"
    }
};

/* LOAD SAVED DATA */
let media = JSON.parse(localStorage.getItem("mediaData")) || defaultMedia;
let currentMonth = "";

/* PASSWORD CHECK */
function checkPassword() {
    const input = document.getElementById("password").value;
    const loader = document.getElementById("loader");
    const error = document.getElementById("error");

    error.style.display = "none";

    if (input === correctPassword) {
        document.getElementById("password-section").style.display = "none";
        loader.style.display = "block";

        setTimeout(() => {
            loader.style.display = "none";
            document.getElementById("content").style.display = "block";
        }, 2000);
    } else {
        error.style.display = "block";
    }
}

/* SHOW MODAL */
function showMedia(monthId) {
    currentMonth = monthId;

    const modal = document.getElementById("media-modal");
    const display = document.getElementById("media-display");
    const data = media[monthId];

    display.innerHTML = `
        <p><strong>Khian's Message</strong></p>
        <textarea id="msg1" disabled>${data.message1}</textarea>

        <p><strong>Ali's Message</strong></p>
        <textarea id="msg2" disabled>${data.message2}</textarea>

        <img src="${data.image}" alt="Month Image">

        <br><br>
        <button onclick="enableEdit()">Edit</button>
        <button onclick="saveMessage()" id="saveBtn" style="display:none;">Save</button>
    `;

    modal.classList.add("show");
}

/* ENABLE EDIT */
function enableEdit() {
    document.getElementById("msg1").disabled = false;
    document.getElementById("msg2").disabled = false;
    document.getElementById("saveBtn").style.display = "inline-block";
}

/* SAVE MESSAGE */
function saveMessage() {
    media[currentMonth].message1 = document.getElementById("msg1").value;
    media[currentMonth].message2 = document.getElementById("msg2").value;

    localStorage.setItem("mediaData", JSON.stringify(media));
    alert("Saved permanently 💖");

    document.getElementById("msg1").disabled = true;
    document.getElementById("msg2").disabled = true;
    document.getElementById("saveBtn").style.display = "none";
}

/* CLOSE MODAL */
function closeModal() {
    document.getElementById("media-modal").classList.remove("show");
}

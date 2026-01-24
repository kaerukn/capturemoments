const correctPassword = "10-31-2025";

//MESSAGES
const messages = {
    1: [
        "Hi Ali, we finally became official, I still can’t believe it because you’re everything that I could ask for. I know that I said before that I don’t believe in God, but right now I could say that God really work in a different way, no rather unique way. I love you so much Ali.",
        "This is the second message for button one 🌸"
    ],
    2: [
        "Happy First Monthsary Ali, I can’t believe that it’s been a month since we became official, time really flies fast. I’m so thankful that I have you Ali, I really appreciate all your efforts throughout this month. I really appreciate yung pag suyo mo saakin whenever sinumsumpong ako hahaha. I don’t know na what to say because words aren’t enough to tell how thankful I am and how much I love you. I love you so much Ali. Happy 1st Monthsary to us Ali.",
        "Button two message two 💕"
    ],
    3: [
        "Happy Second Monthsary to us babyyy, I’m so sorry kung monthsary na monthsary natin tapos hindi pa tayo okay, I’m so sorry baby but I really appreciate all the things you’ve done to me. Going sa tarlac just so you could see me, I really appreciate it. I am thankful that I have you in my life. Always remember that I will always love you and I always have your back. Let’s survive this coming year baby. Happy 2nd to us and happy new year baby.",
        "Third button, second note 🌙"
    ],
    4: [
        "Happy Third Monthsary to us babyyyy! Can’t believe na three months na tayo time really flies fast. I love you so much baby. I know these past few days na madalas na akong nag tatampo about sapag lipat nyo I just missed you baby and I am worried na baka pag lumipat kayo everything will not be the same na, I am scared about that, but really I shouldn’t be afraid about it because I know kahit nasaan ka pa you will always make it work you, lagi kang gagawa ng paraan para lang makapag kita tayo. I really love you baby, and I know you also love me because I can feel it. I can feel how much you love me and I hope you can feel na mahal na mahal din kita. I decided to make this mini web so that even though na malayo tayo we can always go back to the memories we made Captured Memories our little space that only the two of us can access, it’s like have our own world. I love you so much my baby and happy 3rd monthsary us to baby",
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

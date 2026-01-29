const correctPassword = "10-31-2025";

//MESSAGES
const messages = {
    1: [
        "Hi Ali, we finally became official, I still can’t believe it because you’re everything that I could ask for. I know that I said before that I don’t believe in God, but right now I could say that God really work in a different way, no rather unique way. I love you so much Ali.",
        ""
    ],
    2: [
        "Happy First Monthsary Ali, I can’t believe that it’s been a month since we became official, time really flies fast. I’m so thankful that I have you Ali, I really appreciate all your efforts throughout this month. I really appreciate yung pag suyo mo saakin whenever sinumsumpong ako hahaha. I don’t know na what to say because words aren’t enough to tell how thankful I am and how much I love you. I love you so much Ali. Happy 1st Monthsary to us Ali.",
        "Happy first monthsary baby ko cheers to us for being together in our first month, honestly this first month you helped me realize many things, thank you for loving me more than i can ask for. I know at first i thought na things were getting faster but i realized slowing down wasn’t the solution but getting to know you more become the key for me to love you and know you more. I really do appreciate the things you do, how you give me assurance even if i didn’t ask for it, how your words uplift my confidence Thank you so much kai ko for that i love you so much khian."
    ],
    3: [
        "Happy Second Monthsary to us babyyy, I’m so sorry kung monthsary na monthsary natin tapos hindi pa tayo okay, I’m so sorry baby but I really appreciate all the things you’ve done to me. Going sa tarlac just so you could see me, I really appreciate it. I am thankful that I have you in my life. Always remember that I will always love you and I always have your back. Let’s survive this coming year baby. Happy 2nd to us and happy new year baby.",
        "To our 2nd monthsary, each day that passed my feelings for you grows deeper and deeper to the point that I had courage to travel to a place I didn’t knew just to see you, well to be honest at first I’m still thinking if it will be worth it or will I be able to arrive at tarlac where you live. Ofc I choose to travel because at that time I really do miss you and I really wanna see you even though hindi pa natin monthsary, because I believe that everything with you is worth it and worth it ang pag sugal ko even though saglit na oras lang kitang nakasama…And yeah after that happened antagal na nung next na nagkita tayo which is nung umuwi ka during your christmas break, sobrang namiss kita non sobraaaaaa. And then after christmas before our monthsary we decided to celebrate early because it’s almost new year and baka delikado sa daan, but yeah there goes another fight which is clearly my mistake kasi I know how much long you wanted to spend time with me but I cut it off early without thinking twice about a place where we can go and tambay kaya ikaw tong maldita nagtampo ka so much so much to the point na we almost break up because i played vb… but who would have thought that were still together now whehehehe I love you so much khian ko and i will always do!"
    ],
    4: [
        "Happy Third Monthsary to us babyyyy! Can’t believe na three months na tayo time really flies fast. I love you so much baby. I know these past few days na madalas na akong nag tatampo about sapag lipat nyo I just missed you baby and I am worried na baka pag lumipat kayo everything will not be the same na, I am scared about that, but really I shouldn’t be afraid about it because I know kahit nasaan ka pa you will always make it work you, lagi kang gagawa ng paraan para lang makapag kita tayo. I really love you baby, and I know you also love me because I can feel it. I can feel how much you love me and I hope you can feel na mahal na mahal din kita. I decided to make this mini web so that even though na malayo tayo we can always go back to the memories we made Captured Memories our little space that only the two of us can access, it’s like have our own world. I love you so much my baby and happy 3rd monthsary us to baby",
        "Hi baby!! my Khian! today’s our 3rd monthsary and i just wanna greet you a happy third monthsary to us baby I hope that your love for me never fades and grows deeper and deeper, Always know that I love you so much khian ko and I will always do my baby, Thank you for all the love, care and support that you’ve always given me and im so grateful to have you baby. I just wanna apologize that im not the perfect bf that you could ask for and sorry for all my pagkukulangs to you I swear im trying my best. Pero baby I really miss everything about you/us i miss our daily ride, daily cuddles our paguusap pag tatampo mo nang walang dahilan(hehe) and lastly our moments together may it be sweet or bad moments Love you so much baby ko, again Happy Monthsary to us miss youuu!"
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
    const row = document
        .querySelector(`#message${num}a`)
        .closest(".message-row");

    row.classList.toggle("active");

    const messagesBox = row.querySelector(".messages");
    messagesBox.scrollTop = 0;
}

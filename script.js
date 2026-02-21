const correctPassword = "10-31-2025";

//MESSAGES
const messages = {
    1: [
        "Hi Ali, we finally became official, and honestly, I still can’t fully believe it. Having you in my life feels unreal because you are everything I’ve ever hoped for and more. I remember saying before that I didn’t believe in God, but being with you has changed something in me. Now I truly believe that God works in the most unexpected and unique ways, bringing people together at the perfect time. Every moment with you reminds me how grateful I am, and I can’t help but feel so lucky to call you mine. I love you so much, Ali, and I’m excited for everything we’ll share from here on. 🤍",
        ""
    ],
    2: [
        "Happy First Monthsary, Ali! I honestly can’t believe that a whole month has already passed since we became official time really does fly so fast when I’m with you. I’m so, so thankful to have you in my life, Ali, and I truly appreciate all the effort, patience, and love you’ve shown me throughout this month. I especially appreciate yung pag-suyo mo sa’kin whenever sinumsumpong ako, hahaha you always know how to make things better. I don’t even know what else to say because words will never be enough to express how grateful I am for you and how much I truly love you. You mean so much to me, Ali, and I’m excited for all the months and memories we still have ahead of us. I love you so much. Happy 1st Monthsary to us, Ali. 🤍",
        "Happy first monthsary baby ko cheers to us for being together in our first month, honestly this first month you helped me realize many things, thank you for loving me more than i can ask for. I know at first i thought na things were getting faster but i realized slowing down wasn’t the solution but getting to know you more become the key for me to love you and know you more. I really do appreciate the things you do, how you give me assurance even if i didn’t ask for it, how your words uplift my confidence Thank you so much kai ko for that i love you so much khian."
    ],
    3: [
        "Happy Second Monthsary to us, babyyy. I’m really sorry that it’s our monthsary and we’re not totally okay right now. I know things haven’t been easy, and I’m truly sorry for everything, baby. Still, I want you to know how much I appreciate all the things you’ve done for me. The fact that you went all the way to Tarlac just to see me means more to me than I can ever explain, and I’ll always be grateful for that effort and love. I’m so thankful that I have you in my life, baby. Through good days and hard moments, please always remember that I will always love you and that I’ll always have your back, no matter what. Let’s stay strong and survive everything that comes our way this coming year, together. Happy 2nd monthsary to us, and happy new year, baby. 🤍",
        "To our 2nd monthsary, each day that passed my feelings for you grows deeper and deeper to the point that I had courage to travel to a place I didn’t knew just to see you, well to be honest at first I’m still thinking if it will be worth it or will I be able to arrive at tarlac where you live. Ofc I choose to travel because at that time I really do miss you and I really wanna see you even though hindi pa natin monthsary, because I believe that everything with you is worth it and worth it ang pag sugal ko even though saglit na oras lang kitang nakasama…And yeah after that happened antagal na nung next na nagkita tayo which is nung umuwi ka during your christmas break, sobrang namiss kita non sobraaaaaa. And then after christmas before our monthsary we decided to celebrate early because it’s almost new year and baka delikado sa daan, but yeah there goes another fight which is clearly my mistake kasi I know how much long you wanted to spend time with me but I cut it off early without thinking twice about a place where we can go and tambay kaya ikaw tong maldita nagtampo ka so much so much to the point na we almost break up because i played vb… but who would have thought that were still together now whehehehe I love you so much khian ko and i will always do!"
    ],
    4: [
        "Happy Third Monthsary to us, babyyyy! I honestly can’t believe it’s already been three months. Time really flies when I’m with you. I love you so much, baby. I know these past few days I’ve been getting tampo a lot because of your move. It’s really just because I miss you so much, and I can’t help but worry that when you move, things might change. That thought scares me sometimes. But when I really think about it, I know I shouldn’t be afraid. I trust you. No matter where you are, I know you’ll always find a way to make things work for us. You always do, and you always make an effort just so we can see each other, and that means everything to me. I love you so, so much, baby. I know you love me too, because I can feel it in the way you care and in everything you do. I hope you can feel just how deeply I love you as well. I made this mini web for us so that even when we’re far apart, we can always come back to the memories we’ve made together. Captured Memories our own little space that only the two of us can access. It’s like our own world, just us. I love you so much, my baby. Happy 3rd Monthsary to us. 🤍",
        "Hi baby!! my Khian! today’s our 3rd monthsary and i just wanna greet you a happy third monthsary to us baby I hope that your love for me never fades and grows deeper and deeper, Always know that I love you so much khian ko and I will always do my baby, Thank you for all the love, care and support that you’ve always given me and im so grateful to have you baby. I just wanna apologize that im not the perfect bf that you could ask for and sorry for all my pagkukulangs to you I swear im trying my best. Pero baby I really miss everything about you/us i miss our daily ride, daily cuddles our paguusap pag tatampo mo nang walang dahilan(hehe) and lastly our moments together may it be sweet or bad moments Love you so much baby ko, again Happy Monthsary to us miss youuu!"
    ],
    5: [
        "Happy Valentine’s Day, baby!! I’m so happy and excited because you’re the first person I get to celebrate Valentine’s with, and that means so much to me. I feel so lucky and grateful that I get to spend this special day with you. I’m really happy that I get to give you flowers, hehe, and it makes me even happier that I received a gift from you too, hihi. I honestly didn’t expect it, and it made my day even more special. The flowers you gave me are so beautiful, but honestly, even without them, just being with you makes my Valentine’s Day perfect. Every moment with you feels amazing, and I can’t stop smiling just thinking about us. You make me feel so loved, so cared for, and so happy. I love you more than I can put into words, and I can’t wait to make so many more memories with you. I love you so much, baby, and I hope today is just the beginning of more happy moments together.",
        ""
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
    for (let i = 1; i <= 5; i++) {
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

function filterYear(year) {
    const boxes = document.querySelectorAll('.message-box');

    boxes.forEach(box => {
        if (year === 'all' || box.dataset.year === year) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
}

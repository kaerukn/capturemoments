const correctPassword = "10-31-2025";

function checkPassword() {
    const input = document.getElementById('password').value;
    const loader = document.getElementById('loader');
    const error = document.getElementById('error');

    error.style.display = 'none';

    if (input === correctPassword) {
        document.getElementById('password-section').style.display = 'none';
        loader.style.display = 'block';

        // Simulate loading
        setTimeout(() => {
            loader.style.display = 'none';
            document.getElementById('content').style.display = 'block';
        }, 2000); // 2 seconds loading

    } else {
        error.style.display = 'block';
    }
}


function showMedia(monthId) {
    const modal = document.getElementById('media-modal');
    const display = document.getElementById('media-display');
    
    const media = {
        oct: {
            message1: "Dear Ali, I just want to say na I'm so lucky that I met you. I know that I said that I don't believe in God, but right now I can say that God always work in a unique way. Thank you so much baby",
            message2: "",
            image: "images/OctPic.jpg"
        },
        nov: {
            message1: "Happy First Monthsary babyy! ",
            message2: "",
            image: "images/NovPic.jpeg"
        },
        dec: {
            message1: "Happy Second Monthsary Babyyy!",
            message2: "",
            image: "images/DecPic.png"
        },
        jan: {
            message1: "Happy Third Monthsary babyyy! I can't believe na three months na tayo!. Anyway I really appreciate all of your efforts throughout our entire relationship",
            message2: "",
            image: "images/JanPic.jpeg"
        }
    };
    
    const monthData = media[monthId];
    display.innerHTML = `
        <p><strong>Khian's Message:</strong> ${monthData.message1 || 'No message available.'}</p>
        <p><strong>Ali's Message:</strong> ${monthData.message2 || 'No message available.'}</p>
        <img src="${monthData.image}" alt="Media Image">
    `;
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('media-modal').classList.remove('show');
}

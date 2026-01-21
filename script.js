const correctPassword = "10-31-2025";

function checkPassword() {
    const input = document.getElementById('password').value;
    if (input === correctPassword) {
        document.getElementById('password-section').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        document.getElementById('error').style.display = 'block';
    }
}

function showMedia(monthId) {
    const modal = document.getElementById('media-modal');
    const display = document.getElementById('media-display');
    
    const media = {
        oct: {
            message1: "Dear Ali, I just want to say na I'm so lucky that I met you. I know that I said that I don't believe in God, but right now I can say that God always work in a unique way. Thank you so much baby",
            message2: "Second message for October: Add your text here.",
            image: "OctPic.jpg"
        },
        nov: {
            message1: "Happy First Monthsary babyy! ",
            message2: "",
            image: "NovPic.jpeg"
        },
        dec: {
            message1: "Happy Second Monthsary Babyyy!",
            message2: "",
            image: "DecPic.png"
        },
        jan: {
            message1: "Happy Third Monthsary babyyy!",
            message2: "",
            image: "JanPic.jpeg"
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

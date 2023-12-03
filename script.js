// script.js
document.addEventListener('DOMContentLoaded', function () {
    let currentCardIndex = 0;
    let totalCards = 0;
    let touchstartY = 0;

    function fetchAndDisplayData() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                totalCards = data.length;
                const dummyData = data;
                displayCard(dummyData[currentCardIndex]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function displayCard(cardData) {
        const cardContainer = document.getElementById('card-container');
        const cardHTML = generateCardHTML(cardData);
        cardContainer.innerHTML = cardHTML;

        if (currentCardIndex === totalCards - 1) {
            displayThankYouCard();
        }
    }

    function displayThankYouCard() {
        const cardContainer = document.getElementById('card-container');
        const thankYouHTML = generateCardHTML({
            title: 'Thank You!',
            imgSrc: 'path/to/thankyou-image.jpg', // Replace with the actual path
            text: 'We appreciate your time!'
        });

        cardContainer.innerHTML += thankYouHTML;
    }

    function generateCardHTML(cardData) {
        return `
            <div class="card">
                <img src="${cardData.imgSrc}" alt="${cardData.title}">
                <div class="title">${cardData.title}</div>
                <div class="text">${cardData.text}</div>
            </div>
        `;
    }

    function handleSwipe(deltaY) {
        if (deltaY > 50) {
            // Swipe up logic
            currentCardIndex = Math.max(currentCardIndex - 1, 0);
            fetchAndDisplayData();
        } else if (deltaY < -50) {
            // Swipe down logic
            currentCardIndex = Math.min(currentCardIndex + 1, totalCards - 1);
            fetchAndDisplayData();
        }
    }

    function handleScroll() {
        if (isScrolledToBottom()) {
            // Scroll down logic
            currentCardIndex = Math.min(currentCardIndex + 1, totalCards - 1);
            fetchAndDisplayData();
        } else if (isScrolledToTop()) {
            // Scroll up logic
            currentCardIndex = Math.max(currentCardIndex - 1, 0);
            fetchAndDisplayData();
        }
    }

    function isScrolledToBottom() {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }

    function isScrolledToTop() {
        return window.scrollY === 0;
    }

    function handleTouchStart(e) {
        touchstartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        const touchendY = e.changedTouches[0].clientY;
        const deltaY = touchendY - touchstartY;
        handleSwipe(deltaY);
    }

    document.addEventListener('scroll', handleScroll);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    fetchAndDisplayData();
});

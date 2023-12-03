// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Set up variables
    let currentCardIndex = 0;
    let totalCards = 0;

    // Fetch and display card data
    function fetchAndDisplayData() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Assuming data is an array of card objects
                totalCards = data.length;
                const dummyData = data;
                displayCard(dummyData[currentCardIndex]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Display card
    function displayCard(cardData) {
        // Generate HTML for the card (to be implemented)
        const cardHTML = generateCardHTML(cardData);
        // Append the card to the container
        document.getElementById('card-container').innerHTML = cardHTML;

        // Check if it's the last card and display "Thank You" card
        if (currentCardIndex === totalCards - 1) {
            displayThankYouCard();
        }
    }

    // Display "Thank You" card
    function displayThankYouCard() {
        const thankYouHTML = generateCardHTML({
            title: 'Thank You!',
            imgSrc: 'path/to/thankyou-image.jpg', // Replace with the actual path
            text: 'We appreciate your time!'
        });

        // Append the "Thank You" card to the container
        document.getElementById('card-container').innerHTML += thankYouHTML;
    }

    // Generate HTML for the card
    function generateCardHTML(cardData) {
        // Create HTML structure for a card (to be implemented)
        return `
            <div class="card">
                <img src="${cardData.imgSrc}" alt="${cardData.title}">
                <div class="title">${cardData.title}</div>
                <div class="text">${cardData.text}</div>
            </div>
        `;
    }

    // Fetch and display initial data
    fetchAndDisplayData();

    // Add event listener for scrolling
    window.addEventListener('scroll', function () {
        if (isScrolledToBottom()) {
            // Scroll down logic
            currentCardIndex = Math.min(currentCardIndex + 1, totalCards - 1);
            fetchAndDisplayData();
        } else if (isScrolledToTop()) {
            // Scroll up logic
            currentCardIndex = Math.max(currentCardIndex - 1, 0);
            fetchAndDisplayData();
        }
    });

    // Swipe detection
    let touchstartY = 0;
    window.addEventListener('touchstart', function (e) {
        touchstartY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', function (e) {
        const touchendY = e.changedTouches[0].clientY;
        const deltaY = touchendY - touchstartY;

        if (deltaY > 50) {
            // Swipe up logic
            currentCardIndex = Math.max(currentCardIndex - 1, 0);
            fetchAndDisplayData();
        } else if (deltaY < -50) {
            // Swipe down logic
            currentCardIndex = Math.min(currentCardIndex + 1, totalCards - 1);
            fetchAndDisplayData();
        }
    });

    // Helper function to check if the user has scrolled to the bottom of the page
    function isScrolledToBottom() {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }

    // Helper function to check if the user has scrolled to the top of the page
    function isScrolledToTop() {
        return window.scrollY === 0;
    }
});

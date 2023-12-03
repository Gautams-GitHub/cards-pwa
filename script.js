// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Set up variables
    let currentCardIndex = 0;

    // Fetch and display card data
    function fetchAndDisplayData() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Assuming data is an array of card objects
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
        // Change card index based on scroll direction (to be implemented)
        // Update displayed card
        fetchAndDisplayData();
    });
});

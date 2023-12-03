// script.js
document.addEventListener('DOMContentLoaded', function () {
    let currentCardIndex = 0;
    let totalCards = 0;
    let touchstartY = 0;
    let touchstartX = 0;
    


    // //To be commented out before pushing for deployment
    // const cards= [
    //     {
    //       title: "Card 1",
    //       imgSrc: "https://picsum.photos/400",
    //       text: "This is the text for card 1."
    //     },
    //     {
    //       title: "Card 2",
    //       imgSrc: "https://picsum.photos/400",
    //       text: "This is the text for card 2."
    //     },
    //     {
    //       title: "Card 3",
    //       imgSrc: "https://picsum.photos/400",
    //       text: "This is the text for card 3."
    //     },
    //     {
    //       title: "Card 4",
    //       imgSrc: "https://picsum.photos/400",
    //       text: "This is the text for card 4."
    //     },
    //     {
    //       title: "Card 5",
    //       imgSrc: "https://picsum.photos/400",
    //       text: "This is the text for card 5."
    //     }
    //   ];    
    //   /////


    function fetchAndDisplayData() {
        //To be uncommented before pushing

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

        //////////////



        // //To be commented out before pushing for deployment
        // //For testing without https
        //         totalCards = cards.length;
        //         // const dummyData = cards;
        //         displayCard(cards[currentCardIndex]);
        // /////////////////
    }

    function displayCard(cardData) {
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '<div>Loading...<div/>';
        if (currentCardIndex === totalCards ) {
            displayThankYouCard();
        } else {
            const cardHTML = generateCardHTML(cardData);
            cardContainer.innerHTML = cardHTML;
        }             
    }

    function displayThankYouCard() {
        const cardContainer = document.getElementById('card-container');
        const thankYouHTML = `
        <div class="card">
            <img src="./thankyou-image.png" alt="Thank You!">
            <div class="title">Thank You!</div>
            <div class="text">We appreciate your time!</div>
        </div>
        `;
        cardContainer.innerHTML = thankYouHTML;
    }

    function generateCardHTML(cardData) {
        const randomNumber=600+Math.floor(Math.random() * 7);
        return `
            <div class="card">
                <img src="${cardData.imgSrc}/${randomNumber}" alt="${cardData.title}">
                <div class="title">${cardData.title}</div>
                <div class="text">${cardData.text}</div>
            </div>
        `;
    }

    function handleSwipeVertical(deltaY) {
        if (deltaY > 50) {
            // Swipe up logic
            currentCardIndex = Math.max(currentCardIndex - 1, 0);
            fetchAndDisplayData();
        } else if (deltaY < -50) {
            // Swipe down logic
            currentCardIndex = Math.min(currentCardIndex + 1, totalCards);
            fetchAndDisplayData();
        }
    }


    function handleSwipeHorizontal(deltaX) {
        if (deltaX > 50) {
            // Swipe to the right logic
            currentCardIndex = Math.max(currentCardIndex - 1, 0);
            fetchAndDisplayData();
        } else if (deltaX < -50) {
            // Swipe to the left logic
            
            currentCardIndex = Math.min(currentCardIndex +1, totalCards );
            fetchAndDisplayData();
        }
    }

   

    function handleTouchStart(e) {
        touchstartY = e.touches[0].clientY;
        touchstartX = e.touches[0].clientX;
        
    }

    function handleTouchEndVertical(e) {
        const touchendY = e.changedTouches[0].clientY;        
        const deltaY = touchendY - touchstartY;        
        
        handleSwipeVertical(deltaY);
    }

    function handleTouchEndHorizontal(e) {        
        const touchendX = e.changedTouches[0].clientX;        
        const deltaX = touchendX - touchstartX;
        
        handleSwipeHorizontal(deltaX);
    }

    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEndHorizontal);

    fetchAndDisplayData();
});

const myArray = ["Apple", "Banana", "Grape", "Cherry", "Kiwi", "Peach", "Pineapple", "Mango", "Orange"]
let shuffleArray = [];
let firstCard = null;
let secondCard = null;
let cardContainer = document.getElementById('card-container');
let pointElements = document.getElementsByClassName("point");
let pointElement = pointElements[0]
let failElements = document.getElementsByClassName('fail')
let failElement = failElements[0]
let point = 0;
let fail = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

function compare( firstCard, secondCard) {
    let content1 = firstCard.children[1].src;
    let content2 = secondCard.children[1].src;
    
    setTimeout(function() {
        if(content1 !== content2) {
            // CODE HERE: Compare and update the style to be block
            firstCard.children[0].style.display = 'block';
            secondCard.children[0].style.display = 'block';
            fail += 1;
            failElement.textContent = fail;

            // END CODE
        } else {
        point += 1;
        pointElement.textContent = point
        }
    }, 500);
}
console.log(pointElement)

function init() {
    let combineArray = myArray.concat(myArray); 
    
    shuffleArray = shuffle(combineArray);

    for(let i = 0; i < shuffleArray.length; i++) {
        let newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.id = `card${i+1}`;

        // CODE HERE: Create a new div with class 'hidden-card'
        // END CODE
        let hiddenCard = document.createElement('div');
        hiddenCard.className = 'hidden-card';
        // CODE HERE: Create a new p with class 'content'
        // END CODE
        let image = document.createElement('img')
        image.src = 'image/'+shuffleArray[i]+'.jpg'
        image.alt = shuffleArray[i]
        image.width = 120
        image.height = 120
        let newContent = document.createElement('p');
        newContent.class = 'content';
        newContent.textContent = shuffleArray[i];

        // CODE HERE: Append hiddenCard and content to newCard
        // END CODE
        newCard.appendChild(hiddenCard)
        // newCard.appendChild(newContent);
        newCard.appendChild(image)
        
        newCard.addEventListener('click', function(event) {
            // CODE HERE: apply style display none
            console.log(this.children)
            let hiddenCard = this.children[0]
            hiddenCard.style.display = 'none';
            // END CODE
            
            if(firstCard && secondCard) {
                console.log('both not empty')
                return;
            }
            if(firstCard == null) {
                firstCard = this;
            } else {
                if(secondCard == null) {
                    secondCard = this;
                }
            }
            if(firstCard && secondCard) {
                compare(firstCard, secondCard)
                firstCard = null;
                secondCard = null;  
            }
        })
        cardContainer.appendChild(newCard);
    }
}
init()
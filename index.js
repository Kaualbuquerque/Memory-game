const images={easy:['images/bee.png','images/cat.png','images/crab.png','images/dolphin.png','images/fox.png','images/frog.png','images/bee.png','images/cat.png','images/crab.png','images/dolphin.png','images/fox.png','images/frog.png',],medium:['images/bee.png','images/cat.png','images/crab.png','images/dolphin.png','images/fox.png','images/frog.png','images/hen.png','images/mouse.png','images/butterfly.png','images/bee.png','images/cat.png','images/crab.png','images/dolphin.png','images/fox.png','images/frog.png','images/hen.png','images/mouse.png','images/butterfly.png'],hard:['images/bee.png','images/cat.png','images/crab.png','images/dolphin.png','images/fox.png','images/frog.png','images/hen.png','images/mouse.png','images/owl.png','images/squirrel.png','images/butterfly.png','images/elephant.png','images/bee.png','images/cat.png','images/crab.png','images/dolphin.png','images/fox.png','images/frog.png','images/hen.png','images/mouse.png','images/owl.png','images/squirrel.png','images/butterfly.png','images/elephant.png']};const totalPairs={easy:6,medium:8,hard:12};function shuffle(array){if(!Array.isArray(array)){throw new TypeError('The argument must be an array')}
for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]]}
return array}
let firstCard=null;let secondCard=null;let isBlocked=!1;let foundPairs=0;let currentDifficulty;function checkPair(){if(!firstCard||!secondCard)return;const $firstBack=firstCard.find('.back img');const $secondBack=secondCard.find('.back img');if($firstBack.attr('src')===$secondBack.attr('src')){firstCard.off('click');secondCard.off('click');foundPairs++;resetCards()}else{isBlocked=!0;setTimeout(()=>{firstCard.removeClass('flipped');secondCard.removeClass('flipped');resetCards();isBlocked=!1},500)}
checkEndOfGame()}
function checkEndOfGame(){if(foundPairs===totalPairs[currentDifficulty]){setTimeout(showModal,500)}}
function resetCards(){firstCard=null;secondCard=null}
function createCard(image){return $(`
        <li class="card">
            <div class="front">?</div>
            <div class="back"><img src="${image}" alt="Card Image"></div>
        </li>
    `)}
function startGame(difficulty){currentDifficulty=difficulty;foundPairs=0;const shuffledImages=shuffle([...images[difficulty]]);const $table=$(".table").empty();shuffledImages.forEach(image=>{$table.append(createCard(image))});$(".table").off("click").on("click",".card",function(){const $card=$(this);if($card.hasClass('flipped')||isBlocked)return;$card.addClass('flipped');if(!firstCard){firstCard=$card}else if(!secondCard){secondCard=$card;checkPair()}})}
function showModal(){$("#winModal").show()}
function closeModal(){$("#winModal").hide();startGame(currentDifficulty)}
$(document).ready(()=>{$(".diff-btn").click(function(){const difficulty=$(this).data("difficulty");if(difficulty){startGame(difficulty)}else{console.error('Difficulty data attribute not found')}});$(".modal .close").click(closeModal);$(window).click((event)=>{if($(event.target).is('#winModal'))closeModal();})})
var guessLimit = 6;
var hints = 5;
var categories = ['Name','Elem','Atype','Wtype','Origin'];

var currentGuess = 0;
var currenntWeapon = [];

window.onload = function() {
    initialize();
}

function initialize() {
    for (let r = 0;r<=5;r++) {
        for (let c=0;c<=4;c++) {
            let newTile = document.createElement('span');
            newTile.classList.add('tile');
            newTile.id = r.toString() + '-' + categories[c];
            newTile.innerText = '';
            document.getElementById('board').appendChild(newTile);
        }
    }
}
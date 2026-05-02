var guessLimit = 6; // Guesses limit/max
var hints = 5; // Categories limit/max
var categories = ['Name','Elem','Atype','Wtype','Origin']; // Categories for guessing

var currentGuess = 0; // The current guess the user is on

// Weapon Settings (I dont want to write this but OK)
// Changing this to a json file would be far more organized tbh but im to lazy :shrug:
// Follows ["Weapon Name", "Weapon Element", "Weapon Archetype (Melee, Ranged, Mage), "Weapon type (Sword, dagger, gun, bow)", "Weapon Origin (Where you get it)"]
const weapons = {
    PrimeBrand: ["Prime Brand", "Plasma", "Melee", "Sword", "Event"],
    OldSword: ["OldSword", "Metal", "Melee", "Sword", "Praire"],
    Coffinhilt: ["Coffinhilt", "Undead", "Melee", "Sword", "Catacomb"],
    Sixshooter: ["Six Shooter", "Metal", "Ranged", "Gun", "Observatory"],
    Gligsword: ["Glig Sword", "Gligglets", "Melee", "Sword", "NF2"]
}

var randomNum = Math.floor(Math.random() * Object.keys(weapons).length);
var currentWeapon = weapons[Object.keys(weapons)[randomNum]]; // Defines what the weapon to guess is
var gameOver = false;

window.onload = function() {
    initialize();
}

function initialize() {
    if (gameOver) return;

    for (let r = 0;r<=5;r++) {
        for (let c=0;c<=4;c++) {
            let newTile = document.createElement('span');
            newTile.classList.add('tile');
            newTile.id = r.toString() + '-' + categories[c]; // Meaning: Tile id is "ROW-CATEGORY" (i.e. 1-Elem)
            newTile.innerText = '';
            document.getElementById('board').appendChild(newTile);
        }
    }

    Object.keys(weapons).forEach(assignOptions);
    function assignOptions(wpnValue) {
        let optionList = document.getElementById('weaponSubmit');
        let newOpt = document.createElement('option');
        newOpt.value = wpnValue;
        newOpt.innerText = weapons[wpnValue][0];
        optionList.appendChild(newOpt);
    }

    document.addEventListener("keyup", e => {
        if (e.code == "Enter") {
            submitGuess();
        }
    })
}

function submitGuess() {
    let userGuess = document.getElementById("weaponSubmit").value;
    let weaponGuess = weapons[userGuess];
    console.log(userGuess);
    console.log(weaponGuess);
    let correctCounter = 0;

    // Add and Check guess
    for (let c = 0; c <= 4; c++) {
        let currTile = document.getElementById(currentGuess.toString() + '-' + categories[c]);
        currTile.innerText = weaponGuess[c];

        if (weaponGuess[c] == currentWeapon[c]) {
            correctCounter += 1;
            currTile.classList.add("correct");
        } else {
            currTile.classList.add("absent");
        }
    }

    if (correctCounter == 5) {
        gameOver = true;
        alert("You win!");
    } else {
        currentGuess += 1;
    }
}
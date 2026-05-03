var guessLimit = 6; // Guesses limit/max
var hints = 4; // Categories limit/max
var categories = ['Name','Elem','Damage','Wtype','Origin']; // Categories for guessing

var currentGuess = 0; // The current guess the user is on

// Weapon Settings (I dont want to write this but OK)
// Changing this to a json file would be far more organized tbh but im to lazy :shrug:
// Follows ["Weapon Name", "Weapon Element", "Weapon Archetype (Melee, Ranged, Mage), "Weapon type (Sword, dagger, gun, bow)", "Weapon Origin (Where you get it)"]
const weapons = {
    DecayingEclipse: ["Decaying Eclipse", "Dark", 33, "Sword", "April Fools"],
    TheJadeTwin: ["The Jade Twin", "Earth", 33, "Sword", "Mystery Store"],
    FunkyDriftlander: ["Funky Driftlander", "Dark", 35, "Greatspear", "Mystery Store"],
    RatboyHandgun: ["Ratboy Handgun", "None", 45, "Gun", "Mystery Store"],
    RedPowerfists: ["Red Powerfists", "Metal", 30, "Gauntlet", "Mystery Store"],
    WickedJunkSpellbook: ["Wicked Junk Spellbook", "Metal", 50, "Staff", "Mystery Store"],
    BronzeGreatsword: ["Bronze Greatsword", "Metal", 15, "Greatsword", "Praire"],
    BronzeSword: ["Bronze Sword", "Metal", 11, "Sword", "Praire"],
    MagicBranch: ["Magic Branch", "None", 22, "Wand", "Praire"],
    OldSword: ["Old Sword", "Metal", 8, "Sword", "Praire"],
    WoodenDagger: ["Wooden Dagger", "None", 6, "Dagger", "Praire"],
    Bosca: ["Bosca", "None", 10, "Gun", "Suslands"],
    CrudeClub: ["Crude Club", "Organic", 15, "Maul", "Forest"],
    Cutlass: ["Cutlass", "Metal", 14, "Sword", "Big Bay"],
    DemetalGreatbow: ["Demetal Greatbow", "Fire", 30, "Bow", "Volcano"],
    DualBosca: ["Dual Bosca", "None", 15, "Gun", "Observatory"],
    Flintlock: ["Flintlock", "None", 26, "Gun", "Big Bay"],
    IronBattleaxe: ["Iron Battleaxe", "Metal", 17, "Axe", "Desert"],
    IronBow: ["Iron Bow", "None", 25, "Bow", "Desert"],
    IronDagger: ["Iron Dagger", "Metal", 13, "Dagger", "Desert"],
    IronGreatsword: ["Iron Greatsword", "Metal", 21, "Greatsword", "Desert"],
    IronSpear: ["Iron Spear", "Metal", 15, "Spear", "Desert"],
    IronSword: ["Iron Sword", "Metal", 17, "Sword", "Desert"],
    Revolver: ["Revolver", "None", 12, "Gun", "Forest"],
    SandWand: ["Sand Wand", "Sand", 18, "Wand", "Desert"],
    Shotel: ["Shotel", "Metal", 14, "Sword", "Desert"],
    TriplexBow: ["Triplex Bow", "None", 9, "Bow", "Desert"],
    Vuvuzela: ["Vuvuzela", "None", null, "Summoner", "Praire"],
    WoodenBow: ["Wooden Bow", "None", 20, "Bow", "Praire"],
    Crossbow: ["Crossbow", "None", 28, "Crossbow", "Mountain"],
    DemetalMaul: ["Demetal Maul", "Fire", 26, "Maul", "Volcano"],
    DemetalSword: ["Demetal Sword", "Fire", 23, "Sword", "Volcano"],
    DemetalWand: ["Demetal Wand", "Fire", 4, "Wand", "Volcano"],
    ElfBlade: ["Elf Blade", "Grass", 16, "Dagger", "Swamp"],
    EyeVuvuzela: ["Eye Vuvuzela", "None", null, "Summoner", "Desert"],
    Icedagger: ["Icedagger", "Frost", 16, "Dagger", "Mountain"],
    IcicleRod: ["Icicle Rod", "Frost", 18, "Staff", "Mountain"],
    MagmaShackles: ["Magma Shackles", "None", 30, "Fist", "Volcano"],
    MagmaShotgun: ["Magma Shotgun", "Fire", 12, "Gun", "Volcano"],
    ManaBlade: ["Mana Blade", "Magic", 10, "Sword", "Swamp"],
    MithrilBow: ["Mithril Bow", "None", 26, "Bow", "Mountain"],
    MithrilSpear: ["Mithril Spear", "Frost", 19, "Spear", "Mountain"],
    MithrilSword: ["Mithril Sword", "Frost", 22, "Sword", "Mountain"],
    MithrilWand: ["Mithril Wand", "Frost", 4, "Wand", "Mountain"],
    PhoenixStaff: ["Phoenix Staff", "Fire", 17, "Staff", "Volcano"],
    PitchDagger: ["Pitch Dagger", "None", 19, "Dagger", "Swamp"],
    SerpentScepter: ["Serpent Scepter", "Venom", 10, "Staff", "Desert"],
    SilverRepeater: ["Silver Repeater", "None", 16, "Crossbow", "Mourning Hallow"],
    SmartStemStaff: ["Smart Stem Staff", "None", null, "Summoner", "Cobalt Cavern"],
    SquidBlaster: ["Squid Blaster", "None", 15, "Wand", "Cloud City"],
    AirGun: ["Air Gun", "None", 10, "Gun", "Cloud City"],
    Anchor: ["Anchor", "Water", 43, "Maul", "Western Sea"],
    BlackStiletto: ["Black Stiletto", "None", 24, "Dagger", "Strange Chasm"],
    Blunderbuss: ["Blunderbuss", "None", 13, "Gun", "Suslands"],
    Boulderblades: ["Boulderblades", "Earth", 20, "Sword", "Strange Chasm"],
    BrassBow: ["Brass Bow", "None", 26, "Bow", "Suslands"],
    Cannon: ["Cannon", "None", 65, "Gun", "Observatory"],
    CleverTome: ["Clever Tome", "None", 0, "Staff", "Northern Sea"],
    Crabhand: ["Crabhand", "Water", 40, "Maul", "Cobalt Cavern"],
    ExecutionersGreatsword: ["Executioner's Greatsword", "Metal", 27, "Greatsword", "Mountain"],
    FeralScimitar: ["Feral Scimitar", "Metal", 27, "Sword", "Suslands"],
    GildedGreatsword: ["Gilded Greatsword", "Lightning", 30, "Greatsword", "Cloud City"],
    Halberd: ["Halberd", "Metal", 36, "Axe", "Sinister Sea"],
    Harpoon: ["Harpoon", "Metal", 24, "Spear", "Sinister Sea"],
    HauntedScythe: ["Haunted Scythe", "Metal", 36, "Scythe", "Patchland Grove"],
    Musket: ["Musket", "None", 48, "Gun", "Mourning Hallow"],
    PrimeScepter: ["Prime Scepter", "Plasma", 70, "Staff", "Special"],
    ProDagger: ["Pro Dagger", "Light", 22, "Dagger", "Mountain"],
    Rainmaker: ["Rainmaker", "Water", 35, "Staff", "Forest"],
    Rockwondo: ["Rockwondo", "Organic", 22, "Fist", "Mountain"],
    ScrapLongsword: ["Scrap Longsword", "Metal", 26, "Sword", "Suslands"],
    ScrapSickle: ["Scrap Sickle", "Metal", 5, "Dagger", "Suslands"],
    SoundStaff: ["Sound Staff", "None", 45, "Staff", "Cloud City"],
    Tanto: ["Tanto", "Metal", 19, "Dagger", "Deep Desert"],
    Trident: ["Trident", "Water", 23, "Spear", "Sinister Sea"],
    ZapAntenna: ["Zap Antenna", "Lightning", 48, "Staff", "Suslands"],
    AcridLongbow: ["Acrid Longbow", "Venom", 33, "Bow", "Deep Desert"],
    BlizzardGreataxe: ["Blizzard Greataxe", "Frost", 36, "Axe", "Mountain"],
    BlizzardGreatbow: ["Blizzard Greatbow", "Frost", 64, "Bow", "Mountain"],
    BrainBrawl: ["Brain Brawl", "Organic", 24, "Fist", "Cobalt Cavern"],
    ChampionsBow: ["Champion's Bow", "None", 40, "Bow", "Western Sea"],
    CreepyClaw: ["Creepy Claw", "Venom", 28, "Sword", "Deep Desert"],
    Crystalspine: ["Crystalspine", "Water", 26, "Rapier", "Forest"],
    EGGMG: ["EGGMG", "None", 8, "Gun", "Observatory"],
    Glubber: ["Glubber", "Water", 30, "Staff", "Cobalt Cavern"],
    Gravetree: ["Gravetree", "Earth", 42, "Maul", "Catacomb"],
    MegatonMaul: ["Megaton Maul", "Metal", 40, "Maul", "Strange Chasm"],
    Nagakiba: ["Nagakiba", "Metal", 32, "Sword", "Deep Desert"],
    NormalClaw: ["Normal Claw", "None", 22, "Sword", "Special"],
    PrimeBrand: ["Prime Brand", "Plasma", 24, "Sword", "Praire"],
    PurpleFang: ["Purple Fang", "Magic", 22, "Dagger", "Cobalt Cavern"],
    SandpodSpear: ["Sandpod Spear", "Sand", 32, "Spear", "Deep Desert"],
    Scarebow: ["Scarebow", "None", 24, "Bow", "Patchland Grove"],
    ScrapLance: ["Scrap Lance", "Metal", 24, "Spear", "Observatory"],
    SilverAxe: ["Silver Axe", "Metal", 26, "Axe", "Mourning Hallow"],
    SilverRapier: ["Silver Rapier", "Metal", 20, "Rapier", "Mourning Hallow"],
    SixShooter: ["Six Shooter", "None", 50, "Gun", "Observatory"],
    SlimeHammer: ["Slime Hammer", "Organic", 38, "Maul", "Mourning Hallow"],
    Sundowners: ["Sundowners", "None", 30, "Gun", "Suslands"],
    Twigclaws: ["Twigclaws", "Grass", 26, "Fist", "Catacomb"],
    VikingAxe: ["Viking Axe", "Metal", 28, "Axe", "Forest"],
    VineWand: ["Vine Wand", "Grass", 10, "Wand", "Swamp"],
    AzureRocket: ["Azure Rocket", "None", 60, "Crossbow", "Legion"],
    BerriedCleaver: ["Berried Cleaver", "Venom", 36, "Cleaver", "Catacomb"],
    BigfishGauntlet: ["Bigfish Gauntlet", "Lightning", 22, "Staff", "Sinister Sea"],
    BoneClaws: ["Bone Claws", "Undead", 18, "Fist", "Sinister Sea"],
    BusterSword: ["Buster Sword", "Metal", 42, "Greatsword", "Sinister Sea"],
    Catatome: ["Catatome", "Dark", 30, "Staff", "Catacomb"],
    ChampionsGladius: ["Champion's Gladius", "Metal", 28, "Sword", "Western Sea"],
    ClerickTome: ["Clerick Tome", "Light", 27, "Wand", "Catacomb"],
    Coffinhilt: ["Coffinhilt", "Undead", 18, "Sword", "Catacomb"],
    Coffinlock: ["Coffinlock", "None", 40, "Gun", "Catacomb"],
    Electrofork: ["Electrofork", "Metal", 35, "Spear", "Observatory"],
    EmpyreanMaul: ["Empyrean Maul", "Light", 36, "Maul", "Cloud City"],
    EvilNeedle: ["Evil Needle", "Metal", 33, "Rapier", "Chaos Hideout"],
    KaiFist: ["Kai Fist", "Organic", 25, "Fist", "Big Bay"],
    KaismithHammer: ["Kaismith Hammer", "Metal", 40, "Maul", "Legion"],
    KodKendo: ["Kod Kendo", "Organic", 32, "Fist", "Eastern Sea"],
    MaimedCudgel: ["Maimed Cudgel", "Organic", 36, "Maul", "Sinister Sea"],
    NoxiousMortar: ["Noxious Mortar", "Venom", 20, "Gun", "Catacomb"],
    RustyBell: ["Rusty Bell", "Metal", 64, "Bell", "The Winter"],
    Snowflurry: ["Snowflurry", "Frost", 22, "Staff", "The Winter"],
    Snowshatters: ["Snowshatters", "Frost", 12, "Dagger", "The Winter"],
    Swordfish: ["Swordfish", "Water", 36, "Spear", "Special"],
    TektiteArc: ["Tektite Arc", "Fire", 55, "Staff", "Chaos Hideout"],
    TektiteBallista: ["Tektite Ballista", "None", 80, "Gun", "Rifts"],
    TektiteCrusher: ["Tektite Crusher", "Earth", 45, "Maul", "Rifts"],
    TheRot: ["The Rot", "Venom", 52, "Greatsword", "Catacomb"],
    TwistedCage: ["Twisted Cage", "Fire", 20, "Staff", "Chaos Hideout"],
    AzurePinwheel: ["Azure Pinwheel", "Metal", 36, "Axe", "Legion"],
    Bloodtwin: ["Bloodtwin", "Dark", 36, "Twinblade", "Chaos Hideout"],
    CeremonialGreatblade: ["Ceremonial Greatblade", "Metal", 48, "Greatsword", "Legion"],
    Lostmasks: ["Lostmasks", "None", 60, "Staff", "Chaos Hideout"],
    Mephisosceles: ["Mephisosceles", "Dark", 35, "Sword", "Chaos Hideout"],
    NosDywyll: ["Nos Dywyll", "Dark", 40, "Greatspear", "Rifts"],
    PrismBow: ["Prism Bow", "Light", 20, "Bow", "Praire"],
    PrismLance: ["Prism Lance", "Light", 26, "Spear", "Praire"],
    PrismStaff: ["Prism Staff", "Light", 22, "Staff", "Praire"],
    Shroomerang: ["Shroomerang", "Light", 30, "Boomerang", "Condemned Passage"],
    Sporeshot: ["Sporeshot", "Light", 50, "Gun", "Condemned Passage"],
    Sunyata: ["Sunyata", "Light", 28, "Dagger", "Chaos Hideout"],
    WickedLimb: ["Wicked Limb", "Dark", 80, "Staff", "Chaos Hideout"]

}

var randomNum = Math.floor(Math.random() * Object.keys(weapons).length);
var currentWeapon = weapons[Object.keys(weapons)[randomNum]]; // Defines what the weapon to guess is
var gameOver = false;

window.onload = function() {
    initialize();
}

function initialize() {
    if (gameOver || currentGuess == guessLimit) {
        gameOver = true;
        alert("The answer was " + currentWeapon[0] + " LOSERRRRRR");
        return;
    }
    // Use console.log(currentWeapon) to reveal the answer

    for (let r = 0;r<=guessLimit;r++) {
        for (let c=0;c<=hints;c++) {
            let newTile = document.createElement('span');
            newTile.classList.add('tile');
            newTile.id = r.toString() + '-' + categories[c]; // Meaning: Tile id is "ROW-CATEGORY" (i.e. 1-Elem)
            newTile.innerText = '';
            document.getElementById('board').appendChild(newTile);
        }
    }

    Object.keys(weapons).sort().forEach(assignOptions);
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
    if (gameOver || currentGuess == guessLimit) {
        gameOver = true;
        alert("The answer was " + currentWeapon[0] + " LOSERRRRRR");
        return;
    }
    
    let userGuess = document.getElementById("weaponSubmit").value;
    let weaponGuess = weapons[userGuess];
    console.log(userGuess);
    console.log(weaponGuess);
    let correctCounter = 0;

    // Add and Check guess
    for (let c = 0; c <= 4; c++) {
        let currTile = document.getElementById(currentGuess.toString() + '-' + categories[c]);
        if (c != 2) {
            currTile.innerText = weaponGuess[c];

            if (weaponGuess[c] == currentWeapon[c]) {
                correctCounter += 1;
                currTile.classList.add("correct");
            } else {
                currTile.classList.add("absent");
            }
        } else {
            currTile.classList.add("damage");
            if (weaponGuess[c] == currentWeapon[c]) {
                correctCounter += 1;
                currTile.innerText = weaponGuess[c];
                currTile.classList.add("correct");
            } else if (weaponGuess[c] > currentWeapon[c]) {
                currTile.innerText = weaponGuess[c].toString() + " \u2193";
                currTile.classList.add("absent");
            } else if (weaponGuess[c] < currentWeapon[c]) {
                currTile.innerText = weaponGuess[c].toString() + " \u2191";
                currTile.classList.add("absent");
            }
        }
    }

    if (correctCounter == 5) {
        gameOver = true;
        alert("You win!");
    } else {
        currentGuess += 1;
    }
}

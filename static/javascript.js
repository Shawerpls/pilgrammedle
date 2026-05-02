var guessLimit = 10; // Guesses limit/max
var hints = 4; // Categories limit/max
var categories = ['Name','Elem','Atype','Wtype','Origin']; // Categories for guessing

var currentGuess = 0; // The current guess the user is on

// Weapon Settings (I dont want to write this but OK)
// Changing this to a json file would be far more organized tbh but im to lazy :shrug:
// Follows ["Weapon Name", "Weapon Element", "Weapon Archetype (Melee, Ranged, Mage), "Weapon type (Sword, dagger, gun, bow)", "Weapon Origin (Where you get it)"]
const weapons = {
    DecayingEclipse: ["Decaying Eclipse", "Dark", "Melee", "Sword", "April Fools"],
    TheJadeTwin: ["The Jade Twin", "Earth", "Melee", "Sword", "Mystery Store"],
    FunkyDriftlander: ["Funky Driftlander", "Dark", "Melee", "Greatspear", "Mystery Store"],
    RatboyHandgun: ["Ratboy Handgun", "None", "Ranged", "Gun", "Mystery Store"],
    RedPowerfists: ["Red Powerfists", "Metal", "Melee", "Gauntlet", "Mystery Store"],
    WickedJunkSpellbook: ["Wicked Junk Spellbook", "Metal", "Mage", "Staff", "Mystery Store"],
    BronzeGreatsword: ["Bronze Greatsword", "Metal", "Melee", "Greatsword", "Praire"],
    BronzeSword: ["Bronze Sword", "Metal", "Melee", "Sword", "Praire"],
    MagicBranch: ["Magic Branch", "Magic", "Mage", "Wand", "Praire"],
    OldSword: ["Old Sword", "Metal", "Melee", "Sword", "Praire"],
    WoodenDagger: ["Wooden Dagger", "None", "Melee", "Dagger", "Praire"],
    Bosca: ["Bosca", "None", "Ranged", "Gun", "Suslands"],
    CrudeClub: ["Crude Club", "Organic", "Melee", "Maul", "Forest"],
    Cutlass: ["Cutlass", "Metal", "Melee", "Sword", "Big Bay"],
    DemetalGreatbow: ["Demetal Greatbow", "Fire", "Ranged", "Bow", "Volcano"],
    DualBosca: ["Dual Bosca", "None", "Ranged", "Gun", "Observatory"],
    Flintlock: ["Flintlock", "None", "Ranged", "Gun", "Big Bay"],
    IronBattleaxe: ["Iron Battleaxe", "Metal", "Melee", "Axe", "Desert"],
    IronBow: ["Iron Bow", "None", "Ranged", "Bow", "Desert"],
    IronDagger: ["Iron Dagger", "Metal", "Melee", "Dagger", "Desert"],
    IronGreatsword: ["Iron Greatsword", "Metal", "Melee", "Greatsword", "Desert"],
    IronSpear: ["Iron Spear", "Metal", "Melee", "Spear", "Desert"],
    IronSword: ["Iron Sword", "Metal", "Melee", "Sword", "Desert"],
    Revolver: ["Revolver", "None", "Ranged", "Gun", "Forest"],
    SandWand: ["Sand Wand", "Sand", "Mage", "Wand", "Desert"],
    Shotel: ["Shotel", "Metal", "Melee", "Sword", "Desert"],
    TriplexBow: ["Triplex Bow", "None", "Ranged", "Bow", "Desert"],
    Vuvuzela: ["Vuvuzela", "None", "Mage", "Summoner", "Praire"],
    WoodenBow: ["Wooden Bow", "None", "Ranged", "Bow", "Praire"],
    Crossbow: ["Crossbow", "None", "Ranged", "Crossbow", "Mountain"],
    DemetalMaul: ["Demetal Maul", "Fire", "Melee", "Maul", "Volcano"],
    DemetalSword: ["Demetal Sword", "Fire", "Melee", "Sword", "Volcano"],
    DemetalWand: ["Demetal Wand", "Fire", "Mage", "Wand", "Volcano"],
    ElfBlade: ["Elf Blade", "Grass", "Melee", "Dagger", "Swamp"],
    EyeVuvuzela: ["Eye Vuvuzela", "None", "Mage", "Summoner", "Desert"],
    Icedagger: ["Icedagger", "Frost", "Melee", "Dagger", "Mountain"],
    IcicleRod: ["Icicle Rod", "Frost", "Mage", "Staff", "Mountain"],
    MagmaShackles: ["Magma Shackles", "Fire", "Melee", "Fist", "Volcano"],
    MagmaShotgun: ["Magma Shotgun", "Fire", "Ranged", "Gun", "Volcano"],
    ManaBlade: ["Mana Blade", "Magic", "Melee", "Sword", "Swamp"],
    MithrilBow: ["Mithril Bow", "None", "Ranged", "Bow", "Mountain"],
    MithrilSpear: ["Mithril Spear", "Frost", "Melee", "Spear", "Mountain"],
    MithrilSword: ["Mithril Sword", "Frost", "Melee", "Sword", "Mountain"],
    MithrilWand: ["Mithril Wand", "Frost", "Mage", "Wand", "Mountain"],
    PhoenixStaff: ["Phoenix Staff", "Fire", "Mage", "Staff", "Volcano"],
    PitchDagger: ["Pitch Dagger", "None", "Melee", "Dagger", "Swamp"],
    SerpentScepter: ["Serpent Scepter", "Venom", "Mage", "Staff", "Desert"],
    SilverRepeater: ["Silver Repeater", "None", "Ranged", "Crossbow", "Mourning Hallow"],
    SmartStemStaff: ["Smart Stem Staff", "None", "Mage", "Summoner", "Cobalt Cavern"],
    SquidBlaster: ["Squid Blaster", "None", "Mage", "Wand", "Big Bay"],
    AirGun: ["Air Gun", "None", "Ranged", "Gun", "Cloud City"],
    Anchor: ["Anchor", "Water", "Melee", "Maul", "Western Sea"],
    BlackStiletto: ["Black Stiletto", "None", "Melee", "Dagger", "Strange Chasm"],
    Blunderbuss: ["Blunderbuss", "None", "Ranged", "Gun", "Big Bay"],
    Boulderblades: ["Boulderblades", "Earth", "Melee", "Sword", "Strange Chasm"],
    BrassBow: ["Brass Bow", "None", "Ranged", "Bow", "Suslands"],
    Cannon: ["Cannon", "None", "Ranged", "Gun", "Observatory"],
    CleverTome: ["Clever Tome", "None", "Mage", "Staff", "Northern Sea"],
    Crabhand: ["Crabhand", "Water", "Melee", "Maul", "Cobalt Cavern"],
    ExecutionersGreatsword: ["Executioner's Greatsword", "Metal", "Melee", "Greatsword", "Mountain"],
    FeralScimitar: ["Feral Scimitar", "Metal", "Melee", "Sword", "Suslands"],
    GildedGreatsword: ["Gilded Greatsword", "Lightning", "Melee", "Greatsword", "Cloud City"],
    Halberd: ["Halberd", "Metal", "Melee", "Axe", "Sinister Sea"],
    Harpoon: ["Harpoon", "Metal", "Melee", "Spear", "Sinister Sea"],
    HauntedScythe: ["Haunted Scythe", "Metal", "Melee", "Scythe", "Patchland Grove"],
    Musket: ["Musket", "None", "Ranged", "Gun", "Mourning Hallow"],
    PrimeScepter: ["Prime Scepter", "Plasma", "Mage", "Staff", "Special"],
    ProDagger: ["Pro Dagger", "Light", "Melee", "Dagger", "Mountain"],
    Rainmaker: ["Rainmaker", "Water", "Mage", "Staff", "Forest"],
    Rockwondo: ["Rockwondo", "Organic", "Melee", "Fist", "Mountain"],
    ScrapLongsword: ["Scrap Longsword", "Metal", "Melee", "Sword", "Suslands"],
    ScrapSickle: ["Scrap Sickle", "Metal", "Melee", "Dagger", "Suslands"],
    SoundStaff: ["Sound Staff", "None", "Mage", "Staff", "Cloud City"],
    Tanto: ["Tanto", "Metal", "Melee", "Dagger", "Deep Desert"],
    Trident: ["Trident", "Water", "Melee", "Spear", "Sinister Sea"],
    ZapAntenna: ["Zap Antenna", "Lightning", "Mage", "Staff", "Suslands"],
    AcridLongbow: ["Acrid Longbow", "Venom", "Ranged", "Bow", "Deep Desert"],
    BlizzardGreataxe: ["Blizzard Greataxe", "Frost", "Melee", "Axe", "Mountain"],
    BlizzardGreatbow: ["Blizzard Greatbow", "Frost", "Ranged", "Bow", "Mountain"],
    BrainBrawl: ["Brain Brawl", "Organic", "Melee", "Fist", "Cobalt Cavern"],
    ChampionsBow: ["Champion's Bow", "None", "Ranged", "Bow", "Western Sea"],
    CreepyClaw: ["Creepy Claw", "Venom", "Melee", "Sword", "Deep Desert"],
    Crystalspine: ["Crystalspine", "Water", "Melee", "Rapier", "Forest"],
    EGGMG: ["EGGMG", "None", "Ranged", "Gun", "Observatory"],
    Glubber: ["Glubber", "Water", "Mage", "Staff", "Cobalt Cavern"],
    Gravetree: ["Gravetree", "Earth", "Melee", "Maul", "Catacomb"],
    MegatonMaul: ["Megaton Maul", "Metal", "Melee", "Maul", "Strange Chasm"],
    Nagakiba: ["Nagakiba", "Metal", "Melee", "Sword", "Deep Desert"],
    NormalClaw: ["Normal Claw", "None", "Melee", "Sword", "Special"],
    PrimeBrand: ["Prime Brand", "Plasma", "Melee", "Sword", "Praire"],
    PurpleFang: ["Purple Fang", "Magic", "Melee", "Dagger", "Cobalt Cavern"],
    SandpodSpear: ["Sandpod Spear", "Sand", "Melee", "Spear", "Deep Desert"],
    Scarebow: ["Scarebow", "None", "Ranged", "Bow", "Patchland Grove"],
    ScrapLance: ["Scrap Lance", "Metal", "Melee", "Spear", "Observatory"],
    SilverAxe: ["Silver Axe", "Metal", "Melee", "Axe", "Mourning Hallow"],
    SilverRapier: ["Silver Rapier", "Metal", "Melee", "Rapier", "Mourning Hallow"],
    SixShooter: ["Six Shooter", "None", "Ranged", "Gun", "Observatory"],
    SlimeHammer: ["Slime Hammer", "Organic", "Melee", "Maul", "Mourning Hallow"],
    Sundowners: ["Sundowners", "None", "Ranged", "Gun", "Suslands"],
    Twigclaws: ["Twigclaws", "Grass", "Melee", "Fist", "Catacomb"],
    VikingAxe: ["Viking Axe", "Metal", "Melee", "Axe", "Forest"],
    VineWand: ["Vine Wand", "Grass", "Mage", "Wand", "Swamp"],
    AzureRocket: ["Azure Rocket", "None", "Ranged", "Crossbow", "Legion"],
    BerriedCleaver: ["Berried Cleaver", "Venom", "Melee", "Cleaver", "Catacomb"],
    BigfishGauntlet: ["Bigfish Gauntlet", "Lightning", "Mage", "Staff", "Sinister Sea"],
    BoneClaws: ["Bone Claws", "Undead", "Melee", "Fist", "Sinister Sea"],
    BusterSword: ["Buster Sword", "Metal", "Melee", "Greatsword", "Sinister Sea"],
    Catatome: ["Catatome", "Dark", "Mage", "Staff", "Catacomb"],
    ChampionsGladius: ["Champion's Gladius", "Metal", "Melee", "Sword", "Western Sea"],
    ClerickTome: ["Clerick Tome", "Light", "Mage", "Wand", "Catacomb"],
    Coffinhilt: ["Coffinhilt", "Undead", "Melee", "Sword", "Catacomb"],
    Coffinlock: ["Coffinlock", "None", "Ranged", "Gun", "Catacomb"],
    Electrofork: ["Electrofork", "Metal", "Melee", "Spear", "Observatory"],
    EmpyreanMaul: ["Empyrean Maul", "Light", "Melee", "Maul", "Cloud City"],
    EvilNeedle: ["Evil Needle", "Metal", "Melee", "Rapier", "Chaos Hideout"],
    KaiFist: ["Kai Fist", "Organic", "Melee", "Fist", "Big Bay"],
    KaismithHammer: ["Kaismith Hammer", "Metal", "Melee", "Maul", "Legion"],
    KodKendo: ["Kod Kendo", "Organic", "Melee", "Fist", "Eastern Sea"],
    MaimedCudgel: ["Maimed Cudgel", "Organic", "Melee", "Maul", "Sinister Sea"],
    NoxiousMortar: ["Noxious Mortar", "Venom", "Ranged", "Gun", "Catacomb"],
    RustyBell: ["Rusty Bell", "Metal", "Melee", "Bell", "The Winter"],
    Snowflurry: ["Snowflurry", "Frost", "Mage", "Staff", "The Winter"],
    Snowshatters: ["Snowshatters", "Frost", "Melee", "Dagger", "The Winter"],
    Swordfish: ["Swordfish", "Water", "Melee", "Spear", "Special"],
    TektiteArc: ["Tektite Arc", "Fire", "Mage", "Staff", "Chaos Hideout"],
    TektiteBallista: ["Tektite Ballista", "None", "Ranged", "Gun", "Rifts"],
    TektiteCrusher: ["Tektite Crusher", "Earth", "Melee", "Maul", "Rifts"],
    TheRot: ["The Rot", "Venom", "Melee", "Greatsword", "Catacomb"],
    TwistedCage: ["Twisted Cage", "Fire", "Mage", "Staff", "Chaos Hideout"],
    AzurePinwheel: ["Azure Pinwheel", "Metal", "Melee", "Axe", "Legion"],
    Bloodtwin: ["Bloodtwin", "Dark", "Melee", "Twinblade", "Chaos Hideout"],
    CeremonialGreatblade: ["Ceremonial Greatblade", "Metal", "Melee", "Greatsword", "Legion"],
    Lostmasks: ["Lostmasks", "None", "Mage", "Staff", "Chaos Hideout"],
    Mephisosceles: ["Mephisosceles", "Dark", "Melee", "Sword", "Chaos Hideout"],
    NosDywyll: ["Nos Dywyll", "Dark", "Melee", "Greatspear", "Rifts"],
    PrismBow: ["Prism Bow", "Light", "Ranged", "Bow", "Praire"],
    PrismLance: ["Prism Lance", "Light", "Melee", "Spear", "Praire"],
    PrismStaff: ["Prism Staff", "Light", "Mage", "Staff", "Praire"],
    Shroomerang: ["Shroomerang", "Light", "Melee", "Boomerang", "Condemned Passage"],
    Sporeshot: ["Sporeshot", "Light", "Ranged", "Gun", "Condemned Passage"],
    Sunyata: ["Sunyata", "Light", "Melee", "Dagger", "Chaos Hideout"],
    WickedLimb: ["Wicked Limb", "Dark", "Mage", "Staff", "Chaos Hideout"]

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

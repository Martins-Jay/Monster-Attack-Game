// Health Section
const playerHealthBar = document.getElementById('player-health');
const monsterHealthBar = document.getElementById('monster-health');

// Gives us access to BTNs in our HTML code
const playerAttackBtn = document.getElementById('player_attack_btn');
const playerStrongAttackBtn = document.getElementById('player_strong_attack_btn');
const playerHealBtn = document.getElementById('player_heal_btn');
const logBtn = document.getElementById('log_btn');

let maxLife = 100;

let currentPlayerHealth = maxLife;
let currentMonsterHealth = maxLife;
let hasBonusLife = true;

const playerAttackValue = 7;    //How hard we hit the monster.
const monsterAttackValue = 16;   //How hard the monster hits the player.
const strongAttackValue = 18;    //Strong attack to monster.
const playerHealValue = 20;      //Heal value

//Function to adjust the health bars.
function healthBarAdjust (maxLife) {
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
}

healthBarAdjust(maxLife);  

function monsterDamageValue(damage) {
  const damageDone = Math.random() * damage;   //Math.random() generates a random number between 0 and 1.
  monsterHealthBar.value = +monsterHealthBar.value - damageDone;   //New monster health value is injected to our HTML.
  return damageDone;
}

function playerDamageValue (damage) {
  const damageDone = Math.random() * damage;    //Math.random() generates a random number between 0 and 1.
  playerHealthBar.value = +playerHealthBar.value - damageDone;
  return damageDone;
}

function increasePlayerHealth(playerHealValue) {
  playerHealthBar.value = +playerHealthBar.value + playerHealValue;
}

function winCondition() {
  if(currentPlayerHealth <= 0 && hasBonusLife ) {
    hasBonusLife = false;   //

  }

  
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('YOU WON!');
    currentPlayerHealth = maxLife;
  } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
    alert('YOU LOST!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('YOU HAVE A DRAW!');
  }
}

function playerDamage() {
  //playerDamage happens after the monster hits the player.
  const playerDamage = playerDamageValue(monsterAttackValue);
  currentPlayerHealth -= playerDamage; 
  console.log(currentPlayerHealth);
}

function attackMonster(attackChoice) {
  let attackValue;

  if (attackChoice == 'STRONG_ATTACK') {
    attackValue = strongAttackValue;
  } else if (attackChoice == 'PLAYER_ATTACK'){
    attackValue = monsterAttackValue;
  }

  //monsterDamage happens after the player hits the monster.
  const monsterDamage = monsterDamageValue(attackValue);
  currentMonsterHealth = currentMonsterHealth - monsterDamage; 
  console.log(currentMonsterHealth);

  playerDamage(); //Calls the playerDamage function.
  winCondition(); //Calls the winCondition function

}

function attackHandler() {
  attackMonster('PLAYER_ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth > maxLife - playerHealValue ) {
    alert('You cannot heal above the value of your max health');
    healValue = maxLife - currentPlayerHealth;
  } else if (currentPlayerHealth < maxLife - playerHealValue) {
    healValue = playerHealValue;
  }

  increasePlayerHealth(healValue);   //Progress bar is updated by calling this function
  currentPlayerHealth = currentPlayerHealth + playerHealValue; //Important else progress bar health wont reflect in our internal game health plus this is important for our win condition. 
  playerDamage();
  winCondition();
}



playerAttackBtn?.addEventListener('click', attackHandler);
playerStrongAttackBtn?.addEventListener('click', strongAttackHandler);
playerHealBtn?.addEventListener('click', healPlayerHandler)











// const playerEnteredValue = prompt('Enter max life for you and the monster.');  //Entered value is a string.
// let maxLife = parseInt(playerEnteredValue); //converts string to number.
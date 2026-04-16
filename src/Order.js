let currentState = welcoming;

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = welcoming;  
}

// STATE 1: Initial Welcome
function welcoming(sInput) {
  let msg = sInput ? sInput.toLowerCase() : "";
  
  // Check if user clicked a button immediately (Buzz, Regular, or Taper/Fade)
  if (msg.includes("taper") || msg.includes("fade") || msg.includes("buzz") || msg.includes("regular") || msg.includes("cut")) {
    currentState = selection;
    return selection(sInput); 
  }

  let aReturn = [];
  currentState = selection; 
  aReturn.push("Welcome to Bleibleh Barber Co. AI Assistant!");
  // Matches all 3 button options now
  aReturn.push("Would you like to book a Buzz Cut, a Regular Cut, or a Taper Fade today?");
  return aReturn;
}

// STATE 2: Handling Service Selection + UPSELL
function selection(sInput) {
  let aReturn = [];
  let msg = sInput.toLowerCase();

  // Option 1: Buzz Cut
  if (msg.includes("buzz")) {
    aReturn.push("A clean Buzz Cut—perfect choice for a low-maintenance, sharp look!");
    aReturn.push("Would you like to add our professional Tea Tree Shampoo for home use? It's only $15.");
    currentState = upselling; 
  } 
  // Option 2: Taper Fade
  else if (msg.includes("taper") || msg.includes("fade")) {
    aReturn.push("The Taper Fade is a fan favorite. We'll get those edges looking sharp!");
    aReturn.push("Would you like to add our professional Tea Tree Shampoo for home use? It's only $15.");
    currentState = upselling; 
  }
  // Option 3: Regular Cut
  else if (msg.includes("regular") || msg.includes("cut")) {
    aReturn.push("Classic choice! We'll get you looking sharp with a Regular Cut.");
    aReturn.push("Since you're getting a cut, would you like to add a relaxing 5-minute scalp massage for $10?");
    currentState = upselling; 
  } 
  else {
    aReturn.push("I'm sorry, I didn't quite get that. We offer Buzz Cuts, Taper Fades, or Regular Cuts. Which one would you prefer?");
  }
  return aReturn;
}

// STATE 3: Handling the Upsell Response
function upselling(sInput) {
  let aReturn = [];
  let msg = sInput.toLowerCase();

  if (msg.startsWith('y') || msg.includes("shampoo") || msg.includes("massage") || msg.includes("add")) {
    aReturn.push("Perfect! I've added that to your service.");
  } else {
    aReturn.push("No problem! We'll just stick to the haircut today.");
  }

  aReturn.push("Your appointment is confirmed. What time can we expect you at 123 Tidy St. today?");
  
  currentState = welcoming; 
  return aReturn;
}
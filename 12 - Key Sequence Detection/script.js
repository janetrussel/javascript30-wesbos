// Set up an array to save the keys pressed
const pressed = [];
const secretCode = 'janet';
const maxchars = secretCode.length;

// Listen for keyup event
window.addEventListener ('keyup', (e) => {
  // add the pressed key to the array
  pressed.push (e.key);
  pressed.splice (-maxchars-1, pressed.length-secretCode.length);
  
  // Check if there is a match with the secret code
  if (pressed.join ("") === secretCode) {
    console.log ("the secret code was entered [", secretCode, "]");
    cornify_add ();
  }

});
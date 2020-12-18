// Data elements
const player = document.querySelector (".player");
const video = document.querySelector (".viewer");
const progress = document.querySelector (".progress");
const progressBar = document.querySelector (".progress__filled");
const playerButton = document.querySelector (".toggle");
const skipButtons = document.querySelectorAll ("[data-skip]");
const ranges = document.querySelectorAll (".player__slider");
const full_screen = document.querySelector (".full_screen");
const material_icons = document.querySelector (".material-icons");

// Functions
function togglePlay () {
    // There are properties on the video called "paused" and "play".  If paused then play; if play then pause.
  if (video.paused)
  {
      video.play ();
  }
  else
  {
      video.pause ();
  }
};

function updatePlayerButton () {
    // Change image of the player button based on whether it is paused or playing
    // "this" is the video player.  
  if (this.paused)
  {
      playerButton.textContent = '❚ ❚';
  }
  else
  {
      playerButton.textContent = '►';
  }
};

function skip () {
  video.currentTime += parseFloat (this.dataset.skip);
}

function handleRangeUpdate () {
    // set volume or playback rate
    video [this.name] = this.value;
}

function handleProgress () {
  // update progressBar.    
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleScreenSize () {
  // If full screen mode switch icon to exit fullscreen
  if (material_icons.textContent === "fullscreen") {
    // Set fullscreen mode.
    material_icons.textContent = "fullscreen_exit";
    player.classList.add ("fullscreen");
  }
  else {
    // Exit full screen mode
    player.classList.remove ("fullscreen");
    material_icons.textContent = "fullscreen";
  }
}

// Event Listeners
// add event listener to the video+
video.addEventListener ("click", togglePlay);

// add event listener to the player button
playerButton.addEventListener ("click", togglePlay);

// add event listener to update the player/pause button on play or pause - no matter how the mode changes.
video.addEventListener ("play", updatePlayerButton);
video.addEventListener ("pause", updatePlayerButton);

// add event listener to data-skip (skip buttons)
skipButtons.forEach (button => button.addEventListener ("click", skip));

// add event listener to the range - for when it changes value
ranges.forEach (range => range.addEventListener ("change", handleRangeUpdate));
ranges.forEach (range => range.addEventListener ("mousemove", handleRangeUpdate));

// add event listener to handle the progress bar
video.addEventListener ("timeupdate", handleProgress);

// add event listener to listen for click on the progress bar
let mousedown = false;
progress.addEventListener ('click', scrub);
progress.addEventListener ('mousemove', (e) => mousedown && scrub (e));
progress.addEventListener ('mousedown', () => mousedown = true);
progress.addEventListener ('mouseup', () => mousedown = false);

// Add event listener to full screen icon
full_screen.addEventListener ('click', toggleScreenSize);
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll ('[data-time]');

function timer (seconds) {
  // Clear any existing timers.
  clearInterval (countdown);

  const now = Date.now ();
  const then = now + seconds * 1000;
  
  // Run displayTimeLeft once before it decrements by 1 second.
  displayTimeLeft (seconds);
  displayEndTime (then);
  
  countdown = setInterval (() => {

    const secondsLeft = Math.round((then - Date.now ()) / 1000);
         
    // Stop if there are no seconds left in the timer.
    if (secondsLeft < 0) {
      clearInterval (countdown);
      return;
    }

    // Display the time left.
    displayTimeLeft (secondsLeft);
  }, 1000);
}

function displayTimeLeft (secondsLeft) {
  const minutes = Math.floor(secondsLeft/60);
  const remainderSeconds = secondsLeft % 60;
  // If less than 10 seconds put a 0 in front (e.g. 01, 02, 03, etc.)
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

  // update the browser title (tab)
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  
}

function startTimer () {
  const seconds = parseInt (this.dataset.time);
  timer (seconds);
}

buttons.forEach (button => button.addEventListener ('click', startTimer));

document.customForm.addEventListener ('submit', function (e) {
  e.preventDefault ();
  const mins = this.minutes.value;
  
  // clear the value in the form
  this.reset ();
  timer (60 * mins);
});

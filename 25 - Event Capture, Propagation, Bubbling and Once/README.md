learn about event capture, propagation, bubbling, and once
capture - builds top down
bubble - bubbles up on click events
you can stop propagation to stop bubbling (i.e. don't trigger events on a parent)
use once to listen for a click event and then unbind (eg. store checkout - don't allow user to click on this button more than once)
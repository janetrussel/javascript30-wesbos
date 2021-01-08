const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo () {
  navigator.mediaDevices.getUserMedia ( {
    video:true, audio:false})
    .then (localMediaStream => {
      console.log (localMediaStream);
     //  DEPRECIATION : 
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      
      video.srcObject = localMediaStream;
      video.play ();
    })
    .catch (err => console.error ('OH NO!!!', err));
}
function redEffect (pixels) {
  for (let i=0; i<pixels.data.length; i+=4) {
    pixels.data[i+0] = pixels.data[i+0] + 200; //red
    pixels.data[i+1] = pixels.data[i+1] - 50; //green
    pixels.data[i+2] = pixels.data[i+2] * 0.5; //blue
  }
  return pixels;
}
function rgbSplit (pixels) {
  for (let i=0; i<pixels.data.length; i+=4) {
    pixels.data[i-150] = pixels.data[i+0]; //red
    pixels.data[i+500] = pixels.data[i+1]; //green
    pixels.data[i-550] = pixels.data[i+2]; //blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function paintToCanvas () {
  const width = video.videoWidth;
  const height = video.videoHeight;
    
  canvas.width = width;
  canvas.height = height;

  // Paint to the canvas every 16ms.
  return setInterval (() => {
    ctx.drawImage (video, 0, 0, width, height);

    // Take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // mess with the pixels - redEffect
    //pixels = redEffect(pixels);
    //pixels = rgbSplit (pixels);
    pixels = greenScreen (pixels);

    // put the pixels bakc
    ctx.putImageData(pixels, 0, 0);
  }, 16);
 }

 function takePhoto () {
  snap.currentTime = 0;
  snap.play ();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  console.log (data);

  // take the data out of the canvas
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'gorgeous');
  //link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="Gorgeous gal" />`;
  strip.insertBefore (link, strip.firsChild);
}

getVideo ();

// Had a problem with getting the width and height of the video player.
// Add an eventListener for "loadedmetadata" or "canplay"
// paint the canvas AFTER this event occurs.
video.addEventListener ('canplay', paintToCanvas);
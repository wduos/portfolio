/*  MUSIC PLAYER  */

// define initial player states
let current = 0;
let isPlaying = false;

// get audio files, event listeners for when songs end
const songs = document.querySelectorAll("audio");

songs.forEach((song) => {
  // autoplay next song, and stop playback if last
  song.addEventListener("ended", () => {
    if (current === songs.length - 1) {
      songs[current].currentTime = 0;

      isPlaying = false;
      changePlayBtnStyle();
    } else {
      playerControl("next");
    }
  });
});

// gets control buttons in DOM, sets a listener for clicks and gives task (job) for main function
const playerControlBtns = document.querySelectorAll("[data-player]");
playerControlBtns.forEach((button) => {
  button.addEventListener("click", () => {
    playerControl(button.dataset.player);
  });
});

//main function, deals with play, pause, and track skipping
function playerControl(player) {
  // canChange variable will be used to ask checkMusicEnds function if buttons should be disabled
  let canChange;

  switch (player) {
    case "previous":
      canChange = checkMusicEnds(player);

      if (canChange) {
        songs[current].pause();
        songs[current].currentTime = 0;

        current--;

        if (isPlaying) {
          songs[current].play();
        }
      }

      changeBtnStyles();
      break;

    case "next":
      canChange = checkMusicEnds(player);

      if (canChange) {
        songs[current].pause();
        songs[current].currentTime = 0;

        current++;

        if (isPlaying) {
          songs[current].play();
        }
      }

      changeBtnStyles();
      break;

    default:
      if (!isPlaying) {
        songs[current].play();
        isPlaying = true;
      } else {
        songs[current].pause();
        isPlaying = false;
      }

      changePlayBtnStyle();
  }
}

// check if user has reached the last or first songs in list
function checkMusicEnds(direction) {
  if (direction === "previous") {
    if (current <= 0) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "next") {
    if (current >= songs.length - 1) {
      return false;
    } else {
      return true;
    }
  }
}

// change buttons background color based on track position
function changeBtnStyles() {
  if (current === 0) {
    playerControlBtns[0].style.opacity = "50%";
    playerControlBtns[2].style.opacity = "100%";
  } else if (current === songs.length - 1) {
    playerControlBtns[0].style.opacity = "100%";
    playerControlBtns[2].style.opacity = "50%";
  } else {
    playerControlBtns[0].style.opacity = "100%";
    playerControlBtns[2].style.opacity = "100%";
  }
}

// change play-pause button background color based on play state
function changePlayBtnStyle() {
  if (isPlaying) {
    document.getElementById("play-icon").style.display = "none";
    document.getElementById("pause-icon").style.display = "block";
    document.getElementById("play-pause-btn").style.animationPlayState =
      "running";
  } else {
    document.getElementById("play-icon").style.display = "block";
    document.getElementById("pause-icon").style.display = "none";
    document.getElementById("play-pause-btn").style.animationPlayState =
      "paused";
  }
}

const songs = [
  {
    title: "me not me",
    src: "songs/song1.mp3",
    image: "images/song1.jpg"
  },
  {
    title: "詩的表現",
    src: "songs/song2.mp3",
    image: "images/song1.jpg"
  },
  {
    title: "口笛",
    src: "songs/song3.mp3",
    image: "images/song1.jpg"
  },
  {
    title: "光より",
    src: "songs/song4.mp3",
    image: "images/song1.jpg"
  },
  {
    title: "灯某",
    src: "songs/song5.mp3",
    image: "images/song1.jpg"
  }
];

let currentIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const number = document.getElementById("song-number");
const playBtn = document.getElementById("play-btn");
const jacket = document.getElementById("jacket");

function loadSong() {
  audio.src = songs[currentIndex].src;
  title.textContent = songs[currentIndex].title;
  number.textContent = `${currentIndex + 1} / ${songs.length}`;
  jacket.src = songs[currentIndex].image;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function nextSong() {
  currentIndex++;

  if (currentIndex >= songs.length) {
    currentIndex = 0;
  }

  loadSong();
  audio.play();
  playBtn.textContent = "⏸";
}

function prevSong() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = songs.length - 1;
  }

  loadSong();
  audio.play();
  playBtn.textContent = "⏸";
}

audio.addEventListener("ended", nextSong);

loadSong();
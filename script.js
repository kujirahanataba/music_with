// =========================
// パスワード
// 好きな文字に変更して大丈夫
// =========================

const correctPassword = "918hm";


// =========================
// DISC 1の曲
// =========================

const disc1Songs = [
  {
    title: "me not me",
    src: "songs/song1.mp3",
    image: "images/IMG_8865.JPG?v=2"
  },
  {
    title: "詩的表現",
    src: "songs/song2.mp3",
    image: "images/song2.JPG"
  },
  {
    title: "口笛",
    src: "songs/song3.mp3",
    image: "images/song3.JPG"
  },
  {
    title: "光より",
    src: "songs/song4.mp3",
    image: "images/song4.jpg"
  },
  {
    title: "灯某",
    src: "songs/song5.mp3",
    image: "images/song5.JPG"
  }
];


// =========================
// DISC 2の曲
// 曲名は本当の曲名に変更する
// =========================

const disc2Songs = [
  {
    title: "ルサンチマン",
    src: "songs/song6.mp3",
    image: "images/song6.JPG"
  },
  {
    title: "大人",
    src: "songs/song7.mp3",
    image: "images/song6.JPG"
  },
  {
    title: "ニヒリスト",
    src: "songs/song8.mp3",
    image: "images/song6.JPG"
  },
  {
    title: "感覚は",
    src: "songs/song9.mp3",
    image: "images/song6.JPG"
  },
  {
    title: "日のひかり",
    src: "songs/song10.mp3",
    image: "images/song10.jpg"
  }
];


// =========================
// 現在の状態
// =========================

let currentDisc = 1;
let currentIndex = 0;
let songs = disc1Songs;


// =========================
// HTML要素
// =========================

const passwordScreen =
  document.getElementById("password-screen");

const passwordForm =
  document.getElementById("password-form");

const passwordInput =
  document.getElementById("password-input");

const passwordError =
  document.getElementById("password-error");

const passwordBox =
  document.querySelector(".password-box");

const player =
  document.getElementById("player");

const audio =
  document.getElementById("audio");

const title =
  document.getElementById("song-title");

const number =
  document.getElementById("song-number");

const playBtn =
  document.getElementById("play-btn");

const jacket =
  document.getElementById("jacket");

const discNumber =
  document.getElementById("disc-number");

const disc1Btn =
  document.getElementById("disc1-btn");

const disc2Btn =
  document.getElementById("disc2-btn");


// =========================
// パスワード判定
// =========================

passwordForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredPassword = passwordInput.value;

  if (enteredPassword === correctPassword) {
    openPlayer();
  } else {
    showPasswordError();
  }
});


// =========================
// プレイヤーを開く
// =========================

function openPlayer() {
  passwordError.textContent = "";

  passwordScreen.classList.add("fade-out");

  setTimeout(() => {
    passwordScreen.classList.add("hidden");
    player.classList.remove("hidden");

    loadSong();
  }, 600);
}


// =========================
// パスワード間違い
// =========================

function showPasswordError() {
  passwordError.textContent =
    "パスワードが違います";

  passwordInput.value = "";
  passwordInput.focus();

  passwordBox.classList.remove("shake");

  void passwordBox.offsetWidth;

  passwordBox.classList.add("shake");
}


// =========================
// 曲を読み込む
// =========================

function loadSong() {
  const currentSong = songs[currentIndex];

  jacket.classList.add("changing");

  setTimeout(() => {
    audio.src = currentSong.src;

    title.textContent =
      currentSong.title;

    number.textContent =
      `${currentIndex + 1} / ${songs.length}`;

    jacket.src =
      currentSong.image;

    jacket.alt =
      `${currentSong.title}の画像`;

    discNumber.textContent =
      `DISC ${currentDisc}`;

    jacket.classList.remove("changing");
  }, 180);
}


// =========================
// 再生・一時停止
// =========================

function togglePlay() {
  if (audio.paused) {
    playCurrentSong();
  } else {
    audio.pause();

    playBtn.textContent = "▶";
  }
}


// =========================
// 再生処理
// =========================

function playCurrentSong() {
  audio.play()
    .then(() => {
      playBtn.textContent = "⏸";
    })
    .catch((error) => {
      console.error(
        "音楽を再生できませんでした。",
        error
      );

      playBtn.textContent = "▶";
    });
}


// =========================
// 次の曲
// =========================

function nextSong() {
  currentIndex++;

  // 現在のDISCの最後を超えた場合
  if (currentIndex >= songs.length) {

    // DISC 1の最後ならDISC 2へ
    if (currentDisc === 1) {
      changeDisc(2, true);
      return;
    }

    // DISC 2の最後ならDISC 1へ戻る
    changeDisc(1, true);
    return;
  }

  loadSong();

  setTimeout(() => {
    playCurrentSong();
  }, 220);
}


// =========================
// 前の曲
// =========================

function prevSong() {
  currentIndex--;

  // 現在のDISCの最初より前に戻った場合
  if (currentIndex < 0) {

    // DISC 2の最初なら
    // DISC 1の最後へ
    if (currentDisc === 2) {
      currentDisc = 1;
      songs = disc1Songs;
      currentIndex = songs.length - 1;
    } else {
      // DISC 1の最初なら
      // DISC 2の最後へ
      currentDisc = 2;
      songs = disc2Songs;
      currentIndex = songs.length - 1;
    }

    updateDiscDesign();
  }

  loadSong();

  setTimeout(() => {
    playCurrentSong();
  }, 220);
}


// =========================
// DISCを切り替える
// =========================

function changeDisc(disc, autoPlay = false) {
  const wasPlaying = !audio.paused;

  audio.pause();

  currentDisc = disc;
  currentIndex = 0;

  if (currentDisc === 1) {
    songs = disc1Songs;
  } else {
    songs = disc2Songs;
  }

  updateDiscDesign();
  loadSong();

  // 自動切り替え時、または
  // 再生中に手動でDISCを変えた場合
  if (autoPlay || wasPlaying) {
    setTimeout(() => {
      playCurrentSong();
    }, 220);
  } else {
    playBtn.textContent = "▶";
  }
}


// =========================
// DISCごとの色を変更
// =========================

function updateDiscDesign() {
  if (currentDisc === 1) {
    document.body.classList.remove(
      "disc2-theme"
    );

    document.body.classList.add(
      "disc1-theme"
    );

    disc1Btn.classList.add("active");
    disc2Btn.classList.remove("active");
  } else {
    document.body.classList.remove(
      "disc1-theme"
    );

    document.body.classList.add(
      "disc2-theme"
    );

    disc1Btn.classList.remove("active");
    disc2Btn.classList.add("active");
  }
}


// =========================
// 曲が終わったら次へ
// DISC 1の最後からDISC 2へ
// 自動で切り替わる
// =========================

audio.addEventListener("ended", nextSong);


// =========================
// 再生・停止状態の反映
// =========================

audio.addEventListener("play", function () {
  playBtn.textContent = "⏸";
});

audio.addEventListener("pause", function () {
  if (!audio.ended) {
    playBtn.textContent = "▶";
  }
});


// =========================
// 音源エラー
// =========================

audio.addEventListener("error", function () {
  console.error(
    "音源ファイルを読み込めませんでした:",
    songs[currentIndex].src
  );

  playBtn.textContent = "▶";
});


// =========================
// 画像エラー
// =========================

jacket.addEventListener("error", function () {
  console.error(
    "画像ファイルを読み込めませんでした:",
    songs[currentIndex].image
  );
});


// =========================
// 最初の状態
// =========================

updateDiscDesign();
loadSong();

window.addEventListener("load", function () {
  passwordInput.focus();
});
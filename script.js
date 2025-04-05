const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const cover = document.getElementById("cover");

const songs = [
  {
    name: "music/JID2.mp3",
    title: "J.I.D - Surround Sound (feat. 21 Savage & Baby Tate)",
    img: "img/JID.jpg",
  },
  {
    name: "music/MEGA DAS.mp3",
    title: "Mega das Planetarias",
    img: "img/mega.jpg",
  },
  {
    name: "music/atlxs.mp3",
    title: "PASSO BEM SOLTO",
    img: "img/atlxs.jpg",
  },
  {
    name: "music/REAL MOONSHINE.mp3",
    title: "REAL MOONSHINE FUNK 2",
    img: "img/real.jpg",
  },
  {
    name: "music/cheri.mp3",
    title: " Modern Talking - Cheri Cheri Lady ",
    img: "img/cheri.jpg",
  },
];

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.name;
  title.textContent = song.title;
  cover.src = song.img;
}
loadSong(songIndex);

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Переход к следующей песне автоматически
audio.addEventListener("ended", nextSong);

// Обновление времени и прогресса
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

// Формат времени 0:00
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Перемотка трека по прогресс-бару
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Изменение громкости
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

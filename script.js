document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeBar = document.getElementById('volume-bar');
    const cards = document.querySelectorAll('.card[data-song]');
    const recentlyPlayedContainer = document.querySelector('.recently-played');

    let isPlaying = false;
    let currentIndex = -1;
    const recentlyPlayed = [];
    const songQueue = [];

    // Play or pause the music
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.src = './assets/play_musicbar.png';
        } else {
            audio.play();
            playPauseBtn.src = './assets/pause_musicbar.png';
        }
        isPlaying = !isPlaying;
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    }

    // Seek audio
    function seekAudio() {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    }

    // Format time in minutes:seconds
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Set volume
    function setVolume() {
        audio.volume = volumeBar.value / 100;
    }

    // Add song to recently played section
    function addToRecentlyPlayed(card) {
        const songTitle = card.querySelector('.card-title').textContent;
        const songInfo = card.querySelector('.card-info').textContent;
        const songImgSrc = card.querySelector('.card-img').src;

        const recentlyPlayedCard = document.createElement('div');
        recentlyPlayedCard.classList.add('card');
        recentlyPlayedCard.innerHTML = `
            <img src="${songImgSrc}" class="card-img">
            <p class="card-title">${songTitle}</p>
            <p class="card-info">${songInfo}</p>
        `;
        recentlyPlayedContainer.insertBefore(recentlyPlayedCard, recentlyPlayedContainer.firstChild);
    }

    // Play song when card is clicked
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const song = card.getAttribute('data-song');
            audio.src = `./assets/${song}`;
            audio.play();
            isPlaying = true;
            playPauseBtn.src = './assets/pause_musicbar.png';
            currentIndex = index;

            if (!recentlyPlayed.includes(song)) {
                recentlyPlayed.push(song);
                addToRecentlyPlayed(card);
            }

            if (!songQueue.includes(song)) {
                songQueue.push(song);
            }
        });
    });

    // Play the previous song
    function playPreviousSong() {
        if (currentIndex > 0) {
            currentIndex--;
            const previousSong = songQueue[currentIndex];
            audio.src = `./assets/${previousSong}`;
            audio.play();
            isPlaying = true;
            playPauseBtn.src = './assets/pause_musicbar.png';
        }
    }

    // Play the next song
    function playNextSong() {
        if (currentIndex < songQueue.length - 1) {
            currentIndex++;
            const nextSong = songQueue[currentIndex];
            audio.src = `./assets/${nextSong}`;
            audio.play();
            isPlaying = true;
            playPauseBtn.src = './assets/pause_musicbar.png';
        }
    }

    // Event listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPreviousSong);
    nextBtn.addEventListener('click', playNextSong);
    audio.addEventListener('timeupdate', updateProgressBar);
    progressBar.addEventListener('input', seekAudio);
    volumeBar.addEventListener('input', setVolume);

    // Initialize volume
    volumeBar.value = audio.volume * 100;

    // Update total time when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    // Reset play/pause button when the song ends
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.src = './assets/play_musicbar.png';
    });
});


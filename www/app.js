// Data Dummy Anime (Bisa kamu ganti dengan link API / JSON kamu sendiri)
const animeList = [
    {
        id: 1,
        title: "Solo Leveling - Episode 01",
        thumb: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        subUrl: "" // Masukkan link file .vtt di sini jika ada
    },
    {
        id: 2,
        title: "Naruto Shippuden - Episode 450",
        thumb: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        subUrl: ""
    }
];

const grid = document.getElementById('anime-grid');
const playerContainer = document.getElementById('player-container');
const videoPlayer = document.getElementById('video-player');
const videoSource = document.getElementById('video-source');
const subSource = document.getElementById('sub-source');
const animeTitle = document.getElementById('anime-title');
const searchInput = document.getElementById('search-input');

function renderList(items) {
    grid.innerHTML = '';
    if (items.length === 0) {
        grid.innerHTML = '<p class="col-span-2 text-center text-slate-500 py-6 text-sm">Anime tidak ditemukan...</p>';
        return;
    }
    items.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow cursor-pointer hover:border-red-500 transition group';
        card.innerHTML = `
            <div class="relative aspect-[3/4] overflow-hidden bg-slate-800">
                <img src="${anime.thumb}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                <span class="absolute bottom-2 left-2 bg-red-600/90 text-[10px] font-bold px-2 py-0.5 rounded shadow">SUB INDO</span>
            </div>
            <div class="p-2.5">
                <h4 class="font-medium text-xs sm:text-sm truncate text-slate-200">${anime.title}</h4>
            </div>
        `;
        card.onclick = () => playAnime(anime);
        grid.appendChild(card);
    });
}

function playAnime(anime) {
    animeTitle.innerText = anime.title;
    videoSource.src = anime.videoUrl;
    
    if (anime.subUrl) {
        subSource.src = anime.subUrl;
    } else {
        subSource.removeAttribute('src');
    }
    
    videoPlayer.load();
    playerContainer.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    videoPlayer.play().catch(e => console.log("Autoplay dibatasi browser:", e));
}

function closePlayer() {
    videoPlayer.pause();
    playerContainer.classList.add('hidden');
    videoSource.src = '';
}

// Fitur Pencarian Sederhana
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = animeList.filter(a => a.title.toLowerCase().includes(keyword));
    renderList(filtered);
});

renderList(animeList);

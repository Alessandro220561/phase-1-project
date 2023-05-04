// variable captures
const form = document.getElementById("search-bar");
const random = document.getElementById("random-generator");
const favorite = document.getElementsByClassName("favorite-button");
const imageContainer = document.getElementById("featured-anime-image-container");
const featuredAnime = document.getElementById('anime-details')
const animeSynopsis = document.getElementById('anime-synopsis')

// Event Listeners
form.addEventListener('submit', getAnime);
random.addEventListener('click', getRandomAnime);
featuredAnime.addEventListener('mouseover', changeColor);
featuredAnime.addEventListener('mouseout', changeColorBack);

// Fetch Requests
function getRandomAnime() {
    const randomAnimeId = Math.floor(Math.random() * 5000) + 1;
    fetch(`https://api.jikan.moe/v4/anime/${randomAnimeId}`)
    .then(response => response.json())
    .then(data => {
        const anime = data.data;
        const animeImg = anime.images.jpg.image_url;
        const animeImageDiv = document.createElement('div')
        const animeDataDiv = document.createElement('div');
        animeImageDiv.innerHTML = `<img id="featured-anime-image" src="${animeImg}">`;
        animeDataDiv.innerHTML = `
            <h2 id="anime-title">${anime.title}</h2>
            <h3 id="japanese-anime-title">${anime.title_japanese}</h3>
            <p id="anime-synopsis">${anime.synopsis}</p>
            <p id="anime-episodes">Number of episodes:${anime.episodes}</p>
        `;
        imageContainer.appendChild(animeImageDiv)
        featuredAnime.appendChild(animeDataDiv)
    .catch(error => console.log(error))
    })
}

function getAnime(e) {
    e.preventDefault();
    fetch(`https://api.jikan.moe/v4/anime?q=${e.target[0].value}&limit=1`)
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            const anime = item
            const imageUrl = item.images.jpg.image_url
            const animeImageDiv = document.createElement('div')
            const animeDataDiv = document.createElement('div')
            animeImageDiv.innerHTML = `<img id="featured-anime-image" src="${imageUrl}">`
            animeDataDiv.innerHTML = `
                <h2 id="anime-title">${anime.title}</h2>
                <h3 id="japanese-anime-title">${anime.title_japanese}</h3>
                <p id="anime-synopsis">${anime.synopsis}</p>
                <p id="anime-episodes">Number of episodes:${anime.episodes}</p>
            `;
            imageContainer.appendChild(animeImageDiv);
            featuredAnime.appendChild(animeDataDiv);
        })
    })
}

function changeColor() {
    featuredAnime.style.color = "red";
}

function changeColorBack() {
    featuredAnime.style.color = "black";
}

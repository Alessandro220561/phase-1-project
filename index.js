const form = document.getElementById("search-bar");
const random = document.getElementById("random-generator");
const favorite = document.getElementsByClassName("favorite-button");
const imageContainer = document.getElementById("featured-anime-image-container");
const featuredAnime = document.getElementById('anime-details')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // e.target[0].value
    fetch(` https://api.jikan.moe/v4/anime?q=${e.target[0].value}&limit=1`)
    .then(res => res.json())
    .then(data => {
       data.data.forEach(item => {
        const anime = item
        const imageUrl = item.images.jpg.large_image_url
        const animeImageDiv = document.createElement('div')
        const animeDataDiv = document.createElement('div');
        animeImageDiv.innerHTML = `<img id="featured-anime-image" src="${imageUrl}">`
        animeDataDiv.id = "featured-anime"
        animeDataDiv.className = "anime-container"
        animeDataDiv.innerHTML= `
            <h2 id="anime-title">${anime.title}</h2>
            <h3 id="japanese-anime-title">${anime.title_japanese}</h3>
            <p id="anime-synopsis">${anime.synopsis}</p>
            <p id="anime-episodes">Number of episodes:${anime.episodes}</p>
        `;
        imageContainer.appendChild(animeImageDiv)
        featuredAnime.appendChild(animeDataDiv)
       })
    })
})

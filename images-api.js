const PEXELS_API_KEY = 'EItEBBsfXgn6Hwxu5zyruQNAfIMxmA1hYiBOzTY6Xh2eQKZ5AdXNgAUy';

async function fetchImages() {
    const cards = document.querySelectorAll('.card');

    for (const card of cards) {
        const imgElement = card.querySelector('.card-img');
        const searchQuery = imgElement?.dataset.search;

        if (!imgElement || !searchQuery) continue;

        try {
            const response = await fetch(
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1`,
                {
                    headers: { Authorization: PEXELS_API_KEY }
                }
            );

            const data = await response.json();
            imgElement.src = data.photos?.[0]?.src?.medium || "https://placehold.co/300x200";

        } catch (error) {
            console.error(`Error con: ${searchQuery}`, error);
            imgElement.src = "https://placehold.co/300x200";
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchImages);
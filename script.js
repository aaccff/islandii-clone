let currentPage = 1;
const itemsPerPage = 15;
let resorts = [];

document.getElementById('jsonFile').addEventListener('change', loadJSON);

function loadJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        resorts = JSON.parse(e.target.result);
        localStorage.setItem('resorts', JSON.stringify(resorts));
        displayResorts();
        updatePageInfo();
    };
    reader.readAsText(file);
}

async function fetchGoogleRating(placeID) {
    const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${apiKey}`);
    const data = await response.json();
    return data.result.rating;
}

async function displayResorts() {
    const container = document.getElementById('resorts-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedResorts = resorts.slice(start, end);

    for (let resort of paginatedResorts) {
        const resortElement = document.createElement('div');
        resortElement.className = 'resort';

        const googleRating = await fetchGoogleRating(resort.GooglePlaceID);

        resortElement.innerHTML = `
            <img src="${resort.Images[0]}" alt="${resort.Name}">
            <div class="resort-details">
                <div class="resort-header">
                    <h2 class="resort-name">${resort.Name}</h2>
                    <p class="review">Review: ${resort.Review}</p>
                    <p class="google-rating">Google Rating: ${googleRating} ⭐</p>
                </div>
                <div class="resort-location">
                    <a href="${resort.GoogleMapLink}" target="_blank">${resort.Location}</a>
                </div>
                <div class="resort-rating">
                    <p>Rating: ${resort.Rating}</p>
                </div>
            </div>
        `;

        container.appendChild(resortElement);
    }

    adjustFontSizes();
    updatePaginationButtons();
}

function adjustFontSizes() {
    const resortNames = document.querySelectorAll('.resort-name');
    resortNames.forEach(name => {
        let fontSize = 24; // Start with a base font size
        name.style.fontSize = `${fontSize}px`;
        while (name.scrollWidth > name.clientWidth && fontSize > 12) { // Reduce the font size until it fits or until a minimum font size is reached
            fontSize--;
            name.style.fontSize = `${fontSize}px`;
        }
    });
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayResorts();
        updatePageInfo();
    }
}

function nextPage() {
    if ((currentPage * itemsPerPage) < resorts.length) {
        currentPage++;
        displayResorts();
        updatePageInfo();
    }
}

function updatePaginationButtons() {
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = (currentPage * itemsPerPage) >= resorts.length;
}

function updatePageInfo() {
    const pageInfo = document.getElementById('page-info');
    const totalPages = Math.ceil(resorts.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const storedResorts = localStorage.getItem('resorts');
    if (storedResorts) {
        resorts = JSON.parse(storedResorts);
        displayResorts();
        updatePageInfo();
    }
});

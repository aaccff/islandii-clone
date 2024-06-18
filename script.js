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

function displayResorts() {
    const container = document.getElementById('resorts-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedResorts = resorts.slice(start, end);

    paginatedResorts.forEach((resort, index) => {
        const resortElement = document.createElement('div');
        resortElement.className = 'resort';

        const location = "Baa Atoll, 06080, Maldives";

        resortElement.innerHTML = `
            <img src="${resort.Images[0]}" alt="${resort.Name}">
            <div class="resort-details">
                <div class="resort-header">
                    <h2 class="resort-name">${resort.Name}</h2>
                    <p class="review">Review: ${resort.Review}</p>
                </div>
                <div class="resort-location">
                    <a href="${resort['Google Map Link']}" target="_blank">${location}</a>
                </div>
                <div class="resort-rating">
                    <p>Rating: ${resort.Rating}</p>
                </div>
                <p class="resort-description">${resort.Description.substring(0, 100)}...</p>
                <button onclick="showMoreDetails(${index})">More Details</button>
            </div>
        `;

        container.appendChild(resortElement);
    });

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

function showMoreDetails(index) {
    const resort = resorts[index];
    alert(`
        Name: ${resort.Name}
        Location: ${resort.Location}
        Description: ${resort.Description}
        Rating: ${resort.Rating} (${resort['Total Number of Reviews']})
        Review: ${resort.Review}
        Rooms: ${resort.Rooms.map(room => room['Villa Name']).join(', ')}
    `);
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

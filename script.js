let resorts = [];
let currentPage = 1;
const itemsPerPage = 5;

document.getElementById('jsonFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            resorts = JSON.parse(e.target.result);
            currentPage = 1;
            displayResorts();
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    };
    
    reader.readAsText(file);
});

function displayResorts() {
    const container = document.getElementById('resorts-container');
    container.innerHTML = '';

    if (!resorts || resorts.length === 0) {
        container.innerHTML = '<p>No resorts available</p>';
        return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedResorts = resorts.slice(start, end);

    paginatedResorts.forEach(resort => {
        const resortElement = document.createElement('div');
        resortElement.className = 'resort';

        resortElement.innerHTML = `
            <img src="${resort.Images[0]}" alt="${resort.Name}">
            <div class="resort-details">
                <div class="resort-rating-review">
                    <h2>${resort.Name}</h2>
                    <p class="review">Review: ${resort.Review}</p>
                </div>
                <div class="resort-location">
                    <a href="${resort['Google Map Link']}" target="_blank">
                        ${resort.Atoll}, ${resort.PinCode}, ${resort.Country}
                    </a>
                </div>
                <div class="resort-description">
                    <p>${resort.Description.substring(0, 100)}...</p>
                </div>
            </div>
        `;

        container.appendChild(resortElement);
    });

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(resorts.length / itemsPerPage);
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const pageInfo = document.getElementById('page-info');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayResorts();
    }
}

function nextPage() {
    const totalPages = Math.ceil(resorts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayResorts();
    }
}

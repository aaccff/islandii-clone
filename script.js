document.getElementById('jsonFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            resorts = JSON.parse(e.target.result);
            console.log("JSON Loaded:", resorts); // Debug: Log the loaded JSON data
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

        const location = "Baa Atoll, 06080, Maldives";

        resortElement.innerHTML = `
            <img src="${resort.Images[0]}" alt="${resort.Name}">
            <div class="resort-details">
                <div class="resort-info">
                    <div class="resort-header">
                        <h2>${resort.Name}</h2>
                        <p class="review">Review: ${resort.Review}</p>
                    </div>
                    <div class="resort-location">
                        <a href="${resort['Google Map Link']}" target="_blank">${location}</a>
                    </div>
                    <div class="resort-description">${resort.Description.substring(0, 100)}...</div>
                    <button onclick="showMoreDetails(${resorts.indexOf(resort)})">More Details</button>
                </div>
                <div class="resort-rating-review">
                    <p class="rating">Rating: ${resort.Rating}</p>
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

function showMoreDetails(index) {
    const resort = resorts[index];
    alert(`Showing more details for ${resort.Name}`);
}

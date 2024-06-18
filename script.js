function displayResorts() {
    const container = document.getElementById('resorts-container');
    container.innerHTML = '';

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
                    <h2>${resort.Name}</h2>
                    <div class="resort-location">
                        <a href="${resort['Google Map Link']}" target="_blank">${location}</a>
                    </div>
                    <div class="resort-description">${resort.Description.substring(0, 100)}...</div>
                    <button onclick="showMoreDetails(${resorts.indexOf(resort)})">More Details</button>
                </div>
                <div class="resort-rating-review">
                    <p class="review">Review: ${resort.Review}</p>
                    <p class="rating">Rating: ${resort.Rating}</p>
                </div>
            </div>
        `;

        container.appendChild(resortElement);
    });

    updatePaginationButtons();
}

function displayResorts() {
    const container = document.getElementById('resorts-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedResorts = sortedResorts.slice(start, end);

    paginatedResorts.forEach(resort => {
        const resortElement = document.createElement('div');
        resortElement.className = 'resort';

        resortElement.innerHTML = `
            <div class="resort-image">
                <img src="${resort.Images[0]}" alt="${resort.Name}">
            </div>
            <div class="resort-info">
                <h2>${resort.Name}</h2>
                <div class="rating-review">
                    <span class="rating">⭐⭐⭐⭐⭐ ${resort.Rating}</span>
                    <span class="review">${resort.Review}</span>
                    <span class="number-of-reviews" style="background-color: lightyellow; padding: 2px 4px; border: 1px solid black; color: green;">${resort['Total Number of Reviews']} reviews</span>
                </div>
                <div class="villa-details">
                    ${displayFirstVilla(resort.Rooms)}
                </div>
            </div>
            <div class="resort-price">
                <span class="price">US$ ${(parseFloat(resort.Rooms[0]['Villa Prize'].replace(/[^0-9.-]+/g, "")) / parseInt(resort.Rooms[0]['Nights Counts'])).toFixed(2)}</span>
                <button class="view-offer">View offer</button>
            </div>
        `;

        container.appendChild(resortElement);
    });

    updatePaginationButtons();
}

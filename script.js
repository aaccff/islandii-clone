        resortElement.className = 'resort';

        const location = resort.Location.split(', ').slice(1).join(', ');

        resortElement.innerHTML = `
            <img src="${resort.Images[0]}" alt="${resort.Name}">
            <div class="resort-details">
                <h2>${resort.Name}</h2>
                <div class="resort-location">
                    <a href="${resort['Google Map Link']}" target="_blank">${location}</a>
                </div>
                <div class="rating-review">
                    <p class="review">Review: ${resort.Review}</p>
                    <p class="rating">Rating: ${resort.Rating}</p>
                </div>
                <div class="villa-details">
                    <div class="villa">
                        <span>${resort.Rooms[0]['Villa Name']}</span>,
                        <span>${resort.Rooms[0]['Villa Size']}</span>,
                        <span>US$ ${(parseFloat(resort.Rooms[0]['Villa Prize'].replace(/[^0-9.-]+/g, "")) / parseInt(resort.Rooms[0]['Nights Counts'])).toFixed(2)} per night</span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(resortElement);
    });

    updatePaginationButtons();
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

// Initial call to ensure buttons and page info are set up correctly
updatePaginationButtons();
updatePageInfo();

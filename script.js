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
        currentPage = 1; // Reset to first page
        displayResorts();
        updatePageInfo();
        updatePaginationButtons();
    };
    reader.readAsText(file);
}

function displayFirstVilla(rooms) {
    if (rooms && rooms.length > 0) {
        const room = rooms[0];
        return `
            <div class="villa">
                <span>${room['Villa Name']}</span>,
                <span>${room['Villa Size']}</span>,
                <span>US$ ${(parseFloat(room['Villa Prize'].replace(/[^0-9.-]+/g, "")) / parseInt(room['Nights Counts'])).toFixed(2)} per night</span>
            </div>
        `;
    }
    return '';
}

function displayResorts() {
    const container = document.getElementById('resorts-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedResorts = resorts.slice(start, end);

    paginatedResorts.forEach(resort => {
        const resortElement = document.createElement('div');
        resortElement.className = 'resort';

        resortElement.innerHTML = `
            <img src="${resort.Images[0]}" alt="${resort.Name}">
            <div class="resort-details">
                <h2>${resort.Name}</h2>
                <div class="rating-review">
                    <p class="review">Review: ${resort.Review}</p>
                    <p class="rating">Rating: ${resort.Rating}</p>
                </div>
                <div class="villa-details">
                    ${displayFirstVilla(resort.Rooms)}
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

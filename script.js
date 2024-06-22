let currentPage = 1;
const itemsPerPage = 15; // Ensure itemsPerPage is set to 15
let resorts = [];
let sortedResorts = [];

document.getElementById('jsonFile').addEventListener('change', loadJSON);

function loadJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        resorts = JSON.parse(e.target.result);
        console.log('Loaded Resorts:', resorts); // Debugging log
        sortedResorts = [...resorts];
        localStorage.setItem('resorts', JSON.stringify(resorts));
        displayResorts();
        updatePageInfo();
        updatePaginationButtons();
    };
    reader.readAsText(file);
}

function filterResorts(criteria) {
    switch (criteria) {
        case 'priceLowHigh':
            sortedResorts.sort((a, b) => parseFloat(a.Rooms[0]['Villa Prize'].replace(/[^0-9.-]+/g, "")) - parseFloat(b.Rooms[0]['Villa Prize'].replace(/[^0-9.-]+/g, "")));
            break;
        case 'priceHighLow':
            sortedResorts.sort((a, b) => parseFloat(b.Rooms[0]['Villa Prize'].replace(/[^0-9.-]+/g, "")) - parseFloat(a.Rooms[0]['Villa Prize'].replace(/[^0-9.-]+/g, "")));
            break;
        case 'alphabetical':
            sortedResorts.sort((a, b) => a.Name.localeCompare(b.Name));
            break;
        default:
            sortedResorts = [...resorts];
    }

    currentPage = 1; // Reset to first page after sorting
    displayResorts();
    updatePageInfo();
    updatePaginationButtons();
}

function displayFirstVilla(rooms) {
    if (rooms && rooms.length > 0) {
        const room = rooms[0];
        return `
            <div class="villa-name-size">
                <span>${room['Villa Name']}</span>
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
    console.log(`Displaying resorts from index ${start} to ${end}`); // Debugging log
    const paginatedResorts = sortedResorts.slice(start, end);

    console.log('Paginated Resorts:', paginatedResorts); // Debugging log

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
                    <span class="rating">⭐ ${resort.Rating}</span>
                    <span class="review">${resort.Review}</span>
                    <span class="number-of-reviews" style="background-color: lightyellow; padding: 2px 4px; border: 1px solid black; color: green;">${resort['Total Number of Reviews']} reviews</span>
                </div>
                <div class="villa-details">
                    ${displayFirstVilla(resort.Rooms)}
                </div>
            </div>
            <div class="resort-price">
                <div class="price-container">
                    <div class="price">
                        US$ ${(parseFloat(resort.Rooms[0]['Villa Prize'].replace(/[^0-9.-]+/g, "")) / parseInt(resort.Rooms[0]['Nights Counts'])).toFixed(2)}
                    </div>
                    <div class="per-night-incl-taxes">per night incl taxes</div>
                    <button class="view-offer">View offer</button>
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
    if ((currentPage * itemsPerPage) < sortedResorts.length) {
        currentPage++;
        displayResorts();
        updatePageInfo();
    }
}

function updatePaginationButtons() {
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = (currentPage * itemsPerPage) >= sortedResorts.length;
}

function updatePageInfo() {
    const pageInfo = document.getElementById('page-info');
    const totalPages = Math.ceil(sortedResorts.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Initial call to ensure buttons and page info are set up correctly
updatePaginationButtons();
updatePageInfo();

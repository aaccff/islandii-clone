let currentPage = 1;
const itemsPerPage = 15;
let resorts = [];
let sortedResorts = [];

document.getElementById('jsonFile').addEventListener('change', loadJSON);

function loadJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        resorts = JSON.parse(e.target.result);
        sortedResorts = [...resorts];
        localStorage.setItem('resorts', JSON.stringify(resorts));
        displayResorts();
        updatePageInfo();
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
}

function displayResorts() {
    const container = document.getElementById('resorts-container');
    container.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedResorts = sortedResorts.slice(start, end);
    paginatedResorts.forEach(resort => {
        // Create resort element and add content
        // Code for creating the resort element remains the same
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

// Call updatePaginationButtons and updatePageInfo after loading resorts
function displayResorts() {
    // Your existing code for displaying resorts
    updatePaginationButtons();
    updatePageInfo();
}

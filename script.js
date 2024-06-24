document.addEventListener('DOMContentLoaded', function () {
   fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json')
    const resortsContainer = document.getElementById('resorts-container');
    const filterButtons = document.querySelectorAll('.filter-button');
    const paginationContainer = document.getElementById('pagination');
    let currentPage = 1;
    const resortsPerPage = 12;
    let filteredResorts = [];
    let allResorts = [];

    fetch(dataURL)
        .then(response => response.json())
        .then(data => {
            allResorts = data;
            filteredResorts = allResorts;
            renderResorts();
            renderPagination();
        });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterResorts(filter);
        });
    });

    function filterResorts(filter) {
        if (filter === 'all') {
            filteredResorts = allResorts;
        } else {
            filteredResorts = allResorts.filter(resort => resort.features.includes(filter));
        }
        currentPage = 1;
        renderResorts();
        renderPagination();
    }

    function renderResorts() {
        resortsContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * resortsPerPage;
        const endIndex = startIndex + resortsPerPage;
        const resortsToDisplay = filteredResorts.slice(startIndex, endIndex);

        resortsToDisplay.forEach(resort => {
            const resortElement = document.createElement('div');
            resortElement.classList.add('resort');

            resortElement.innerHTML = `
                <div class="resort-image">
                    <img src="${resort.image}" alt="${resort.name}">
                </div>
                <div class="resort-details">
                    <div class="resort-header">
                        <h2 class="resort-name">${resort.name}</h2>
                        <p class="review">Review: <span>${resort.review}</span></p>
                        <p class="resort-rating">Rating: ${resort.rating}</p>
                    </div>
                    <div class="resort-info">
                        <p class="resort-price">Price per night: $${resort.price}</p>
                        <button class="resort-button">Book Now</button>
                    </div>
                </div>
            `;
            resortsContainer.appendChild(resortElement);
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredResorts.length / resortsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderResorts();
                renderPagination();
            });
            paginationContainer.appendChild(pageButton);
        }
    }
});

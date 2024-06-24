// Fetch resort data from JSON URL
fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json')
    .then(response => response.json())
    .then(data => {
        const resortsContainer = document.getElementById('resorts-container');

        // Process and create HTML elements for each resort card
        data.forEach(resort => {
            const resortCard = document.createElement('div');
            resortCard.classList.add('resort-card');

            // Populate resort card with data
            resortCard.innerHTML = `
                <img src="${resort.Images[0]}" alt="${resort.Name}">
                <h3>${resort.Name}</h3>
                <p>${resort.Location}</p>
                <p>${resort.Description.substring(0, 100)}...</p>
                <a href="#" class="more-details">More Details</a>
            `;

            resortsContainer.appendChild(resortCard);
        });
    })
    .catch(error => {
        console.error('Error fetching resort data:', error);
    });

// Pagination logic (optional)
const resortsPerPage = 10;
let currentPage = 1;

function updatePagination() {
    const resortsContainer = document.getElementById('resorts-container');
    const pagination = document.getElementById('pagination');

    // Clear existing resort cards and pagination buttons
    resortsContainer.innerHTML = '';
    pagination.innerHTML = '';

    // Fetch resort data from JSON URL
    fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json')
        .then(response => response.json())
        .then(data => {
            // Calculate total pages
            const totalPages = Math.ceil(data.length / resortsPerPage);

            // Display resort cards for the current page
            const startIndex = (currentPage - 1) * resortsPerPage;
            const endIndex = startIndex + resortsPerPage;
            const paginatedResorts = data.slice(startIndex, endIndex);

            paginatedResorts.forEach(resort => {
                // Create resort card HTML element
                const resortCard = document.createElement('div');
                resortCard.classList.add('resort-card');

                // Populate resort card with data
                resortCard.innerHTML = `
                    <img src="${resort.Images[0]}" alt="${resort.Name}">
                    <h3>${resort.Name}</h3>
                    <p>${resort.Location}</p>
                    <p>${resort.Description.substring(0, 100)}...</p>
                    <a href="#" class="more-details">More Details</a>
                `;

                resortsContainer.appendChild(resortCard);
            });

            // Create pagination buttons
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;

                if (i === currentPage) {
                    button.classList.add('active');
                }

                button.addEventListener('click', () => {
                    currentPage = i;
                    updatePagination();
                });

                pagination.appendChild(button);
            }
        })
        .catch(error => {
            console.error('Error fetching resort data:', error);
        });
}

// Call updatePagination function to initialize pagination
updatePagination();

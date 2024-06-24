// Fetch JSON data
fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json')
    .then(response => response.json())
    .then(data => {
        // Store resorts data
        const resorts = data;

        // Variables for pagination
        let currentPage = 1;
        const resortsPerPage = 6;

        // Function to display resort cards
        function displayResorts() {
            const start = (currentPage - 1) * resortsPerPage;
            const end = start + resortsPerPage;
            const pageResorts = resorts.slice(start, end);

            const resortsContainer = document.getElementById('resorts-container');
            resortsContainer.innerHTML = '';

            pageResorts.forEach(resort => {
                const resortCard = document.createElement('div');
                resortCard.classList.add('resort');
                resortCard.innerHTML = `
                    <div class="resort-column">
                        <div class="resort-header">
                            <h2 class="resort-name">${resort.name}</h2>
                            <p class="review">${resort.review}</p>
                        </div>
                        <div class="resort-rating">
                            <p>Rating: ${resort.rating}</p>
                        </div>
                        <div class="resort-description">
                            <p>${resort.description}</p>
                        </div>
                        <p class="resort-price">${resort.price}</p>
                    </div>
                    <img src="${resort.image}" alt="${resort.name}">
                `;
                resortsContainer.appendChild(resortCard);
            });
        }

        // Function to update page information
        function updatePageInfo() {
            const pageInfo = document.getElementById('page-info');
            pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(resorts.length / resortsPerPage)}`;
        }

        // Function to handle previous page button click
        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                displayResorts();
                updatePageInfo();
            }
        }

        // Function to handle next page button click
        function nextPage() {
            if ((currentPage * resortsPerPage) < resorts.length) {
                currentPage++;
                displayResorts();
                updatePageInfo();
            }
        }

        // Initial display of resort cards and page information
        displayResorts();
        updatePageInfo();
    });

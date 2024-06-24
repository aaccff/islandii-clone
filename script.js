// Fetch JSON data
fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json')
    .then(response => response.json())
    .then(data => {
        const resortsContainer = document.getElementById('resorts-container');

        // Generate resort cards
        data.forEach(resort => {
            const resortCard = document.createElement('div');
            resortCard.classList.add('resort');

            const resortImage = document.createElement('img');
            resortImage.src = resort.image;
            resortCard.appendChild(resortImage);

            const resortColumn = document.createElement('div');
            resortColumn.classList.add('resort-column');

            const resortHeader = document.createElement('div');
            resortHeader.classList.add('resort-header');

            const resortName = document.createElement('h2');
            resortName.classList.add('resort-name');
            resortName.textContent = resort.name;
            resortHeader.appendChild(resortName);

            const review = document.createElement('p');
            review.classList.add('review');
            review.textContent = `Review: ${resort.review}`;
            resortHeader.appendChild(review);

            const resortRating = document.createElement('p');
            resortRating.classList.add('resort-rating');
            resortRating.textContent = `Rating: ${resort.rating}`;
            resortHeader.appendChild(resortRating);

            resortColumn.appendChild(resortHeader);

            const resortDescription = document.createElement('div');
            resortDescription.classList.add('resort-description');
            resortDescription.textContent = resort.description;
            resortColumn.appendChild(resortDescription);

            const resortPrice = document.createElement('p');
            resortPrice.classList.add('resort-price');
            resortPrice.textContent = `Price: $${resort.price}`;
            resortColumn.appendChild(resortPrice);

            resortCard.appendChild(resortColumn);

            resortsContainer.appendChild(resortCard);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

// Pagination functionality
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
const itemsPerPage = 3;

function updateResorts() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const resortsContainer = document.getElementById('resorts-container');
    const resorts = Array.from(resortsContainer.getElementsByClassName('resort'));

    resorts.forEach((resort, index) => {
        if (index >= startIndex && index < endIndex) {
            resort.style.display = 'flex';
        } else {
            resort.style.display = 'none';
        }
    });

    pageInfo.textContent = `Page ${currentPage}`;
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateResorts();
    }
});

nextButton.addEventListener('click', () => {
    const resortsContainer = document.getElementById('resorts-container');
    const resorts = Array.from(resortsContainer.getElementsByClassName('resort'));

    if (currentPage * itemsPerPage < resorts.length) {
        currentPage++;
        updateResorts();
    }
});

// Initial page load
updateResorts();
    }
});

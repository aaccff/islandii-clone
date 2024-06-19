// Fetch the JSON data from the specified URL
fetch('resorts.json')
    .then(response => response.json())
    .then(data => {
        // Get the resorts container element
        const resortsContainer = document.getElementById('resorts-container');

        // Iterate through the resorts data and create HTML elements for each resort
        data.resorts.forEach(resort => {
            const resortElement = document.createElement('div');
            resortElement.classList.add('resort');

            const image = document.createElement('img');
            image.src = resort.image;
            image.alt = resort.name;
            resortElement.appendChild(image);

            const resortHeader = document.createElement('div');
            resortHeader.classList.add('resort-header');

            const resortName = document.createElement('h6');
            resortName.textContent = resort.name;
            resortHeader.appendChild(resortName);

            const rating = document.createElement('div');
            rating.classList.add('rating');
            rating.textContent = `Rating: ${resort.rating}`;
            resortHeader.appendChild(rating);

            const resortLocation = document.createElement('div');
            resortLocation.classList.add('resort-location');

            const locationLink = document.createElement('a');
            locationLink.href = resort.location;
            locationLink.target = '_blank';
            locationLink.textContent = resort.location;
            resortLocation.appendChild(locationLink);

            resortHeader.appendChild(resortLocation);
            resortElement.appendChild(resortHeader);

            const resortDetails = document.createElement('div');
            resortDetails.classList.add('resort-details');

            const description = document.createElement('p');
            description.textContent = resort.description;
            resortDetails.appendChild(description);

            const review = document.createElement('div');
            review.classList.add('review');
            review.textContent = `Review: ${resort.review}`;
            resortDetails.appendChild(review);

            resortElement.appendChild(resortDetails);

            resortsContainer.appendChild(resortElement);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

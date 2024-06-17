document.getElementById('jsonFile').addEventListener('change', loadJSON);

function loadJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const resorts = JSON.parse(e.target.result);
        localStorage.setItem('resorts', JSON.stringify(resorts));
        displayResorts(resorts);
    };
    reader.readAsText(file);
}

function displayResorts(resorts) {
    const container = document.getElementById('resorts-container');
    container.innerHTML = '';

    resorts.forEach(resort => {
        const resortElement = document.createElement('div');
        resortElement.className = 'resort';

        // Extract the specific part of the location
        const locationParts = resort.Location.split(' ');
        const location = locationParts.slice(2).join(' ');

        resortElement.innerHTML = `
            <img src="${resort.Images[0]}" alt="${resort.Name}">
            <div class="resort-details">
                <h2>${resort.Name}</h2>
                <p>${location}</p>
                <p>${resort.Description.substring(0, 100)}...</p>
                <a href="${resort['Google Map Link']}" target="_blank">Google Map</a>
                <p>Rating: ${resort.Rating} (${resort['Total Number of Reviews']})</p>
                <p>Review: ${resort.Review}</p>
                <button onclick="showMoreDetails(${resorts.indexOf(resort)})">More Details</button>
            </div>
        `;

        container.appendChild(resortElement);
    });
}

function showMoreDetails(index) {
    const resorts = JSON.parse(localStorage.getItem('resorts'));
    const resort = resorts[index];
    alert(`
        Name: ${resort.Name}
        Location: ${resort.Location}
        Description: ${resort.Description}
        Rating: ${resort.Rating} (${resort['Total Number of Reviews']})
        Review: ${resort.Review}
        Rooms: ${resort.Rooms.map(room => room['Villa Name']).join(', ')}
    `);
}

document.getElementById('jsonFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const resorts = JSON.parse(e.target.result);
        localStorage.setItem('resorts', JSON.stringify(resorts));
        displayResorts(resorts);
    };
    reader.readAsText(file);
});

// script.js
document.getElementById('jsonFile').addEventListener('change', loadJSON);

function loadJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const resorts = JSON.parse(e.target.result);
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

        resortElement.innerHTML = `
            <img src="${resort.image}" alt="${resort.name}">
            <h2>${resort.name}</h2>
            <p>${resort.description}</p>
        `;

        container.appendChild(resortElement);
    });
}

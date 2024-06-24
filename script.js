document.addEventListener('DOMContentLoaded', function() {
    fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json')
        .then(response => response.json())
        .then(data => renderResorts(data.resorts))
        .catch(error => console.error('Error fetching resorts:', error));
});

function renderResorts(resorts) {
    const container = document.getElementById('resorts-container');
    resorts.forEach(resort => {
        const resortCard = document.createElement('div');
        resortCard.classList.add('resort-card');
        
        resortCard.innerHTML = `
            <img src="${resort.image}" alt="${resort.name}">
            <h2>${resort.name}</h2>
            <p>${resort.description}</p>
        `;
        
        container.appendChild(resortCard);
    });
}

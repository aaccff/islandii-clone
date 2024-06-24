async function fetchResorts() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json');
    const data = await response.json();
    displayResorts(data);
  } catch (error) {
    console.error('Error fetching resorts data:', error);
  }
}

function displayResorts(resorts) {
  const resortsSection = document.getElementById('resorts');
  resorts.forEach(resort => {
    const resortArticle = document.createElement('article');
    resortArticle.className = 'resort';
    
    const resortImage = document.createElement('img');
    resortImage.src = resort.imageUrl;
    resortImage.alt = resort.name;

    const resortName = document.createElement('h2');
    resortName.textContent = resort.name;

    const resortDescription = document.createElement('p');
    resortDescription.textContent = resort.description;

    resortArticle.appendChild(resortImage);
    resortArticle.appendChild(resortName);
    resortArticle.appendChild(resortDescription);

    resortsSection.appendChild(resortArticle);
  });
}

fetchResorts();

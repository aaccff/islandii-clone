// Fetch JSON data from the API
fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json')
  .then(response => response.json())
  .then(data => {
    const resortsContainer = document.getElementById('resorts');

    // Iterate through the JSON data
    data.forEach(resort => {
      // Create HTML elements dynamically
      const resortArticle = document.createElement('article');
      const resortImage = document.createElement('img');
      const resortTitle = document.createElement('h2');
      const resortDescription = document.createElement('p');

      // Populate the elements with data
      resortImage.src = resort.image;
      resortTitle.textContent = resort.name;
      resortDescription.textContent = resort.description;

      // Append elements to the resort article
      resortArticle.appendChild(resortImage);
      resortArticle.appendChild(resortTitle);
      resortArticle.appendChild(resortDescription);

      // Append the resort article to the resorts container
      resortsContainer.appendChild(resortArticle);
    });
  });

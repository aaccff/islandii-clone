// Fetch JSON data from the API
fetch('https://raw.githubusercontent.com/aaccff/islandii-clone/main/resorts.json')
  .then(response => response.json())
  .then(data => {
    const resortsContainer = document.getElementById('resorts');

    // Iterate through the JSON data
    data.forEach(resort => {
      // Create HTML elements dynamically
      const resortSection = document.createElement('section');
      const resortImage = document.createElement('img');
      const resortTitle = document.createElement('h2');
      const resortDescription = document.createElement('p');

      // Populate the elements with data
      resortImage.src = resort.image;
      resortTitle.textContent = resort.name;
      resortDescription.textContent = resort.description;

      // Append elements to the resort section
      resortSection.appendChild(resortImage);
      resortSection.appendChild(resortTitle);
      resortSection.appendChild(resortDescription);

      // Append the resort section to the resorts container
      resortsContainer.appendChild(resortSection);
    });
  });

// Wait until the page is completely loaded
document.addEventListener("DOMContentLoaded", () => {
  //Fill out the grid-container div.
  const gridContainer = document.getElementById("grid-container");

  //collect my github data off of the site.
  fetch("https://api.github.com/users/quanked/repos")
    .then((response) => response.json())
    .then((data) => {
      //Sort by last pushed
      data.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

      data.forEach((repo) => {
        //creating base item holder
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        //Repo and Link on the left
        const leftColumn = document.createElement("div");
        leftColumn.innerHTML = `
        <h2>${repo.name}</h2> 
        <a href="${repo.html_url}" target="_blank" class="project-link">View Repo</a>
        `;

        //description on the Right
        const rightColumn = document.createElement("div");
        rightColumn.innerHTML = ` <p>${
          repo.description
            ? repo.description
            : "Whoops! Max left a missing description on GitHub here!"
        }</p> `;

        //appending all to the item, then item to container
        gridItem.appendChild(leftColumn);
        gridItem.appendChild(rightColumn);
        gridContainer.appendChild(gridItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

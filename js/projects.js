// Wait until the page is completely loaded
document.addEventListener("DOMContentLoaded", () => {
  //Fill out the grid-container div.
  const gridContainer = document.getElementById("grid-container");

  //collect my github data off of the site.
  fetch("https://api.github.com/users/quanked/events/public")
    .then((res) => res.json())
    .then((events) => {
      events.forEach((event) => {
        if (event.type === "PushEvent" || event.type === "PullRequestEvent") {
          const repo = event.repo;
          if (!contributedRepos.has(repo.name)) {
            contributedRepos.set(repo.name, repo.url);
          }
        }
      });

      //convert to array and display that
      contributedRepos.forEach((url, name) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        gridItem.innerHTML = `
          <h2>${name}</h2>
          <a href="https://github.com/${name}" target="_blank">View Repo</a>
          <p>Contributed via ${url.includes("pulls") ? "PR" : "Push"}</p>
        `;

        document.getElementById("grid-container").appendChild(gridItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

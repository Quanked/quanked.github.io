// Wait until the page is completely loaded
document.addEventListener("DOMContentLoaded", () => {
  const projectDetails = document.getElementById("project-details");
  fetch("https://api.github.com/users/quanked/repos")
    .then((response) => response.json())
    .then((data) => {
      // Gather last worked on repo
      const lastWorkedOnRepo = data.sort(
        (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
      )[0];

      // Create elements
      const projectTitle = document.createElement("h2");
      projectTitle.classList.add("project-title");
      projectTitle.textContent = lastWorkedOnRepo.name;

      const repoLink = document.createElement("a");
      repoLink.classList.add("project-link");
      repoLink.href = lastWorkedOnRepo.html_url;
      repoLink.target = "_blank";
      repoLink.textContent = "View Repository";

      const lastEdited = document.createElement("p");
      lastEdited.classList.add("edited-date");
      lastEdited.textContent = `Last Edited: ${new Date(
        lastWorkedOnRepo.pushed_at
      ).toLocaleDateString()}`;

      // Append elements to project-details
      projectDetails.appendChild(projectTitle);
      projectDetails.appendChild(repoLink);
      projectDetails.appendChild(lastEdited);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      projectDetails.textContent = "Error fetching data.";
    });
});

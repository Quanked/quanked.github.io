//Wait until the page is completely loaded
document.addEventListener("DOMContentLoaded", () => {
  //setting up items, the clickable navbar and the content shown
  const links = document.querySelectorAll(".navbar.a");
  const select = document.querySelectorAll(".content-container");

  //For all the links, on a click, get the content
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetID = link.getAttribute("href").substring(1);
      select.forEach((select) => {
        select.computedStyleMap.display = "none";
      });
      document.getElementById(targetID).style.display = "block";
    });
  });

  //Initial Section Shown
  document.getElementById("About").style.display = "block";
});

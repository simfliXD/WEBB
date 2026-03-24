// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Dark mode toggle functionality
  const modeToggle = document.getElementById("modeToggle");

  if (modeToggle) {
    // Checka local storage för att se om boolean för dark mode är sann,
    // och om det är sann, lägg till dark mode klassen till body elementet
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      document.body.classList.add("dark-mode");
      modeToggle.checked = true;
    }
    // Lyssna efter eventet "change" på toggle switchen,
    // när det ändras uppdatera klassen på body elementet för att ändra färgschemat
    // och spara det nya värdet i local storage
    modeToggle.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }

  // Navbar toggle functionality
  const navbarToggle = document.getElementById("navbar-menu-toggle");
  const navbarMenu = document.getElementById("navbar-menu");

  navbarToggle.addEventListener("click", () => {
    navbarToggle.classList.toggle("active");
    navbarMenu.classList.toggle("active");
    console.log("hej");
  });
  if (navbarToggle) {
  }
});

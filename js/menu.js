document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu_icon");
  const menu = document.querySelector("#div_menu .menu");

  menuIcon.addEventListener("click", function () {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });
});

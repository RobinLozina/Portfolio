"use strict";

async function in_animations() {
  await sleep(100);
  home_in_animations();
}

window.onload = () => {
  document.documentElement.scrollLeft = 0;

  header_events();
  home_events();
  projects_events();
  skills_events();
  experience_events();

  in_animations();

  if (is_safari()) {
    document.querySelector("#home_section .photo").classList.add("safari_fix");
    document.querySelector("#skills_section .box").classList.add("safari_fix");
  }

  document.querySelector("#loading_screen").style.display = "none";
};

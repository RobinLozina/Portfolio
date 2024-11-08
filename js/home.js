"use strict";

function home_in_animations() {
  let done = false;
  let elements = document.querySelectorAll("#home_section .in_animation");
  let section = document.querySelector("#home_section");

  async function in_animation_check() {
    if (!done && is_in_viewport(section)) {
      for (let i of elements) {
        i.style.opacity = "1";
        i.style.transform = "translateY(0)";
        await sleep(100);
      }

      done = true;
    }
  }

  window.addEventListener("scroll", (e) => {
    in_animation_check();
  });

  window.addEventListener("resize", (e) => {
    in_animation_check();
  });

  in_animation_check();
}

function home_events() {
  let rect = document
    .querySelector("#home_section .content")
    .getBoundingClientRect();
  document.querySelector("#home_section").style.minHeight =
    rect.height + 90 + "px";
}

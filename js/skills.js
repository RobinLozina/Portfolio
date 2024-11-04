"use strict";

function skills_events() {
  let done = false;
  let elements = [];

  async function in_animation_check() {
    for (let i = 0; i < elements.length; i++) {
      if (!done && is_in_viewport(elements[i])) {
        elements[i].style.opacity = "1";
        elements[i].style.transform = "translateY(0)";
        done = true;
        await sleep(100);
      }
    }
  }

  function generate_skills(my_data) {
    let box = document.querySelector("#skills_section .box");
    box.innerHTML = "";

    box.style.opacity = "0";
    box.style.transform = "translateY(50px)";
    elements = [box];

    my_data.skills_categories.forEach((category) => {
      let categoryContainer = document.createElement("div");
      categoryContainer.className = "category";

      let categoryTitle = document.createElement("div");
      categoryTitle.className = "category_title";
      categoryTitle.textContent = category.name;
      categoryContainer.appendChild(categoryTitle);

      let skillsList = document.createElement("div");
      skillsList.className = "skills_list";

      category.skills.forEach((skill) => {
        let skillElement = document.createElement("a");
        skillElement.className = "skill";
        skillElement.href = skill.link;
        skillElement.target = "_blank";

        let skillImage = document.createElement("img");
        skillImage.src = skill.logo;
        skillImage.alt = skill.name.toLowerCase();
        skillImage.width = 80;
        skillImage.height = 80;

        let skillName = document.createElement("span");
        skillName.textContent = skill.name;

        skillElement.appendChild(skillImage);
        skillElement.appendChild(skillName);
        skillsList.appendChild(skillElement);
      });

      categoryContainer.appendChild(skillsList);
      box.appendChild(categoryContainer);
    });

    in_animation_check();
  }

  function generate_skills_section() {
    read_json("resources/jsons/skills.json", generate_skills);
  }

  generate_skills_section();

  window.addEventListener("scroll", in_animation_check);

  window.addEventListener("resize", () => {
    done = false;
    let box = document.querySelector("#skills_section .box");
    if (box) {
      box.style.opacity = "0";
      box.style.transform = "translateY(50px)";
    }

    in_animation_check();
  });
}

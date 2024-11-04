"use strict";

function projects_events() {
  let sort_by = "Default";
  let done = [];
  let elements = [];

  async function in_animation_check() {
    for (let i = 0; i < elements.length; i++) {
      if (!done[i] && is_in_viewport(elements[i])) {
        if (elements[i].classList.contains("project")) await sleep(50);

        elements[i].style.opacity = "1";
        elements[i].style.transform = "translateY(0)";
        done[i] = true;
        await sleep(50);
      }
    }
  }

  window.addEventListener("scroll", () => {
    in_animation_check();
  });

  window.addEventListener("resize", () => {
    in_animation_check();
  });

  function add_project(project) {
    let tags = "";
    for (let tag of project.tags) {
      tags += `<span>${tag.name}</span>`;
    }

    document.querySelector("#projects_section .projects_content").innerHTML += `
			<div class="in_animation project">
				<div class="project_content">
					<div class="header">
						<div class="logos">
							<img src="${
                project.logo
              }" alt="${project.title.toLowerCase()} logo" width="45px" height="45px"/>
							<div class="links">
								${
                  project.links[1] !== "none"
                    ? `
								<a class="github" href="${project.links[1]}" aria-label="github" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31"><g><path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"/></g></svg>
								</a>`
                    : ""
                }
								${
                  project.links[2] !== "none"
                    ? `
								<a class="test" href="${project.links[2]}" aria-label="test" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.09 18.64"><g><path d="M14.55 7.52 4.62 1.78A2.08 2.08 0 0 0 1.5 3.58V15.05a2.08 2.08 0 0 0 3.12 1.8l9.93-5.73A2.08 2.08 0 0 0 14.55 7.52Z"/></g></svg>
								</a>`
                    : ""
                }
							</div>
						</div>
						<a href="${project.links[0]}" target="_blank" class="project_title">${
      project.title
    }</a>
						<p class="text">${project.description}</p>
					</div>
					<div class="tags">${tags}</div>
				</div>
			</div>`;
  }

  function generate(data) {
    document.querySelector("#projects_section .projects_content").innerHTML =
      "";

    for (let project of data.projects) {
      add_project(project);
    }

    done = [];
    elements = document.querySelectorAll("#projects_section .in_animation");

    for (let _ of elements) done.push(false);

    in_animation_check();
  }

  function generate_projects() {
    read_json("resources/jsons/projects.json", generate);
  }

  let prev_width = window.innerWidth;
  generate_projects();

  window.addEventListener("resize", () => {
    if (
      (prev_width >= 780 && window.innerWidth <= 780) ||
      (prev_width <= 780 && window.innerWidth >= 780)
    ) {
      generate_projects();
      prev_width = window.innerWidth;
    }
  });

  document
    .querySelectorAll("#projects_section .sort_choices .choice")
    .forEach((el) => {
      el.addEventListener("click", () => {
        sort_by = el.innerHTML;
        generate_projects();

        document
          .querySelectorAll("#projects_section .sort_choices .choice")
          .forEach((el) => {
            el.classList.remove("selected");
          });

        el.classList.add("selected");
      });
    });
}

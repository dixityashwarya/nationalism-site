// Mobile menu: show or hide the links when the Menu button is tapped
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
          menuButton.setAttribute("aria-expanded", open);
            });
            }

            // Gentle fade-in: elements with class "reveal" appear as they enter the screen
            const items = document.querySelectorAll(".reveal");
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                              observer.unobserve(entry.target);
                                  }
                                    });
                                    }, { threshold: 0.15 });
                                    items.forEach((item) => observer.observe(item));
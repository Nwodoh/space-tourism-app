import AppView from "./AppView.js";

class Destination extends AppView {
  constructor() {
    super();
  }

  /**
   * This function redefines the Dom element of a new loaded page. Allowing to be accesibleby our JavaScript
   */
  redefine() {
    this._menu = document.querySelector(".destination__menu");
    this._destinationContents = {
      img: document.querySelector(".destination__image"),
      name: document.querySelector(".destination__title"),
      description: document.querySelector(".destination__description"),
      distance: document.querySelector(".destination__distance"),
      duration: document.querySelector(".destination__duration"),
    };

    // Call page specific events
    this._menuEvent();
  }

  _menuEvent() {
    this._menu.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;

      // Check for menu events
      if (target.classList.contains("destination__menu--link"))
        this.changeDestination(target);
    });
  }

  changeDestination(target) {
    // Guard clause to check if target is already active
    if (target.classList.contains("destination__menu--link-active")) return;

    this.newActiveLink(target, "destination__menu--link");
    this.updateDestination(target);
  }
  // Function for updating destinations
  async updateDestination(el) {
    const newDestName = el.dataset.name;

    // Data needed to render new destination
    const newDestData = await this.AppData.then((data) =>
      data.destination.find((el) => el.name.toLowerCase() === newDestName)
    );

    // Updating
    this._destinationContents.img.src = newDestData.images.png;
    this._destinationContents.name.textContent = newDestData.name;
    this._destinationContents.description.textContent = newDestData.description;
    this._destinationContents.distance.textContent = newDestData.distance;
    this._destinationContents.duration.textContent = newDestData.travel;
  }
}

export default new Destination();

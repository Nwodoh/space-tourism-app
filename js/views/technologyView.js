import AppView from "./AppView.js";

class Technology extends AppView {
  constructor() {
    super();
  }

  /**
   * This function redefines the Dom element of a new loaded page. Allowing to be accesibleby our JavaScript
   */
  redefine() {
    this._menu = document.querySelector(".technology__menu");
    this._technologyContents = {
      name: document.querySelector(".technology__name"),
      description: document.querySelector(".technology__description"),
      img: document.querySelector(".technology__img--portrait"),
      imgLandscape: document.querySelector(".technology__img--landscape"),
    };

    // Call page specific events
    this._menuEvent();
  }

  _menuEvent() {
    this._menu.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;

      // Check for menu events
      if (target.classList.contains("technology__menu--link"))
        this.changeTechnology(target);
    });
  }

  changeTechnology(target) {
    // Guard clause to check if target is already active
    if (target.classList.contains("technology__menu--link-active")) return;

    this.newActiveLink(target, "technology__menu--link");
    this.updateTechnology(target);
  }
  // Function for updating crews
  async updateTechnology(el) {
    const newTechnologyId = [...this._menu.children].findIndex(
      (element, i) => el.dataset.id == i
    );

    // Data needed to render new crew (newTechnologyId is add with 1 here because of our set header from data.json which always occupies the first element of every pages array)
    const newTechnologyData = await this.AppData.then((data) =>
      data.technology.at(newTechnologyId + 1)
    );

    // Updating
    this._technologyContents.name.textContent = newTechnologyData.name;
    this._technologyContents.description.textContent =
      newTechnologyData.description;
    this._technologyContents.img.src = newTechnologyData.images.portrait;
    this._technologyContents.imgLandscape.srcset =
      newTechnologyData.images.landscape;
  }
}

export default new Technology();

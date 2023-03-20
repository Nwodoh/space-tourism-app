import AppView from "./AppView.js";

class Crew extends AppView {
  constructor() {
    super();
  }

  /**
   * This function redefines the Dom element of a new loaded page. Allowing to be accesibleby our JavaScript
   */
  redefine() {
    this._menu = document.querySelector(".crew__menu");
    this._crewContents = {
      role: document.querySelector(".crew__title"),
      name: document.querySelector(".crew__name"),
      bio: document.querySelector(".crew__description"),
      img: document.querySelector(".crew__image"),
    };

    // Call page specific events
    this._menuEvent();
  }

  _menuEvent() {
    this._menu.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;

      // Check for menu events
      if (target.classList.contains("crew__menu--link"))
        this.changeCrew(target);
    });
  }

  changeCrew(target) {
    // Guard clause to check if target is already active
    if (target.classList.contains("crew__menu--link-active")) return;

    this.newActiveLink(target, "crew__menu--link");
    this.updateCrew(target);
  }
  // Function for updating crews
  async updateCrew(el) {
    const newCrewId = [...this._menu.children].findIndex(
      (element, i) => el.dataset.id == i
    );

    // Data needed to render new crew (newCrewId is add with 1 here because of our set header from data.json which always occupies the first element of every pages array)
    const newCrewData = await this.AppData.then((data) =>
      data.crew.at(newCrewId + 1)
    );

    // Updating
    this._crewContents.role.textContent = newCrewData.role;
    this._crewContents.name.textContent = newCrewData.name;
    this._crewContents.bio.textContent = newCrewData.bio;
    this._crewContents.img.src = newCrewData.images.png;
  }
}

export default new Crew();

class App {
  _DOM = document.querySelector("html");
  _AppBKGI = document.querySelector(".app-background");
  _SCREENWIDTH = window.innerWidth;
  _PHONESCREEN = this._SCREENWIDTH <= 375;
  _TABSCREEN = this._SCREENWIDTH <= 768 && this._SCREENWIDTH > 375;
  _DESKTOPSCREEN = this._SCREENWIDTH > 768;
  AppData = fetch("./data.json")
    .then((res) => res.json())
    .then((data) => data);
  constructor() {}

  /**
   *
   * @param {clicked element from navigation} el
   * @param {Generic name of list items} listName
   * @param {The parameter is special. It is used to make an active class if only a data set of page name is available. } pageName
   * @param {Generic name of active class} activeName
   * This function changes the class of a nav element to active when clicked
   */
  newActiveLink(el, listName, pageName, activeName = listName + "-active") {
    // Incase of the unavailability of a given element(el). We use the pageName to locate the element
    if (!el) {
      el = [...document.querySelectorAll(`.${listName}`)].find(
        (el) => el.dataset.pageName === pageName
      );
    }

    // remove active class from all other nav links
    const menuList = document.querySelectorAll(`.${listName}`);
    menuList.forEach((el) => el.classList.remove(`${activeName}`));
    // add active class to target nav link
    el.classList.add(activeName);
  }
}

export default App;

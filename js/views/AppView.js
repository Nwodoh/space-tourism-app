/**
 * This class contains the only eventListener in this App. This is intended to maximize perfomance
 */
class App {
  _DOM = document.querySelector("body");
  constructor() {
    this.allDOMEvents();
  }

  allDOMEvents(handle) {
    this._DOM.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("nav__menu--link")) {
        this.changePage(target);
      }
    });
  }
}

export default App;

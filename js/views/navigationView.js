import AppView from "./AppView.js";

class navigation extends AppView {
  _appMainContent = document.querySelector("main");

  constructor() {
    super();
  }

  /**
   *
   * @param {clicked element from navigation} el
   * This function changes the class of a nav element to active when clicked
   */
  newActiveLink(el) {
    // remove active class from all other nav links
    const menuList = document.querySelectorAll(".nav__menu--link");
    menuList.forEach((el) => el.classList.remove("nav__menu--link-active"));

    // remove active class from all other nav links
    el.classList.add("nav__menu--link-active");
  }

  changePage(target) {
    // Guard clause to check if target is already active
    if (target.classList.contains("nav__menu--link-active")) return;

    this.newActiveLink(target);
    this.pageManager(target);
  }

  async pageManager(el) {
    // Name of page stored in the dataset of html element
    const pageName = el.dataset.pageName;

    const pageData = await fetch("./data.json")
      .then((res) => res.json())
      .then((data) => data[`${pageName}`]);

    // Emptying Page content
    this._appMainContent.innerHTML = "";

    // Loading new Page
    if (pageName != "home") return this.loadPage(pageData);

    if (pageName == "home") return this.loadHomePage(pageData);
  }

  // This function loads the home page specifically and is a helper function of this.pageManager()
  loadHomePage(data) {
    const html = `
    <section class="section home">
      <div class="section__duo home__duo--1">
        <h6 class="heading heading__5--barlow heading__5--barlow-home">
         ${data.headings.headingOne}
         <h1 class="heading heading__1">${data.headings.headingTwo}</h1>
        </h6>
      <p>${data.description}</p>
    </div>
    <div class="section__duo home__duo--2">
      <a href="#" class="heading heading__4 cta">Explore</a>
    </div>
  </section>`;

    this._appMainContent.insertAdjacentHTML("afterbegin", html);
  }

  // This function loads other pages and is a helper function of this.pageManager()
  loadPage(data) {
    console.log(data);
  }
}
export default new navigation();

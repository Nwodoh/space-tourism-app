import AppView from "./AppView.js";
import destinationView from "./destinationView.js";
import crewView from "./crewView.js";
import technologyView from "./technologyView.js";

class navigation extends AppView {
  _appMainContent = document.querySelector("main");
  _navMenu = document.querySelector(".nav__menu");
  _RESMenu = document.querySelector(".nav__icon");
  _RESMenuIcon = document.querySelector(".nav__icon-bar");
  _CTA = document.querySelector(".cta");

  constructor() {
    super();
    this._RESnavEvent();
  }

  _navEvent(handle) {
    this._navMenu.addEventListener("click", (e) => {
      const target = e.target;

      // Check for Main navigation events
      if (target.classList.contains("nav__menu--link"))
        this.changePage(target, handle);
    });
  }

  // For nav icon which appears on small screens
  _RESnavEvent() {
    this._RESMenu.addEventListener("click", (e) => {
      // Make menu visible
      this._navMenu.classList.toggle("nav__menu-active");

      // Cool btn transition
      this._RESMenuIcon.classList.toggle("nav__icon-bar-active");
    });
  }

  changePage(target, handle) {
    // Guard clause to check if target is already active
    if (target.classList.contains("nav__menu--link-active")) return;

    this.pageManager(target.dataset.pageName, handle, target);
  }

  _navActiveLink(navLink, pageName) {
    if (navLink) return this.newActiveLink(navLink, "nav__menu--link");
    if (!navLink)
      return this.newActiveLink(undefined, "nav__menu--link", pageName);
  }

  async pageManager(pageName = "home", handle, navLink) {
    // NULLISH PAGE NAME CHECK
    if (!pageName) pageName = "home";
    
    // Making a nav class active
    this._navActiveLink(navLink, pageName);

    // handling subscriber handle for model.setCurrPage
    handle ? handle(pageName) : "";
    // Page Data
    const pageData = await this.AppData.then((data) => data[`${pageName}`]);

    // Updating background image
    this._updateAppBKGI(pageName, pageData);

    // console.log(pageData[0].bkgImage);
    // Emptying Page content
    this._appMainContent.innerHTML = "";

    // Loading new Page
    if (pageName != "home") return this.loadPage(pageData);

    if (pageName == "home") return this.loadHomePage(pageData);
  }

  // This function loads the home page specifically and is a helper function of this.pageManager function
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

    // This class gives the Home page some margin
    this._appMainContent.classList.add("center-justify__horizontal");

    // Inserting Home html
    this._appMainContent.insertAdjacentHTML("afterbegin", html);

    // GENERATE CALL TO ACTION BTN ACTION
    document.querySelector(".cta").addEventListener("click", () => {
      this.pageManager("destination");
    });
  }

  // This function loads other pages and is a helper function of this.pageManager function
  loadPage(data) {
    const pageHeader = data.find((el) => el.pageDetail);
    const html = `
  <section class="section margin-yaxis section__heading">
    <div class="heading heading__5--barlow">
      <span class="bold-numbers bold-numbers__dark bold-numbers__heading"
        >${pageHeader.pageNumber}</span
      >
      ${pageHeader.pageDescription}
    </div>
  </section>
  <section class="page-content">
  ${this._specificPage(pageHeader.name.toLowerCase())}
  </section>`;

    // Inserting new page
    this._appMainContent.insertAdjacentHTML("afterbegin", html);

    // This class gave only the Home page some margin
    this._appMainContent.classList.remove("center-justify__horizontal");
    // Redefining page's DOM elements
    this._redefines(pageHeader.name);
  }

  // This function is a helper function of this.loadPage. It adds html specific to our different pages
  _specificPage(name) {
    let html;
    if (name === "destination") {
      html = `
      <section class="section destination">
          <div class="section__duo destination__duo--1">
            <img
              class="destination__image"
              src="assets/destination/image-moon.png"
              alt="Image of the moon"
              title="Image of the moon"
            />
          </div>
          <div class="section__duo destination__duo--2">
            <ul class="destination__menu heading heading__nav-text">
              <li class="destination__menu--item">
                <a href="#" class="destination__menu--link destination__menu--link-active" data-name="moon"
                  >moon</a
                >
              </li>
              <li class="destination__menu--item">
                <a href="#" class="destination__menu--link" data-name="mars"
                  >mars</a
                >
              </li>
              <li class="destination__menu--item">
                <a href="#" class="destination__menu--link" data-name="europa"
                  >europa</a
                >
              </li>
              <li class="destination__menu--item">
                <a href="#" class="destination__menu--link" data-name="titan"
                  >titan</a
                >
              </li>
            </ul>
            <h2 class="heading heading__2 destination__title">moon</h2>
            <p class="destination__description">
              See our planet as you’ve never seen it before. A perfect relaxing
              trip away to help regain perspective and come back refreshed.
              While you’re there, take in some history by visiting the Luna 2
              and Apollo 11 landing sites.
            </p>
            <div class="destination__details">
              <div>
                <span
                  class="heading heading__subheading--barlow destination__details--heading"
                  >Avg. distance</span
                >
                <span
                  class="heading heading__5 destination__distance"
                  data-destination-dist="384,400"
                  >384,400 km</span
                >
              </div>
              <div>
                <span
                  class="heading heading__subheading--barlow destination__details--heading"
                  >Est. travel time</span
                >
                <span
                  class="heading heading__5 destination__duration"
                  data-destination-duration="72"
                  >3 days</span
                >
              </div>
            </div>
          </div>
        </section>`;
    }

    if (name === "crew") {
      html = `
      <section class="section crew">
        <div class="section__duo crew__duo--1">
          <h4 class="heading heading__4 crew__title">commander</h4>
          <h3 class="heading heading__3 crew__name">douglas hurley</h3>
          <p class="crew__description">Douglas Gerald Hurley is an American engineer, former Marine Corps pilot 
            and former NASA astronaut. He launched into space for the third time as 
            commander of Crew Dragon Demo-2.
          </p>
          <ul class="crew__menu">
            <li class="crew__menu--item"><a href="#" class="crew__menu--link crew__menu--link-active" data-id="0"></a></li>
            <li class="crew__menu--item"><a href="#" class="crew__menu--link" data-id="1"></a></li>
            <li class="crew__menu--item"><a href="#" class="crew__menu--link" data-id="2"></a></li>
            <li class="crew__menu--item"><a href="#" class="crew__menu--link" data-id="3"></a></li>
          </ul>
        </div>
        <div class="section__duo crew__duo--2">
          <img src="assets/crew/image-douglas-hurley.png" class="crew__image" alt="">
        </div>
      </section>`;
    }
    if (name === "technology") {
      html = `
    <section class="section technology">
      <div class="section__duo technology__duo--1">
        <ul class="technology__menu heading heading__4">
          <li class="technology__menu--item"><a href="#" class="technology__menu--link technology__menu--link-active" data-id="0">1</a></li>
          <li class="technology__menu--item"><a href="#" class="technology__menu--link" data-id="1">2</a></li>
          <li class="technology__menu--item"><a href="#" class="technology__menu--link" data-id="2">3</a></li>
        </ul>
        <div class="technology__text-content">
        <div class="technology__title heading heading__nav-text">The terminology...</div>
        <div class="technology__name heading heading__3">Launch vehicle</div>
        <p class="technology__description">
         A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!
        </p>
      </div>
    </div>
    <div class="section__duo technology__duo--2">
    <picture class="technology__picture">
    <source srcset="./assets/technology/image-launch-vehicle-landscape.jpg" media="(max-width: 80.31em)" class="technology__img technology__img--landscape"/>
    <img src="./assets/technology/image-launch-vehicle-portrait.jpg" alt="An image of the lauch vehicle" class="technology__img technology__img--portrait">
    </picture>
    </div>
  </section>`;
    }

    return html;
  }

  // This function updates the background Image
  _updateAppBKGI(pageName, data) {
    let url;
    const urlData = data[pageName !== "home" ? 0 : "headings"].bkgImage;

    if (this._PHONESCREEN) url = urlData.mobile;

    if (this._TABSCREEN) url = urlData.tablet;

    if (this._DESKTOPSCREEN) url = urlData.desktop;

    this._AppBKGI.style.backgroundImage = url;
  }
  // This function call for the redefining of pages DOM elements
  _redefines(pageName) {
    // Destination page
    if (pageName === "destination") destinationView.redefine();

    // Crew page
    if (pageName === "crew") crewView.redefine();

    // Technology page
    if (pageName === "technology") technologyView.redefine();
  }
}
export default new navigation();

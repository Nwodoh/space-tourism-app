// Model
import * as model from "./model.js";
// VIEWS
import AppView from "./views/AppView.js";
import destinationView from "./views/destinationView.js";
import navigationView from "./views/navigationView.js";

const controlPages = function () {
  // Getting current page(name)
  const pageName = model.getCurrPage();

  // Call navigation's change page with new page name
  navigationView.pageManager(pageName);
};

const controlSetNewPage = function () {
  navigationView._navEvent(model.setCurrPage);
  controlPages();
};

// INIT function
const init = function () {
  controlSetNewPage();
};

init();

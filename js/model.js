// Setting current page
export const setCurrPage = function (newPage = "home") {
  localStorage.setItem("page", newPage);
};

// Getting current page for Local storage
export const getCurrPage = function (page = "home") {
  const currPage = localStorage.getItem("page", page);
  return currPage;
};

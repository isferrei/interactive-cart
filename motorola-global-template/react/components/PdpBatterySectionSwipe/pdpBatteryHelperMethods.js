// Helper function.
let offsetVal = () => {
  let navBar = document.getElementsByClassName("vtex-store-components-3-x-notificationBarInner");
  let subNav = document.getElementsByClassName("sub-nav");
  let mainHeader = document.getElementsByClassName("main-header");

  navBar = navBar.length > 0 ? navBar[0].clientHeight : 0;
  subNav = subNav.length > 0 ? subNav[0].clientHeight : 0;
  mainHeader = mainHeader.length > 0 ? mainHeader[0].clientHeight : 0;

  let offsetCompute = navBar + subNav + mainHeader;

  if (offsetCompute == 0) {
    setTimeout(this.offsetVal, 1000);
  }
  else {
    return "-" + (offsetCompute);
  }
}

export { offsetVal };
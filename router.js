const routes = {
  home: document.getElementById("home-template"),
  catalog: document.getElementById("catalog-template"),
  "about-us": document.getElementById("about-us-template"),
  gallery: document.getElementById("gallery-template"),
  contact: document.getElementById("contact-template"),
};

function show(...componentsToBeShown) {
  for (const key in routes) {
    if (componentsToBeShown.includes(key)) {
      routes[key].style.display = "block";
    } else {
      routes[key].style.display = "none";
    }
  }
}

//const navigation = Array.from(document.querySelector("#navigation").children);
//const keys = Object.keys(paths);

function navigateHandler(event) {
  //Navigate Handler --------
  event.preventDefault();
  let url = new URL(event.target.href);
  const path = url.pathname.slice(1);
  console.log("====================================");
  console.log(path);
  console.log("====================================");
  navigate(path);

  //That returns us only the patch word
}

const navigate = (path) => {
  //Here we change the address and shhow the html with  ROUTER()
  window.history.replaceState({}, "", "/" + path);
  //router(path);
  show(path);
};

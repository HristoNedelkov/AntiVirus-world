const routes = {
  home: "home-template",
  login: "login-template",
  register: "register-template",
  create: "create-template",
  details: "details-template",
  edit: "edit-template",
  catalog: "catalog-template",
  "about-us": "about-us-template",
  gallery: "gallery-template",
  contact: "contact-template",
};

const router = async (fullPath) => {
  let [path, id] = fullPath.split("/");
  let app = document.getElementById("container"); //Here add the main
  let temp = document.getElementById(routes[path]).innerHTML;
  app.innerHTML = temp(templateData);
};
 
 
function navigateHandler(event) {
  //Navigate Handler --------
  event.preventDefault();
  let url = new URL(event.target.href);
  navigate(url.pathname.slice(1));
  //That returns us only the patch word
}

const navigate = (path) => {
  //Here we change the address and shhow the html with  ROUTER()
  window.history.replaceState({}, "", "/" + path);
  router(path);
};
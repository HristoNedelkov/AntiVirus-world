
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
  let templateData = authServices.getData();

  switch (
    path //Here are some functionality
  ) {
    case "gallery":
      await itemSurvices.getAll().then((res) => {
        if (Object.keys(res).length != 0) {
          templateData.destinations = res;
        }
      });
      break;
    case "catalog":
      await itemSurvices.getAll().then((res) => {
        if (Object.keys(res).length != 0) {
          console.log(res);
          let arr = [];
          let currOwner = JSON.parse(localStorage.getItem("auth")).email;

          res.forEach((dest) => {
            arr.push(dest);
          });
          templateData.destinations = arr;
        }
      });

      break;
    case "logout":
      authServices.logout();
      postNotification(false, "You logged out of your account!");
      return navigate("home");

    case "details":
      let destDetails = await itemSurvices.getOne(id);
      let owner = destDetails.owner;
      let currOwner = JSON.parse(localStorage.getItem("auth")).email;
      if (currOwner != owner) {
        Object.assign(templateData, { isChanged: true });
      }
      Object.assign(templateData, destDetails);
      break;
    case "contact":
       
      const divGenerate = (obj) => {
        return `
        <div class="field comment-card" >
        <label for="comment">| Автор: ${obj.name} |</label>
        <p>${obj.text}</p>
        </div>`;
      };
      let allData = commentServices
      .getAll()
      .then((res) => {
        if (Object.keys(res).length != 0) return res;
        else return {};
      })
      .then((data) => {
          let commentsDiv = document.getElementById("comments-section");
          
          for (const el of Object.entries(data)) {
            console.log(divGenerate(el[1]));
            commentsDiv.innerHTML += divGenerate(el[1]);
          }
        });
      break;

    default:
      break;
  }

  let temp = Handlebars.compile(
    document.getElementById(routes[path]).innerHTML
  );
  app.innerHTML = temp(templateData);
};

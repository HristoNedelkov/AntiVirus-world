const routes = {
    'home': 'home-template',
    'login': 'login-template',
    'register': 'register-template',
    'create': 'create-template',
    'details': 'details-template',
    'edit': 'edit-template',
    'destinations': 'my-destinations-template',


}

const router = async (fullPath) => {
    let [path, id] = fullPath.split('/')
    
    let app = document.getElementById('container') //Here add the main
    let templateData = authServices.getData();

    switch (path) {     //Here are some functionality
        case 'home':
             await itemSurvices.getAll()
            .then(res => {
                if(Object.keys(res).length != 0) {   
                    templateData.destinations = res
               } 
            })  
            break;
            case 'destinations':
                await itemSurvices.getAll()
                .then(res => {
                    if(Object.keys(res).length != 0) {   
                        console.log(res)
                        let arr = []
                        let currOwner = JSON.parse(localStorage.getItem('auth')).email
                        
                        res.forEach(dest => {
                           if(dest.owner == currOwner) {
                            arr.push(dest)
                           } 
                        });
                templateData.destinations = arr
                   } 
                })  
                

            break
        case 'logout':
            authServices.logout()
            postNotification(false,'You logged out of your account!')
            return navigate('home')
           
        case 'details':
            
            let destDetails = await itemSurvices.getOne(id)
            let owner = destDetails.owner
            let currOwner =  JSON.parse(localStorage.getItem('auth')).email
            if(currOwner != owner) {
                Object.assign(templateData,{isChanged: true})
            }
            Object.assign(templateData, destDetails)
            break

        default:
            break;
    }

    let temp = Handlebars.compile(document.getElementById(routes[path]).innerHTML)
    app.innerHTML = temp(templateData)
}


function addEventListeners() {
    partialTemplate('header-template')
    partialTemplate('destination-template')
    partialTemplate('my-dest-template')
    // partialTemplate('')
    //  partialTemplate('edit-offer-template')
    navigate('home')

}
function partialTemplate(id) {
    let cardTemp = Handlebars.compile(document.getElementById(id).innerHTML)
    Handlebars.registerPartial(id, cardTemp)
}
function navigateHandler(event) {
    //Navigate Handler --------
    event.preventDefault()
    let url = new URL(event.target.href)
    navigate(url.pathname.slice(1))
    //That returns us only the patch word
}

function onLoginSubmit(event) {

    event.preventDefault()
    let formData = new FormData(document.forms['formLogin'])

    let email = formData.get('email')
    let password = formData.get('password')

    authServices.login(email, password)
        .then(data => {
            let isReg = data.registered || false
            if (isReg) {

                navigate('home')
                postNotification(true, 'Login successful.')

            } else {
                navigate('login')
                postNotification(false, 'Wrong password or email addres, please try again!!! :D')
            }
        })
}

function onRegSubmit(event) {
    event.preventDefault()
    let formData = new FormData(document.forms['formRegister'])

    let email = formData.get('email')
    let password = formData.get('password')
    let repeatedPass = formData.get('rePassword')

    let isValid = password === repeatedPass && password != '' && email != ''
    if (isValid) {
        authServices.register(email, password)
            .then(res => {
                authServices.login(email, password)
                    .then(res => {

                        navigate('home')
                    })
            })
            .catch(e => {
                postNotification(false, 'Check if the passwords are equal and if the email is correct')
                navigate('register')
                // email.value = ''
                //  password.value = ''

            })
        postNotification(true, 'User registration successful.')
    } else {
        postNotification(false, 'Check if the passwords are equal and if the email is correct')
        navigate('register')
    }

}

function onAddDestSubmit(event) {
    event.preventDefault()
    let formData = new FormData(document.forms['formAdddestination'])

    let destination = formData.get('destination')
    let city = formData.get('city')
    let departureDate = formData.get('departureDate')
    let duration = formData.get('duration')
    let imgUrl = formData.get('imgUrl')
    let owner = localStorage.getItem('auth')
    owner = JSON.parse(owner).email
    
    let isValid = destination != '' && city != '' && departureDate != '' && imgUrl != '' && duration != ''

    if (isValid) {
        itemSurvices.add({ destination, city, departureDate, duration, imgUrl,owner })
            .then(res => {
                navigate('home')
                postNotification(true, 'Added new destination!')
            })
    } else {
        navigate('create')
        postNotification(false, 'Fill all fields,PLEASE ')
    }



}


const navigate = (path) => {
    //Here we change the address and shhow the html with  ROUTER()
    history.pushState({}, '', path)
    router(path)
}


function deleteOneFunc(e) {
    e.preventDefault()
   
    let url = new URL(e.target.href)
    id = url.pathname.slice(1).split('/')[1]
    console.log(id)

    itemSurvices.deleteOne(id)
        .then(res => postNotification(true,'DELETED!'))
        .then(data => navigate('home'))
        .catch(e => postNotification(false,'sth went wrong!'))
}
function editOneFunc(e) {
    e.preventDefault()
    let id = window.location.href.split('/').pop()
    navigate('edit')
    document.getElementById('edit-btn').addEventListener('click', (e) => {
        e.preventDefault()
        let formData = new FormData(document.forms['formAdddestination'])


        let destination = formData.get('destination')
        let city = formData.get('city')
        let departureDate = formData.get('departureDate')
        let duration = formData.get('duration')
        let imgUrl = formData.get('imgUrl')
        let owner = localStorage.getItem('auth')
        owner = JSON.parse(owner).email
        let isValid = destination != '' && city != '' && departureDate != '' && duration != '' && imgUrl != ''

        if (isValid) {


            itemSurvices.editOne(id, { destination, city, departureDate,duration ,imgUrl,owner })
                .then(res => {
                    postNotification(true, `Successfully edited destination.`)
                }).then(() => {
                    navigate('home')
                })
                .catch(e => {
                    console.log(`${e} ----> GRESHKAAAAAAAAAA`)

                })
        } else {
            postNotification(false, 'Please fill all of the iputs!')

        }
    })


}

function postNotification(type, text) {
    if (type) {
        let notificationBox = document.getElementById('info-notification')
        notificationBox.textContent = text
        notificationBox.style.display = 'block'
        setTimeout(() => {
            notificationBox.style.display = 'none'
        }, 3000)
    } else {
        let notificationBox = document.getElementById('error-notification')
        notificationBox.innerHTML = text
        notificationBox.style.display = 'block'
        setTimeout(() => {
            notificationBox.style.display = 'none'
        }, 3000)
    }
}


addEventListeners()
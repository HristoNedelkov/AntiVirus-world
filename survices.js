 
const authServices = {
    async login(email, password) {
        let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,

            })
        })
        let data = await res.json()

        localStorage.setItem('auth', JSON.stringify(data))
        return data
    },
    async register(email, password) {
        let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,

            })
        })

        let data = await res.json()
        return data

    },
    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth')) || false
            return {
                isAuth: data.idToken ? true : false,
                email: data.email ? data.email.split('@')[0] : ''
            }
        } catch (e) {
            return {
                isAuth: false,
                email: ''
            }
        }

    },
    logout() {
        localStorage.setItem('auth', '')

    }
}

const itemSurvices = {
    async add(destData) {

        let res = await fetch(`${dataBaseUrl}/destinations.json`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(destData)
        })
        let data = await res.json()
        return data
    },
    async getAll() {
        let res = await fetch(`${dataBaseUrl}/destinations.json`)
        let data = await res.json()
        if (!data) {
            return {}
        }
        return Object.keys(data).map(key => ({ key, ...data[key] }))

    },
    async getOne(id) {
        let res = await fetch(`${dataBaseUrl}/destinations/${id}.json`)
        let data = await res.json()
        return data
    },
    async deleteOne(id) {
        let res = await fetch(`${dataBaseUrl}/destinations/${id}.json`, {
            method: 'DELETE'
        })
        let data = await res.json()
        return data
    },
    async editOne(id, elements) {

        let res = await fetch(`${dataBaseUrl}/destinations/${id}.json`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(elements)
        })
          return res

    },
}


    
/* 
  USER EXAMPLE
{
    id: 1,
    names: "cyusa kheven",
    age: "27/05/2005",
    email: "cyusa.kheven@outlook.com",
    password: "123456",
    profile: "https://picsum.photos/200/200"
}
*/

function Save() {

    this.users = localStorage.getItem('users') || '[]'
    // else {
    //     localStorage.setItem('users', '[]')
    //     this.users = localStorage.getItem('users')
    // }

    this.getUsers = function () {
        return JSON.parse(this.users)
    }
    this.saveUser = function (user) {
        if (this.checkUser(user.id)) return `User with ${user.id} already exists.`
        if (this.checkEmail(user.email)) return `User with ${user.email} already exists.`
        const users = JSON.parse(this.users)
        users.push(user)
        this.users = JSON.stringify(users)
        localStorage.setItem('users', this.users)
        return JSON.parse(this.users)
    }
    this.getUser = function (id) {
        let users = JSON.parse(this.users)
        return users.filter(user => user.id == id)[0]
    }
    this.deleteUser = function (id) {
        let users = JSON.parse(this.users)
        this.users = JSON.stringify(users.filter(user => user.id != id))
        localStorage.setItem('users', this.users)
        return JSON.parse(this.users)
    }
    this.checkUser = function (id) {
        let users = JSON.parse(this.users)
        if (users.find(user => user.id == id)) return true
        else return false
    }
    this.checkEmail = function (email) {
        let users = JSON.parse(this.users)
        if (users.find(user => user.email == email)) return true
        else return false
    }
    this.checkPassword = function (id, password) {
        let users = JSON.parse(this.users)
        if (users.find(user => user.password == password)) {
            return this.getUser(id).password == password
        }
        else return false
    }
    this.getUserByEmail = function (email) {
        let users = JSON.parse(this.users)
        return users.filter(user => user.email == email)[0]
    }
    this.updateUser = function (user) {
        if (!this.checkUser(user.id)) {
            this.saveUser(user)
            return
        }
        const userToUpdate = this.getUser(user.id)
        const newUser = {
            id: userToUpdate.id,
            names: user.names || userToUpdate.names,
            age: user.age || userToUpdate.age,
            email: user.email || userToUpdate.email,
            password: user.password || userToUpdate.password,
            profile: user.profile || userToUpdate.profile
        }
        let users = JSON.parse(this.users)
        let item = users.filter(item => item.id != user.id)
        item.push(newUser)
        // console.log(item, users)
        this.users = JSON.stringify(item)
        localStorage.setItem('users', this.users)
        return newUser
    }
}

export default Save

export function SaveAbout() {
    this.getAbout = function () {
        const about = localStorage.getItem('about') || '{}'
        return JSON.parse(about)
    }
    this.saveAbout = function (about) {
        if (about.aboutphoto == '') return "Add photo please!"
        if (about.aboutnames == '') return "Names cannot be empty!"
        if (about.aboutcarier == "") return "Position cannot be empty!"
        if (about.aboutdesc == "") return "Description cannot be empty!"
        localStorage.setItem('about', JSON.stringify(about))
    }
}
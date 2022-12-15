/* 
  USER EXAMPLE
{
    id: 1,
    names: "cyusa kheven",
    age: "23",
    email: "cyusa.kheven@outlook.com",
    password: "123456",
    profile: "https://picsum.photos/200/200"
}
*/

function Save() {

    if (localStorage.users) this.users = localStorage.getItem('users')
    else {
        localStorage.setItem('users', '[]')
        this.users = localStorage.getItem('users')
    }

    this.getUsers = function () {
        return JSON.parse(this.users)
    }
    this.saveUser = function (user) {
        if (this.checkUser(user.id)) return `User with ${user.id} already exists.`
        if (this.checkEmail(user.email)) return `User with ${user.email} already exists.`
        const users = JSON.parse(this.users)
        users.push(user)
        this.users = JSON.stringify(users)
        localStorage.removeItem('users')
        localStorage.setItem('users', this.users)
        return JSON.parse(this.users)
    }
    this.getUser = function (id) {
        let users = JSON.parse(this.users)
        return users.filter(user => user.id == id)
    }
    this.deleteUser = function (id) {
        let users = JSON.parse(this.users)
        this.users = JSON.stringify(users.filter(user => user.id != id))
        localStorage.removeItem("users")
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
    this.updateUser = function (user) {
        if (!this.checkUser(user.id)) {
            this.saveUser(user)
            return
        }
        let users = JSON.parse(this.users)
        let item = users.filter(item => item.id != user.id)
        item.push(user)
        console.log(item, users)
        this.users = JSON.stringify(item)
        localStorage.removeItem("users")
        localStorage.setItem('users', this.users)
        return this.getUser(user.id)
    }
}

export default Save
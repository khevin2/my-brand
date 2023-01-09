import Save from "./helpers/save_local.js"
import generateID from "./helpers/generate_id.js"

const db = new Save()

const menu_btn = document.querySelector(".menu")
menu_btn.addEventListener('click', handleMenu)


function handleMenu() {
    menu_btn.classList.add('d-none')
    document.querySelector('.nav-links').classList.remove('d-none')
}

function handleClose() {
    document.querySelector('.nav-links').classList.add('d-none')
    menu_btn.classList.remove('d-none')

}

const nav_links = document.querySelector('.nav-links')
nav_links.addEventListener('focusout', handleClose)
document.querySelector('.close-btn').addEventListener('click', handleClose)


// Register form
const register = document.querySelector("#register-form")
if (register)
    register.addEventListener('submit', handleRegitserSubmit)

function handleRegitserSubmit(e) {
    e.preventDefault()
    const form = new FormData(register)
    const data = {}
    for (let [key, value] of form.entries()) {
        data[key] = value
    }
    data.profile = URL.createObjectURL(data.profile)
    data.id = generateID()
    db.saveUser(data)
}

//Login
const login = document.querySelector("#login-form")
if (login) login.addEventListener('submit', handleLogin)

function handleLogin(e) {
    e.preventDefault()
    const form = new FormData(login)
    const data = {}
    for (let [key, value] of form.entries()) {
        data[key] = value
    }
    if (db.checkEmail(data.email)) {
        const user = db.getUserByEmail(data.email)
        console.log("\n", user, "\n", data)
        if (user.password == data.password) {
            window.location = "./admin/"
        }
        else alert("Password Incorect")
    }
    else alert("Email or Password Incorect")
}
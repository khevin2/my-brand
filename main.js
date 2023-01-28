import Save, { SaveComment } from "./helpers/save_local.js"
import generateID from "./helpers/generate_id.js"
import showError from "./helpers/show_error.js"

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
        // console.log("\n", user, "\n", data)
        if (user.password == data.password) {
            sessionStorage.setItem('email', data.email)
            sessionStorage.setItem('authed', true)
            sessionStorage.setItem('_id', user.id)
            window.location = "./admin/"
        }
        else alert("Password Incorect")
    }
    else alert("Email or Password Incorect")
}

// COMMENTS FORM

const commentsform = document.getElementById('client-comment-form')
if (commentsform) commentsform.addEventListener('submit', handleCommentSubmit)

function handleCommentSubmit(e) {
    e.preventDefault()
    console.log("save comment")
    const db = new SaveComment()
    const formData = new FormData(commentsform)
    const data = {}
    for (let [key, value] of formData.entries()) data[key] = value
    if (data.comment == "") return showError("Comment empty..", commentsform)
    const params = new URLSearchParams(window.location.search) // Get parameters from search params
    const postID = params.get('id')
    data.postID = postID
    db.saveNewComment(data)
    showError("Comment Saved successfully..", commentsform)
}
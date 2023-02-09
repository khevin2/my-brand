import Save, { SaveBlog, SaveComment } from "./helpers/save_local.js"
import { uploadToFirebase } from "./helpers/firebase_util.js"
import generateID from "./helpers/generate_id.js"
import showError, { successNotification, errorNotification } from "./helpers/show_error.js"

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

async function handleRegitserSubmit(e) {
    e.preventDefault()
    const form = new FormData(register)
    const data = {}
    for (let [key, value] of form.entries()) {
        data[key] = value
    }
    data.photo = await uploadToFirebase(data.photo)
    const res = await db.saveUser(data)
    if (res != 'success') return errorNotification(res)
    else successNotification("User saved..")
}

//Login
const login = document.querySelector("#login-form")
if (login) login.addEventListener('submit', handleLogin)

async function handleLogin(e) {
    e.preventDefault()
    const form = new FormData(login)
    const data = {}
    for (let [key, value] of form.entries()) {
        data[key] = value
    }
    if (data.email == '') errorNotification("Email empty!")
    if (data.password == '') errorNotification("Password empty!")
    if (data.email == '' || data.password == '') return

    if (await db.login(data)) {
        window.location = "./admin/"
    }
    else errorNotification("Email or Password incorect..")
}

// COMMENTS FORM

const commentsform = document.getElementById('client-comment-form')
if (commentsform) commentsform.addEventListener('submit', handleCommentSubmit)

async function handleCommentSubmit(e) {
    e.preventDefault()
    console.log("save comment")
    const db = new SaveComment()
    const formData = new FormData(commentsform)
    const data = {}
    for (let [key, value] of formData.entries()) data[key] = value
    if (data.comment == "") return errorNotification("Comment empty..")
    const params = new URLSearchParams(window.location.search) // Get parameters from search params
    const postID = params.get('id')
    const res = await db.saveNewComment(postID, data)
    if (res._id)
        successNotification("Comment Saved successfully..")
    else errorNotification(res)
}

// HANDLE LIKES 

const likeBtn = document.getElementById('client-blog-like')
if (likeBtn) likeBtn.addEventListener('click', handleLike)

async function handleLike(e) {
    e.preventDefault()
    const db = new SaveBlog()
    const params = new URLSearchParams(window.location.search) // Get parameters from search params
    const postID = params.get('id')
    if (document.getElementById('client-like-color').style.fill != "#2F80ED") {
        const { likes } = await db.AddLike(postID)
        document.getElementById('client-like-color').style.fill = "#2F80ED"
        document.getElementById('client-blog-like-count').innerText = likes
    }
}
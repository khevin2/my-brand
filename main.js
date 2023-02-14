import Save, { SaveBlog, SaveComment, SaveMessage } from "./helpers/save_local.js"
import { uploadToFirebase } from "./helpers/firebase_util.js"
import { showLoading, removeLoading } from "./helpers/loader.js"
import showError, { successNotification, errorNotification } from "./helpers/show_error.js"
import { validateContactForm } from "./helpers/validate.js"
import { signout } from "./assets/js/signout.js"

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

    const res = await db.login(data)
    if (res.userType) {
        if (res.userType == "admin")
            window.location = "./admin/"
        else window.location = './settings.html'
    }
    else errorNotification("Email or Password incorect..")
}

// COMMENTS FORM

const commentsform = document.getElementById('client-comment-form')
if (commentsform) commentsform.addEventListener('submit', handleCommentSubmit)

// Hide comment form if the viewer is not authenticated
if (commentsform)
    if (!sessionStorage.getItem("token")) {
        commentsform.classList.add('d-nonne')
        document.getElementById('client-comment-message').style.display = 'block'
    }

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
    if (!sessionStorage.getItem("token")) {
        return errorNotification("You should login first..")
    }
    const db = new SaveBlog()
    const params = new URLSearchParams(window.location.search) // Get parameters from search params
    const postID = params.get('id')
    if (document.getElementById('client-like-color').style.fill != "#2F80ED") {
        const { likes } = await db.AddLike(postID)
        document.getElementById('client-like-color').style.fill = "#2F80ED"
        document.getElementById('client-blog-like-count').innerText = likes
    }
}

// HANDLE CONTACT FORM

const contactform = document.getElementById('client-contact-form')
if (contactform) {
    contactform.addEventListener('submit', handleContactSubmit)

    async function handleContactSubmit(e) {
        e.preventDefault()

        const data = {}
        const formData = new FormData(contactform)

        for (let [key, value] of formData.entries()) data[key] = value

        if (validateContactForm(data)) return


        const db = new SaveMessage()
        const res = await db.save(data)
        if (res.error) return errorNotification(`${res.message}\nCould not send message!`)
        else successNotification(`Message sent!`)

        contactform.reset()
    }
}

if (sessionStorage.getItem("token")) {
    const navLinks = document.querySelector('.nav-links')
    navLinks.removeChild(navLinks.lastElementChild)
    const { photo } = await db.getUserByEmail(sessionStorage.getItem('email'))

    const settingsBtn = document.createElement('div');
    settingsBtn.className = 'settings-btn';

    const profileImage = document.createElement('img');
    profileImage.src = photo;
    profileImage.alt = 'profile';
    settingsBtn.appendChild(profileImage);

    const subMenu = document.createElement('ul');
    subMenu.className = 'sub-menu';
    settingsBtn.appendChild(subMenu);

    const settingsLink = document.createElement('li');
    const settingsLinkAnchor = document.createElement('a');
    settingsLinkAnchor.href = './settings.html';
    settingsLinkAnchor.textContent = 'Settings';
    settingsLink.appendChild(settingsLinkAnchor);
    subMenu.appendChild(settingsLink);

    const signOutBtn = document.createElement('li');
    signOutBtn.id = 'settings-nav-signout-btn';
    signOutBtn.style.cursor = 'pointer';
    signOutBtn.textContent = 'Sign Out';
    subMenu.appendChild(signOutBtn);

    navLinks.append(settingsBtn)

    // Logout button
    document.getElementById("settings-nav-signout-btn")
        .addEventListener("click", () => signout())
}
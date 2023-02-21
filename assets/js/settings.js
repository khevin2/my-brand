import { signout } from "./signout.js"
import Save from "../../helpers/save_local.js"
import { errorNotification, successNotification } from "../../helpers/show_error.js"
import { uploadToFirebase } from "../../helpers/firebase_util.js"

const db = new Save()

const token = sessionStorage.getItem("token")
if (!token) window.location = '/login.html'

const userType = sessionStorage.getItem('userType')
if (!userType) window.location = '/login.html'
if (userType !== 'user') signout()

const email = sessionStorage.getItem('email')
const user = await db.getUserByEmail(email)
const $id = user._id

const profileTab = document.getElementById('settings-profile')
const passwordChangeTab = document.getElementById('settings-change-password-tab')

async function editUser(e) {
    e.preventDefault()
    const formData = new FormData(profileTab)
    const data = {}
    for (let [key, value] of formData.entries()) data[key] = value
    if (data.photo instanceof File) {
        if (data.photo.size == 0) delete data.photo
        else data.photo = await uploadToFirebase(data.photo)
    }

    const res = await db.updateUser($id, data)


    if (res._id) return successNotification("User updated successfully..")
    else errorNotification(res)
}

async function changePassword(e) {
    e.preventDefault()
    const formData = new FormData(passwordChangeTab)
    const data = {}
    for (let [key, value] of formData.entries()) data[key] = value
    console.log(data)

    if (data.newpwd != data.confirmpwd) return errorNotification("Password mismatch!")

    const res = await db.checkPassword($id, { password: data.currentpwd, newPassword: data.newpwd })

    if (res.data) return successNotification("Password updated..")
    else errorNotification(res.message)
}


profileTab.addEventListener("submit", editUser)
passwordChangeTab.addEventListener('submit', changePassword)

// function showProfileTab() {
//     profileTab.classList.remove('d-nonne')
//     passwordChangeTab.classList.add('d-nonne')
// }
// function showChangePasswordTab() {
//     profileTab.classList.add('d-nonne')
//     passwordChangeTab.classList.remove('d-nonne')
// }

// document.getElementById("settings-edit-user-btn")
//     .addEventListener("click", showProfileTab)

// document.getElementById("settings-edit-password-btn")
//     .addEventListener("click", showChangePasswordTab)

// document.getElementById("settings-signout-btn")
//     .addEventListener("click", () => signout())

// document.getElementById("settings-nav-signout-btn")
//     .addEventListener("click", () => signout())

document.querySelector(".setting-add-img")
    .addEventListener("click", () => {
        document.getElementsByName("photo")[0].click()
        console.log("click")
    })
document.getElementsByName('email')[0].disabled = true
document.getElementsByName('phone')[0].disabled = true

document.getElementsByName('email')[0].addEventListener('click', () => {
    document.getElementsByName('email')[0].disabled = false
})

document.getElementsByName('phone')[0].addEventListener('click', () => {
    document.getElementsByName('phone')[0].disabled = false
})

document.getElementsByName('names')[0].value = user.names
document.getElementsByName('email')[0].value = user.email
document.getElementsByName('phone')[0].value = user.phone
document.getElementsByName('dob')[0].value = new Date(user?.dob).toISOString().split("T")[0]
document.getElementById('settings-user-img').src = user.photo

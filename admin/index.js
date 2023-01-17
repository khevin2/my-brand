import generateID from "../helpers/generate_id.js"
import showError from "../helpers/show_error.js"
import Save, { SaveAbout, SaveSkills, SaveWork } from "../helpers/save_local.js" // Utility to save to localstorage
const save = new Save() // Initialize the utility
const aboutsave = new SaveAbout()
const skillssave = new SaveSkills()
const worksave = new SaveWork()

let $email, $id = ''
if (!sessionStorage.getItem('authed')) window.location = '/login.html'
else {
    $email = sessionStorage.getItem('email')
    $id = sessionStorage.getItem('_id')
}
const user = save.getUser($id)


const modal = document.querySelector('.modal')

function closeModal(e) {
    modal.classList.add('d-none')
    console.log("closed")
}
function openModal(e) {
    e.preventDefault()
    modal.classList.remove("d-none")
}

const close_btn = document.querySelector('.close')
close_btn.addEventListener('click', closeModal)

window.addEventListener('click', (e) => {
    if (e.target == modal) closeModal()
})

const pwd_editor = document.querySelector('#pwd-editor')
if (pwd_editor)
    pwd_editor.addEventListener('click', openModal)



// 
const accountForm = document.getElementById('account')
if (accountForm) accountForm.addEventListener('submit', handleAccountForm)
function handleAccountForm(e) {
    e.preventDefault()
    console.log("saving")
    const form = new FormData(accountForm)
    const data = {}
    for (let [key, value] of form.entries()) data[key] = value
    data.id = $id
    if (data.profile instanceof File) data.profile = URL.createObjectURL(data.profile)
    console.log(save.updateUser(data))
    showError("Saved", accountForm)

}
if (document.querySelector('.account-profile'))
    document.querySelector('.account-profile').addEventListener('click', openFileChooser)
function openFileChooser(e) {
    console.log('opened file picker')
    document.getElementById('profile').click()
}

// Handle Password Change

const pwdform = document.getElementById('edit-password-form')
if (pwdform) {
    pwdform.addEventListener('submit', handlePwdChange)
    function handlePwdChange(e) {
        e.preventDefault()
        const formData = new FormData(pwdform)
        const data = {}
        for (let [key, value] of formData.entries()) data[key] = value
        if (data.currentpwd == "") return showError("Current Password Cannot be empty.", pwdform)
        if (data.newpwd == "") return showError("New Password does not match!", pwdform)
        if (data.confirmpwd == "") return showError("New Password does not match!", pwdform)
        if (data.newpwd != data.confirmpwd) return showError("New Password does not match!", pwdform)
        if (save.checkPassword($id, data.currentpwd)) {
            const newUser = save.updateUser({
                id: $id,
                password: data.newpwd
            })
            console.log(newUser)
            closeModal()
        }
        else return showError("Invalid password!", pwdform)
    }
    document.getElementsByName('email')[0].value = user.email
    document.getElementsByName('names')[0].value = user.names
    // document.getElementsByName('profile')[0].value = user.profile
    document.getElementsByName('age')[0].value = user.age
}

/**
 * About Page Functionalities
 */
const aboutform = document.getElementById('about-form')
if (aboutform) {
    aboutform.addEventListener('submit', handleAboutSubmit)
    function handleAboutSubmit(e) {
        e.preventDefault()
        console.log('saved about')
        const formData = new FormData(aboutform)
        const data = {}
        for (let [key, value] of formData.entries()) data[key] = value
        if (data.photo instanceof File) data.photo = URL.createObjectURL(data.photo)
        aboutsave.saveAbout(data)
        showError("Saved", aboutform)
    }
    const abt = aboutsave.getAbout()
    // document.getElementsByName('aboutphoto')[0].value = abt.aboutphoto
    document.getElementsByName('aboutnames')[0].value = abt.aboutnames
    document.getElementsByName('aboutcarier')[0].value = abt.aboutcarier
    document.getElementsByName('aboutdesc')[0].value = abt.aboutdesc
}
/**
 * Skills Page Functionalities
 */
const skillsform = document.getElementById('skills-form')
if (skillsform) {
    skillsform.addEventListener('submit', handleSkillsSubmit)
    function handleSkillsSubmit(e) {
        console.log('skills saving')
        e.preventDefault()
        const data = {}
        const formData = new FormData(skillsform)
        for (let [key, value] of formData.entries()) data[key] = value
        if (data.skillphoto instanceof File) data.skillphoto = URL.createObjectURL(data.skillphoto)
        if (data.bannerphoto instanceof File) data.bannerphoto = URL.createObjectURL(data.bannerphoto)
        data.id = generateID()
        console.log(data)
        skillssave.SaveSkill(data)
        showError("Saved", skillsform)

    }
    document.getElementById('open-skillphoto').addEventListener('click', () => {
        console.log("Skill photo")
        document.getElementById('open-skillphoto-file').click()
    })
    document.getElementById('open-bannerphoto').addEventListener('click', () => {
        console.log("banner photo")
        document.getElementById('open-bannerphoto-file').click()
    })
}
/**
 * MyWork Page Functionalities
 */

const myworkform = document.getElementById('mywork-form')
if (myworkform) {
    myworkform.addEventListener('submit', handleMyWork)
    function handleMyWork(e) {
        e.preventDefault()
        const formData = new FormData(myworkform)
        const data = {}
        for (let [key, value] of formData.entries()) data[key] = value
        if (data.myworkimg instanceof File) data.myworkimg = URL.createObjectURL(data.myworkimg)
        data.id = generateID()
        console.log(data)
        const res = worksave.SaveNewWork(data)
        if (res == undefined) showError("Saved", myworkform)
    }
    document.getElementById('mywork-img-btn').addEventListener('click', () => {
        document.getElementById('mywork-img').click()
    })

}
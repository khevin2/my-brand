import generateID from "../helpers/generate_id.js"
import showError from "../helpers/show_error.js"
import Save, { SaveAbout, SaveSkills, SaveWork, SaveBlog } from "../helpers/save_local.js" // Utility to save to localstorage
import { uploadToFirebase } from "../helpers/firebase_util.js"
import { validateAbout, validateBlog, validateSkills, validateWork } from "../helpers/validate.js"
const save = new Save() // Initialize the utility
const aboutsave = new SaveAbout()
const skillssave = new SaveSkills()
const worksave = new SaveWork()
const blogsave = new SaveBlog()

let $email, $id = ''
if (!sessionStorage.getItem('token')) window.location = '/login.html'
else {
    $email = sessionStorage.getItem('email')
    const $user = await save.getUserByEmail($email)
    $id = $user._id
}
const getUser = async () => await save.getUser($id)
const user = await getUser()


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
if (close_btn)
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
async function handleAccountForm(e) {
    e.preventDefault()
    console.log("saving")
    const form = new FormData(accountForm)
    const data = {}
    for (let [key, value] of form.entries()) data[key] = value
    if (data.photo instanceof File) data.photo = await uploadToFirebase(data.photo)
    const res = await save.updateUser($id, data)
    console.log(res)
    if (res.data)
        showError("User updated successfully..", accountForm)
    else showError(res, accountForm)

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
    async function handlePwdChange(e) {
        e.preventDefault()
        const formData = new FormData(pwdform)
        const data = {}
        for (let [key, value] of formData.entries()) data[key] = value
        if (data.currentpwd == "") return showError("Current Password Cannot be empty.", pwdform)
        if (data.newpwd == "") return showError("New Password does not match!", pwdform)
        if (data.confirmpwd == "") return showError("New Password does not match!", pwdform)
        if (data.newpwd != data.confirmpwd) return showError("New Password does not match!", pwdform)
        if (save.checkPassword($id, data.currentpwd)) {
            const newUser = await save.updateUser({
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
    document.getElementsByName('phone')[0].value = user.phone
    document.getElementsByClassName('account-profile')[0].src = user.photo
    console.log(user, "\n", new Date(user.dob))
    document.getElementsByName('dob')[0].value = `${new Date(user?.dob).getFullYear()}-0${new Date(user?.dob).getMonth() + 1}-0${new Date(user?.dob).getDay()}`
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
        if (data.photo instanceof File) data.photo = uploadToFirebase(data.photo)
        console.log(data)
        if (validateAbout(data, aboutform)) return
        aboutsave.saveAbout(data)
        showError("Saved", aboutform)
    }
    const abt = aboutsave.getAbout()
    // document.getElementsByName('aboutphoto')[0].value = abt.aboutphoto
    document.getElementsByName('aboutnames')[0].value = abt.aboutnames || ""
    document.getElementsByName('aboutcarier')[0].value = abt.aboutcarier || ""
    document.getElementsByName('aboutdesc')[0].value = abt.aboutdesc || ""
}
/**
 * Skills Page Functionalities
 */
const skillsform = document.getElementById('skills-form')
if (skillsform) {
    skillsform.addEventListener('submit', handleSkillsSubmit)
    async function handleSkillsSubmit(e) {
        console.log('skills saving')
        e.preventDefault()
        const data = {}
        const formData = new FormData(skillsform)
        for (let [key, value] of formData.entries()) data[key] = value
        if (data.skillphoto instanceof File) data.skillphoto = await uploadToFirebase(data.skillphoto)
        if (data.bannerphoto instanceof File) data.bannerphoto = await uploadToFirebase(data.bannerphoto)
        debugger
        console.log(data)
        if (validateSkills(data, skillsform)) return
        const params = new URLSearchParams(window.location.search) // Get parameters from search params
        const skillID = params.get('id')
        if (skillID) {
            skillssave.updateSkill(skillID, data)
            showError("Saved", skillsform)
        } else {
            data.id = generateID()
            skillssave.SaveSkill(data)
            showError("Saved", skillsform)
        }
        skillsform.reset()

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
    async function handleMyWork(e) {
        e.preventDefault()
        const formData = new FormData(myworkform)
        const data = {}
        for (let [key, value] of formData.entries()) data[key] = value
        if (data.myworkimg instanceof File) data.myworkimg = await uploadToFirebase(data.myworkimg)
        if (validateWork(data, myworkform)) return
        const params = new URLSearchParams(window.location.search) // Get parameters from search params
        const workID = params.get('id')
        if (workID) {
            worksave.updateWork(workID, data)
            showError("Saved", myworkform)
        } else {
            data.id = generateID()
            const res = worksave.SaveNewWork(data)
            if (res == undefined) showError("Saved", myworkform)
        }
        myworkform.reset()
    }
    document.getElementById('mywork-img-btn').addEventListener('click', () => {
        document.getElementById('mywork-img').click()
    })
}

const blogform = document.getElementById('blog-form')
if (blogform) {
    blogform.addEventListener('submit', handleBlogSubmit)
    async function handleBlogSubmit(e) {
        e.preventDefault()
        const formData = new FormData(blogform)
        const data = {}
        for (let [key, value] of formData.entries()) data[key] = value
        if (data.blogphoto instanceof File) data.blogphoto = await uploadToFirebase(data.blogphoto)

        const tagsArray = data.blogtags.split(',')
        data.tags = tagsArray.map(tag => tag.trim())
        if (data.tags[0] == '') data.tags = []
        delete data.blogtags


        if (validateBlog(data, blogform)) return
        console.log(data)
        const params = new URLSearchParams(window.location.search)
        const blogID = params.get('id')
        if (blogID) {
            const res = await blogsave.updateBlog(blogID, data)
            if (res.isErr)
                showError('Saved', blogform)
            else showError(res.error, blogform)
        } else {
            const res = await blogsave.saveNewBlog(data)
            if (res?.title) showError("Saved", blogform)
            else return showError(`${res}`, blogform)
        }
        blogform.reset()
    }
    document.getElementById('blogphoto-btn').addEventListener('click', () => {
        document.getElementById('open-blogphoto-file').click()
    })
}

// DELETE A BLOG
if (document.getElementById('dash-blog-delete')) {
    document.getElementById('dash-blog-delete').addEventListener('click', async () => {
        console.log('delete start')
        const params = new URLSearchParams(window.location.search)
        const blogID = params.get('id')
        console.log(blogID)
        await blogsave.deleteBlog(blogID)
        window.location = './blog.html'
    })
}
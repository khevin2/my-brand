import generateID from "../helpers/generate_id.js"
import showError, { successNotification, errorNotification } from "../helpers/show_error.js"
import Save, { SaveAbout, SaveSkills, SaveWork, SaveBlog, SaveMessage } from "../helpers/save_local.js" // Utility to save to localstorage
import { uploadToFirebase } from "../helpers/firebase_util.js"
import { validateAbout, validateBlog, validateSkills, validateWork } from "../helpers/validate.js"
import { signout } from "../assets/js/signout.js"
const save = new Save() // Initialize the utility
const aboutsave = new SaveAbout()
const skillssave = new SaveSkills()
const worksave = new SaveWork()
const blogsave = new SaveBlog()

let $email, $id = ''
if (!sessionStorage.getItem('token')) window.location = '/login.html'
else {
    if (sessionStorage.getItem('userType') != "admin") window.location = "/login.html"
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
    if (data.photo.size == 0) delete data.photo
    if (data.photo instanceof File) data.photo = await uploadToFirebase(data.photo)
    const res = await save.updateUser($id, data)
    console.log(res)
    if (res.data)
        successNotification("User updated successfully..")
    else errorNotification(res)

}
if (accountForm) {
    let emailState = true
    let phoneState = true
    document.getElementsByName('email')[0].disabled = emailState
    document.getElementsByName('phone')[0].disabled = phoneState

    document.getElementsByName('email')[0].nextElementSibling.addEventListener('click', () => {
        document.getElementsByName('email')[0].disabled = !emailState
        emailState = !emailState
    })

    document.getElementsByName('phone')[0].nextElementSibling.addEventListener('click', () => {
        document.getElementsByName('phone')[0].disabled = !phoneState
        phoneState = !phoneState
    })
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
        if (data.currentpwd == "") return errorNotification("Current Password Cannot be empty.")
        if (data.newpwd == "") return errorNotification("New Password should not be empty!")
        if (data.confirmpwd == "") return errorNotification("Confirm Password should not be empty!")
        if (data.newpwd != data.confirmpwd) return errorNotification("New Password does not match!")

        const res = await save.checkPassword($id, { password: data.currentpwd, newPassword: data.newpwd })
        if (res.data) successNotification("Password Updated")

        else return errorNotification(res.message)
    }
    document.getElementsByName('email')[0].value = user.email
    document.getElementsByName('names')[0].value = user.names
    document.getElementsByName('phone')[0].value = user.phone
    document.getElementsByClassName('account-profile')[0].src = user.photo
    document.getElementsByName('dob')[0].value = new Date(user?.dob).toISOString().split("T")[0]
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
        successNotification("Saved")
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

        if (validateSkills(data)) return

        if (data.skillphoto instanceof File) data.skillphoto = await uploadToFirebase(data.skillphoto)
        if (data.bannerphoto instanceof File) data.bannerphoto = await uploadToFirebase(data.bannerphoto)

        data.skillbanner = data.bannerphoto
        delete data.bannerphoto

        const params = new URLSearchParams(window.location.search) // Get parameters from search params
        const skillID = params.get('id')


        if (skillID) {
            const res = await skillssave.updateSkill(skillID, data)
            if (res.data) successNotification("Saved")
            else return errorNotification(res.message)
        } else {
            const res = await skillssave.SaveSkill(data)
            if (res.data) successNotification("Saved")
            else return errorNotification("Unable to save new skill..")
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

        data.workimg = data.myworkimg

        delete data.myworkimg


        data.frameworks = data.frameworks.split(',')
        data.frameworks = data.frameworks.map(framework => framework.trim())


        if (validateWork(data, myworkform)) return

        const params = new URLSearchParams(window.location.search) // Get parameters from search params
        const workID = params.get('id')


        if (workID) {
            worksave.updateWork(workID, data)
            successNotification("Saved")
        } else {
            data.id = generateID()
            const res = worksave.SaveNewWork(data)
            if (res == undefined) successNotification("Saved")
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
                successNotification('Saved')
            else errorNotification(res.error)
        } else {
            const res = await blogsave.saveNewBlog(data)
            if (res?.title) successNotification("Saved")
            else return errorNotification(`${res}`)
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



// HANDLE MESSAGES   

if (document.querySelector('.message-container')) {
    const db = new SaveMessage()
    const data = await db.getMessages()
    const messages = data.data

    async function deleteMessage(index) {
        const deletedMessage = messages.splice(index, 1)
        makeMessages(messages)
        const res = await db.deleteMessage(deletedMessage[0]._id)
        if (res.error) errorNotification(res.message)
        else successNotification("Message deleted successfully..")
    }
    async function sendMessage(index, msg) {
        const message = messages[index]
        const res = await db.replyMessage(message._id, msg)
        if (res.error) errorNotification(res.message)
        else successNotification(res.message)

    }

    // MAKE MESSAGES
    async function makeMessages(messageArr) {
        document.querySelector('.message-container').innerHTML = ""

        messageArr.forEach((msg, id) => {

            const messageContainer = document.createElement("div");
            messageContainer.classList.add("single-message");

            const messagePart = document.createElement("div");
            messagePart.classList.add("message-part");
            messageContainer.appendChild(messagePart);

            const senderContainer = document.createElement("span");
            senderContainer.classList.add("message-sender");
            messagePart.appendChild(senderContainer);

            const senderName = document.createElement("h6");
            senderName.classList.add("message-names");
            senderName.textContent = msg.names;
            senderContainer.appendChild(senderName);

            const senderEmail = document.createElement("h6");
            senderEmail.classList.add("message-names");
            senderEmail.textContent = msg.email;
            senderContainer.appendChild(senderEmail);

            const message = document.createElement("span");
            message.classList.add("message");
            messagePart.appendChild(message);

            const subject = document.createElement("h6");
            subject.classList.add("message-subject");
            subject.textContent = msg.subject;
            message.appendChild(subject);

            const body = document.createElement("p");
            body.classList.add("message-body");
            body.textContent = msg.body;
            message.appendChild(body);

            const actionsContainer = document.createElement("span");
            actionsContainer.classList.add("message-action");
            messagePart.appendChild(actionsContainer);

            const sendIcon = document.createElement("i");
            sendIcon.classList.add("bx", "bx-send", "bx-md", "text-blue", "pointer");
            actionsContainer.appendChild(sendIcon);

            const trashIcon = document.createElement("i");
            trashIcon.classList.add("bx", "bxs-trash", "bx-md", "pointer");
            trashIcon.style.color = "rgb(183, 0, 0)";
            actionsContainer.appendChild(trashIcon);

            const respondContainer = document.createElement("div");
            respondContainer.classList.add("message-respond", "d-none");
            messageContainer.appendChild(respondContainer);

            const textarea = document.createElement("textarea");
            respondContainer.appendChild(textarea);

            const sendButton = document.createElement("button");
            sendButton.type = "button";
            respondContainer.appendChild(sendButton);

            const buttonIcon = document.createElement("i");
            buttonIcon.classList.add("bx", "bx-send", "bx-sm");
            buttonIcon.style.color = "inherit";
            sendButton.appendChild(buttonIcon);

            sendIcon.addEventListener('click', () => respondContainer.classList.toggle('d-none'))

            trashIcon.addEventListener('click', () => deleteMessage(id))

            sendButton.addEventListener('click', () => sendMessage(id, textarea.value))

            document.querySelector('.message-container').append(messageContainer)

        });
    }
    makeMessages(messages)
}

// HANDLE DASHBOARD LOG OUT

const logoutBtn = document.getElementById('dash-logout-btn')
if (logoutBtn)
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault()
        signout()
    })
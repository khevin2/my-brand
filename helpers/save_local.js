/* 
  USER EXAMPLE
{
    names: "cyusa kheven",
    dob: "27/05/2005",
    email: "cyusa.kheven@outlook.com",
    password: "123456",
    phone: "0783903252",
    profile: "https://picsum.photos/200/200"
}
*/

import { fetchData } from "./backend_hepler.js"
import { removeLoading, showLoading } from "./loader.js"






function Save() {

    this.getUsers = async function () {
        try {
            showLoading()
            const { data } = await fetchData('/users', 'get')
            return data
        } finally {
            removeLoading()
        }
    }
    this.saveUser = async function (user) {
        try {
            showLoading()
            if (this.checkEmail(user.email)) return `User with ${user.email} already exists.`
            const { message, data } = await fetchData('/users', 'post', user)
            if (message == 'success') return data
            else return message
        } finally {
            removeLoading()
        }
    }
    this.getUser = async function (id) {
        try {
            showLoading()
            const { message, data } = await fetchData(`/users/${id}`, 'get')
            if (message == 'success') return data
            else return message
        } finally {
            removeLoading()
        }
    }
    this.deleteUser = async function (id) {
        try {
            showLoading()
            const { message, data } = await fetchData(`/users/${id}`, 'delete')
            if (message == 'success') return 'Deleted'
        } finally {
            removeLoading()
        }
    }
    this.checkUser = async function (id) {
        try {
            showLoading()
            return (await this.getUser(id)).email ? true : false
        } finally {
            removeLoading()
        }
    }
    this.checkEmail = async function (email) {
        try {
            showLoading()
            const { message } = await fetchData(`/users/email?email=${email}`, 'get')
            return message == "success" ? true : false
        } finally {
            removeLoading()
        }
    }

    this.checkPassword = function (id, password) {
        try {
            showLoading()
            let users = JSON.parse(this.users)
            if (users.find(user => user.password == password)) {
                return this.getUser(id).password == password
            }
            else return false
        } finally {
            removeLoading()
        }
    }

    this.getUserByEmail = async function (email) {
        try {
            showLoading()
            const { message, data } = await fetchData(`/users/email?email=${email}`, 'get')
            if (message == 'success') return data
            else return message
        } finally {
            removeLoading()
        }

    }
    this.updateUser = async function (id, user) {
        try {
            showLoading()
            const { message, data, error } = await fetchData(`/users/${id}`, 'PATCH', user)
            console.log(message, error, user)
            if (message == 'success') return data
            else return message
        } finally {
            removeLoading()
        }
    }
    this.login = async function (data) {
        try {
            showLoading()
            const res = await fetchData(`/login`, 'post', data)
            if (res.message == 'success') {
                sessionStorage.setItem("token", res.token)
                sessionStorage.setItem('email', data.email)
                return true
            }
            return false
        } finally {
            removeLoading()
        }
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

export function SaveSkills() {
    this.skills = localStorage.getItem('skills') || '[]'

    this.SaveSkill = function (skill) {
        if (skill.skillphoto == '') return "Add photo please"
        if (skill.skillname == '') return "Add Skill name please"
        if (skill.bannerphoto == '') return 'Add banner please'
        if (skill.skilldesc == '') return "Add description please"
        const skills = JSON.parse(localStorage.getItem('skills') || '[]')
        skills.push(skill)
        localStorage.setItem('skills', JSON.stringify(skills))
    }
    this.getSkill = function (id) {
        const skills = JSON.parse(localStorage.getItem('skills') || '[]')
        return skills.filter(skill => skill.id == id)[0] || {}
    }
    this.getAllSkills = function () {
        return JSON.parse(localStorage.getItem('skills') || '[]')
    }
    this.updateSkill = function (id, object) {
        const skills = JSON.parse(localStorage.getItem('skills') || '[]')
        const index = skills.findIndex(skill => skill.id == id)
        Object.assign(skills[index], object)
        localStorage.setItem('skills', JSON.stringify(skills))
    }
}

export function SaveWork() {
    this.SaveNewWork = function (work) {
        if (work.myworkimg == '') return "Add photo please"
        if (work.workname == '') return "Add work name please"
        if (work.link_to_project == '') return 'Add link to project please'
        if (work.workdesc == '') return "Add description please"
        if (work.frameworks == '') return "Add frameworks please"
        const works = JSON.parse(localStorage.getItem('works') || '[]')
        works.push(work)
        localStorage.setItem('works', JSON.stringify(works))
    }

    this.getWork = function (id) {
        const works = JSON.parse(localStorage.getItem('works') || '[]')
        return works.filter(work => work.id == id)[0] || {}
    }
    this.getAllWork = function () {
        return JSON.parse(localStorage.getItem('works') || '[]')
    }
    this.updateWork = function (id, object) {
        const works = JSON.parse(localStorage.getItem('works') || '[]')
        const index = works.findIndex(work => work.id == id)
        Object.assign(works[index], object)
        localStorage.setItem('works', JSON.stringify(works))
    }
}

export function SaveBlog() {
    this.saveNewBlog = async function (blog) {
        try {
            showLoading()
            const blogdata = {}
            blogdata.title = blog.blogtitle
            blogdata.intro = blog.blogintro
            blogdata.body = blog.blogbody
            blogdata.tags = blog.tags
            blogdata.photo = blog.blogphoto

            const { error, message, data } = await fetchData('/posts', 'POST', blogdata)
            if (error) return `${message} - ${error}`
            else return data
        } finally {
            removeLoading()
        }

    }
    this.getBlog = async function (id) {
        try {
            showLoading()
            const { error, message, data } = await fetchData(`/posts/${id}`, 'GET')
            if (error) return message
            else return data
        } finally {
            removeLoading()
        }
    }
    this.getAllBlogs = async function () {
        try {
            showLoading()
            const { error, message, data } = await fetchData(`/posts`, 'GET')
            if (error) return message
            else return data
            // Return an array
        } finally {
            removeLoading()
        }
    }
    this.AddLike = async function (id) {
        try {
            showLoading()
            const { error, message, data } = await fetchData(`/posts/${id}/like`, 'POST')
            if (error) return message
            else return data
            // return blog likes
        } finally {
            removeLoading()
        }
    }
    this.updateBlog = async function (id, object) {
        try {
            showLoading()
            const blogdata = {}
            blogdata.title = object.blogtitle
            blogdata.intro = object.blogintro
            blogdata.body = object.blogbody
            blogdata.tags = object.tags
            blogdata.photo = object.blogphoto
            const { error, message, data } = await fetchData(`/posts/${id}`, 'PATCH', blogdata)
            console.log(error, message, data)
            if (error) return { isErr: true, message, error }
            else return { data, message, isErr: false }
        } finally {
            removeLoading()
        }
    }

    this.deleteBlog = async function (id) {
        try {
            showLoading()
            const { error, message, data } = await fetchData(`/posts/${id}`, 'DELETE')
            if (error) return message
            else return data
            // return data.acknowledged: true
        } finally {
            removeLoading()
        }

    }
}

export function SaveComment() {
    this.saveNewComment = async function (id, comment) {
        try {
            showLoading()
            const { error, data, message } = await fetchData(`/posts/${id}/comment`, "POST", comment)
            if (error) return error
            else return data
        } finally {
            removeLoading()
        }
    }
    this.getPostComments = async function (postID) {
        try {
            showLoading()
            const { error, data, message } = await fetchData(`/posts/${postID}/comment`, "GET")
            if (!data) return message
            else return data
        } finally {
            removeLoading()
        }

    }
}

export function SaveMessage() {
    this.save = async function (messageObj) {
        try {
            showLoading()
            const res = await fetchData(`/messages`, "POST", messageObj)
            if (res.error) return { error: res.error, message: res.message }
            else return { data: res.data, message: res.message }
        } finally {
            removeLoading()
        }
    }
    this.replyMessage = async function (messageID, reply) {
        try {
            showLoading()
            const { error, message, data } = await fetchData(`/messages/${messageID}`, "PATCH", { reply })
            if (error) return { error, message }
            else return { data, message }
        } finally {
            removeLoading()
        }
    }
    this.getMessages = async function () {
        try {
            showLoading()
            const { error, message, data } = await fetchData('/messages', "GET")
            if (error) return { error, message }
            else return { data, message }
        } finally {
            removeLoading()
        }
    }
    this.deleteMessage = async function (messageID) {
        try {
            showLoading()
            const { error, message, data } = fetchData(`/messages/${messageID}`, "DELETE")
            if (error) return { error, message }
            else return { data, message }
        } finally {
            removeLoading()
        }
    }
}
import { errorNotification } from "./show_error.js"


export function validateAbout(data, form) {
    let error = false
    if (data.aboutnames == '') {
        error = true
        errorNotification("Names can not be empty..")
    }
    if (data.aboutnames.length < 3) {
        error = true
        errorNotification("Names are too short..")
    }
    if (data.aboutcarier == "") {
        error = true
        errorNotification("Carier can not be empty..")
    }
    if (data.aboutcarier.length < 4) {
        error = true
        errorNotification("Carier is too short..")
    }
    if (data.aboutdesc == "") {
        error = true
        errorNotification("Description can not be empty..")
    }
    if (data.aboutdesc.length < 12) {
        error = true
        errorNotification("Description is too short..")
    }

    return error
}

export function validateSkills(data, form) {
    let error = false
    if (data.skillname == '') {
        error = true
        errorNotification("Skill name can not be empty..")
    }
    if (data.skillname.length < 3) {
        error = true
        errorNotification("Skill name are too short..")
    }
    if (data.skilldesc == "") {
        error = true
        errorNotification("Skill description can not be empty..")
    }
    if (data.skilldesc.length < 14) {
        error = true
        errorNotification("Skill description is too short..")
    }

    return error
}

export function validateWork(data, form) {
    let error = false
    if (data.workname == '') {
        error = true
        errorNotification("Work title cannot be empty..")
    }
    if (data.workname.length < 3) {
        error = true
        errorNotification('Work title is too short..')
    }
    if (data.link_to_project == "") {
        error = true
        errorNotification("Link to prject cannot be empty..")
    }
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(data.link_to_project)) {
        error = true
        errorNotification("please provide  valid link to project..")
    }
    if (data.workdesc == '') {
        error = true
        errorNotification("Work description cannot be empty..")
    }
    if (data.workdesc.length < 10) {
        error = true
        errorNotification('Work description is too short..')
    }
    return error
}


export function validateBlog(data, form) {
    let error = false
    if (data.blogtitle == "") {
        error = true
        errorNotification("Blog title cannot be empty..")
    }
    if (data.blogphoto == undefined || data.blogphoto == 'undefined') {
        error = true
        errorNotification("Blog photo cannot be empty..")
    }
    if (data.blogtitle.length < 6) {
        error = true
        errorNotification("Blog title is too short..")
    }
    if (data.blogintro == "") {
        error = true
        errorNotification("Blog introduction cannot be empty..")
    }
    if (data.blogintro.length < 6) {
        error = true
        errorNotification("Blog introduction is too short..")
    }
    if (data.blogbody == "") {
        error = true
        errorNotification("Blog body cannot be empty..")
    }
    if (data.blogbody.length < 30) {
        error = true
        errorNotification("Blog body is too short..")
    }
    if (!(data.tags instanceof Array)) {
        error = true
        errorNotification("Tags malformatted..")
    }
    if (data.tags.length == 0) {
        error = true
        errorNotification("Tags cannot be empty..")
    }
    return error
}

export function validateContactForm(data) {
    let error = false

    if (!data.names) {
        error = true
        errorNotification("Names are missing..")
    }
    if (data.names == '') {
        error = true
        errorNotification("Names are missing..")
    }
    if (data.names.length < 4) {
        error = true
        errorNotification("Names are too short..")
    }
    if (!data.email) {
        error = true
        errorNotification("Email is missing..")
    }

    const emailRegex = /^[a-zA-Z0-9.@]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
    if (!emailRegex.test(data.email)) {
        error = true
        errorNotification("Email is not valid..")
    }
    if (!data.subject) {
        error = true
        errorNotification("Subject is missing..")
    }
    if (data.subject.length < 3) {
        error = true
        errorNotification("Subject is too short..")
    }
    if (data.body.length < 4) {
        error = true
        errorNotification("Message is too short..")
    }
    if (!data.body) {
        error = true
        errorNotification("Message is empty..")
    }
    return error
}
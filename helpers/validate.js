import showError from "./show_error.js"


export function validateAbout(data, form) {
    let error = false
    if (data.aboutnames == '') {
        error = true
        showError("Names can not be empty..", form)
    }
    if (data.aboutnames.length < 3) {
        error = true
        showError("Names are too short..", form)
    }
    if (data.aboutcarier == "") {
        error = true
        showError("Carier can not be empty..", form)
    }
    if (data.aboutcarier.length < 4) {
        error = true
        showError("Carier is too short..", form)
    }
    if (data.aboutdesc == "") {
        error = true
        showError("Description can not be empty..", form)
    }
    if (data.aboutdesc.length < 12) {
        error = true
        showError("Description is too short..", form)
    }

    return error
}

export function validateSkills(data, form) {
    let error = false
    if (data.skillname == '') {
        error = true
        showError("Skill name can not be empty..", form)
    }
    if (data.skillname.length < 3) {
        error = true
        showError("Skill name are too short..", form)
    }
    if (data.skilldesc == "") {
        error = true
        showError("Skill description can not be empty..", form)
    }
    if (data.skilldesc.length < 14) {
        error = true
        showError("Skill description is too short..", form)
    }

    return error
}

export function validateWork(data, form) {
    let error = false
    if (data.workname == '') {
        error = true
        showError("Work title cannot be empty..", form)
    }
    if (data.workname.length < 3) {
        error = true
        showError('Work title is too short..', form)
    }
    if (data.link_to_project == "") {
        error = true
        showError("Link to prject cannot be empty..", form)
    }
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(data.link_to_project)) {
        error = true
        showError("please provide  valid link to project..", form)
    }
    if (data.workdesc == '') {
        error = true
        showError("Work description cannot be empty..", form)
    }
    if (data.workdesc.length < 10) {
        error = true
        showError('Work description is too short..', form)
    }
    return error
}


export function validateBlog(data, form) {
    let error = false
    if (data.blogtitle == "") {
        error = true
        showError("Blog title cannot be empty..", form)
    }
    if (data.blogphoto == undefined || data.blogphoto == 'undefined') {
        error = true
        showError("Blog photo cannot be empty..", form)
    }
    if (data.blogtitle.length < 6) {
        error = true
        showError("Blog title is too short..", form)
    }
    if (data.blogintro == "") {
        error = true
        showError("Blog introduction cannot be empty..", form)
    }
    if (data.blogintro.length < 6) {
        error = true
        showError("Blog introduction is too short..", form)
    }
    if (data.blogbody == "") {
        error = true
        showError("Blog body cannot be empty..", form)
    }
    if (data.blogbody.length < 30) {
        error = true
        showError("Blog body is too short..", form)
    }
    if (!(data.tags instanceof Array)) {
        error = true
        showError("Tags malformatted..", form)
    }
    if (data.tags.length == 0) {
        error = true
        showError("Tags cannot be empty..", form)
    }
    return error
}

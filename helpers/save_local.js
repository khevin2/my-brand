/* 
  USER EXAMPLE
{
    id: 1,
    names: "cyusa kheven",
    age: "27/05/2005",
    email: "cyusa.kheven@outlook.com",
    password: "123456",
    profile: "https://picsum.photos/200/200"
}
*/

function Save() {

    this.users = localStorage.getItem('users') || '[]'

    this.getUsers = function () {
        return JSON.parse(this.users)
    }
    this.saveUser = function (user) {
        if (this.checkUser(user.id)) return `User with ${user.id} already exists.`
        if (this.checkEmail(user.email)) return `User with ${user.email} already exists.`
        const users = JSON.parse(this.users)
        users.push(user)
        this.users = JSON.stringify(users)
        localStorage.setItem('users', this.users)
        return JSON.parse(this.users)
    }
    this.getUser = function (id) {
        let users = JSON.parse(this.users)
        return users.filter(user => user.id == id)[0]
    }
    this.deleteUser = function (id) {
        let users = JSON.parse(this.users)
        this.users = JSON.stringify(users.filter(user => user.id != id))
        localStorage.setItem('users', this.users)
        return JSON.parse(this.users)
    }
    this.checkUser = function (id) {
        let users = JSON.parse(this.users)
        if (users.find(user => user.id == id)) return true
        else return false
    }
    this.checkEmail = function (email) {
        let users = JSON.parse(this.users)
        if (users.find(user => user.email == email)) return true
        else return false
    }
    this.checkPassword = function (id, password) {
        let users = JSON.parse(this.users)
        if (users.find(user => user.password == password)) {
            return this.getUser(id).password == password
        }
        else return false
    }
    this.getUserByEmail = function (email) {
        let users = JSON.parse(this.users)
        return users.filter(user => user.email == email)[0]
    }
    this.updateUser = function (user) {
        if (!this.checkUser(user.id)) {
            this.saveUser(user)
            return
        }
        const userToUpdate = this.getUser(user.id)
        const newUser = {
            id: userToUpdate.id,
            names: user.names || userToUpdate.names,
            age: user.age || userToUpdate.age,
            email: user.email || userToUpdate.email,
            password: user.password || userToUpdate.password,
            profile: user.profile || userToUpdate.profile
        }
        let users = JSON.parse(this.users)
        let item = users.filter(item => item.id != user.id)
        item.push(newUser)
        this.users = JSON.stringify(item)
        localStorage.setItem('users', this.users)
        return newUser
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
        skills[index]
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
}

export function SaveBlog() {
    this.saveNewBlog = function (blog) {
        if (blog.blogphoto == '') return "Photo required please"
        if (blog.blogtitle == '') return "Title is required"
        if (blog.blogintro == '') return "Introduction is required"
        if (blog.blogbody == '') return "The body of post is required"
        const blogs = JSON.parse(localStorage.getItem('blogs') || '[]')
        blogs.push(blog)
        localStorage.setItem('blogs', JSON.stringify(blogs))

    }
    this.getBlog = function (id) {
        const blogs = JSON.parse(localStorage.getItem('blogs') || '[]')
        return blogs.filter(blog => blog.id == id)[0] || {}
    }
    this.getAllBlogs = function () {
        return JSON.parse(localStorage.getItem('blogs') || '[]')
    }
    this.AddLike = function (id) {
        const blogs = JSON.parse(localStorage.getItem('blogs') || '[]')
        const [likedBlog] = blogs.filter(blog => blog.id == id)
        console.log(likedBlog, "\n", likedBlog.likes)
        debugger
        likedBlog.likes += 1
        const filteredBlogs = blogs.filter(blog => blog.id != id)
        filteredBlogs.push(likedBlog)
        localStorage.setItem('blogs', JSON.stringify(filteredBlogs))
        return likedBlog.likes
    }
}

export function SaveComment() {
    this.saveNewComment = function (comment) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]')
        comments.push(comment)
        localStorage.setItem('comments', JSON.stringify(comments))
    }
    this.getPostComments = function (postID) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]')
        const postComments = comments.filter(comment => comment.postID == postID)
        return postComments
    }
}
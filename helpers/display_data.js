import { SaveAbout, SaveBlog, SaveComment, SaveSkills, SaveWork } from "./save_local.js";

if (document.getElementById('client-about')) {
    const about = new SaveAbout()
    const data = about.getAbout()
    // document.getElementById('client-about-img').src = data?.aboutphoto
    document.getElementById('client-about-occupation').innerText = data?.aboutcarier
    document.getElementById('client-about-names').innerText = data?.aboutnames
    document.getElementById('client-about-desc').innerText = data?.aboutdesc

}

if (document.getElementById('client-skills')) {
    const save = new SaveSkills()
    const skills = save.getAllSkills()
    let data = ''
    if (skills.length <= 0) data = "<h4 class='h4'> Skills will appear here..</h4>"
    else
        for (let skill of skills) {
            data += `<div class="skill">
                <div class="skill-card">
                    <img src="${skill.skillphoto}" alt="skill image" class="skill-card-img">
                    <div class="skill-desc">
                        <h5>${skill.skillname}</h5>
                        <p>${skill.skilldesc}</p>
                    </div>
                </div>
                <img src="${skill.bannerphoto}" alt="a person holding a certificate">
            </div>`
        }
    document.getElementById('client-skills').innerHTML = data
}
if (document.getElementById('client-mywork')) {
    const save = new SaveWork()
    const works = save.getAllWork()
    let data = ''
    if (works.length <= 0) data = "<h4 class='h4'> Works will appear here..</h4>"
    else
        for (let work of works) {
            data += `<div class="work">
                <div class="work-desc">
                    <h4>${work.workname}</h4>
                    <p>${work.workdesc}</p>
                    <div class="work-row">
                        <a href="${work.link_to_project}" target="_blank">https://cybersecuritymeetup.rw</a>
                        <span>
                            <!--<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.00016 6.73998C8.68683 6.73998 9.24683 7.29998 9.24683 7.99998C9.24683 8.66665 8.68683 9.23331 8.00016 9.23331C7.3135 9.23331 6.7535 8.66665 6.7535 7.99998C6.7535 7.29998 7.3135 6.73998 8.00016 6.73998ZM4.9135 13.3333C5.3335 13.5866 6.2535 13.2 7.3135 12.2C6.96683 11.8066 6.62683 11.38 6.30683 10.9333C5.76016 10.88 5.22016 10.8 4.70683 10.6933C4.36683 12.12 4.4935 13.1 4.9135 13.3333ZM5.38683 9.50665L5.1935 9.16665C5.12016 9.35998 5.04683 9.55331 5.00016 9.73998C5.18016 9.77998 5.38016 9.81331 5.58683 9.84665C5.52016 9.73331 5.4535 9.61998 5.38683 9.50665ZM9.74683 8.99998L10.2868 7.99998L9.74683 6.99998C9.54683 6.64665 9.3335 6.33331 9.14016 6.01998C8.78016 5.99998 8.40016 5.99998 8.00016 5.99998C7.60016 5.99998 7.22016 5.99998 6.86016 6.01998C6.66683 6.33331 6.4535 6.64665 6.2535 6.99998L5.7135 7.99998L6.2535 8.99998C6.4535 9.35331 6.66683 9.66665 6.86016 9.97998C7.22016 9.99998 7.60016 9.99998 8.00016 9.99998C8.40016 9.99998 8.78016 9.99998 9.14016 9.97998C9.3335 9.66665 9.54683 9.35331 9.74683 8.99998ZM8.00016 4.51998C7.8735 4.66665 7.74016 4.81998 7.60683 4.99998C7.74016 4.99998 7.86683 4.99998 8.00016 4.99998C8.1335 4.99998 8.26016 4.99998 8.3935 4.99998C8.26016 4.81998 8.12683 4.66665 8.00016 4.51998ZM8.00016 11.48C8.12683 11.3333 8.26016 11.18 8.3935 11C8.26016 11 8.1335 11 8.00016 11C7.86683 11 7.74016 11 7.60683 11C7.74016 11.18 7.8735 11.3333 8.00016 11.48ZM11.0802 2.66665C10.6668 2.41331 9.74683 2.79998 8.68683 3.79998C9.03349 4.19331 9.3735 4.61998 9.6935 5.06665C10.2402 5.11998 10.7802 5.19998 11.2935 5.30665C11.6335 3.87998 11.5068 2.89998 11.0802 2.66665ZM10.6135 6.49331L10.8068 6.83331C10.8802 6.63998 10.9535 6.44665 11.0002 6.25998C10.8202 6.21998 10.6202 6.18665 10.4135 6.15331C10.4802 6.26664 10.5468 6.37998 10.6135 6.49331ZM11.5802 1.79331C12.5602 2.35331 12.6668 3.82664 12.2535 5.54664C13.9468 6.04665 15.1668 6.87331 15.1668 7.99998C15.1668 9.12665 13.9468 9.95331 12.2535 10.4533C12.6668 12.1733 12.5602 13.6466 11.5802 14.2066C10.6068 14.7666 9.28016 14.1266 8.00016 12.9066C6.72016 14.1266 5.3935 14.7666 4.4135 14.2066C3.44016 13.6466 3.3335 12.1733 3.74683 10.4533C2.0535 9.95331 0.833496 9.12665 0.833496 7.99998C0.833496 6.87331 2.0535 6.04665 3.74683 5.54664C3.3335 3.82664 3.44016 2.35331 4.4135 1.79331C5.3935 1.23331 6.72016 1.87331 8.00016 3.09331C9.28016 1.87331 10.6068 1.23331 11.5802 1.79331ZM11.3868 7.99998C11.6135 8.49998 11.8135 8.99998 11.9802 9.50665C13.3802 9.08665 14.1668 8.48665 14.1668 7.99998C14.1668 7.51331 13.3802 6.91331 11.9802 6.49331C11.8135 6.99998 11.6135 7.49998 11.3868 7.99998ZM4.6135 7.99998C4.38683 7.49998 4.18683 6.99998 4.02016 6.49331C2.62016 6.91331 1.8335 7.51331 1.8335 7.99998C1.8335 8.48665 2.62016 9.08665 4.02016 9.50665C4.18683 8.99998 4.38683 8.49998 4.6135 7.99998ZM10.6135 9.50665C10.5468 9.61998 10.4802 9.73331 10.4135 9.84665C10.6202 9.81331 10.8202 9.77998 11.0002 9.73998C10.9535 9.55331 10.8802 9.35998 10.8068 9.16665L10.6135 9.50665ZM8.68683 12.2C9.74683 13.2 10.6668 13.5866 11.0802 13.3333C11.5068 13.1 11.6335 12.12 11.2935 10.6933C10.7802 10.8 10.2402 10.88 9.6935 10.9333C9.3735 11.38 9.03349 11.8066 8.68683 12.2ZM5.38683 6.49331C5.4535 6.37998 5.52016 6.26664 5.58683 6.15331C5.38016 6.18665 5.18016 6.21998 5.00016 6.25998C5.04683 6.44665 5.12016 6.63998 5.1935 6.83331L5.38683 6.49331ZM7.3135 3.79998C6.2535 2.79998 5.3335 2.41331 4.9135 2.66665C4.4935 2.89998 4.36683 3.87998 4.70683 5.30665C5.22016 5.19998 5.76016 5.11998 6.30683 5.06665C6.62683 4.61998 6.96683 4.19331 7.3135 3.79998Z"
                                    fill="#2F80ED" />
                            </svg>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 1.23328C7.82 1.23328 7.63333 1.27994 7.48 1.36661L2.52 4.23328C2.2 4.41994 2 4.76661 2 5.13994V10.8599C2 11.2333 2.2 11.5799 2.52 11.7666L3.82 12.5133C4.45333 12.8199 4.66667 12.8266 4.96 12.8266C5.89333 12.8266 6.43333 12.2599 6.43333 11.2733V5.62661C6.43333 5.54661 6.36667 5.47994 6.28667 5.47994H5.66667C5.58 5.47994 5.51333 5.54661 5.51333 5.62661V11.2733C5.51333 11.7133 5.06 12.1466 4.33333 11.7799L2.96667 10.9999C2.92 10.9666 2.89333 10.9133 2.89333 10.8599V5.13994C2.89333 5.07994 2.92 5.02661 2.96667 4.99994L7.92667 2.13994C7.96667 2.11328 8.03333 2.11328 8.07333 2.13994L13.0333 4.99994C13.08 5.02661 13.1067 5.07994 13.1067 5.13994V10.8599C13.1067 10.9133 13.08 10.9666 13.0333 10.9999L8.07333 13.8599C8.03333 13.8866 7.96667 13.8866 7.92 13.8599L6.66667 13.0999C6.61333 13.0799 6.56 13.0733 6.52667 13.0933C6.17333 13.2933 6.10667 13.3333 5.78 13.4333C5.7 13.4599 5.57333 13.5066 5.82667 13.6466L7.48 14.6266C7.64 14.7199 7.81333 14.7666 8 14.7666C8.18667 14.7666 8.36 14.7199 8.52 14.6266L13.48 11.7666C13.8 11.5799 14 11.2333 14 10.8599V5.13994C14 4.76661 13.8 4.41994 13.48 4.23328L8.52 1.36661C8.36667 1.27994 8.18667 1.23328 8 1.23328ZM9.33333 5.33328C7.92 5.33328 7.07333 5.92661 7.07333 6.92661C7.07333 7.99994 7.91333 8.31328 9.27333 8.44661C10.8933 8.60661 11.02 8.84661 11.02 9.16661C11.02 9.71994 10.5733 9.95328 9.53333 9.95328C8.21333 9.95328 7.93333 9.62661 7.83333 8.97328C7.82 8.90661 7.76 8.85328 7.68667 8.85328H7.04667C6.96667 8.85328 6.90667 8.91328 6.90667 8.99994C6.90667 9.82661 7.36 10.8266 9.53333 10.8266C11.1 10.8266 12 10.2066 12 9.12661C12 8.05328 11.28 7.77328 9.75333 7.56661C8.21333 7.36661 8.06 7.25994 8.06 6.89994C8.06 6.59994 8.19333 6.19994 9.33333 6.19994C10.3333 6.19994 10.7267 6.41994 10.88 7.10661C10.8933 7.17328 10.9533 7.21994 11.02 7.21994H11.6667C11.7 7.21994 11.74 7.20661 11.7667 7.17328C11.7933 7.14661 11.8133 7.10661 11.8 7.06661C11.7067 5.87994 10.92 5.33328 9.33333 5.33328Z"
                                    fill="#2F80ED" />
                            </svg>-->
                            ${work.frameworks}
                        </span>
                    </div>
                </div>
                <img src="${work.myworkimg}" alt="screenshoot of cybersecurity Meetup mobile">
            </div>`
        }
    document.getElementById('client-mywork').innerHTML = data
}
if (document.getElementById('client-blogs')) {
    const save = new SaveBlog()
    const blogs = save.getAllBlogs()
    let data = ''
    if (blogs.length <= 0) data = "<h4 class='h4'> Blogs will appear here..</h4>"
    else
        for (let blog of blogs) {
            data += `<div class="article">
                    <div class="article-desc">
                        <a href="./blog_view.html?id=${blog.id}"><h5>${blog.blogtitle}</h5></a>
                        <p>${blog.blogintro}</p>
                    </div>
                    <img src="${blog.blogphoto}" alt="Thumbnail of article">
                </div>`
        }
    document.getElementById('client-blogs').innerHTML = data
}
if (document.getElementById('client-blog-view')) {
    const db = new SaveBlog()
    const params = new URLSearchParams(window.location.search) // Get parameters from search params
    const id = params.get('id')
    const blog = db.getBlog(id)
    document.getElementById('client-blog-view-img').src = blog.blogphoto
    document.getElementById('client-blog-view-title').innerText = blog.blogtitle
    document.getElementById('client-blog-view-intro').innerText = blog.blogintro
    document.getElementById('client-blog-view-body').innerText = blog.blogbody
    document.title = blog.blogtitle

}

if (document.getElementById('client-popular-blogs')) {
    const db = new SaveBlog()
    const blogs = db.getAllBlogs()
    let html = ''
    for (let blog of blogs) {
        const divElement = document.createElement('div')
        divElement.classList.add('popular-article')
        const h5 = document.createElement('h5')
        h5.innerText = blog.blogtitle
        const p = document.createElement('p')
        p.innerText = blog.blogintro
        divElement.append(h5, p)
        document.getElementById('client-popular-blogs').append(divElement)
    }
    console.log('fire')
}
/**
 * COMMENTS ON BLOG_VIEW
 */
if (document.getElementById('comments-container')) {
    const db = new SaveComment()
    const params = new URLSearchParams(window.location.search) // Get parameters from search params
    const postID = params.get('id')
    const comments = db.getPostComments(postID)

    for (let comment of comments) {
        const p = document.createElement('p')
        p.classList.add("mb-3", "poppins")
        p.style.padding = '10px'
        p.style.borderRadius = '5px'
        p.style.backgroundColor = '#e8e8e8'
        p.innerText = comment?.comment
        document.getElementById('comments-container').append(p)
    }
}

/**
 * SKILLS LIST IN DASHBOARD
 */

if (document.getElementById('skills-list-dashboard')) {
    const db = new SaveSkills()
    const skills = db.getAllSkills()
    let data = ''
    if (skills.length <= 0) data = '<h4 class="h4"> Skills will appear here!</h4>'
    for (let skill of skills) {
        data += `<div class="popular-article">
                    <a href='./skills.html?id=${skill.id}'><h5>${skill.skillname}</h5></a>
                    <p>${skill.skilldesc}</p>
                </div>`
    }
    document.getElementById('skills-list-dashboard').innerHTML = data
}

/**
 * DISPLAY DATA IN SKILLS FORM TO UPDATE
 */

if (document.getElementById('skills-form')) {
    const db = new SaveSkills()
    const params = new URLSearchParams(window.location.search) // Get parameters from search params
    const skillID = params.get('id')
    // debugger
    if (skillID != null) {
        const { skilldesc, skillname, skillphoto, bannerphoto } = db.getSkill(skillID)
        document.getElementById('dash-skill-photo').src = skillphoto
        document.getElementById('dash-skill-name').value = skillname
        document.getElementById('dash-skill-desc').value = skilldesc
        document.getElementById('dash-skill-banner').src = bannerphoto
    }
}
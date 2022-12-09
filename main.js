const menu_btn = document.querySelector(".menu")
menu_btn.addEventListener('click', handleMenu)


function handleMenu() {
    menu_btn.classList.add('d-none')
    document.querySelector('.nav-links').classList.remove('d-none')
    console.log("Open")
}

function handleClose() {
    document.querySelector('.nav-links').classList.add('d-none')
    menu_btn.classList.remove('d-none')
    console.log("close")

}

const nav_links = document.querySelector('.nav-links')
nav_links.addEventListener('focusout', handleClose)
document.querySelector('.close-btn').addEventListener('click', handleClose)
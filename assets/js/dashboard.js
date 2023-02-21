const menu = document.getElementById('menu-btn')
const nav = document.querySelector('.nav')

if (menu) {
    const bxIcon = document.getElementById('bx-icon')
    menu.addEventListener('click', () => {
        nav.classList.toggle('d-sm-none')
        if (bxIcon.classList.contains('bx-menu')) {
            bxIcon.classList.remove('bx-menu')
            bxIcon.classList.add('bx-x-circle')
        } else {
            console.log("circle")
            bxIcon.classList.remove('bx-x-circle')
            bxIcon.classList.add('bx-menu')
        }
    })
}
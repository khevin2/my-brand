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
pwd_editor.addEventListener('click', openModal)

// Handlers
function handleEditInput(e) {
    value = e.target.value
}

// Edit Button Global

// const edit_btn = document.querySelector('edit-btn')

window.addEventListener('click', (e) => {
    console.log(e.target)
    const element = e.target
    if (element.classList && element.classList.contains("edit-value")) {
        const value = element.previousElementSibling.innerText
        const parent = element.parentNode
        const parentBkp = parent
        const newInput = document.createElement('div')
        const input = document.createElement('input')
        input.classList.add('edit-input')
        input.value = value
        input.addEventListener('input', () => {
            parentBkp.firstChild.value = e.target.value
            console.log(parentBkp)
        })
        const btn = document.createElement('button')
        btn.innerText = "Save"
        newInput.appendChild(input)
        newInput.appendChild(btn)
        console.log(newInput)
        while (parent.firstChild) {
            //The list is LIVE so it will re-index each call
            parent.removeChild(parent.firstChild);
        }
        parent.appendChild(newInput)

    }
})
export default function showError(msg, element) {
    const div = document.createElement('div')
    div.classList.add('error-toast')
    const span = document.createElement('span')
    span.textContent = msg
    // const btn = document.createElement('button')
    // btn.innerHTML = `<svg width="28" height="28" viewBox="0 0 28 28" fill="#fff" xmlns = "http://www.w3.org/2000/svg" >  <path d="M27.3333 5.5165L22.4833 0.666504L14 9.14984L5.51663 0.666504L0.666626 5.5165L9.14996 13.9998L0.666626 22.4832L5.51663 27.3332L14 18.8498L22.4833 27.3332L27.3333 22.4832L18.85 13.9998L27.3333 5.5165Z" fill="#2F80ED" /> </svg >`
    div.append(span)
    element.prepend(div)
    setTimeout(() => {
        element.firstChild.remove()
    }, 5000)
}
export default function showError(msg, element) {
    const div = document.createElement('div')
    div.classList.add('error-toast')
    const span = document.createElement('span')
    span.textContent = msg
    div.append(span)
    element.prepend(div)
    setTimeout(() => {
        element.firstChild.remove()
    }, 5000)
}
const svgs = {
    error: `<svg fill="#ff0000" height="191px" width="191px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-26.95 -26.95 390.82 390.82" xml:space="preserve" stroke="#ff0000" stroke-width="5.0537849999999995">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.021514"/>

<g id="SVGRepo_iconCarrier"> <g> <path d="M329.976,244.328L212.863,41.351c-9.266-16.058-25.864-25.645-44.403-25.645s-35.138,9.587-44.403,25.645 c-2.07,3.587-0.84,8.174,2.748,10.244c3.587,2.069,8.174,0.839,10.244-2.748c6.555-11.359,18.297-18.142,31.411-18.142 s24.856,6.782,31.411,18.141l117.113,202.977c6.551,11.354,6.548,24.909-0.008,36.26s-18.295,18.128-31.403,18.128H51.346 c-13.108,0-24.848-6.777-31.403-18.128s-6.559-24.906-0.008-36.26l93.534-162.109c2.07-3.587,0.84-8.174-2.748-10.244 c-3.59-2.072-8.175-0.84-10.244,2.748L6.943,244.328c-9.261,16.05-9.257,35.211,0.011,51.258 c9.267,16.046,25.862,25.626,44.393,25.626h234.227c18.53,0,35.126-9.58,44.393-25.626 C339.233,279.54,339.237,260.378,329.976,244.328z"/> <path d="M195.149,102.302c-6.644-7.628-16.256-12.003-26.371-12.003h-0.637c-10.115,0-19.728,4.375-26.371,12.003 c-6.644,7.628-9.658,17.75-8.269,27.77l6.528,47.099c0.569,4.103,4.359,6.972,8.458,6.399c4.104-0.569,6.969-4.356,6.399-8.459 l-6.528-47.099c-0.793-5.722,0.928-11.502,4.723-15.859c3.794-4.356,9.283-6.854,15.06-6.854h0.637 c5.776,0,11.266,2.499,15.06,6.854c3.795,4.356,5.516,10.137,4.723,15.859l-10.979,79.21c-0.618,4.456-4.477,7.816-8.976,7.816 h-0.291c-4.499,0-8.357-3.36-8.976-7.816c-0.568-4.103-4.356-6.967-8.458-6.4c-4.104,0.569-6.968,4.355-6.399,8.458 c1.64,11.834,11.886,20.758,23.833,20.758h0.291c11.947,0,22.193-8.924,23.833-20.757l10.979-79.21 C204.807,120.052,201.792,109.93,195.149,102.302z"/> <path d="M168.459,236.171c-13.664,0-24.78,11.116-24.78,24.78c0,13.664,11.116,24.78,24.78,24.78s24.78-11.116,24.78-24.78 C193.24,247.287,182.123,236.171,168.459,236.171z M168.459,270.731c-5.393,0-9.78-4.387-9.78-9.78c0-5.393,4.388-9.78,9.78-9.78 s9.78,4.387,9.78,9.78C178.24,266.344,173.852,270.731,168.459,270.731z"/> </g> </g>

</svg>`,
    success: `<svg width="30px" height="30px" viewBox="0 0 1024.00 1024.00" xmlns="http://www.w3.org/2000/svg" fill="#2f80ed" stroke="#2f80ed" stroke-width="0.01024"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="10.24"/><g id="SVGRepo_iconCarrier"><path fill="#2f80ed" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"/></g></svg>`
}
const noticationsContainer = document.querySelector('.toast-container')

const removeNotification = (card) => {
    card.classList.add('d-nonne')
    if (card.timeOut) clearTimeout(card.timeOut)
    card.remove()
}

export async function successNotification(message) {
    const card = document.createElement('div')
    card.className = "notication-card"
    card.innerHTML = `<p>${message}</p>${svgs.success}`
    noticationsContainer.append(card)
    card.timeOut = setTimeout(() => removeNotification(card), 5000)

}

export function errorNotification(message) {
    const card = document.createElement('div')
    card.className = "notication-card error"
    card.innerHTML = `<p>${message}</p>${svgs.error}`
    noticationsContainer.append(card)
    card.timeOut = setTimeout(() => removeNotification(card), 5000)
}
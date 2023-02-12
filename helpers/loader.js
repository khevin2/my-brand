const loadElement = document.createElement('div')
loadElement.classList.add("loading", "d-nonne")

const body = document.getElementsByTagName('body')[0]
body.prepend(loadElement)


export function showLoading() {
    loadElement.classList.remove('d-nonne')

}
export function removeLoading() {
    loadElement.classList.add('d-nonne')
}
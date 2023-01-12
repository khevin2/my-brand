function generateID() {
    let id = localStorage.getItem('id')
    const newID = JSON.parse(id) + 1
    localStorage.setItem('id', newID)
    return newID

}
export default generateID
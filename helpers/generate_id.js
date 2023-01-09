function generateID() {
    let id
    if (localStorage.id) id = JSON.parse(localStorage.getItem(id))
    else {
        localStorage.setItem("id", "1")
        id = JSON.parse(localStorage.getItem(id))
    }
    localStorage.setItem(id, JSON.stringify(id + 1))
    console.log(id, id + 1)
    return id

}
export default generateID
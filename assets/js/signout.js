export function signout() {
    sessionStorage.clear()
    window.location = '/login.html'
}
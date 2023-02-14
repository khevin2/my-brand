import { errorNotification } from "./show_error.js"

export const URL = "https://mybrand-backend.up.railway.app"



export async function fetchData(path, method, payload) {
    const token = sessionStorage.getItem('token') || null
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', "Bearer " + token)
    headers.append('Accept', 'application/json')


    try {
        const res = await fetch(`${URL}${path}`, { method, headers, mode: "cors", body: JSON.stringify(payload) })
        return await res.json()
    } catch (error) {
        errorNotification("Network error: Check your internet..")
    }

}
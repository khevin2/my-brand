export const URL = 'http://localhost:6001'



export async function fetchData(path, method, payload) {
    const token = sessionStorage.getItem('token') || null
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', "Bearer " + token)
    headers.append('Accept', 'application/json')


    const res = await fetch(`${URL}${path}`, { method, headers, mode: "cors", body: JSON.stringify(payload) })
    return await res.json()

}
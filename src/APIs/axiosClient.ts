import axios from "axios";

export const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

AxiosClient.interceptors.request.use(req => {
    if (localStorage.getItem('access')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    }
    return req
})

AxiosClient.interceptors.response.use(res => {
    res.request.headers
    return res
}, async (err) => {
    localStorage.removeItem('access')
    if (err.response.status === 401 && err.config.headers.Authorization) {
        if (!localStorage.getItem('refresh')) {
            Promise.reject(err)
        }
        try {
            const refreshRes = await AxiosClient.post('refresh', {
                refresh: localStorage.getItem('refresh')
            })
            if(Boolean(refreshRes.data.access)){
                localStorage.setItem('access', refreshRes.data.access)
                err.config.headers.Authorization = `Bearer ${refreshRes.data.access}`
                return await AxiosClient(err.config)
            }
        }
        catch(e){
            localStorage.removeItem('refresh')
            Promise.reject(err)
        }
    }
    localStorage.removeItem('refresh')
    Promise.reject(err)
})

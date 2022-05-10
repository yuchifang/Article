import axios from 'axios'

export function getFetch(url, params = {}) {
    return axios({
        url,
        method: 'GET',
        params,
    })
}

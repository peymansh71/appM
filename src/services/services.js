import config from '../config.json'
import http from '../services/httpsService'


export function deletePit(data) {
    return http.delete(config.api_pit, data)
}
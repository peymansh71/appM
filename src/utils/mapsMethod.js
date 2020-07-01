import http from '../services/httpsService'
import config from "../config.json"




//================== Map data ===================

export function mapSidebarItems() {
    return http.get(config.api_mapSidebar + "/" + "2" + "/" + "1")
}
export function mapFooterItems() {
    return http.get(config.api_mapFooter + "/" + "2" + "/" + "2")
}
export function mapsData() {
    return http.get(config.api_mapData)
}
export function mapHistory(id) {
    return http.post(config.api_mapHistory + "/" + id)
}
export function mapHistoryList() {
    return http.post(config.api_mapHistoryList)
}
export function mapGetDXF() {
    return http.post(config.api_mapGetDXF, "123")
}
export function mapSaveLayers(data) {
    return http.post(config.api_mapSaveLayers, data)
}
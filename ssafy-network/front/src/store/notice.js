import api from '@/plugins/createaxios.js'

export const SET_DB_SERVER = 'SET_DB_SERVER'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_ID = 'SET_ID'
export const SET_NOTICES = 'SET_NOTICES'

const getNotices = async function (url, id, token) {
    return await api(url)
        .request({
            url: `/notices/${id}/${token}`,
            method: "get",
            baseURL: url
        })
}

const storage = {}

var state = {
    notifications: null,
    dbserver: null,
    token: null,
    id: null
}

const mutations = {
    [SET_NOTICES](state, [id, token, dbserver]) {
        getNotices(dbserver, id, token).then(res => {
            state.notifications = res.data
        })
    }
}

const actions = {}

export default {
    state,
    mutations,
    actions
}
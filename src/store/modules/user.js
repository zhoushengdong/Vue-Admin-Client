import { login, logout, getInfo } from '@/api/login'
import { addData, fetchDataList } from '@/api/table'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { Promise } from 'mongoose';
// import { Promise } from 'mongoose'
// import { resolve } from 'url'
// import { reject } from './C:/Users/Administrator/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/async'
// import { error } from 'util'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    newslist: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NEWSLIST: (state, newsList) => {
      if (newsList.data.items.length > 1) {
        state.newslist = newsList.data.items
      } else {
        state.newslist.push(newsList.data.items[0])
      }
      // console.log(state.newslist)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // console.log(response)
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          console.log(response)
          // console.log(process.env.BASE_API)
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 添加数据
    AddData({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        addData(param).then(response => {
          // console.log(state)
          // console.log(response)
          commit('SET_NEWSLIST', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取Table List数据
    FetchDataList({ commit, state }) {
      return new Promise((resolve, reject) => {
        fetchDataList().then(response => {
          if (response.data.items.length !== 0) {
            commit('SET_NEWSLIST', response)
          }
          // console.log(response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user

import { getClientData } from '../../api/common'

const state ={
  role:[],
  category:[],
  tag:[]
}

const mutations ={

  SET_ROLE:(state,role) =>{
    state.role=role
  },
  SET_CATEGORY:(state,category)=>{
    state.category=category
  },
  SET_TAG:(state,tag)=>{
    state.tag=tag
  }
}

const actions ={
   getClientData({commit}){ 
    return new Promise((resolve,reject) => {
      getClientData().then(response =>{   
        const {role,tag,category } = response.data
        commit('SET_ROLE',role)
        commit('SET_CATEGORY',category)
        commit('SET_TAG',tag) 
        resolve(response.data) 
      }).catch(error => {
        console.log("getClientData:" + error)
        reject(error)
      })

    })

    
   }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

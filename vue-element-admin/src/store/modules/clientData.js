import request from '@/utils/request'
import { getClientData } from '../../api/common'

const state ={
  role=[],
  category=[],
  tag=[]
}

const mutation ={

  SET_CLIENT:(state,clientData) =>{
    state.clientData=clientData
  }
}

const actions ={
   getClientData({commit}){
    const {role,tag,catagory } = response.data
    commit('SET')
   }

}
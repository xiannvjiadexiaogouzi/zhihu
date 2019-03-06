import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

// Vue.prototype.$axios = axios;

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    idList: [], // articlelist的id顺序
    nowId: 0, //article中的id
    // nextId: 0,
    longComment: 0,
    shotComment: 0,
    commentNum: 0,
  },
  mutations: {
    GET_ID_LIST(state, list) {
      state.idList = [...state.idList, ...list];
    },
    CLEAR_ID_LIST(state, list) {
      state.idList = list;
    },
    getId(state, newid) {
      state.nowId = newid;
    },
    next2now(state) {
      state.nowId = state.idList[state.idList.indexOf(state.nowId) + 1];
    },
    getCommentNum(state, newnum) {
      state.commentNum += newnum;
      // console.log(state.commentNum)
    }

  },
  actions: {
    // replaceUrl(oldurl) {
    //   // console.log(oldurl);
    //   return oldurl.replace(
    //     /http\w{0,1}:\/\/p/g,
    //     "https://images.weserv.nl/?url=p"
    //   );
    // },
    // getId(state,newid){
    //   state.nowId = newid;
    // },

  }
})
import * as firebase from "firebase";

export default {
  strict: true,
  namespaced: true,
  state: {},
  getters: {},
  mutations: {
    hiTTT(state, num) {
      // console.log("hiTTT / num ..." + num);
    }
  },
  actions: {
    signUserIn({ commit }, payload) {
      // console.log("fb_signUserIn");
      // store.js裡面的mutations方法
      commit("setProgress", true, {
        root: true
      });
      // fbModule.js裡面的mutations方法
      // commit("hiTTT", 89);

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.myEmail, payload.myPassword)
        .then(user => {
          commit("setLoginUser", user, {
            root: true
          });
          commit("setProgress", false, {
            root: true
          });
          commit("backRoot", null, {
            root: true
          });
        })
        .catch(err => {
          // console.log("signUserIn catch .... run");
          // console.log("signUserIn error code = " + err.code);
          // console.log("signUserIn error message = " + err.message);
          // mutations.setProgress(state, false);
          mutations.setIsLogin(state, false);
          alert("登入錯誤" + "\n" + err.code + "\n" + err.message);
        });
      commit("checkTimeOut", null, {
        root: true
      });
    },
    signUserOut({ commit }, payload) {
      // console.log("signUserOut......");
      commit("setProgress", true, {
        root: true
      });
      // mutations.setProgress(state, true);
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setLoginUser", null, {
            root: true
          });
          commit("setProgress", true, {
            root: true
          });
          commit("setIsLogin", false, {
            root: true
          });
          // console.log("signUserOut down...");
          alert("登出成功");
        })
        .catch(error => {
          // console.log("signUserOut catch...");
          // console.log("signUserIn error code = " + error.code);
          // console.log("signUserIn error message = " + error.message);
          commit("setProgress", false, {
            root: true
          });
          alert("登出失敗");
        });

      commit("checkTimeOut", null, {
        root: true
      });
    }
  }
};

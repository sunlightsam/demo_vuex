import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import fbModule from "./fbModule";
import fbCRUD from "./fbCRUD";
// import * as firebase from "firebase";
import firebase from "firebase/app";
// import actions from './actions';
// import getters from './getters';
// import mutations from './mutations';

Vue.use(Vuex);

const state = {
  logoutDialog: false,
  isProgress: false,
  isUpdate: false,
  isLogin: false,
  isAddMode: false,
  h5: 3,
  loginDialog: false,
  farmData: null,
  menuId: null,
  vegetables: [],
  menus: [],
  loginUser: null,
  dbFirebaseRef: null,
  modifyType: {
    read: "ON",
    create: "SET",
    update: "UPDATE",
    delete: "REMOVE",
    readOnce: "ONCE"
  },
  dbRefType: {
    root: "ROOT",
    child: "CHILD"
  }
};

const getters = {
  getLoginUser(state) {
    return state.loginUser;
  },
  getIsLogin(state) {
    return state.isLogin;
  },
  getRootVegetables(state) {
    return state.vegetables;
  },
  getIsAddMode(state) {
    return state.isAddMode;
  }
};

const actions = {
  // getDbRef:
  //   ({
  //     commit,
  //     dispatch
  //   }) => {
  // },
  getVegetables: ({ commit, dispatch }) => {
    // console.log("getVegetables");
    mutations.setProgress(state, true);
    mutations.checkTimeOut(state);
    const vegetablesRef = firebase.database().ref("/vegetables/");

    // vegetablesRef.once('value').then(function (snapshot) {
    // vegetablesRef.off();
    vegetablesRef.on("value", function(snapshot) {
      const vegetablesObj = snapshot.val();

      if (!vegetablesObj) {
        commit("setVegetables", {});
      }
      commit("setVegetables", vegetablesObj);
      commit("setIsUpdate", true);
      mutations.setProgress(state, false);
      // for (let j in vegetablesObj) {
      //   for (let k in vegetablesObj[j]) {
      //     console.log(k, vegetablesObj[j][k]);
      //   }
      // }
    });
  },
  fbDbHelper: ({ commit, dispatch }, { itemIndexNumber, type, dataObj }) => {
    console.log("fbDbHelper...");
    console.log("fbDbHelper... itemIndexNumber / ", itemIndexNumber);
    console.log("fbDbHelper... type / ", type);
    console.log("fbDbHelper... dataObj / ", dataObj);

    if (null === dataObj) {
      console.log("getMMM error dataObj ==== null");
      return;
    }

    mutations.setProgress(state, true);
    let _dbRootName = "/vegetables/";
    let _childPath = String(itemIndexNumber);
    let _finalPath = _dbRootName + _childPath;
    let _dbRef = null;

    console.log("getMMM... _finalPath / ", _finalPath);
    // _dbRef.off();

    if (_childPath && _childPath !== "") {
      _dbRef = firebase.database().ref(_finalPath);
    } else {
      _dbRef = firebase.database().ref(_dbRootName);
    }

    switch (type) {
      case "ON":
        console.log("ON...");
        let _snapshot = null;

        _dbRef.on("value", function(snapshot) {
          console.log("snapshot.val() / ", snapshot.val());
          _snapshot = snapshot.val();
          // snapshot.val() 得到一個object
        });

        console.log("_snapshot... / ", _snapshot);
        return _snapshot;
      case "SET":
        console.log("SET...");
        if (dataObj) {
          _dbRef.set(dataObj, function(error) {
            if (error) {
              console.log("_dbRef SET failed... error / ", error);
            } else {
              console.log("_dbRef SET successfully...");
            }
          });
        }
        break;
      case "UPDATE":
        console.log("UPDATE...");

        if (dataObj) {
          _dbRef.update(dataObj, function(error) {
            if (error) {
              console.log("_dbRef UPDATE failed...");
              console.log("_dbRef UPDATE failed... error / ");
            } else {
              console.log("_dbRef UPDATE successfully...");
            }
          });
        }
        break;
      case "REMOVE":
        console.log("REMOVE...");
        // 確認有第二層子路徑，不是指向頂層，從第二層往後刪除
        if (_childPath && _childPath !== "" && dataObj === "deleteIt") {
          _dbRef.remove();
          console.log("_dbRef REMOVE...successfully");
        } else {
          console.log("_dbRef REMOVE failed...");
        }
        break;
      default:
        break;
    }
    mutations.setProgress(state, false);
  },
  getDbRootSnapshot: ({ commit, dispatch }) => {
    const _dbRootName = "/vegetables/";

    mutations.setProgress(state, true);
    _dbRef = firebase.database().ref(_dbRootName);

    let _rootSnapshot = null;
    _dbRef.on("value", function(snapshot) {
      _rootSnapshot = snapshot.val();
    });
    _dbRef.off();

    mutations.setProgress(state, false);
    mutations.checkTimeOut(state);

    return _rootSnapshot;
  },
  getMenus: ({ commit, dispatch }) => {
    mutations.setProgress(state, true);
    const menusRef = firebase.database().ref("/menus/");

    // menusRef.once('value').then(function (snapshot) {
    menusRef.on("value", function(snapshot) {
      const menusObj = snapshot.val();

      if (!menusObj) {
        commit("setMenus", {});
      }
      commit("setMenus", menusObj);
      mutations.setProgress(state, false);
      mutations.checkTimeOut(state);
      menusRef.off();
      // for (let j in vegetablesObj) {
      //   for (let k in vegetablesObj[j]) {
      //     console.log(k, vegetablesObj[j][k]);
      //   }
      // }
    });
  },
  registerUser({ commit }, payload) {
    mutations.setProgress(state, true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.myEmail, payload.myPassword)
      .then(user => {
        commit("setLoginUser", user);
        mutations.setProgress(state, false);
        mutations.backRoot(state);
        console.log("loginUser =>" + user);
        console.log("user =>" + user);
      })
      .catch(error => {
        commit("setLoginUser", null);
        console.log("error code = " + error.code);
        console.log("error message = " + error.message);
        mutations.setProgress(state, false);
      });

    mutations.checkTimeOut(state);
  }
};

const mutations = {
  setIsLogin(state, boolean) {
    state.isLogin = boolean;
    // console.log("setIsLogin state.isLogin / " + state.isLogin);
  },
  backRoot() {
    mutations.setIsLogin(this.state, true);
    // this.commit("setIsLogin",
    //   true, {
    //     root: true
    //   });
    // this.commit("setShowFooter",
    //   true, {
    //     root: true
    //   });
    router.push({
      name: "Products"
    });
    // console.log("backRoot .... end");
  },
  setLoginUser(state, user) {
    state.loginUser = user;
    // console.log("setLoginUser... run");
  },
  setIsUpdate(state, boolean) {
    // console.log("mutations => setIsUpdate...");
    state.isUpdate = boolean;
    return state.isRunning;
  },
  setH5(state, num) {
    state.H5 = num;
    console.log("mutations => setH5 / ", state.H5);
    return state.H5;
  },
  setLogoutDialog(state, boolean) {
    // console.log("mutations => setIsUpdate...");
    state.logoutDialog = boolean;
    return state.logoutDialog;
  },
  checkTimeOut(state) {
    // console.log("checkTimeOut...  state.isProgress / ", state.isProgress);
    if (state.isProgress) {
      // console.log("!!! checkTimeOut... if1");
      let count = 0;
      let checkState = setInterval(function() {
        if (count > 5000) {
          mutations.setProgress(state, false);
          clearInterval(checkState);
          // alert("傳輸逾時 or 錯誤發生");
          console.log("傳輸逾時 or 錯誤發生");
        }

        count += 500;

        // if (!'fbModule/isProgress') {
        if (!state.isProgress) {
          // console.log("!!! checkTimeOut... if 2");
          clearInterval(checkState);
          // console.log("222 checkState loginState = " + state.isProgress);
          return;
        }
      }, 500);
    }
  },
  setIsAddMode: function(state, boolean) {
    state.isAddMode = boolean;
    // console.log("store.js setIsAddMode...", state.isAddMode);
  },
  setAdd: function(state, index) {
    const _vegetable = state.vegetables[index];

    if (_vegetable.buy < _vegetable.max) {
      _vegetable.buy++;

      state.isUpdate = true;
    }
  },
  setDecrease: function(state, index) {
    const _vegetable = state.vegetables[index];

    if (_vegetable.buy > 0) {
      _vegetable.buy--;

      state.isUpdate = true;
    }
  },
  setProgress: function(state, progressState) {
    state.isProgress = progressState;
    // console.log("setProgress... /", state.isProgress);
    return state.isProgress;
  },
  setFarmData: function(state, obj) {
    state.farmData = obj;
    console.log("farmData...", obj);
    return state.farmData;
  },
  setMenuId: function(state, index) {
    state.menuId = index;
    return state.menuId;
  },
  setVegetables: function(state, firebaseVegetables) {
    state.vegetables = firebaseVegetables;
    return state.vegetables;
  },
  setMenus: function(state, firebaseMenus) {
    state.menus = firebaseMenus;
    return state.menus;
  },
  hhh: function() {
    console.log("hhh");
  },
  /** 取得時間 */
  getTime: function() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const format = hours >= 12 ? "下午" : "上午";
    return `${format} ${hours}:${minutes}:${seconds}`;
  }
};

let _time = mutations.getTime();
// console.log("_time...", _time);

// 強制給假資料
// if (typeof state.vegetables === "undefined" || state.vegetables === null) {
//   state.vegetables = makeVegetables();
// } else {
//   state.vegetables = makeVegetables();
// }

export default new Vuex.Store({
  strict: false,
  state,
  getters,
  actions,
  mutations,
  modules: {
    fbModule,
    fbCRUD
  }
});

function makeVegetables() {
  var _vegetables = [
    {
      place: "旺來御菜園有機農場",
      item: "空心菜",
      sn: 103,
      type: "有機蔬菜",
      pathName: "/img/",
      fileName: "../static/img/eat01.jpg",
      buyimg: "@/../static/img/build01.jpg",
      price: 40,
      buy: 3,
      max: 5,
      isEdit: false,
      weight: 0,
      weight_unit: "",
      origin: "雲林縣西螺鎮",
      features: "有機無毒耕作",
      age: 4,
      description: "“ 無藥生菜種植 化不可能為可能 ”"
    },
    {
      place: "小農有機農場",
      item: "牛番茄",
      sn: 205,
      type: "優質水果",
      pathName: "/img/",
      fileName: "../static/img/eat02.jpg",
      buyimg: "@/../static/img/build02.jpg",
      price: 130,
      buy: 0,
      max: 9,
      isEdit: false,
      weight: 520,
      weight_unit: "克",
      origin: "新竹新埔鎮",
      features: "有機無毒耕作",
      age: 17,
      description: "“ 無藥生菜種植 化不可能為可能 ”"
    },
    {
      place: "天廚有機農場",
      item: "黒美人紅肉西瓜",
      sn: 307,
      type: "優質水果",
      pathName: "/img/",
      fileName: "../static/img/eat03.jpg",
      buyimg: "@/../static/img/build03.jpg",
      price: 320,
      buy: 1,
      max: 3,
      isEdit: false,
      weight: "2.585",
      weight_unit: "公斤",
      origin: "雲林縣西螺鎮",
      features: "有機無毒耕作",
      age: 4,
      description: "“ 無機，更愛這片土地 ”"
    },
    {
      place: "小廚師有機農場",
      item: "地瓜葉",
      sn: 517,
      type: "根莖",
      pathName: "/img/",
      fileName: "../static/img/eat04.jpg",
      buyimg: "@/../static/img/build04.jpg",
      price: 90,
      buy: 3,
      max: 8,
      isEdit: false,
      weight: 800,
      weight_unit: "克",
      origin: "雲林縣斗六市",
      features: "有機無毒耕作",
      age: 5,
      description: "“ 無機，更愛這片土地 ”"
    }
  ]; // buyimg: "https://randomuser.me/api/portraits/men/86.jpg",
  return _vegetables;
}

// {
//   "kind": "identitytoolkit#SignupNewUserResponse",
//   "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI4OWY3MzQ2YTA5ODVmNDIxZGNkOGQzMGMwYjMwZWViZmFlMTlhMWUifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnV5ZmFybS03MThjNSIsImF1ZCI6ImJ1eWZhcm0tNzE4YzUiLCJhdXRoX3RpbWUiOjE1MzI2MzU2NzEsInVzZXJfaWQiOiI5c2lCRDRnOEUzUHpCbjQ3bDBUaWhVbUpHRUgyIiwic3ViIjoiOXNpQkQ0ZzhFM1B6Qm40N2wwVGloVW1KR0VIMiIsImlhdCI6MTUzMjYzNTY3MSwiZXhwIjoxNTMyNjM5MjcxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.CPSH1--uPNvf-DaFGrHu6RFv41UYOoo3NCEm9tD2Cvg-28vi1u_9LU0LhNkMH5C3L7okTFPzZg4EWwTMLTPZYeMXEj2dOkyhYdTtzIAvkoC2Wo7c4rwY9vKhY1a4BiuEn01TLz79-0VXSQUTGsmogVArUOadFXNMxWcqz_eHgfTABm1GL-kR7bohQlLZZRhpJg0SjNnEiaC0XQ_CLxZBSmDIGBcRVtjZm23C8e9ObvUX6yGPxw-7JlelImveth-BgBAC6EZiBauHePH3W5_QaWqVmRxPLf3t7DW2Qx0UrhSjqgnVtDPyRrBY_j0yAGSZKCaDmglWYDzhRNeH_GSlDA",
//   "email": "test@test.com",
//   "refreshToken": "AGdpqew8bTDxJro55C5wRJwiuJinzqu4GHiHHzHqv_n31NKAbFLWYWWlUwly7qAKGHLzAiUZa6j7OAdkTrQHjxbh9l321Hkj4xU6D9s__KNNyq_VDUXWpN49jxZKuHGvtVWHJtyhSYtFRNrBTsw9U3nL80mIut30gwvk8-hrZokxcuDhqXg9-1TNBp50oW2lBU03yHG9ScZ7-rpgtFOCarx4flJHbB-wyw",
//   "expiresIn": "3600",
//   "localId": "9siBD4g8E3PzBn47l0TihUmJGEH2"
// }

// {
//   "kind": "identitytoolkit#GetAccountInfoResponse",
//   "users": [{
//     "localId": "9siBD4g8E3PzBn47l0TihUmJGEH2",
//     "email": "test@test.com",
//     "passwordHash": "UkVEQUNURUQ=",
//     "emailVerified": false,
//     "passwordUpdatedAt": 1532635671000,
//     "providerUserInfo": [{
//       "providerId": "password",
//       "federatedId": "test@test.com",
//       "email": "test@test.com",
//       "rawId": "test@test.com"
//     }],
//     "validSince": "1532635671",
//     "lastLoginAt": "1532635671000",
//     "createdAt": "1532635671000"
//   }]
// }

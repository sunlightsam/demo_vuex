import * as firebase from "firebase";
import { Store } from "vuex";

const GET_ITEM_ID = "GET_ITEM_ID";
const SET_VEGETABLE_ID = "SET_VEGETABLE_ID";
const SET_MANAGEMENT_MODE = "SET_MANAGEMENT_MODE";
const SET_VEGETABLE_ITEM = "SET_VEGETABLE_ITEM";
const SET_CAN_EDIT = "SET_CAN_EDIT";
// const CLEAR_VEGETABLE_ITEM = "CLEAR_VEGETABLE_ITEM";
const PUSH_A_VAGETABLE = "PUSH_A_VAGETABLE";

export default {
  strict: false,
  namespaced: true,
  state: {
    //輸入文字
    inputText: "",
    // 所有資料
    list: [],
    // 是否修改完成
    compositionStatus: false,
    // 修改資料對象
    editing: null,
    // 修改中的內容
    editingText: "",
    canEdit: false,
    isManagementMode: true,
    T5: 1,
    vegetableId: -1,
    vegetableItem: null
  },
  methods: {
    // Call
    callHandler(id) {
      console.log("fbCRUD...id / ", id);
    }, // Create
    createHandler() {
      this.compositionStatus = true;
    },
    cendHandler() {
      this.compositionStatus = false;
    },
    inputHandler() {
      if (this.compositionStatus) return false;
      this.list.push({
        timestamp: new Date().getTime(),
        status: false,
        content: this.inputText
      });
      this.inputText = "";
    },
    // Read
    filterList() {
      //all,open,done
      if (this.show === "all") {
        return this.list;
      } else if (this.show === "open") {
        return this.list.filter(item => {
          return item.status === false;
        });
      } else if (this.show === "done") {
        return this.list.filter(item => {
          return item.status === true;
        });
      } else {
        return [];
      }
    },
    // Delete
    deleteHandler(item) {
      this.list = this.list.filter(target => {
        return target != item;
      });
      // this.list.splice(index,1)
    },
    // Update
    editHandler(item) {
      this.editing = item;
      this.editingText = item.content;
    },
    completeHandler() {
      this.editing.content = this.editingText;
      this.cancelHandler();
    },
    cancelHandler() {
      this.editingText = "";
      this.editing = null;
    }
  },
  getters: {
    getCanEdit(state) {
      return state.canEdit;
    },
    getT5(state) {
      // T5 and getT5測試方便用無實際作用
      return state.T5;
    },
    getVegetableId(state) {
      return state.vegetableId;
    },
    getVegetableItem(state) {
      return state.vegetableItem;
    },
    getManagementMode(state) {
      return state.isManagementMode;
    }
  },
  mutations: {
    // Call
    [GET_ITEM_ID](state, id = 3) {
      console.log("GET_ITEM_ID / ", id);
    },
    [SET_CAN_EDIT](state, boolean) {
      state.canEdit = boolean;
      console.log("SET_CAN_EDIT / ", state.canEdit);
    },
    [SET_VEGETABLE_ID](state, id) {
      if (id !== -1) {
        state.vegetableId = id;
        console.log("2SET_VEGETABLE_ID / ", state.vegetableId);
      }
    },
    [SET_VEGETABLE_ITEM](state, { array, _index }) {
      console.log("2 SET_VEGETABLE_ITEM / ");
      if (obj) {
        state.vegetableItem = obj;
        console.log("2 SET_VEGETABLE_ITEM / ", state.vegetableItem);
      }
    },
    [SET_VEGETABLE_ITEM](state, obj) {
      console.log("1 SET_VEGETABLE_ITEM / ");
      if (bj) {
        state.vegetableItem = obj;
        console.log("1 SET_VEGETABLE_ITEM / ", state.vegetableItem);
      }
    },
    [SET_MANAGEMENT_MODE](state, boolean) {
      state.isManagementMode = boolean;
      console.log("state.isManagementMode / ", state.isManagementMode);
    },
    // [CLEAR_VEGETABLE_ITEM](state) {
    //   console.log(
    //     "CLEAR_VEGETABLE_ITEM state.vegetableItem / ",
    //     state.vegetableItem
    //   );
    //   state.vegetableItem = null;
    //   console.log("CLEAR_VEGETABLE_ITEM / ", state.vegetableItem);
    // },
    [PUSH_A_VAGETABLE](state, payload) {
      // 傳來的state是rootState
      console.log("PUSH_A_VAGETABLE...");
      payload.rootState.vegetables.push(payload.obj_vegetable);
    },
    // Create
    hiTTT(state, num) {
      console.log("hiTTT / num ..." + num);
    },
    setCanEdit(state, boolean) {
      state.canEdit = boolean;
      console.log("fbCRUD setCanEdit... / ", state.canEdit);
    }
  },
  actions: {
    //     NAME(
    //   { state, getters, commit, dispatch, rootState, rootGetters },
    //   payload
    // ) {}
    signUserIn({ commit }, payload) {},
    signUserOut({ commit }, payload) {},
    pushOneVegetable({ commit, rootState }, obj_vegetable) {
      console.log("pushOneVegetable /");
      console.log("pushOneVegetable obj_vegetable / ", obj_vegetable);
      commit("PUSH_A_VAGETABLE", { rootState, obj_vegetable });
    },
    getVegetableId({ getters, commit, rootState }, id) {
      let _objArray = rootState.vegetables;
      console.log("___payload /", id);
      let _index = _objArray.findIndex(function(_obj) {
        return _obj.sn === id;
      });
      // commit("SET_VEGETABLE_ID", _index);
      commit("SET_MANAGEMENT_MODE", { rootState, boolean: true });
      commit("SET_VEGETABLE_ITEM", rootState.vegetables[_index]);
    },
    deleteVegetableItem({ getters, commit, rootState }, id) {
      let _objArray = rootState.vegetables;
      let _index = _objArray.findIndex(function(_obj) {
        return _obj.sn === id;
      });

      if (_index !== -1) {
        let result = confirm("真的要删除产品?");
        if (result) {
          _objArray.splice(_index, 1);
        }
      }
      // commit("SET_VEGETABLE_ID", _index);
      // commit("SET_VEGETABLE_ITEM", rootState.vegetables[_index]);
    }
  }
};

<template>
  <!-- <v-app v-cloak id="inspire" class=".application, .application--wrap"> -->
  <v-app
    v-cloak
    v-if="isRouterAlive"
    id="inspire"
    class=".application, .application--wrap"
  >
    <div class="my-overlay" @click.stop="maketest"></div>
    <div
      class="mylayer"
      v-bind:class="{ active: isTopMask }"
      v-on:click.stop="removeMask"
    ></div>
    <div class="mylayer" v-bind:class="{ active: isProgress }">
      <v-layout class="fullScreen" row justify-center align-center>
        <v-progress-circular
          :size="80"
          :width="8"
          color="green"
          indeterminate
        ></v-progress-circular>
      </v-layout>
    </div>

    <div class="side-cart" v-bind:class="{ active: isCertOpen }">
      <div class="cart-header">
        <h4 class>購物籃( {{ buySum }} )</h4>
        <i
          class="fa fa-angle-right cart-close"
          aria-hidden="true"
          v-on:click.stop="removeMask"
        ></i>
      </div>
      <div class="cart-list">
        <div
          class="list-box"
          v-for="(vegetable, index) in vegetables"
          :key="vegetable.sn"
          v-show="vegetable.buy"
        >
          <div>
            <span class="list-name">{{ vegetable.item }}</span>
            <i
              class="fa fa-times list-close"
              aria-hidden="true"
              v-on:click.stop="editMode(vegetable, true)"
            ></i>
          </div>
          <div>
            <i
              class="fa fa-plus-circle plus list-plus"
              v-on:click.stop="setAdd(index)"
              aria-hidden="true"
            ></i>
            <span class="list-buy">{{ vegetable.buy }}</span>
            <i
              class="fa fa-minus-circle minus list-decrease"
              v-on:click.stop="setDecrease(index)"
              aria-hidden="true"
            ></i>
            <span class="list-weight" v-show="vegetable.weight"
              >{{ vegetable.weight }}{{ vegetable.weight_unit }}</span
            >
            <span class="list-price">${{ vegetable.price }}</span>
          </div>
          <div class="box-delete" v-show="vegetable.isEdit">
            <span class="do-delete" v-on:click.stop="cleanItemBuy(vegetable)">
              <i class="fa fa-trash" aria-hidden="true"></i>刪除品項
            </span>
            <span
              class="cancel-delete"
              v-on:click.stop="editMode(vegetable, false)"
            >
              <i class="fa fa-undo" aria-hidden="true"></i>取消刪除
            </span>
          </div>
          <div class="list-box-line"></div>
        </div>
      </div>
      <div class="cart-totle">
        <span class="word">小計</span>
        <span class="totle">{{ totalSum | numberFormat }}</span>
      </div>
      <div class="cart-submit" @click.stop="sendOrder">
        <div class="submit-button">結帳</div>
      </div>
    </div>

    <v-layout row justify-center align-center>
      <v-dialog v-model="logoutDialog" persistent max-width="290">
        <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
        <v-card>
          <v-card-title class="headline">登出</v-card-title>
          <v-card-text class="subheading">請確認，是否要登出？</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="subheading"
              color="grey darken-1"
              flat
              @click.native="openLogoutDialog(false)"
              >不要</v-btn
            >
            <v-btn
              class="subheading"
              color="green darken-1"
              flat
              @click.native="logOutSuccess"
              >要登出</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-navigation-drawer class="zindex-lv3" v-model="drawer" fixed app>
      <v-list class="pa-1" dense>
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="userInfo.picture" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="title">{{
                userInfo.userName
              }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <div v-for="(menu, index) in menus" :key="index">
            <v-list-tile @click.stop="linkOutFn(index, menu)">
              <v-list-tile-action>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="title">{{
                  menu.title
                }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!-- <v-divider v-if="index + 1 < items.length " :key="`divider-${index}` "></v-divider> -->
            <v-divider
              v-if="index + 1 <= menus.length"
              :key="`divider-${index}`"
            ></v-divider>
          </div>
        </v-list>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="zindex-lv2" v-show="!isAddMode" fixed scroll-off-screen>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-sm-and-down" color="green"
        >Vuex Demo</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
      <v-toolbar-items>
        <!-- <v-btn flat>Link One</v-btn> -->
        <v-btn class="subheading" flat @click.stop="openEditMode()">
          <v-icon v-show="getManagementMode" small color="red lighten-1"
            >修改模式</v-icon
          >
          <v-icon v-show="!getManagementMode" small color="red lighten-1"
            >普通模式</v-icon
          >
        </v-btn>
        <v-btn class="subheading" flat @click.stop="goToHome">
          <v-icon large color="green lighten-1">home</v-icon>
        </v-btn>
        <!-- <v-btn flat @click.stop="checkLoginState"> -->
        <v-btn
          class="subheading"
          flat
          @click.stop="checkLoginState"
          vlaue="登出"
        >
          <v-badge v-show="isLogin" left color="purple" overlap>
            <v-icon slot="badge" dark small>done</v-icon>
            <v-icon large color="green lighten-1">account_circle</v-icon>
          </v-badge>
          <v-badge v-show="!isLogin" left color="purple" overlap>
            <v-icon large color="green lighten-1">account_circle</v-icon>
          </v-badge>
        </v-btn>
        <!-- <v-btn flat v-on:click="addMask"> -->
        <v-btn class="subheading" flat @click.stop="addMask">
          <v-badge left color="purple" overlap>
            <span slot="badge">{{ buySum }}</span>
            <v-icon large color="green">shopping_cart</v-icon>
          </v-badge>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <div>
        <!-- <v-container fluid fill-height> -->
        <!-- <v-layout justify-center align-center> -->
        <!-- <transition name="fade" mode="out-in"> -->
        <router-view :key="$route.fullPath"></router-view>
        <!-- </transition> -->
        <!-- </v-layout> -->
        <!-- </v-container> -->
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import fbModule from "./vuex/fbModule";
import fbCRUD from "./vuex/fbCRUD";

export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      isTopMask: false,
      isCertOpen: false,
      isDebug: false,
      isLoginOverLay: false,
      userInfo: {
        userName: "Guest",
        userEmail: "",
        picture: "https://randomuser.me/api/portraits/men/86.jpg"
      },
      account: [
        {
          userName: "John Leider",
          userEmail: "",
          picture: "https://randomuser.me/api/portraits/men/88.jpg"
        },
        {}
      ],
      buySum: 0,
      totalSum: 0,
      myBox: {},
      myScroll: {},
      scroll_X: 0,
      scroll_Y: 0,
      drawer: false
    };
  },
  filters: {
    numberFormat(value) {
      return `$${value.toLocaleString()}`;
    }
  },
  computed: {
    ...mapState([
      "isUpdate",
      "vegetables",
      "menus",
      "menuId",
      "isProgress",
      "loginUser",
      "isLogin",
      "logoutDialog",
      "loginDialog",
      "isAddMode"
    ]),
    ...mapGetters({
      getIsLogin: "getIsLogin",
      getLoginUser: "getLoginUser",
      getCanEdit: "fbCRUD/getCanEdit",
      getManagementMode: "fbCRUD/getManagementMode"
    }),
    checkBuySum: function() {
      return {};
    },
    getLoginUser: function() {
      return this.$store.getters.getLoginUser;
    }
  },
  created: function() {
    this.viewInit();

    this.$nextTick(function() {
      this.$store.dispatch("getVegetables");
    });

    this.$store.dispatch("getMenus");

    // this.$nextTick(function() {
    //   if (!this.myScroll) {
    //     this.initScroll();
    //   } else {
    //     setTimeout(function() {
    //       this.myScroll.refresh();
    //     }, 10);
    //   }
    // });
  },
  mounted: function() {
    // doSomeThing();
  },
  watch: {
    // vegetables發生改變，這個函數就會執行
    isUpdate: function() {
      if (this.isUpdate) {
        // console.log("App.vue isUpdate in watch");

        this.buySum = this.totalBuy();
        this.totalSum = this.getTotalSum();

        // this.isUpdate = false;
        this.$store.commit("setIsUpdate", false);
      }
    },
    isLogin: function(oldValue, newValue) {
      if (this.isLogin) {
        this.userInfo.userName = this.account[0].userName;
        this.userInfo.picture = this.account[0].picture;
      } else {
        this.userInfo.userName = "Guest";
        this.userInfo.picture =
          "https://randomuser.me/api/portraits/men/86.jpg";
      }
    }
  },
  methods: {
    ...mapMutations(["setIsUpdate", "setDecrease", "setAdd", "setMenuId"]),
    ...mapMutations({
      setCanEdit: "fbCRUD/SET_CAN_EDIT"
    }),
    viewInit: function() {
      this.buySum = this.totalBuy();
      this.totalSum = this.getTotalSum();

      this.debugMode();
    },
    reload() {
      // this.isRouterAlive = boolean;
      // console.log("reload... this.isRouterAlive  /", this.isRouterAlive);

      // 方式一
      this.isRouterAlive = false;
      this.$nextTick(function() {
        setTimeout(() => {
          this.isRouterAlive = true;
        }, 350);
      });

      // 方式二 对应 Products.vue goToFarm()的方式二
      // reload(boolean) {
      // this.isRouterAlive = boolean;
      // console.log("reload... this.isRouterAlive  /", this.isRouterAlive);
      // }
    },
    addMask: function() {
      console.log("addMask");

      this.clearEditMode();
      this.isTopMask = true;
      this.isCertOpen = true;
      this.isMenuOpen = false;
    },
    checkLoginState() {
      if (this.isLogin) {
        this.openLogoutDialog(true);
      } else {
        this.$router.push({
          name: "LoginPage"
        });
      }
    },
    openLogoutDialog(boolean) {
      this.$store.commit("setLogoutDialog", boolean);
    },
    openEditMode() {
      this.$store.commit("fbCRUD/SET_MANAGEMENT_MODE", !this.getManagementMode);
      // this.$store.commit("fbCRUD/setCanEdit", !this.getCanEdit);
    },
    logOutSuccess() {
      this.openLogoutDialog(false);
      // this.$store.dispatch("signUserOut");
      this.$store.dispatch("fbModule/signUserOut");
    },
    removeMask: function() {
      // console.log("removeMask");

      this.isTopMask = false;
      this.isCertOpen = false;
      this.isMenuOpen = false;

      this.clearEditMode();
    },
    addMenu: function() {
      // console.log("addMenu");

      this.isTopMask = true;
      this.isCertOpen = false;
      this.isMenuOpen = true;

      if (this.isDebug) {
        console.log(
          "isTopMask :" +
            this.isTopMask +
            " / " +
            "isMenuOpen :" +
            this.isMenuOpen
        );
      }
    },
    removeMenu: function() {
      // console.log("removeMenu");

      this.isTopMask = false;
      this.isMenuOpen = false;

      this.clearEditMode();
    },
    cleanItemBuy: function(vegetable) {
      // console.log("cleanItemBuy");

      vegetable.buy = 0;
      vegetable.isEdit = false;
      // this.isUpdate = true;
      this.$store.commit("setIsUpdate", true);
    },
    editMode: function(vegetable, boolean) {
      // console.log("editMode");

      if (typeof vegetable !== "undefined" || typeof vegetable !== null) {
        vegetable.isEdit = boolean;
      }
    },
    clearEditMode: function() {
      // console.log("clearEditMode");

      // var len = this.vegetables.length;
      // for (var i = 0; i < len; i++) {
      //   this.vegetables[i].isEdit = false;
      // }

      for (const [key, value] of Object.entries(this.vegetables)) {
        value.isEdit = false;
      }
      this.setCanEdit(false);
    },
    showItemInfo: function(vegetableObj) {
      if (this.isDebug) {
        console.log(
          "vegetableObj.item = " +
            vegetableObj.item +
            " / " +
            "vegetableObj.sn = " +
            vegetableObj.sn
        );
      }
    },
    debugMode: function() {
      if (this.isDebug) {
        console.log(
          "isTopMask :" +
            this.isTopMask +
            " / " +
            "isCertOpen :" +
            this.isCertOpen +
            " / " +
            "isMenuOpen :" +
            this.isMenuOpen +
            " / " +
            "totalSum :" +
            this.totalSum
        );
        console.log(this.vegetables);
      }
    },
    initScroll: function() {
      navEventListener();
    },

    debugAppScroll: function() {},
    selectMenu: function(index, event) {
      if (!event._constructed) {
        //如果不存在這個屬性，不執行下面的函數
        return;
      }
    },
    totalBuy: function() {
      // console.log("totalBuy...");
      let _buy = 0;

      // value是object => vegetable
      for (const [key, value] of Object.entries(this.vegetables)) {
        // console.log(`${key}`, `${value}`);
        // console.log(`${key}` + " value = ", value);
        _buy = _buy + value.buy;
      }
      return _buy;

      // Object.keys(this.vegetables).forEach(e =>
      //   console.log(`key=${e}  value=${this.vegetables[e]}`)
      // );
    },
    getTotalSum: function() {
      let _sum = 0;

      // value是object => vegetable
      for (const [key, value] of Object.entries(this.vegetables)) {
        // console.log(`${key}`, `${value}`);
        // console.log(`${key}` + " value = ", value);
        if (value.buy > 0) {
          _sum = _sum + value.buy * value.price;
        }
      }
      return _sum;
    },
    sendOrder() {
      let _tempOutput = "品項== / 數量== / 單價==" + "\n";

      for (const [key, value] of Object.entries(this.vegetables)) {
        if (value.buy) {
          let _tempTxt =
            value.item + " * " + value.buy + " * " + value.price + "\n";

          _tempOutput = _tempOutput + _tempTxt;
        }
      }

      // for (var i = 0; i < this.vegetables.length; i++) {
      //   if (this.vegetables[i].buy) {
      //     var _tempTxt =
      //       this.vegetables[i].item +
      //       " * " +
      //       this.vegetables[i].buy +
      //       " * " +
      //       this.vegetables[i].price +
      //       "\n";

      //     _tempOutput = _tempOutput + _tempTxt;
      //   }
      // }

      _tempOutput = _tempOutput + "===================" + "\n";
      _tempOutput =
        _tempOutput + "總金額 => " + `$${this.totalSum.toLocaleString()}`;

      alert(_tempOutput);
    },
    goToHome() {
      this.$router.push({
        name: "Products"
      });
    },
    linkOutFn(menu_index, menu) {
      //必須有name:'Menu'，不然Menu.vue收不到
      if (menu.title === "首頁") {
        this.goToHome();
      } else {
        this.$store.commit("setMenuId", menu_index);
        this.$router.push({
          name: "Menu",
          params: {
            id: this.menuId
          }
        });
        // console.log("linkOutFn end......");
        // console.log("this.$router.query.menuId = " + this.$router.params.id);
        // alert("連結到" + this.menus[index].linkOut);
      }
    },
    maketest() {
      this.isLoginOverLay = !this.isLoginOverLay;

      // console.log("isLoginOverLay =" + this.isLoginOverLay);
      if (this.isLoginOverLay) {
        document
          .querySelector(".my-overlay")
          .classList.add("overlay", "overlay--absolute", "overlay--active");
      } else {
        document
          .querySelector(".my-overlay")
          .classList.remove("overlay", "overlay--absolute", "overlay--active");
      }
    }
  }
};

function clickListItem() {
  $(".nav2 .list-item").click(function() {
    // console.log("click");
    $(".nav2 .list-item.active").removeClass("active");
    $(this).addClass("active");
    return false;
  });
}
</script>

<style lang="scss">
@import "./style/global.scss";
@import "./style/my_animation.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

[v-cloak] {
  display: none !important;
}

.icon01,
.icon02 {
  position: absolute;
  top: 5%;
  left: 0;
}

.icon01 {
  left: 1%;
}

.warp-absolute {
  position: absolute;
}

.amount {
  width: 100%;
  color: $font-white;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  @include font-size(20);
}

.my-overlay {
}

.footer-nav-title {
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
}

.footer a {
  color: grey;
}

.footer .teal {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
}

//////side-cart
.fullScreen {
  width: 100vw;
  height: 100vh;
}

.mylayer {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: $zindex-upgrade2;
}

.mylayer.active {
  display: block;
  -webkit-animation: fadeInFromNone 0.2s ease-out;
  animation: fadeInFromNone 0.2s ease-out;
}

.side-menu {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  z-index: $zindex-upgrade3;
  opacity: 1;
  -webkit-transform: translateX(-200%);
  -ms-transform: translateX(-200%);
  transform: translateX(-200%);
  background-color: $green-second-color;
  overflow-y: auto;
  .menu-close {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    padding-right: 25px;
    @include font-size(36, 60px);
    color: $font-white;
  }
  &.active {
    opacity: 1;
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }
}

.side-menu-body {
  padding: 0 15px;
  @include font-size(24);
  color: $font-white;
  li {
    padding: 0 10px;
    height: 32px;
    @include font-size(16, 32px);
    &:hover {
      cursor: pointer;
    }
  }
  ul {
    margin-bottom: 20px;
  }
  > .separate-line-grey {
    border-bottom: solid 1px $grey-second-color;
    margin: 15px -15px;
  }
}

.side-cart {
  width: 70%;
  max-width: 70%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  z-index: $zindex-upgrade3;
  opacity: 1;
  -webkit-transform: translateX(500%);
  -ms-transform: translateX(500%);
  transform: translateX(500%);
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  background-color: $font-white;
  &.active {
    opacity: 1;
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }
}

.cart-header {
  color: $font-white;
  height: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: $green-second-color;
  color: $font-white;
  padding: 0 15px;
  flex-direction: row;
  justify-content: space-between;
  > .cart-close {
    height: 60px;
    @include font-size(48, 60px);
  }
}

.cart-list {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
}

.list-box {
  position: relative;
  color: $font-grey;
  padding: 0 10px;
  span,
  i {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    @include font-size(18);
    color: $green-second-color;
    margin: 0 5px;
  }
  span {
    height: 32px;
    line-height: 32px;
    color: $font-grey;
  }
  .cart-header {
    color: $font-white;
  }
  .list-name,
  .list-buy,
  .list-price {
    color: $font-black;
  }
  .list-close,
  .list-price {
    line-height: 32px;
    float: right;
  }
  .box-delete {
    box-sizing: border-box;
    display: inline-flex;
    width: 100%;
    height: 64px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    span {
      cursor: pointer;
      padding: 1px 0;
      align-self: center;
      text-align: center;
      width: 50%;
    }
    .cancel-delete {
      border-left: solid 1px $grey-second-color;
    }
  }
}

.list-box-line {
  height: 1px;
  border-bottom: solid 1px $grey-second-color;
}

.cart-totle {
  height: 60px;
  line-height: 60px;
  padding: 0 15px;
  background-color: $grey-third-color;
  border-top: solid 1px $green-second-color;
  .word,
  .totle {
    font-size: 18px;
  }
  .totle {
    float: right;
    color: $font-black;
    font-weight: 800;
  }
}

.cart-submit {
  height: 80px;
  background-color: $font-white;
  padding: 15px;
  .submit-button {
    color: $font-white;
    width: 100%;
    border-radius: 50px;
    height: 50px;
    text-align: center;
    background-color: $green-second-color;
    z-index: $zindex-upgrade1;
    @include font-size(24, 50px);
  }
}

//////////// Products
h2 {
  @include font-size(48);
  letter-spacing: 8px;
}

h3 {
  @include font-size(42);
}

h4 {
  @include font-size(20);
}

.fa-leaf {
  color: $green-second-color;
  margin-right: 10px;
}

.warp-justify {
  height: 100%;
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.fade-enter {
  visibility: hidden;
  opacity: 0;
}
.fade-leave-to {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-to,
.fade-leave {
  visibility: visible;
  opacity: 1;
}

////////////
</style>

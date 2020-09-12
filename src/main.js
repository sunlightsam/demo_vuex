// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

// firebase
import firebase from "firebase/app";
import firebaseDB from "../static/js/firebaseInit.js";

// 其他套件
import { sync } from "vuex-router-sync";

// UI,背景動畫類
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

// import AOS from "aos";
// import "aos/dist/aos.css";

// import VideoBg from "vue-videobg";

// 驗證套件
// import VeeValidate from 'vee-validate';

// 樣板components
import Newfooter from "@/components/Newfooter";

import store from "./vuex/store.js";
import router from "./router";
import App from "./App";

//開發
Vue.config.devtools = true;
Vue.config.productionTip = true;
Vue.config.debug = true;

//正式
// Vue.config.devtools = false;
// Vue.config.productionTip = false;
// Vue.config.debug = false;

// Vue.use(VeeValidate);
sync(store, router);

Vue.component("Newfooter", Newfooter);
// Vue.component("video-bg", VideoBg);

Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  firebase,
  firebaseDB,
  store: store,
  router: router,
  components: {
    App
  },
  template: "<App/>"
});

//畫面回到頂部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

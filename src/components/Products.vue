<template>
  <div>
    <div v-show="this.isAddMode">
      <div class="add_item_warp">
        <!-- add content begin -->
        <!-- <v-container v-if="getVegetableItem" fluid class="edit_content"> -->
        <!-- 1 -->
        <v-layout class="" column xs12 sm12 md12 lg12 xl12>
          <!-- <v-layout v-if="isManagementMode"  blue class="elevation-24" column xs12 sm12 md12 lg12 xl12> -->
          <v-layout column>
            <v-flex>
              <img
                class="vertical-center"
                :src="tempVegetable.fileName"
                alt="無毒栽種, 有機轉型, 有機認證"
              />
            </v-flex>
          </v-layout>
          <v-layout column px-3 py-3 xs12 sm12 md12 lg12 xl12>
            <v-layout column>
              <v-layout row class="" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  :v-model="this.tempVegetable.sn"
                  type="text"
                  :label="`序號 ：${tempVegetable.sn}`"
                  :disabled="true"
                ></v-text-field>
                <!-- <label xs3 sm3 md3 lg3 xl3>序號 ：</label> -->
                <!-- <input xs9 sm9 md9 lg9 xl9 type="text" :value="tempVegetable.sn" :disabled="true" /> -->
              </v-layout>
              <v-flex class="" v-if="false">
                <v-text-field
                  type="file"
                  id="upfile"
                  label="改圖片*"
                ></v-text-field>
                <!-- <label>改圖片* ：</label> -->
                <!-- <input type="file" id="upfile" /> -->
              </v-flex>
              <v-flex class="">
                <v-text-field
                  v-model="tempVegetable.item"
                  value="tempVegetable.item"
                  type="text"
                  label="產品名* ："
                ></v-text-field>
                <!-- <label>產品名* ：</label> -->
                <!-- <input type="text" v-model="tempVegetable.item" value="tempVegetable.item" /> -->
              </v-flex>
              <v-flex class="">
                <v-text-field
                  v-model="tempVegetable.place"
                  value="tempVegetable.place"
                  type="text"
                  label="產地* ："
                ></v-text-field>
                <!-- <label>產地* ：</label> -->
                <!-- <input type="text" v-model="tempVegetable.place" value="tempVegetable.place" /> -->
              </v-flex>
              <v-flex class="">
                <v-text-field
                  v-model="tempVegetable.price"
                  value="tempVegetable.price"
                  type="number"
                  label="價格* ："
                  min="1"
                ></v-text-field>
                <!-- <label>價格* ：</label>
                    <input
                      class="edit_2"
                      type="number"
                      v-model="tempVegetable.price"
                      value="tempVegetable.price"
                      min="1"
                    /> -->
              </v-flex>
              <v-flex class="">
                <v-text-field
                  v-model="tempVegetable.weight"
                  value="tempVegetable.weight"
                  type="text"
                  label="重量* ："
                ></v-text-field>
                <!-- <label>重量 ：</label> -->
                <!-- <input
                    class="edit_2"
                    type="text"
                    v-model="tempVegetable.weight"
                    value="tempVegetable.weight"
                  /> -->
              </v-flex>
            </v-layout>
          </v-layout>
          <v-layout>
            <v-flex class="mx-1 my-1">
              <v-btn
                block
                color="green"
                class="title"
                v-on:click.native.stop="addItemComplete"
              >
                <!-- <i class="fa fa-plus-circle plus" aria-hidden="true"></i>-->
                &nbsp完成
              </v-btn>
            </v-flex>
            <v-flex class="mx-1 my-1">
              <v-btn
                block
                color="red"
                class="title"
                v-on:click.native.stop="cancelAddItem"
              >
                <!-- <i class="fa fa-minus-circle minus" aria-hidden="true"></i>-->
                &nbsp取消
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="mx-1 my-1">
              <v-btn
                block
                color="orange"
                class="title"
                v-on:click.native.stop="createTestItem"
              >
                <!-- <i class="fa fa-minus-circle minus" aria-hidden="true"></i>-->
                &nbsp生成一個產品
              </v-btn>
            </v-flex>
          </v-layout>
        </v-layout>
        <!-- add content end -->
      </div>
    </div>

    <div v-show="!this.isAddMode">
      <!-- products begin -->
      <div justify-center align-center>
        <v-layout>
          <!-- <v-flex class="de-margin-m1"> -->
          <v-flex class="">
            <v-carousel :interval="5000">
              <v-carousel-item
                v-for="(menu, i) in menus"
                :key="i"
                :src="menu.src"
                transition="fade"
                reverse-transition="fade"
              >
                <!-- <v-container fluid justify-center align-center> -->
                <v-flex class="let-center allcenter">
                  <p class="display-1 text-white">Vuex</p>
                  <p class="display-1 text-white">Demo</p>
                </v-flex>

                <!-- </v-container> -->
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </div>

      <v-container fluid grid-list-lg>
        <!-- 2 -->
        <v-layout>
          <v-flex class="allcenter mt-5">
            <h3>
              <i class="fa fa-leaf" aria-hidden="true"></i>新鮮上架
              <v-btn
                v-show="getManagementMode"
                color="orange"
                class="title"
                v-on:click.native.stop="setAddMode"
              >
                <i class="fa fa-check-circle" aria-hidden="true"></i>
                &nbsp新增
              </v-btn>
            </h3>
          </v-flex>
          <div>
            <section class="molding">
              <p class="molding_square"></p>
              <p class="molding_parallelogram"></p>
            </section>
          </div>
        </v-layout>

        <v-layout row wrap class="d-relative zindex-lv0">
          <v-flex
            xs12
            sm12
            md6
            lg4
            xl4
            v-for="(vegetable, index) in vegetables"
            :key="index"
          >
            <v-card class="t3">
              <!-- <div :v-show="!vegetable.isEdit && !this.getCanEdit" class="edit-mask"></div> -->
              <div
                v-show="!vegetable.isEdit && getOneofMaskRule"
                class="edit-mask zindex-lv1"
              ></div>
              <!-- <v-card-media class="my-proc" :src="'@/img/'+vegetable.buyimg" height="300px"> -->
              <v-img class="my-proc" :src="vegetable.fileName" height="300px">
                <div v-show="vegetable.buy" class="amount">
                  <div class="warp-justify">
                    <div>
                      <h3 class="numbers">{{ vegetable.buy }}</h3>
                      <h4 class="des">已購買</h4>
                    </div>
                  </div>
                </div>
              </v-img>

              <!-- 普通 -->
              <v-flex v-show="!getManagementMode">
                <v-card-title primary-title class="justify-center">
                  <div>
                    <h3 class="headline title mb-0">{{ vegetable.item }}</h3>
                    <div class>
                      <p class="origin subheading">{{ vegetable.place }}</p>
                    </div>
                    <div class>
                      <span class="price title">${{ vegetable.price }}</span>
                      <span class="unit title" v-show="vegetable.weight"
                        >/</span
                      >
                      <span class="unit body-1"
                        >{{ vegetable.weight }}{{ vegetable.weight_unit }}</span
                      >
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions class="justify-center">
                  <v-btn
                    flat
                    color="green"
                    class="title"
                    v-on:click.native.stop="setAdd(index)"
                  >
                    <i class="fa fa-plus-circle plus" aria-hidden="true"></i>
                    &nbspbuy
                  </v-btn>
                  <v-btn
                    flat
                    color="green"
                    class="title"
                    v-on:click.native.stop="setDecrease(index)"
                  >
                    <i class="fa fa-minus-circle minus" aria-hidden="true"></i
                    >&nbspremove
                  </v-btn>
                </v-card-actions>
              </v-flex>
              <!-- 管理 -->
              <v-flex v-show="getManagementMode">
                <v-card-title primary-title class="justify-center">
                  <div>
                    <h3 v-show="!vegetable.isEdit" class="headline title mb-0">
                      {{ vegetable.item }}
                    </h3>
                    <h3 v-show="vegetable.isEdit">
                      <v-text-field
                        v-model="tempVegetable.item"
                        :label="`${'舊品名:' + vegetable.item}`"
                        outlined
                      ></v-text-field>
                    </h3>
                    <div class>
                      <p v-show="!vegetable.isEdit" class="origin subheading">
                        {{ vegetable.place }}
                      </p>
                      <p v-show="vegetable.isEdit">
                        <v-text-field
                          v-model="tempVegetable.place"
                          :label="`${'舊產地:' + vegetable.place}`"
                          outlined
                        ></v-text-field>
                      </p>
                    </div>
                    <div class>
                      <div v-show="!vegetable.isEdit">
                        <span class="price title">${{ vegetable.price }}</span>
                        <span class="unit title" v-show="vegetable.weight"
                          >/</span
                        >
                        <span class="unit body-1"
                          >{{ vegetable.weight
                          }}{{ vegetable.weight_unit }}</span
                        >
                      </div>
                      <span v-show="vegetable.isEdit">
                        <v-text-field
                          v-model="tempVegetable.price"
                          :label="`${'舊價格:' + vegetable.price}`"
                          outlined
                        ></v-text-field>
                      </span>
                      <span v-show="vegetable.isEdit">
                        <v-text-field
                          v-show="vegetable.weight"
                          v-model="tempVegetable.weight"
                          :label="
                            `${'舊重量:' +
                              vegetable.weight +
                              vegetable.weight_unit}`
                          "
                          outlined
                        ></v-text-field>
                      </span>
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions
                  class="justify-center"
                  v-show="!vegetable.isEdit"
                >
                  <div>
                    <v-btn
                      flat
                      color="green "
                      class="title"
                      v-on:click.native.stop="setAdd(index)"
                    >
                      <i class="fa fa-plus-circle plus" aria-hidden="true"></i>
                      &nbspbuy
                    </v-btn>
                    <v-btn
                      flat
                      color="green"
                      class="title"
                      v-on:click.native.stop="setDecrease(index)"
                    >
                      <i class="fa fa-minus-circle minus" aria-hidden="true"></i
                      >&nbspremove
                    </v-btn>
                    <div class="clearfix"></div>
                    <v-btn
                      flat
                      color="red"
                      class="title mt-2"
                      v-on:click.native.stop="toEdit(vegetable)"
                    >
                      <i class="fa fa-check-circle" aria-hidden="true"></i>
                      &nbspedit
                    </v-btn>
                  </div>
                </v-card-actions>
                <v-card-actions
                  class="justify-center"
                  v-show="vegetable.isEdit"
                >
                  <div>
                    <v-btn
                      flat
                      color="green"
                      class="title"
                      v-on:click.native.stop="editComplete(vegetable)"
                    >
                      <i class="fa fa-check-circle" aria-hidden="true"></i>
                      &nbsp完成
                    </v-btn>
                    <v-btn
                      flat
                      color="black"
                      class="title"
                      v-on:click.native.stop="editCancel(vegetable)"
                    >
                      <i
                        class="fa fa-minus-circle minus"
                        aria-hidden="true"
                      ></i>
                      &nbsp取消
                    </v-btn>
                    <div class="clearfix"></div>
                    <v-btn
                      flat
                      color="red"
                      class="title mt-2"
                      v-on:click.native.stop="toDelete(vegetable)"
                    >
                      <i
                        class="fa fa-minus-circle minus"
                        aria-hidden="true"
                      ></i>
                      &nbsp刪除此项
                    </v-btn>
                    <div class="clearfix"></div>
                  </div>
                </v-card-actions>
                <v-card-actions v-show="vegetable.isEdit"></v-card-actions>
                <v-card-actions v-show="!getCanEdit"></v-card-actions>
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- <v-container>
          <v-layout justify-center align-center>
            <div class="features-title warp-vertical-center border-up-down">
              <img class="features vertical-center" src="@/../static/img/in-banner.svg" alt="無毒栽種, 有機轉型, 有機認證">
            </div>
          </v-layout>
    </v-container>-->
      <v-container fluid grid-list-lg>
        <v-layout text-center>
          <v-flex class="allcenter mt-5">
            <h3><i class="fa fa-leaf" aria-hidden="true"></i>產地介紹</h3>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex
            xs12
            sm12
            md6
            lg4
            xl4
            v-for="(vegetable, index) in vegetables"
            :key="vegetable.sn"
            v-on:click="goToFarm({ getFarmData: vegetable })"
          >
            <v-card class="none-shadow green lighten-5">
              <!-- <v-card-media class="photo v-icon" v-bind:src="'./img/'+vegetable.fileName" height="300px"></v-card-media>-->

              <div class="circle" mt-3>
                <div class="lt-triangle"></div>
                <img class="circle-inner" :src="vegetable.buyimg" />
                <!-- <img class="circle-inner" :src="vegetable.buyimg"> -->
              </div>
              <v-card-title primary-title class="justify-center">
                <div>
                  <!-- <div class="" v-on:click.prevent.self="goToFarm({ getFarmData: index })"> -->
                  <div class>
                    <h3 class="headline mb-2 star-line">
                      {{ vegetable.place }}
                    </h3>
                    <h4 class="star-line"></h4>
                    <h4 class="mb-2">產品：{{ vegetable.type }}</h4>
                    <h4 class="mb-2">特色：{{ vegetable.features }}</h4>
                    <h4 class="mb-2">農齡：{{ vegetable.age }}</h4>
                    <h4 class="mb-2">{{ vegetable.description }}</h4>
                    <!-- <router-link :to="{ name: 'Farm', params: { getFarmData: index }}"> -->
                    <router-link
                      :to="{ name: 'NewFarm', params: { getFarmData: index } }"
                    >
                      <a class="body-1" href>more...&nbsp</a>
                    </router-link>
                    <!-- <a class="start-more mb-2" v-on:click="jump">
                                  <h4 class="start-more ">more...&nbsp
                                    <i class="fa fa-chevron-circle-right " aria-hidden="true "></i>
                                  </h4>
                  </a>-->
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <Newfooter></Newfooter>
      <!-- products end -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

// import Farm from "@/components/Farm";
import NewFarm from "@/components/NewFarm";
import fbCRUD from "../vuex/fbCRUD";

export default {
  name: "Products",
  components: {},
  data() {
    return {
      allPlaceNames: [
        "空心菜",
        "牛番茄",
        "地瓜葉",
        "黒美人紅肉西瓜",
        "梨山哈密瓜",
        "新竹有籽香蕉"
      ],
      allItemNames: [
        "旺來御菜園有機農場",
        "小農有機農場",
        "天廚有機農場",
        "小廚師有機農場"
      ],
      tempVegetable: {
        item: "",
        place: "",
        price: 0,
        weight: 0
      }
    };
  },
  watch: {
    // "tempVegetable.item": function(newVal, oldVal) {
    //   console.log("tempVegetable item change...", oldVal + "/" + newVal);
    // },
    // "tempVegetable.place": function(newVal, oldVal) {
    //   console.log("tempVegetable place change...", oldVal + "/" + newVal);
    // },
    // "tempVegetable.price": function(newVal, oldVal) {
    //   console.log("tempVegetable price change...", oldVal + "/" + newVal);
    // },
    // "tempVegetable.weight": function(newVal, oldVal) {
    //   console.log("tempVegetable weight change...", oldVal + "/" + newVal);
    // },
    // "tempVegetable.place": function(newVal, oldVal) {
    //   console.log("tempVegetable place change...", oldVal + "/" + newVal);
    // }
  },
  beforeRouteEnter(to, from, next) {
    // console.log(
    //   "Products beforeRouteEnter......" +
    //     " | to= " +
    //     to.name +
    //     " | from= " +
    //     from.name
    // );
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log(
      "Products beforeRouteUpdate......" +
        " | to= " +
        to.name +
        " | from= " +
        from.name
    );
    next();
  },
  inject: ["reload"],
  created: function() {
    // console.log("Products created..........");
  },
  beforeMount: function() {
    // console.log("Products beforeMount..........");
  },
  mounted: function() {
    // console.log("Products mounted..........");
  },
  beforeUpdate: function() {
    // console.log("Products beforeUpdate..........");
  },
  computed: {
    ...mapState([
      "isLogin",
      "isManagementMode",
      "vegetables",
      "menus",
      "isAddMode",
      "modifyType"
    ]),
    ...mapGetters({
      getCanEdit: "fbCRUD/getCanEdit",
      getVegetableItem: "fbCRUD/getVegetableItem",
      getManagementMode: "fbCRUD/getManagementMode",
      // getVegetableIndex: "fbCRUD/getVegetableIndex",
      getT5: "fbCRUD/getT5"
    }),
    getTempVegetable: function() {
      return this.tempVegetable;
    },
    getOneofMaskRule: function() {
      // console.log("getItemMask... isEdit / ", isEdit);
      console.log("getItemMask... getCanEdit / ", this.getCanEdit);
      console.log(
        "getItemMask... getManagementMode / ",
        this.getManagementMode
      );
      console.log(
        "getOneofMaskRule...",
        this.getCanEdit && this.getManagementMode
      );
      return this.getCanEdit && this.getManagementMode;
    }
  },
  methods: {
    ...mapActions({
      getVegetableId: "fbCRUD/getVegetableId",
      fbDbHelper: "fbDbHelper"
    }),
    ...mapMutations([
      "setDecrease",
      "setAdd",
      "setIsAddMode"
      // {
      // setIsAddMode: "fbCRUD/getItemId"
      // }
    ]),
    ...mapMutations({
      setCanEdit: "fbCRUD/SET_CAN_EDIT"
    }),
    setAddMode: function() {
      // true 顯示， false 隱藏新增視窗
      // 新增功能加上顯示功能框
      // console.log("setAddMode...");
      this.addOneItem();
      this.setIsAddMode(true);
    },
    goToFarm: function(obj) {
      // 方式一
      this.reload();
      setTimeout(() => {
        // this.$router.push({ name: "Farm", params: obj });
        this.$router.push({ name: "NewFarm", params: obj });
      }, 250);

      // 方式二
      // this.reload(false);
      // setTimeout(() => {
      // this.$router.push({ name: "Farm", params: obj });
      // }, 250);
      // setTimeout(() => {
      // this.reload(true);
      // }, 300);
    },
    jump: function() {
      alert("單頁Demo，無其他連結");
    },
    toDelete: function(objVegetable) {
      console.log("toDelete.../ ", objVegetable.sn);

      let _itemIndexNumber = objVegetable.sn;
      let _type = this.$store.state.modifyType.delete;
      let _dataObj = "deleteIt";

      let _payload = {
        itemIndexNumber: _itemIndexNumber,
        type: _type,
        dataObj: _dataObj
      };

      console.log("toDelete... _payload", _payload);

      this.fbDbHelper(_payload);
      this.endEdit(objVegetable);
      // this.$store.dispatch("fbCRUD/deleteVegetableItem", objVegetable.sn);
    },
    tempVegetableInit: function(objVegetable) {
      // 修改時先把原先item的資料複製一份到temp item上
      // this.clearTempVegetable(objVegetable);
      this.$set(this.tempVegetable, "item", objVegetable.item);
      this.$set(this.tempVegetable, "place", objVegetable.place);
      this.$set(this.tempVegetable, "price", objVegetable.price);
      this.$set(this.tempVegetable, "weight", objVegetable.weight);
      // console.log(
      //   "tempVegetableInit this.tempVegetable... / ",
      //   this.tempVegetable
      // );
    },
    vegetableWriteBack: function(objVegetable) {
      console.log("vegetableWriteBack...");
      let _len1 = String(this.tempVegetable.item).length;
      let _len2 = String(this.tempVegetable.place).length;
      let _num1 = this.tempVegetable.price > 0;
      let _len3 = String(this.tempVegetable.item.weight).length;

      let _itemIndexNumber = objVegetable.sn;

      let _type = this.$store.state.modifyType.update;
      // let oldObj = JSON.parse(JSON.stringify(objVegetable));

      let _dataObj = {
        item: this.tempVegetable.item,
        place: this.tempVegetable.place,
        price: this.tempVegetable.price,
        weight: this.tempVegetable.weight
      };

      let _payload = {
        itemIndexNumber: _itemIndexNumber,
        type: _type,
        dataObj: _dataObj
      };

      console.log("vegetableWriteBack... _payload", _payload);
      this.fbDbHelper(_payload);

      // this.$set(objVegetable, "item", this.tempVegetable.item);
      // this.$set(objVegetable, "place", this.tempVegetable.place);
      // this.$set(objVegetable, "price", this.tempVegetable.price);
      // this.$set(objVegetable, "weight", this.tempVegetable.weight);
    },
    clearTempVegetable: function(editing_vegetable) {
      // this.tempVegetable.item = "";
      // this.tempVegetable.place = "";
      // this.tempVegetable.price = 0;
      // this.tempVegetable.weight = "";

      this.tempVegetable = null;
      this.tempVegetable = JSON.parse(JSON.stringify(editing_vegetable));
      // console.log("clearTempVegetable...");
    },
    editCancel: function(objVegetable) {
      // console.log("editCancel... ");
      this.endEdit(objVegetable);
    },
    toEdit: function(objVegetable) {
      this.$set(objVegetable, "isEdit", true);
      this.setCanEdit(true);
      this.tempVegetableInit(objVegetable);
      // console.log("toEdit... objVegetable", objVegetable);

      // this.$store.dispatch("fbCRUD/getVegetableId", objVegetable.sn);
      // alert("請先登入後，方可修改");
    },
    indexInVegetables: function(id) {
      console.log("indexInVegetables... id", id);

      // this.vegetables.findIndex(function(item) {
      // console.log("indexInVegetables... item.sn", item.sn);
      // return item.sn === id;
      // });

      // let _index = this.vegetables.findIndex(function(item) {
      //   console.log("indexInVegetables... item.sn", item.sn);
      //   return item.sn === id;
      // });
      // return _index;
    },
    VegetableCreater: function() {
      let _vegetable = {};

      _vegetable.sn = new Date().getTime();
      _vegetable.place = "旺來御菜園有機農場";
      _vegetable.item = "空心菜";
      _vegetable.type = "有機蔬菜";
      _vegetable.pathName = "../img/";
      _vegetable.fileName = "@/../static/img/eat01.jpg";
      _vegetable.buyimg = "@/../static/img/build02.jpg";
      _vegetable.price = 0;
      _vegetable.buy = 0;
      _vegetable.max = 5;
      _vegetable.isEdit = false;
      _vegetable.weight = 0;
      _vegetable.weight_unit = "克";
      _vegetable.origin = "雲林縣西螺鎮";
      _vegetable.features = "有機無毒耕作";
      _vegetable.age = 0;
      _vegetable.description = "“ 無藥生菜種植 化不可能為可能 ”";

      return _vegetable;
    },
    addOneItem: function() {
      this.tempVegetable = new this.VegetableCreater();
      console.log("addOneItem... this.tempVegetable", this.tempVegetable);
    },
    getRandom: function(min, max) {
      // console.log("getRandom...");
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    createTestItem: function() {
      const _builds = [
        "@/../static/img/build01.jpg",
        "@/../static/img/build02.jpg",
        "@/../static/img/build03.jpg",
        "@/../static/img/build04.jpg",
        "@/../static/img/build05.jpg",
        "@/../static/img/build06.jpg"
      ];
      const _fileNames = [
        "@/../static/img/eat01.jpg",
        "@/../static/img/eat02.jpg",
        "@/../static/img/eat03.jpg",
        "@/../static/img/eat04.jpg",
        "@/../static/img/eat05.jpg",
        "@/../static/img/eat06.jpg"
      ];
      const _items = [
        "牛番茄",
        "地瓜葉",
        "空心菜",
        "黒美人紅肉西瓜",
        "有夠甜玉米",
        "無籽香蕉"
      ];
      const _places = [
        "東農有機農場",
        "旺來御菜園有機農場",
        "粉好吃有機農場",
        "小廚師有機農場",
        "真高級有機農場",
        "來一客有機農場"
      ];
      this.tempVegetable = new this.VegetableCreater();

      // console.log("createTestItem..._index / ", _index);

      this.$set(this.tempVegetable, "sn", new Date().getTime());
      this.$set(
        this.tempVegetable,
        "fileName",
        _fileNames[this.getRandom(0, 5)]
      );
      this.$set(this.tempVegetable, "buyimg", _builds[this.getRandom(0, 5)]);
      this.$set(
        this.tempVegetable,
        "item",
        _items[this.getRandom(0, 5)] + String(this.getRandom(1, 99))
      );
      this.$set(
        this.tempVegetable,
        "place",
        _places[this.getRandom(0, 5)] + String(this.getRandom(1, 99))
      );
      this.$set(this.tempVegetable, "price", Number(this.getRandom(30, 999)));
      this.$set(this.tempVegetable, "weight", Number(this.getRandom(30, 999)));

      console.log("createTestItem this.tempVegetable...", this.tempVegetable);
    },
    cancelAddItem: function() {
      console.log("cancelAddItem...");
      this.setIsAddMode(false);
    },
    addItemComplete: function() {
      console.log("addItemComplete...");

      console.log("5 this.tempVegetable.sn = ", this.tempVegetable.sn);
      console.log("5 this.tempVegetable.item = ", this.tempVegetable.item);
      console.log("5 this.tempVegetable.place = ", this.tempVegetable.place);
      console.log("5 this.tempVegetable.price = ", this.tempVegetable.price);
      console.log("5 this.tempVegetable.weight = ", this.tempVegetable.weight);

      let _type = this.$store.state.modifyType.create;
      console.log("_type = ", _type);

      let _itemIndexNumber = "" + this.tempVegetable.sn;
      let _payload = {
        itemIndexNumber: _itemIndexNumber,
        type: _type,
        dataObj: this.tempVegetable
      };

      this.fbDbHelper(_payload);
      // this.$store.dispatch("fbCRUD/pushOneVegetable", this.tempVegetable);
      this.setIsAddMode(false);
    },
    editComplete: function(objVegetable) {
      // console.log("editComplete...");
      this.vegetableWriteBack(objVegetable);
      this.endEdit(objVegetable);
      // this.$store.commit("fbCRUD/SET_MANAGEMENT_MODE", {this.$store.state , boolean: false});
    },
    cancelEdit: function() {
      console.log("cancelEdit...");
      this.endEdit();
      // this.$store.commit("fbCRUD/SET_MANAGEMENT_MODE", {this.$store.state , boolean: false});
    },
    endEdit: function(objVegetable) {
      console.log("endEdit...");
      this.$set(objVegetable, "isEdit", false);

      // 兩種寫法，方式一
      // this.$store.commit("fbCRUD/SET_CAN_EDIT", false);
      // 兩種寫法，方式二
      this.setCanEdit(false);
      // 應該用不到
      // this.$store.commit("fbCRUD/CLEAR_VEGETABLE_ITEM", null);
    },
    mmm: function() {
      // commit("SET_VEGETABLE_ITEM", rootState.vegetables[_index]);
      console.log("mmm...");
      // alert("請先登入後，方可修改");
    }
  }
};
</script>

<style lang="scss">
@import "../style/global.scss";
@import "../style/my_animation.scss";
@import "../style/style.scss";

.edit_2 {
  width: 100px;
  height: auto;
  // background-color: pink;
}

.edit-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

.add_item_warp {
  max-width: 100%;
  width: 100%;
  height: 100%;
  // padding-top: 5%;
  // padding-left: 15%;
  // padding-right: 15%;
  padding: 16px;
  z-index: $zindex-upgrade1;
  // background-color: pink;

  img {
    max-width: 100%;
    width: 100%;
  }

  label,
  input {
    font-size: 18px;
  }

  input {
    width: 100%;
    // border: 1px solid green;
    padding: 0 8px;
    // border-radius: 5px;
  }
}

.allcenter {
  text-align: center;
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
  .numbers {
    @include font-size(36);
    margin-bottom: 10px;
  }
}

.fade {
  &-enter-active,
  &-leave-active,
  &-leave-to {
    transition: 0.3s ease-out;
    position: absolute;
    top: 0;
    left: 0;
  }
  &-enter,
  &-leave,
  &-leave-to {
    opacity: 0;
  }
}
</style>

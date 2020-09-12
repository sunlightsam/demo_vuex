// :style="{ // backgroundImage: `url(${require('../static/images/meat2.jpg')})`
// }"

<template>
  <v-layout column wrap class="farm-config">
    <v-flex xs12 sm12 md12 lg12 xl12>
      <section id="section01">
        <div class="d-flex onepage">
          <div
            class="section1-ly1"
            :style="{
              backgroundImage: 'url(' + backgroundImageArray[0] + ')'
            }"
          >
            <!-- <img id class="bgimg" src="@/../static/img/build01.jpg" /> -->
          </div>
          <div
            data-aos="zoom-in-up"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-anchor="#section01"
            data-aos-anchor-placement="center-bottom"
            data-aos-once="false"
            class="section1-ly2 d-center"
          >
            <div class="ly2text-warp">
              <div class="mark3"></div>
              <h2 class="mb-3 d-center">{{ farmData.place }}</h2>
              <div class="txtbox-line d-center"></div>
              <h3 class="mt-3 d-center pr-5">“&nbsp無藥生菜種植</h3>
              <h3 class="mt-4 d-center pl-5">
                化
                <h3 class="makemini">&nbsp不可能&nbsp</h3>
                為
                <h3 class="makebig">&nbsp可能</h3>
                &nbsp”
              </h3>
            </div>
          </div>
          <v-layout
            column
            class="section1-ly3"
            data-aos="flip-up"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-anchor="#section01"
            data-aos-anchor-placement="center-bottom"
            data-aos-once="false"
          >
            <v-flex column xs4 sm4 md4 lg4 xl4 class="d-center">
              <img
                data-aos="zoom-in"
                data-aos-delay="100"
                data-aos-duration="600"
                data-aos-anchor="#section01"
                data-aos-anchor-placement="center-bottom"
                data-aos-once="false"
                class="ly3-img01"
                src="@/../static/img/eat01.jpg"
              />
              <img
                data-aos="zoom-in"
                data-aos-delay="300"
                data-aos-duration="900"
                data-aos-anchor="#section01"
                data-aos-anchor-placement="center-bottom"
                data-aos-once="false"
                class="ly3-img02"
                src="@/../static/img/eat02.jpg"
              />
              <img
                data-aos="zoom-in"
                data-aos-delay="500"
                data-aos-duration="1200"
                data-aos-anchor="#section01"
                data-aos-anchor-placement="center-bottom"
                data-aos-once="false"
                class="ly3-img03"
                src="@/../static/img/eat03.jpg"
              />
              <img
                data-aos="zoom-in"
                data-aos-delay="100"
                data-aos-duration="600"
                data-aos-anchor="#section01"
                data-aos-anchor-placement="center-bottom"
                data-aos-once="false"
                class="ly3-img01"
                src="@/../static/img/eat04.jpg"
              />
              <img
                data-aos="zoom-in"
                data-aos-delay="300"
                data-aos-duration="900"
                data-aos-anchor="#section01"
                data-aos-anchor-placement="center-bottom"
                data-aos-once="false"
                class="ly3-img02"
                src="@/../static/img/eat06.jpg"
              />
              <img
                data-aos="zoom-in"
                data-aos-delay="500"
                data-aos-duration="1200"
                data-aos-anchor="#section01"
                data-aos-anchor-placement="center-bottom"
                data-aos-once="false"
                class="ly3-img03"
                src="@/../static/img/eat05.jpg"
              />
            </v-flex>
          </v-layout>
        </div>
      </section>

      <section id="section02">
        <v-layout column>
          <v-flex
            class="farm-txtbox d-center"
            data-aos="zoom-in"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-anchor="#section02"
            data-aos-anchor-placement="center-bottom"
            data-aos-once="false"
          >
            <div>
              <h3 class="d-center mb-3">特色：{{ farmData.features }}</h3>
              <div class="txtbox-line"></div>
              <h2 class="d-center mt-3 mb-3">我們保證</h2>
              <h2 class="d-center mt-2">不使用任何農藥</h2>
            </div>
          </v-flex>
        </v-layout>
      </section>

      <section
        id="section03"
        :style="{
          backgroundImage: 'url(' + backgroundImageArray[1] + ')'
        }"
      >
        <v-layout>
          <v-flex class="textbox d-center" xs12 sm12 md12 lg12 xl12>
            <div
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="500"
              data-aos-anchor="#section03"
              data-aos-anchor-placement="center-bottom"
              data-aos-once="false"
            >
              <h2 class="mt-1 mb-1 d-center">當季特價</h2>
              <h2 class="mt-1 mb-1 d-center">1斤加1斤</h2>
              <h2 class="mt-1 mb-1 d-center">兩斤堪吉，讚</h2>
            </div>
          </v-flex>
        </v-layout>
      </section>

      <section id="section04">
        <v-layout column class="d-center">
          <v-flex class="text04-warp">
            <div class="section04-bgimg"></div>
            <div
              data-aos="zoom-in"
              data-aos-delay="500"
              data-aos-duration="1000"
              data-aos-anchor="#section04"
              data-aos-anchor-placement="top-bottom"
              data-aos-once="false"
            >
              <h2 class="d-center mt-3 mb-3">-300折扣卷</h2>
              <v-text-field
                class="body-2 mt-0"
                v-model="themail"
                type="'email'"
                label="請輸入Email"
                password
              ></v-text-field>
              <h3 class="d-center mt-3 mb-3">填寫任一，馬上取得</h3>
              <v-text-field
                class="body-2 mt-0"
                v-model="thetel"
                type="'text'"
                label="或者手機號碼"
                password
              ></v-text-field>
              <v-btn
                block
                tile
                depressed
                class="py-4 green sendbutton"
                @click.stop="getInfo(themail, thetel)"
              >
                送出取得
                <!-- <v-icon medium>person</v-icon> -->
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </section>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      themail: "",
      thetel: "",
      backgroundImageArray: [
        "@/../static/img/build05.jpg",
        "@/../static/img/eat02.jpg"
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(
      "Farm beforeRouteEnter......" +
        " | to= " +
        to.name +
        " | from= " +
        from.name
    );
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log(
      "Farm beforeRouteUpdate......" +
        " | to= " +
        to.name +
        " | from= " +
        from.name
    );
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log(
      "Farm beforeRouteLeave......" +
        " | to= " +
        to.name +
        " | from= " +
        from.name
    );
    next();
  },
  beforeMount: function() {
    //接收引數
    // console.log("Farm beforeMount......");
    // console.log(
    // "this.$route.params.getFarmData =" + this.$route.params.getFarmData
    // );
    // console.log(
    // "this.$route.params.getFarmData =" + this.$route.params.getFarmData
    // );

    if (
      typeof this.$route.params.getFarmData === "undefined" ||
      typeof this.$route.params.getFarmData === null
    ) {
      //不是由Products.vue進入，所以sentObject未定義，返回
      this.$router.push("/");
    } else {
      this.$store.commit("setFarmData", this.$route.params.getFarmData);
    }

    //reload this.farmIndex = 0;
    // console.log("farmData =" + this.farmData);
  },
  created: function() {
    // console.log("Farm created......");
  },
  mounted: function() {
    // console.log("Farm mounted......");
  },
  computed: {
    ...mapState(["farmData", "vegetables"])
  },
  methods: {
    ...mapMutations(["setFarmData"]),
    getInfo(email, tel) {
      if (email) {
        console.log("email / ", email);
      }
      if (tel) {
        console.log("tel / ", tel);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/global.scss";
@import "../style/my_animation.scss";
@import "../style/style.scss";

.farm-config {
  background-color: black;
  height: auto;
}

section {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: $zindex-upgrade1;
  h2 {
    font-size: 2.5rem;
    width: 100%;
    height: 100%;
    z-index: $zindex-upgrade3;
    color: yellow;
  }
  h3 {
    font-size: 1.7rem;
    color: white;
  }
  p {
    font-size: 1.3rem;
    color: white;
  }

  .makemini {
    font-size: 1.3rem;
    color: orange;
  }
  .makebig {
    font-size: 2rem;
    color: orange;
  }
}

section,
section::nth-child(2),
section::nth-child(3),
section::nth-child(4) {
}

// section {
.section1-ly1 {
  width: 100%;
  height: 100vh;
  // background-image: url(../../static/img/build05.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: $zindex-upgrade1;
  // background-color: yellow;
}

section:nth-child(2) {
  height: 50vh;
  background-color: transparent;
}

section:nth-child(3) {
  height: 100vh;
  // background-image: url(../../static/img/eat02.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  // background-color: black;
  .textbox {
    background: green;
  }
  .imgbox {
    width: 20vw;
    height: 20vw;
    border-radius: 100%;
    -webkit-filter: blur(1px);
    -moz-filter: blur(1px);
    -o-filter: blur(1px);
    -ms-filter: blur(1px);
    filter: blur(15px);
  }
}

section:nth-child(4) {
  height: 100vh;
  background-color: green;
  h2,
  h3,
  h4 {
    color: yellow;
  }
  .text04-warp {
    position: relative;
    margin: 0 10px;
    padding: 30px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    // overflow: hidden;
    // color: white;
  }
  .section04-bgimg {
    position: absolute;
    top: -50px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 0 0 50px;
    border-color: transparent transparent transparent rgba(0, 0, 0, 0.3);
  }
  .sendbutton {
    font-size: 1.8rem;
    color: white;
  }
}

.onepage {
  position: relative;
  .bgimg {
    width: 100%;
  }
}

.onepage,
.onepage .section1-ly1,
.onepage .section1-ly2,
.onepage .section1-ly3 {
  width: 100%;
  height: 100vh;
  // background-color: transparent;
}

.onepage .section1-ly1,
.onepage .section1-ly2,
.onepage .section1-ly3 {
  position: absolute;
}

.section1-ly1 {
  z-index: $zindex-upgrade1;
}

.section1-ly2 {
  z-index: $zindex-upgrade3;

  h2,
  h4 {
    color: white;
  }
  .ly2text-warp {
    position: relative;
    margin: 0 10px;
    padding: 30px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    // overflow: hidden;
  }
  .mark3 {
    position: absolute;
    top: -20px;
    left: 46%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 20px 20px 20px;
    border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
    z-index: $zindex-upgrade1;
  }
}

.section1-ly3 {
  display: flex;
  position: absolute;
  // top: -5vw;
  // left: -5vw;
  z-index: $zindex-upgrade2;
  & img {
    // padding: 0;
    margin-top: 5vh;
    width: 20vh;
    height: 10vh;
    // border-radius: 100%;
    object-fit: contain;
  }
}

.d-hidden {
  overflow: hidden;
}

.txtbox-line {
  width: 100%;
  border-top: 2px solid white;
}

.farm-txtbox {
  color: white;
  text-shadow: $shadow-black;

  .lighttext {
    color: rgb(215, 215, 215);
  }
}
</style>

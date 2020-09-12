<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12 lg12 xl12>
      <v-card class="green lighten-5 d-flex d-relative d-hidden">
        <div class="farm_img">
          <img class :src="vegetables[farmIndex].buyimg" />
          <!-- <img class="circle-inner" :src="vegetable.buyimg"> -->
          <div class="d-flex-c d-absolute d-text-center">
            <dir class="farm-txtbox">
              <h3 class="mb-2">{{vegetables[farmIndex].place}}</h3>
              <h4 class></h4>
              <h4 class="mb-2">產品：{{vegetables[farmIndex].type}}</h4>
              <h4 class="mb-2">特色：{{vegetables[farmIndex].features}}</h4>
              <div class="txtbox-line">
                <h4 class="mt-2 mb-2 lighttext">農齡：{{vegetables[farmIndex].age}}</h4>
                <h4 class="mb-2 lighttext">{{vegetables[farmIndex].description}}</h4>
              </div>
            </dir>
          </div>
          <div class="d-flex-c d-absolute modeling_newa"></div>
          <div class="d-flex-c d-absolute modeling_newb"></div>
        </div>

        <!-- <div class="modeling">
          <div class="modeling_parallelogram"></div>
        </div>-->

        <!-- <v-card-title primary-title>
          <div>
            <div class="">
              <h3 class="headline mb-2 star-line">{{vegetables[farmIndex].place}}</h3>
              <h4 class="star-line"></h4>
              <h4 class="mb-2">產品：{{vegetables[farmIndex].type}}</h4>
              <h4 class="mb-2">特色：{{vegetables[farmIndex].features}}</h4>
              <h4 class="mb-2 text-green">農齡：{{vegetables[farmIndex].age}}</h4>
              <h4 class="mb-2 text-green">{{vegetables[farmIndex].description}}</h4>
            </div>
          </div>
        </v-card-title>-->
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {};
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
    console.log("Farm beforeMount......");

    //接收引數
    console.log("Farm beforeMount......");
    console.log(
      "this.$route.params.sentObjectIndex =" +
        this.$route.params.sentObjectIndex
    );
    console.log(
      "this.$route.params.sentObjectIndex =" +
        this.$route.params.sentObjectIndex
    );

    if (
      typeof this.$route.params.sentObjectIndex === "undefined" ||
      typeof this.$route.params.sentObjectIndex === null
    ) {
      //不是由Products.vue進入，所以sentObject未定義，返回
      this.$router.push("/");
    } else {
      this.$store.commit("setFarmIndex", this.$route.params.sentObjectIndex);
    }

    //reload this.farmIndex = 0;
    console.log("farmIndex =" + this.farmIndex);
  },
  created: function() {
    // console.log("Farm created......");
  },
  mounted: function() {
    // console.log("Farm mounted......");
  },
  computed: {
    ...mapState(["farmIndex", "vegetables"])
  },
  methods: {
    ...mapMutations(["setFarmIndex"])
  }
};
</script>

<style lang="scss" scoped>
@import "../style/global.scss";
@import "../style/my_animation.scss";
@import "../style/style.scss";

.farm_img {
  img {
    width: 100%;
  }
}

.modeling {
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(-10deg, green 50%, transparent 50%);
  justify-content: center;
}

.modeling_parallelogram {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.d-hidden {
  overflow: hidden;
}

.modeling_newa {
  width: 100%;
  height: 25%;
  right: 0;
  bottom: -22%;
  margin-right: 25%;
  background-color: rgba(255, 255, 255, 0.3);
  transform-origin: top left;
  transform: skewY(-10deg);
}

.modeling_newb {
  width: 100%;
  height: 25%;
  left: 0;
  bottom: -4.5%;
  margin-left: 75%;
  background-color: rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 0, 0, 0.3);

  transform-origin: top left;
  transform: skewY(20deg);
}

.farm-txtbox {
  color: white;
  text-shadow: $shadow-black;
  .txtbox-line {
    border-top: 2px solid white;
  }

  .lighttext {
    color: rgb(215, 215, 215);
  }
}
</style>

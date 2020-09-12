<template>
<div>
    <v-footer height="auto">
      <v-card flat tile class="flex">
        <v-card-title class="teal white--text">
          <strong class="subheading">{ Vuex Demo }</strong>
          <v-spacer></v-spacer>
          <v-btn
            v-for="(icon, index) in icons"
            :key="icon.img"
            :href="icon.url"
            target="_blank"
            icon
            dark
            class="mx-3"
          >
            <v-icon size="24px">{{ icons[index].img }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="green lighten-4">
          <v-layout>
            <v-flex xs4 sm4 md4 lg4 xl4 layout column>
              <div>
                <ul>
                  <li class="footer-nav-title">購買</li>
                  <li class="body-1">
                    <a href="javascript:void(0)">流程介紹</a>
                  </li>
                  <li class="body-1">
                    <a href="javascript:void(0)">營業據點</a>
                  </li>
                </ul>
              </div>
            </v-flex>
            <v-flex xs4 sm4 md4 lg4 xl4 layout column>
              <div>
                <ul>
                  <li class="footer-nav-title">尋找</li>
                  <li class="body-1">
                    <a href="javascript:void(0)">客戶服務&nbsp</a>
                  </li>
                  <li class="body-1">
                    <a href="javascript:void(0)">常見問題&nbsp</a>
                  </li>
                </ul>
              </div>
            </v-flex>
            <v-flex xs4 sm4 md4 lg4 xl4 layout column>
              <div>
                <ul>
                  <li class="footer-nav-title">介紹</li>
                  <li class="body-1">
                    <a href="javascript:void(0)">關於我們</a>
                  </li>
                  <li class="body-1">
                    <a href="javascript:void(0)">我們伙伴</a>
                  </li>
                </ul>
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-layout class="card__text green lighten-3">
          <v-flex class="flex xs12 sm12 md6 lg6">
            <div class="address">
              <p class="body-1">台北市XX區XXXX路OOO巷OO號</p>
            </div>
          </v-flex>
          <v-flex class="flex xs12 sm12 md6 lg6">
            <div class="address">
              <p class="body-1">週一至五早上 9:00-下午 6:00</p>
              <p class="body-1">週六早上12:00 -下午 6:00</p>
            </div>
          </v-flex>
        </v-layout>
        <div class="card__actions grey lighten-3 justify-center body-1">
          &copy;2018 —
          <strong class="body-1">{ Vuex Demo }</strong>
        </div>
      </v-card>
    </v-footer>
</div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          img: "fab fa-facebook",
          url: "https://www.facebook.com/"
        },
        {
          img: "fab fa-twitter",
          url: "https://twitter.com/"
        },
        {
          img: "fab fa-instagram",
          url: "https://www.instagram.com/"
        }
        // "fab fa-google-plus",
        // "fab fa-linkedin",
      ]
    };
  },
  computed: {
    // ...mapState(["farmIndex", "vegetables"])
  },
  methods: {
    // ...mapMutations(["setFarmIndex"])
  }
};
</script>


<style lang="scss" scoped>
@import "../style/global.scss";
</style>

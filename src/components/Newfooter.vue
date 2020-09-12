<template>
  <div class="footwarp">
    <v-footer height="auto">
      <v-card flat tile class="flex">
        <v-card-title class="teal white--text">
          <v-flex xs8 sm8 md8 lg8 xl8>
            <strong class="mx-3 subheading">{Vuex Demo + Firebase}</strong>
            <v-spacer></v-spacer>
          </v-flex>
          <v-flex xs4 sm4 md4 lg4 xl4>
            <v-btn
              v-for="(icon, index) in icons"
              :key="icon.img"
              :href="icon.url"
              target="_blank"
              icon
              dark
              class
            >
              <v-icon size="24px">{{ icons[index].img }}</v-icon>
            </v-btn>
          </v-flex>
        </v-card-title>
        <v-card-text class="green lighten-4">
          <v-layout>
            <v-flex align-center xs4 sm4 md4 lg4 xl4 layout column>
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
            <v-flex align-center xs4 sm4 md4 lg4 xl4 layout column>
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
            <v-flex align-center xs4 sm4 md4 lg4 xl4 layout column>
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
            <div class="address d-center">
              <p class="body-1">T市U區J路A巷Q號</p>
            </div>
          </v-flex>
          <v-flex class="flex xs12 sm12 md6 lg6 d-center">
            <div class="address">
              <p class="body-1">週一至五早上 9:00-下午 6:00</p>
              <p class="body-1">週六早上12:00 -下午 6:00</p>
            </div>
          </v-flex>
        </v-layout>
        <div class="card__actions grey lighten-3 justify-center body-1">
          &copy;2020 —
          <strong class="body-1">{ Vuex Demo + Firebase }</strong>
        </div>
        <div class="card__actions grey lighten-3 justify-center body-1 pb-3">
          <h4>個人練習用無任何商業用途</h4>
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

.footwarp {
  margin-top: 32px;
}
</style>

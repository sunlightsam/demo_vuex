<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ menus[menuId].name }}</h3>
            <div class="text-grey body-2">
              {{ menus[menuId].description }}...
            </div>
          </div>
        </v-card-title>
        <v-img :src="menus[menuId].src" height="300px"></v-img>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      index: null
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log("Menu beforeRouteEnter......");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // console.log("Menu beforeRouteUpdate......");
    console.log(this.$route.params.id);
    next();
  },
  beforeRouteLeave(to, from, next) {
    // console.log("Menu beforeRouteLeave......");
    console.log(this.$route.params.id);
    next();
  },
  beforeMount: function() {
    // console.log("Menu beforeMount......");
    console.log(this.$route.params.id);
    console.log("this.menuId = " + this.menuId);
    console.log("this.$route.params =" + this.$route.params);

    //不是由Products.vue進入，所以sentObject未定義，返回
    if (typeof this.menuId === "undefined" || this.menuId === null) {
      this.$router.push("/");
    } else {
      // console.log("Menu beforeMount else......");
    }
  },
  created: function() {
    // console.log("Menu created......");
  },
  mounted: function() {
    // console.log("Menu mounted......");
  },
  computed: {
    ...mapState(["menus", "menuId"])
  },
  methods: {
    getImgHeight: function() {
      let img = $("#img_id"); // Get my img elem
      let pic_real_width;
      let pic_real_height;
      $("&lt;img/&gt;") // Make in memory copy of image to avoid css issues
        .attr("src", $(img).attr("src"))
        .load(function() {
          img_real_width = this.width; // Note: $(this).width() will not
          img_real_height = this.height; // work for in memory images.
        });
    }
  }
};
</script>

<style lang="scss">
.card__media {
}

.img-responsive {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
</style>

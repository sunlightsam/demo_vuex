$(document).ready(function () {

  var app1 = new Vue({
    // 注意是EL
    el: '#app',
    router,
    components: {
      App
    },
    template: '<App/>',
    data() {
      return {
        vegetables: {},
        logoutDialog: false,
        loginDialog: false,
        isTopMask: false,
        isCertOpen: false,
        isDebug: false,
        isLoginOverLay: false,
        isLogin: false,
        loginUser: {
          userName: 'Guest',
          userEmail: '',
          picture: 'https://randomuser.me/api/portraits/men/86.jpg'
        },
        account: [{
            userName: 'John Leider',
            userEmail: '',
            picture: 'https://randomuser.me/api/portraits/men/88.jpg'
          },
          {},
        ],
        buySum: 0,
        totalSum: 0,
        isUpdate: false,
        myBox: {},
        myScroll: {},
        scroll_X: 0,
        scroll_Y: 0,
        drawer: false,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || '名字最長10個字'
          // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        userpwd: '',
        pwdRules: [
          v => !!v || 'Password is required',
          v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || '8位數，至少一個英文字母,一個數字'
          // v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'Password must be valid'
        ],
        checkbox: false,
        icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
        items: [{
            title: '產品',
            icon: 'dashboard',
            src: './img/s1.jpg',
            linkOut: '產品.html'
          }, {
            title: '客戶服務',
            icon: 'question_answer',
            src: './img/s2.jpg',
            linkOut: '客戶服務.html'
          },
          {
            title: '常見問題',
            icon: 'dashboard',
            src: './img/s3.jpg',
            linkOut: '常見問題.html'
          }, {
            title: '關於我們',
            icon: 'question_answer',
            src: './img/s1.jpg',
            linkOut: '關於我們.html'
          }
        ]
      }
    },
    created: function () {
      console.log("created..........");
      this.viewInit();
      this.$nextTick(function () {
        if (!this.myScroll) {
          this.initScroll();
        } else {
          setTimeout(function () {
            this.myScroll.refresh();
          }, 10);
        }
      });
    },
    mounted: function () {
      console.log("mounted..........");
      // doSomeThing();
    },
    ready: function () {
      console.log("ready..........");
      // doSomeThing();
    },
    watch: function () {
      // vegetables發生改變，這個函數就會執行
      console.log("created..........");
      isUpdate: function () {
        if (this.isUpdate) {
          console.log("watch");
          this.buySum = this.totalBuy();
          this.totalSum = this.getTotalSum();
          this.isUpdate = false;
        }
      }
    },
    methods: {
      jump: function () {
        alert("單頁Demo，無其他連結");
        console.log("methods jump");
      },
      viewInit: function () {
        console.log("viewInit..........");
        if (typeof (this.vegetables) === "undefined" || this.vegetables === null) {
          this.vegetables = makeVegetables();
        }

        this.vegetables = makeVegetables();
        this.buySum = this.totalBuy();
        this.totalSum = this.getTotalSum();

        this.debugMode();
      },
      add: function (vegetable) {
        if (vegetable.buy < vegetable.max) {
          vegetable.buy++;
          this.isUpdate = true;
        }
      },
      decrease: function (vegetable) {
        if (vegetable.buy > 0) {
          vegetable.buy--;
          this.isUpdate = true;
        }
      },
      addMask: function () {
        console.log("addMask");

        this.isTopMask = true;
        this.isCertOpen = true;
        this.isMenuOpen = false;
      },
      removeMask: function () {
        console.log("removeMask");

        this.isTopMask = false;
        this.isCertOpen = false;
        this.isMenuOpen = false;

        this.clearEditMode();
      },
      addMenu: function () {
        console.log("addMenu");

        this.isTopMask = true;
        this.isCertOpen = false;
        this.isMenuOpen = true;

        if (this.isDebug) {
          console.log("isTopMask :" + this.isTopMask + " / " + "isMenuOpen :" + this.isMenuOpen);
        }
      },
      removeMenu: function () {
        console.log("removeMenu");

        this.isTopMask = false;
        this.isMenuOpen = false;

        this.clearEditMode();
      },
      cleanItemBuy: function (vegetable) {
        console.log("cleanItemBuy");

        vegetable.buy = 0;
        vegetable.isEdit = false;
        this.isUpdate = true;
      },
      editMode: function (vegetable, boolean) {
        console.log("editMode");

        if (typeof (vegetable) !== "undefined" || typeof (vegetable) !== null) {
          vegetable.isEdit = boolean;
        }
      },
      clearEditMode: function () {
        console.log("clearEditMode");

        var len = this.vegetables.length;

        for (var i = 0; i < len; i++) {
          this.vegetables[i].isEdit = false;
        }
      },
      showItemInfo: function (vegetableObj) {
        if (this.isDebug) {
          console.log("vegetableObj.item = " + vegetableObj.item + " / " + "vegetableObj.sn = " + vegetableObj.sn);
        }
      },
      debugMode: function () {
        if (this.isDebug) {
          console.log("isTopMask :" + this.isTopMask + " / " + "isCertOpen :" + this.isCertOpen + " / " + "isMenuOpen :" + this.isMenuOpen + " / " + "totalSum :" + this.totalSum);
          console.log(this.vegetables);
        }
      },
      initScroll: function () {
        navEventListener();
      },

      debugAppScroll: function () {

      },
      selectMenu: function (index, event) {
        if (!event._constructed) {
          //如果不存在這個屬性，不執行下面的函數
          return;
        }
      },
      totalBuy: function () {
        console.log("totalBuy");

        var len = this.vegetables.length
        var buy = 0;

        for (var i = 0; i < len; i++) {
          buy = buy + this.vegetables[i].buy;
        }
        return buy;
      },
      getTotalSum: function () {
        console.log("getTotalSum");

        var len = this.vegetables.length
        var sum = 0;

        for (var i = 0; i < len; i++) {
          if (this.isDebug) {
            console.log(this.vegetables[i].buy);
          }
          if (this.vegetables[i].buy > 0) {
            sum = sum + (this.vegetables[i].buy * this.vegetables[i].price);
          }
        }
        if (this.isDebug) {
          if (this.isDebug) {
            console.log("totalSum =" + sum);
          }
        }
        return sum;
      },
      loginSuccess() {
        this.isLogin = true;

        this.loginUser.userName = this.account[0].userName;
        this.loginUser.picture = this.account[0].picture;

        this.loginDialog = false;
        this.$refs.form.reset();
      },
      logOutSuccess() {
        this.isLogin = false;

        this.loginUser.userName = 'Guest';
        this.loginUser.picture = 'https://randomuser.me/api/portraits/men/86.jpg';

        this.logoutDialog = false;
        this.loginClear();
      },
      loginSubmit() {
        // if (this.$refs.form.validate()) {
        // 	// Native form submission is not yet supported
        // 	axios.post('/api/submit', {
        // 		name: this.name,
        // 		email: this.email,
        // 		select: this.select,
        // 		checkbox: this.checkbox
        // 	});
        // }
        if (this.$refs.form.validate()) {
          alert(
            "登入成功" + "\n" +
            "this.name = " + this.name + "\n" +
            "this.userpwd = " + this.userpwd + "\n" +
            "checkbox = " + this.checkbox + "\n"
          );
          this.loginSuccess();
        }
      },
      loginClear() {
        this.$refs.form.reset();
        this.$refs.form.Name.value = '';
        this.$refs.form.userName.value = '';
        this.$refs.form.checkbox.value = false;
      },
      checkLoginState() {
        if (this.isLogin) {
          this.logoutDialog = true;
        } else {
          this.loginDialog = true;
        }
      },
      sendOrder() {

        var _tempOutput = "品項== / 數量== / 單價==" + "\n";

        for (var i = 0; i < this.vegetables.length; i++) {
          if (this.vegetables[i].buy) {
            var _tempTxt = this.vegetables[i].item +
              " * " + this.vegetables[i].buy +
              " * " + this.vegetables[i].price + "\n";
          }
          _tempOutput = _tempOutput + _tempTxt;
        }

        _tempOutput = _tempOutput + "===================" + "\n"
        _tempOutput = _tempOutput + "總金額 => " + this.totalSum;

        alert(
          _tempOutput
        );
      },
      linkOutFn(index) {
        alert("連結到" + this.items[index].linkOut);
      },
      maketest() {
        this.isLoginOverLay = !this.isLoginOverLay;

        console.log("isLoginOverLay =" + this.isLoginOverLay);
        if (this.isLoginOverLay) {
          document.querySelector('.my-overlay').classList.add('overlay', 'overlay--absolute', 'overlay--active');
        } else {
          document.querySelector('.my-overlay').classList.remove('overlay', 'overlay--absolute', 'overlay--active');
        }
      },
    }
  });
});


function clickListItem() {

  $(".nav2 .list-item").click(function () {
    console.log("click");
    $(".nav2 .list-item.active").removeClass("active");
    $(this).addClass("active")
    return false;
  });
}

function makeVegetables() {
  var _vegetables = [{
    place: "旺來御菜園有機農場",
    item: "空心菜",
    sn: 103,
    type: "有機蔬菜",
    pathName: "../img/",
    fileName: "17.jpg",
    buyimg: "eat01.jpg",
    price: 40,
    buy: 3,
    max: 5,
    isEdit: false,
    weight: 0,
    weight_unit:  "",
    origin: "雲林縣西螺鎮",
    features: "有機無毒耕作",
    age: 4,
    description: "“ 無藥生菜種植 化不可能為可能 ”"
  }, {
    place: "小農有機農場",
    item: "牛番茄",
    sn: 205,
    type: "優質水果",
    pathName: "../img/",
    fileName: "18.jpg",
    buyimg: "eat02.jpg",
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
  }, {
    place: "天廚有機農場",
    item: "黒美人紅肉西瓜",
    sn: 307,
    type: "優質水果",
    pathName: "../img/",
    fileName: "24.jpg",
    buyimg: "eat03.jpg",
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
  }, {
    place: "小廚師有機農場",
    item: "地瓜葉",
    sn: 517,
    type: "根莖",
    pathName: "../img/",
    fileName: "25.jpg",
    buyimg: "eat04.jpg",
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
  }];
  return _vegetables;
};

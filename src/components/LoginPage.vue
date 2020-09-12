<template>
  <v-container class="login-page" mt-5>
    <v-layout fluid>
      <v-flex fluid xs12 sm12 md12 lg12 xl12>
        <v-flex d-flex-r d-center xs12 sm12 md12 lg12 xl12>
          <v-btn block tile depressed class="py-4 green" @click.stop="isRegisterMode = false">
            <v-icon medium>person</v-icon>Login
          </v-btn>
          <v-btn block tile depressed class="py-4 green" @click.stop="isRegisterMode = true">
            <v-icon medium>person_add</v-icon>New User
          </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout ma-3 :flat="false">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <p v-show="!isRegisterMode" class="headline">登入Login</p>
        <p v-show="isRegisterMode" class="headline">註冊New User</p>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- <v-text-field v-model="name" :rules="nameRules" :counter="100" label="Email" required></v-text-field> -->
            <v-text-field
              class="body-2"
              prepend-icon="email"
              v-model="email"
              :type="'email'"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              class="body-2 mt-0"
              prepend-icon="lock"
              v-model="userpwd"
              :type="'password'"
              :rules="pwdRules"
              label="Password"
              password
              required
            ></v-text-field>
            <!-- <v-text-field mtt-5 prepend-icon="lock" v-show="isRegisterMode" v-model="confirmpwd" :type="'password'" :rules="[comparePasswords]" label="Confirm Password" password required></v-text-field> -->
            <v-text-field
              class="body-2 mt-0"
              prepend-icon="lock"
              v-show="isRegisterMode"
              v-model="confirmpwd"
              :type="'password'"
              label="Confirm Password"
              password
              required
            ></v-text-field>

            <v-checkbox
              mt-1
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>
            <p v-show="!isRegisterMode" class="body-2">測試帳號ex => test@test.com / 密碼=> test123</p>
            <p v-show="isRegisterMode" class="body-2">註冊新帳號ex => any_name@test.com / 密碼=> test123</p>

            <v-flex>
              <v-btn
                block
                v-show="!isRegisterMode"
                class="green mb-3"
                :disabled="!valid"
                @click.stop="loginSubmit"
              >submit</v-btn>
              <v-btn
                block
                v-show="isRegisterMode"
                class="green mb-3"
                :disabled="!valid"
                @click.stop="regisgerIn"
              >submit</v-btn>
              <v-btn block class="mb-3" @click.stop="formClear">clear</v-btn>
              <v-btn block color="yellow" @click.stop="exitLogin">Exit</v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Farm from "@/components/Farm";
import fbModule from "../vuex/fbModule";

export default {
  name: "Login",
  data() {
    return {
      isRegisterMode: false,
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 100) || "名字最長100個字"
        // v => (v && v.length <= 10) || 'Name must be less than 80 characters'
      ],
      email: "test@test.com",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      userpwd: "test123",
      pwdRules: [
        v => !!v || "Password is required",
        v =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/.test(v) ||
          "7位數，至少一個英文字母,一個數字"
        // v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'Password must be valid'
      ],
      confirmpwd: "test123",
      confirmpwdRules: [
        v => !!v || "Confirm Password is required",
        v => (this.userpwd !== this.confirmpwd ? "Passwords do not match" : "")
      ],
      checkbox: true
    };
  },
  created: function() {
    // console.log("Products created..........");
  },
  beforeMount: function() {
    // console.log("Products beforeMount..........");
  },
  mounted: function() {
    // console.log("Products mounted..........");
  },
  watch: {
    valid: function(oldValue, newValue) {
      // console.log("111 this.valid oldValue = " + oldValue);
      // console.log("222 this.valid newValue = " + newValue);
    },
    isRegisterMode: function(oldValue, newValue) {
      let getRandom = parseInt(Math.random() * 1000000, 10);

      if (!this.isRegisterMode) {
        this.email = "test@test.com";
      } else {
        this.email = "test" + getRandom + "@test.com";
      }
    }
  },
  computed: {
    ...mapState(["", "", ""])
  },
  methods: {
    ...mapMutations(["setLoginUser"]),
    jump: function() {
      alert("單頁Demo，無其他連結");
    },
    comparePasswords() {
      console.log("this.valid => " + this.valid);
      console.log("this.confirmpwd => " + this.confirmpwd);
      console.log("this.isRegisterMode => " + this.isRegisterMode);
      console.log(
        "this.userpwd !== this.confirmpwd => " +
          (this.userpwd !== this.confirmpwd ? "Passwords do not match" : "")
      );
      if (this.isRegisterMode) {
        return this.userpwd !== this.confirmpwd ? "Passwords do not match" : "";
      }
      return true; // Login_Mode
    },
    regisgerIn: function() {
      if (this.userpwd !== this.confirmpwd) {
        alert("Passwords do not match");
        return;
      }

      if (this.$refs.form.validate()) {
        this.$store.dispatch("registerUser", {
          myEmail: this.email,
          myPassword: this.userpwd
        });
      }
    },
    loginSuccess() {
      // console.log("loginSuccess...start");
      this.formClear();
    },
    exitLogin() {
      console.log("exitLogin...");
      this.$router.push("/");
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

      // console.log(
      // "loginSubmit / this.$refs.form.validate = " + this.$refs.form.validate()
      // );

      if (this.$refs.form.validate()) {
        this.$store.dispatch("fbModule/signUserIn", {
          myEmail: this.email,
          myPassword: this.userpwd
        });
        alert(
          "登入成功" +
            "\n" +
            "this.E-mail = " +
            this.email +
            "\n" +
            "this.userpwd = " +
            this.userpwd +
            "\n" +
            "checkbox = " +
            this.checkbox +
            "\n"
        );
        // this.formClear();
        this.loginSuccess();
      }
    },
    formClear() {
      // console.log("formClear...start");
      this.$refs.form.reset();
      // this.$refs.form.resetValidation();
      // this.$refs.form.email = "";
      // this.$refs.form.userpwd =  "";
      // this.$refs.form.checkbox = false;
    }
  }
};
</script>

<style lang="scss">
.login-page {
  // border: 1px solid green;
}
</style>

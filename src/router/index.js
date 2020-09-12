import Vue from "vue";
import Router from "vue-router";
import Products from "@/components/Products";
// import Farm from "@/components/Farm";
import NewFarm from "@/components/NewFarm";
import Menu from "@/components/Menu";
import LoginPage from "@/components/LoginPage";

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "Products",
      component: Products
    },
    {
      // path: "/Farm",
      // name: "Farm",
      // component: Farm
      path: "/NewFarm",
      name: "NewFarm",
      component: NewFarm
    },
    {
      path: "/LoginPage",
      name: "LoginPage",
      component: LoginPage
    },
    {
      path: "/Menu/:id",
      name: "Menu",
      component: Menu
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

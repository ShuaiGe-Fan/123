import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login/Login.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Home/Home.vue"),
  },
  {
    path: "/merchant",
    name: "merchant",
    component: () =>
      import(/* webpackChunkName: "Guest" */ "../views/Merchant/Merchant.vue"),
  },
  {
    path: "/addMerchant",
    name: "addMerchant",
    component: () =>
      import(/* webpackChunkName: "add" */ "../views/Merchant/AddMerchant.vue"),
  },
  {
    path: "/application",
    name: "application",
    component: () =>
      import(
        /* webpackChunkName:'application' */ "../views/Application/Application.vue"
      ),
  },
  {
    path: "/addApplication",
    name: "addApplication",
    component: () =>
      import(
        /* webpackChunkName:'AddApplication' */ "../views/Application/AddApplication.vue"
      ),
  },
  {
    path: "/account",
    name: "account",
    component: () => {
      import(/* webpackChunkName:'Account' */ "../views/Account/Account.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

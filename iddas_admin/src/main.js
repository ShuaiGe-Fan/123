import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/css/common.css";
import "./assets/iconfont/iconfont.css";
import ElIcon from "./components/ElIcon";

// global registration - can be used anywhereapp.mount('#app')
// import { createPinia } from "pinia"; use(createPinia())

import qs from "qs";
import md5 from "js-md5";

const app = createApp(App);

app.component("el-icon", ElIcon);

app.config.globalProperties.$qs = qs;
app.config.globalProperties.$md5 = md5;

app.use(store).use(router).use(ElementPlus).mount("#app");

import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
// 引入公共函数js文件
const route = useRouter();
console.log(route);
// 默认请求连接
// axios.defaults.baseURL = "https://idaas.shopspade.com/api";
axios.defaults.baseURL = "https://testidaas.shopspade.com/api";

// 超时时间（ms）
axios.defaults.timeout = 2000 * 1000;
// axios请求开启cookie，支持跨域请求携带cookie
axios.defaults.withCredentials = true;
// axios 请求头
// axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.headers["token"] = localStorage.getItem("token") || "";
// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] = "application/jsson";
// axios.defaults.headers.post["dataType"] = "json";

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    // 可在这里做一些数据的校验。
    // session的校验等。
    return config;
  },
  (error) => {
    return error;
  }
);

// 响应拦截
axios.interceptors.response.use(
  (result) => {
    let data = result.data;
    // ===========================================================
    // 返回方式一
    console.log(result);
    // if (result.status === 200) {
    //   if (result.data && result.data.code > 0) {
    //     return Promise.resolve(result);
    //   } else {
    //     alert(result.data.msg || "操作失败");
    //     return Promise.reject(result);
    //   }
    // } else {
    //   alert("网络异常");
    //   return Promise.reject(result);
    // }

    // ==========================================================
    // 返回方式二
    // 返回数据前做了什么
    // console.log(result);
    // debugger;
    // debugger;
    if (data.code !== 1000000) {
      if (data.msg) {
        // 调用自定义alert
        ElMessage.error(data.msg);
      }
      if (data.code === 7000000) {
        ElMessage.error(data.msg);
      }
      return Promise.reject(data.result);
    } else {
      return Promise.resolve(data.result);
    }
  },
  (err) => {
    return Promise.reject("err", err);
  }
);
export default axios;

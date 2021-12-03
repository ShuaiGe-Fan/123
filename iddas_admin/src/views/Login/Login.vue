<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form
        label-position="top"
        :rules="rules"
        :model="ruleForm"
        ref="loginForm"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model.trim="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm"
            >立即登录</el-button
          >
          <el-checkbox v-model="checked" @change="!checked"
            >下次自动登录</el-checkbox
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  name: "Login",
  setup() {
    const loginForm = ref(null);
    const store = useStore();
    const state = reactive({
      ruleForm: {
        username: "",
        password: "",
      },
      checked: true,
      rules: {
        username: [
          { required: "true", message: "账户不能为空", trigger: "blur" },
        ],
        password: [
          { required: "true", message: "密码不能为空", trigger: "blur" },
        ],
      },
    });
    const submitForm = async () => {
      const data = {
        username: "123",
        password: "123",
      };
      store.dispatch("user/LOGIN", data).then((res) => {
        console.log(res);
      });
      //   loginForm.value.validate((valid) => {
      //     if (valid) {
      //       axios.post('/adminUser/login', {
      //         userName: state.ruleForm.username || '',
      //         passwordMd5: md5(state.ruleForm.password)
      //       }).then(res => {
      //         localSet('token', res)
      //         window.location.href = '/'
      //       })
      //     } else {
      //       console.log('error submit!!')
      //       return false;
      //     }
      //   })
    };
    const resetForm = () => {
      loginForm.value.resetFields();
    };
    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm,
    };
  },
};
</script>
<style lang="scss" scoped>
.login-body {
  width: 100%;
  height: 100%;
  background-color: #b1acac54;
  overflow: hidden;
  .login-container {
    width: 300px;
    height: auto;
    border: 1px solid grey;
    padding: 30px;
    margin: 100px auto;
    background-color: white;
  }
}
</style>

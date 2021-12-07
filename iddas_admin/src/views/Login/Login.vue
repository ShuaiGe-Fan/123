<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="tips">idaas admin</div>
        </div>
      </div>
      <el-form
        label-position="right"
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
          <!-- <el-checkbox v-model="checked" @change="!checked"
            >下次自动登录</el-checkbox
          > -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { localSet } from "@/common/utils";
import { ElMessage } from "element-plus";
import axios from "@/common/axios";
import api from "@/common/api/api";
// import { md5 } from "js-md5";
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
    const { proxy } = getCurrentInstance();
    const router = proxy.$root.$router;
    const submitForm = async () => {
      const data = {
        username: state.ruleForm.username || null,
        password: state.ruleForm.password || null,
      };
      // 表单校验有问题
      //   loginForm.value.validate((valid) => {
      //   });
      if (data.username && data.password) {
        axios.post(api.login, data).then((res) => {
          console.log(res);
          if (res) {
            localSet("token", res);
            router.push("merchant");
            store.dispatch("user/LOGIN", res);
          }
        });
      } else if (!data.username) {
        ElMessage.error("账户不能为空");
        return false;
      } else if (!data.password) {
        ElMessage.error("密码不能为空");
        return false;
      }
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
  background-color: #090723;
  overflow: hidden;
  .login-container {
    width: 300px;
    height: auto;
    border: 1px solid grey;
    padding: 30px;
    margin: 100px auto;
    background-color: white;
  }
  .head {
    text-align: center;
    font-size: 25px;
    font-weight: 900;
    line-height: 60px;
  }
  ::v-deep .el-form-item {
    margin-bottom: 5px;
    margin-top: 5px;
  }
  ::v-deep .el-form-item__label {
    line-height: 62px;
  }
  ::v-deep .el-form-item__error {
    top: 88%;
  }
}
</style>

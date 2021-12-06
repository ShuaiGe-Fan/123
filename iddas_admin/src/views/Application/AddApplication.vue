<template>
  <div class="add">
    <el-card class="add-container">
      <el-form
        :model="goodForm"
        :rules="rules"
        ref="goodRef"
        label-width="100px"
        class="goodForm"
      >
        <el-form-item label="商品名称" prop="goodsName">
          <el-input
            style="width: 300px"
            v-model="goodForm.goodsName"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="goodsSellStatus">
          <el-radio-group v-model="goodForm.goodsSellStatus">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd()">{{
            id ? "立即修改" : "立即创建"
          }}</el-button>
          <el-button type="primary" @click="bankUp()">{{ "返回" }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  toRefs,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import axios from "@/common/axios";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { localGet } from "@/common/utils";
export default {
  name: "AddApplication",
  setup() {
    const { proxy } = getCurrentInstance();
    console.log("proxy", proxy);
    const editor = ref(null);
    const goodRef = ref(null);
    const route = useRoute();
    const router = useRouter();
    const { id } = route.query;
    const state = reactive({
      token: localGet("token") || "",
      id: id,
      defaultCate: "",
      goodForm: {
        goodsName: "",
        goodsSellStatus: true,
      },
      rules: {
        goodsName: [
          { required: "true", message: "请填写商品名称", trigger: ["change"] },
        ],
      },
      categoryId: "",
      category: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level = 0, value } = node;
          axios
            .get("/categories", {
              params: {
                pageNumber: 1,
                pageSize: 1000,
                categoryLevel: level + 1,
                parentId: value || 0,
              },
            })
            .then((res) => {
              const list = res.list;
              const nodes = list.map((item) => ({
                value: item.categoryId,
                label: item.categoryName,
                leaf: level > 1,
              }));
              resolve(nodes);
            });
        },
      },
    });

    onMounted(() => {
      if (id) {
        axios.get(`/goods/${id}`).then((res) => {
          const { goods } = res;
          state.goodForm = {
            goodsName: goods.goodsName,
          };
        });
      }
    });
    onBeforeUnmount(() => {});
    const submitAdd = () => {
      goodRef.value.validate((vaild) => {
        if (vaild) {
          // 默认新增用 post 方法
          let httpOption = axios.post;
          let params = {
            goodsName: state.goodForm.goodsName,
          };
          if (params.goodsName.length > 128) {
            ElMessage.error("商品名称不能超过128个字符");
            return;
          }
          console.log("params", params);
          if (id) {
            params.goodsId = id;
            // 修改商品使用 put 方法
            httpOption = axios.put;
          }
          httpOption("/goods", params).then(() => {
            ElMessage.success(id ? "修改成功" : "添加成功");
            router.push({ path: "/good" });
          });
        }
      });
    };
    return {
      ...toRefs(state),
      goodRef,
      submitAdd,
      editor,
    };
  },
};
</script>

<style scoped>
.add {
  display: flex;
}
.add-container {
  flex: 1;
  height: 100%;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  font-size: 30px;
}
.avatar-uploader-icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  padding: 32px 17px;
}
</style>

/* eslint-disable prettier/prettier */
<template>
  <el-card class="guest-container">
    <template #header>
      <div class="header">
        <el-button type="primary" size="mini" @click="handleAdd">
          新增应用</el-button
        >
        <el-icon icon-class="icon-ic_shouye" color="primary"></el-icon>
      </div>
    </template>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="应用名称">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="appId" label="应用ID">
        <template #default="scope">
          {{ scope.row.appId }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="设备类型">
        <template #default="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="应用状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.type"
            style="margin-left: 24px"
            inline-prompt
            active-color="#13ce66"
            :active-icon="Check"
            :inactive-icon="Close"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="二级认证状态">
        <template #default="scope">
          <span>
            <el-switch
              v-model="scope.row.outType"
              style="margin-left: 24px"
              inline-prompt
              active-color="#13ce66"
              :active-icon="Check"
              :inactive-icon="Close"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="appExpire" label="过期时间">
        <template #default="scope">
          {{ scope.row.appExpire }}
        </template></el-table-column
      >
      <el-table-column prop="createTime" label="注册时间"
        ><template #default="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px"
            @confirm="edit(scope.row)"
            >编辑</a
          >
          <el-popconfirm
            title="确定禁用吗？"
            @confirm="handleForbid(scope.row)"
          >
            <template #reference>
              <a style="cursor: pointer">禁用</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    total
    <el-pagination
      v-model:currentPage="page.currentPage"
      background
      :page-sizes="[100, 200, 300, 400]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleChangePage"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { onMounted, reactive, ref, toRefs, computed } from "vue";
// import axios from "@/common/axios";
import { Check, Close } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import axios from "@/common/axios";
import api from "@/common/api/api";
import { useStore, mapGetters, mapState } from "vuex";
export default {
  name: "Application",
  setup() {
    const multipleTable = ref(null);
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      loading: false,
      tableData: [
        {
          name: "商家1",
          phone: "15606530062",
          type: 1,
          outType: 0,
          time: "2021-01-25",
          outTime: "2021-02-15",
        },
      ], // 数据列表
      selectList: [], // 选中项
      page: {
        total: 23, // 总条数
        currentPage: 1, // 当前页
        pageSize: 100, // 分页大小
      },
    });
    onMounted(() => {
      console.log(store);
      console.log(store.getters["user/userName"]);
      getDataList();
    });
    const isLoading = computed(
      mapGetters(["appId"]).appId.bind({ $store: store })
    );
    const userInfo = computed(
      mapState(["userInfo"]).userInfo.bind({ $store: store })
    );
    console.log(userInfo);
    console.log(isLoading);
    // 获取列表
    const getDataList = () => {
      // state.loading = true;

      const data = {
        merchantId: store.getters["user/merchantId"],
      };
      axios.post(api.getMerchantAppList, data).then((res) => {
        console.log("getMerchantAppList", res);
        state.tableData = res.merchantApps;
      });
    };
    // 分页
    const handleSizeChange = (val) => {
      state.page.pageSize = val;
      getDataList();
    };
    // 当前页
    const handleChangePage = (val) => {
      state.page.currentPage = val;
      getDataList();
    };
    // 新增
    const handleAdd = () => {
      router.push({ path: "/addApplication" });
    };
    // 编辑
    const handleEdit = (id) => {
      router.push({ path: "/addApplication", query: { id } });
    };
    // 禁用
    const handleForbid = () => {
      if (!state.selectList.length) {
        ElMessage.error("请选择项");
        return;
      }
    };
    // 选择项
    const handleSelectionChange = (val) => {
      state.selectList = val;
    };
    return {
      ...toRefs(state),
      multipleTable,
      getDataList,
      handleForbid,
      handleAdd,
      handleEdit,
      handleSelectionChange,
      handleChangePage,
      handleSizeChange,
      Check,
      Close,
    };
  },
};
</script>

<style scoped>
.guest-container {
  min-height: 100%;
}
.el-card.is-always-shadow {
  min-height: 100% !important;
}
/* eslint-disable-next-line prettier/prettier */
</style>

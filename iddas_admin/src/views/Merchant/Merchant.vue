<template>
  <el-card class="guest-container">
    <template #header>
      <div class="header">
        <el-button type="primary" size="small" @click="handleAdd"
          >新增商户</el-button
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
      <el-table-column prop="name" label="商户名称">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
        <template #default="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <span :style="scope.row.type == 0 ? 'color: green;' : 'color: red;'">
            {{ scope.row.type == 0 ? "正常" : "禁用" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="是否注销">
        <template #default="scope">
          <span :style="scope.row.isOut == 0 ? 'color: green;' : 'color: red;'">
            {{ scope.row.isOut == 0 ? "正常" : "注销" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="outTime" label="过期时间">
        <template #default="scope">
          {{ scope.row.outTime }}
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
import { onMounted, reactive, ref, toRefs } from "vue";
// import axios from "@/common/axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  name: "Application",
  setup() {
    const multipleTable = ref(null);
    const router = useRouter();
    const state = reactive({
      loading: false,
      tableData: [
        {
          name: "商家1",
          phone: "15606530062",
          type: 0,
          outType: 0,
          time: "2021-01-25",
          outTime: "2021-02-15",
        },
      ], // 数据列表
      selectList: [], // 选中项
      page: {
        total: 23, // 总条数
        currentPage: 1, // 当前页
        pageSize: 10, // 分页大小
      },
    });
    onMounted(() => {
      getDataList();
    });
    // 获取列表
    const getDataList = () => {
      // state.loading = true;
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
      router.push({ path: "/addMerchant" });
    };
    // 编辑
    const handleEdit = (id) => {
      router.push({ path: "/addMerchant", query: { id } });
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
</style>

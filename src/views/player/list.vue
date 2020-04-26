<template>
  <div class="app-container">
    <!-- 过滤条件 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.accountname"
        :placeholder="$t('player.accountname')"
        style="width: 200px"
        @keyup.enter.native="handleFilter"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{$t('player.btnFilter')}}</el-button>
    </div>

    <!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      hightlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" align="center">
        <template v-slot="{row}">{{row.id}}</template>
      </el-table-column>
      <el-table-column label="账户名" align="center">
        <template v-slot="{row}">{{row.accountname}}</template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getPlayers } from "@/api/players";
import { Player } from "../../api/types";
import Pagination from "@/components/Pagination/index.vue";

@Component({
  name: "PlayerList",
  components: {
    Pagination
  }
})
export default class list extends Vue {
  // 玩家列表数据
  list: Player[] = [];

  // 加载状态
  listLoading = true;

  // 总条目数量
  total = 0;

  // 查询条件
  listQuery = {
    page: 1, // 默认第一页
    limit: 10, // 每页条数
    accountname: undefined // 按照账户名搜索结果
  };

  created() {
    // 获取列表数据
    this.getList();
  }

  // 获取列表
  async getList() {
    this.listLoading = true;
    const { data } = await getPlayers(this.listQuery);
    // 设置列表数据
    this.list = data.players;
    // 设置数据总条数
    this.total = data.total;
    this.listLoading = false;
  }

  // 过滤处理
  handleFilter() {
    // 重置页码
    this.listQuery.page = 1;
    this.getList();
  }
}
</script>

<style scoped>
</style>
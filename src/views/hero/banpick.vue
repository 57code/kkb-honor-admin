<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="排名"
      >
        <template v-slot="{$index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="英雄"
      >
        <template v-slot="{row}">
          <span>{{ row.hero.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="登场率"
      >
        <template v-slot="{row}">
          <span>{{ row.pick }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="禁用率"
      >
        <template v-slot="{row}">
          <span>{{ row.ban }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        align="center"
        label="操作"
      >
        <template v-slot="{row}">
          <router-link :to="'/heros/banpick/'+row.hero.id">
            <el-button type="primary">查看详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getBanpick } from '@/api/heros'
import { BanPick } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'BanPick',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private total = 0;
  private list: BanPick[] = [];
  private listLoading = true;
  private listQuery = {
    page: 1,
    limit: 20,
  };

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getBanpick(this.listQuery)
    this.list = data.banpick
    this.total = data.total
    this.listLoading = false
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }
}
</script>
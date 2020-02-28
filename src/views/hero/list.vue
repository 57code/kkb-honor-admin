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
        label="ID"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        label="英雄名"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        label="图标"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.icon }}</span>
          <!-- 图片 -->
          <img
            :src="scope.row.icon"
            alt="英雄图标"
          >
        </template>
      </el-table-column>

      <el-table-column
        min-width="180px"
        label="分类"
      >
        <template slot-scope="{row}">
          <span
            v-for="(c, index) in row.classify"
            :key="c"
          >
            {{ c }}
            <span v-if="index !== row.classify.length-1">/</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
        width="120"
      >
        <template slot-scope="scope">
          <router-link :to="'/heros/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            >
              更新
            </el-button>
          </router-link>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="onDelete"
          >
            删除
          </el-button>
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
import { getHeros, deleteHero } from '@/api/heros'
import { Hero } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'HeroList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private total = 0;
  private list: Hero[] = [];
  private listLoading = true;
  private listQuery = {
    page: 1,
    limit: 20,
    acountname: undefined,
    nickname: undefined
  };

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getHeros(this.listQuery)
    this.list = data.items
    this.total = data.total
    this.listLoading = false
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  private handleCreate() {
    this.$router.push('/heros/create')
  }

  private onDelete(row: Hero) {
    this.$confirm('此操作将删除英雄, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 提交删除请求
      deleteHero(row.id).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

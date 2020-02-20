<template>
  <div class="app-container">
    <!-- <el-table v-loading="listLoading" :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="80"
        align="center"
        label="ID"

      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="wechat"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="QQ"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="105px"
        label="人气值"
      >
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            name="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Status"
        width="110px"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | articleStatusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        min-width="200px"
        label="备注"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/example/edit/'+row.id"
            class="link-type"
          >
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="120px"
      >
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            >
            添加
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table> -->

    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    /> -->

    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="servername"
        width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="status"
        width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="val"
        label="人气值"
        width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.val }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="备注"
        min-width="300px"
      />

      <el-table-column
        label="操作"
        width="300px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type=""
            size="small"
            @click="handleClick(scope.row)"
          >
            查看
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            plain
            type=""
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="tableData"
    /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
// import { IPerson } from '@/api/server'

@Component({
  name: 'ArticleList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  // 初始数据.
  tableData = [{
    id: 1,
    name: '手Q1区 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 2,
    name: '手Q2区 铁血都督'
  }, {
    id: 3,
    name: '手Q3区 野蛮之锤'

  }, {
    id: 4,
    name: '手Q4区 正义爆轰'
  }, {
    id: 5,
    name: '手Q4区 正义爆轰'
  }, {
    id: 6,
    name: '手Q4区 正义爆轰'
  }, {
    id: 7,
    name: '手Q4区 正义爆轰'
  }, {
    id: 8,
    name: '手Q4区 正义爆轰'
  }, {
    id: 9,
    name: '手Q4区 正义爆轰'
  }, {
    id: 10,
    name: '手Q4区 正义爆轰'
  }, {
    id: 11,
    name: '手Q4区 正义爆轰'
  }, {
    id: 12,
    name: '手Q4区 正义爆轰'
  }, {
    id: 13,
    name: '手Q4区 正义爆轰'
  }, {
    id: 14,
    name: '手Q4区 正义爆轰'
  }, {
    id: 15,
    name: '手Q4区 正义爆轰'
  }, {
    id: 16,
    name: '手Q4区 正义爆轰'
  }, {
    id: 17,
    name: '手Q4区 正义爆轰'
  }, {
    id: 18,
    name: '手Q4区 正义爆轰'
  }, {
    id: 19,
    name: '手Q4区 正义爆轰'
  }, {
    id: 20,
    name: '手Q4区 正义爆轰'
  }]

  private total = 0
  private list: IArticleData[] = []
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }

  created() {
    this.getList()
  }
  handleClick(row) {
    this.$alert(row, 'hello', {
      confirmButtonText: '确定',
      callback: action => {
        this.$message({
          type: 'info',
          message: `action: ${action}`
        })
      }
    })
  }
  deleteRow(index, rows) {
    rows.splice(index, 1)
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }

  handleEdit(index, row) {
    this.$prompt('请输入邮箱', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: '邮箱格式不正确'
    }).then(({ value }) => {
      this.$message({
        type: 'success',
        message: '你的邮箱是: ' + value
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '取消输入'
      })
    })
  }
  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
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

<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px;">
      <el-col
        :span="1"
        class="grid"
      >
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          size="mini"
          round
          @click="addFlag=true;dialogVisible = true "
        >
          新增
        </el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="index"
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
        label="server"
        width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column

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
        label="server"
        min-width="300px"
        prop="server"
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

    <el-dialog
      :title="addFlag?'新增服务器':'修改服务器'"
      style="text-align:left !important"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        label-width="180px"
      >
        <el-form-item
          label="ID"
          style="width:280px"
        >
          <el-input
            v-model="book.id"
            placeholder="请输入ID值"
          />
        </el-form-item>
        <el-form-item
          label="name"
          style="width:280px"
        >
          <el-input
            v-model="book.name"
            placeholder="请输入服务器名字"
          />
        </el-form-item>
        <el-form-item
          label="status"
          style="width:280px"
        >
          <el-input
            v-model="book.status"
            placeholder="请输入服务器状态"
          />
        </el-form-item>
        <el-form-item
          label="server"
          style="width:280px"
        >
          <el-input
            v-model="book.server"
            placeholder="请输入分区"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="success"
          @click="saveBook()"
        >提交</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      style="text-align:left !important"
      :visible.sync="dialog2Visible"
      :before-close="handleClose"
    >
      <span>你确定要删除这本图书吗?</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleDel()">提交</el-button>
        <el-button
          type="primary"
          @click="dialog2Visible = false"
        >取消</el-button>
      </span>
    </el-dialog>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
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
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 2,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 3,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356

  }, {
    id: 4,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 5,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 6,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 7,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 8,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 9,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满',
    val: 356
  }, {
    id: 10,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 12,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 13,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 14,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 15,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 16,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 17,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 18,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 19,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }, {
    id: 20,
    server: '手Q1区',
    name: ' 苍天翔龙',
    status: '爆满'
  }]
  book={}
  dialogVisible= false
  dialog2Visible= false
  addFlag= true
  currentPage=1
  pagesize=5

  handleSizeChange(size) {
    this.pagesize = size
  }
  handleCurrentChange(currentPage) {
    this.currentPage = currentPage
  }

  handleClick(row) {
    this.$alert(row, 'hello', {
      confirmButtonText: '确定'
      // callback: action => {
      // this.$message({
      // type: 'info',
      // message: `action: ${action}`
      // })
      // }
    })
  }
  handleEdit(id, row) {
    this.book = Object.assign({}, row)
    this.dialogVisible = true
    this.addFlag = false
    // _id=id
  }
  deleteRow(index, rows) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      rows.splice(index, 1)
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
  async saveBook() {
    try {
      await this.tableData.push({
        id: this.book.id,
        name: this.book.name,
        status: this.book.status,
        server: this.book.server
      })
      this.dialogVisible = false
      this.book = {}
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    // this.tableData
    } catch (error) {
      console.log(error)
    }
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

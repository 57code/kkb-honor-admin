<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.acountname"
        :placeholder="$t('player.accountname')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.nickname"
        :placeholder="$t('player.nickname')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button>
    </div>

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
        label="登录账户"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.acountname }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        label="昵称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="等级"
        align="center"
      >
        <template slot-scope="scope">
          <span>Lv.{{ scope.row.level }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="经验值"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.exp }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="段位"
      >
        <template slot-scope="{row}">
          <span>{{ row.rank | parseRank }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="勇者积分"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.bravepoints }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="连胜场次"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.winningstreak }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="180px"
        label="想玩英雄"
      >
        <template slot-scope="{row}">
          <span
            v-for="(hero, index) in row.wanttoplay"
            :key="hero.name"
          >
            {{ hero.name }}
            <span v-if="index !== 2">/</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
        width="120"
      >
        <template slot-scope="scope">
          <router-link :to="'/players/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            >
              更新
            </el-button>
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
import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'PlayerList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private total = 0;
  private list: Player[] = [];
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
    const { data } = await getPlayers(this.listQuery)
    this.list = data.items
    this.total = data.total
    this.listLoading = false
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  private handleCreate() {
    this.$router.push('/players/create')
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

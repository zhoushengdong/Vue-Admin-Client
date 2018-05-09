<template>
  <div class="app-container">
    <el-button type="primary" class="spacingMB" @click="addData">添加</el-button>

    <el-table :data="this.newslist" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
   <!-- v-bind:dialogFormVisible="showForm" -->
    <excel :dialogFormVisible.sync="showForm"></excel>

  </div>
</template>

<script>
import { getList } from '@/api/table'
import excel from '../excel/exportExcel';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      showForm: false
    }
  },
  filters: {
    statusFilter(status) {
      // 三种状态
      const statusMap = {
        1: 'success',
        2: 'gray',
        3: 'danger',
      }
      return statusMap[status]
    }
  },
  created() {
    this.listLoading = true
    // this.$store.dispatch('FetchDataList')
    this.FetchDataList().then(() => {
      this.listLoading = false
      console.log(this.$store)
    });
  },
  methods: {
    addData () {
      this.showForm = true
    },
    ...mapActions(['FetchDataList'])
  },
  components: {excel},
  computed: {
    ...mapGetters(['newslist'])
  }
}
</script>

<style scoped>
  .spacingMB {
    margin-bottom: 20px;
  }
</style>


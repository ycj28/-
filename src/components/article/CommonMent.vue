<template>
   <div class="commentMent">
      <el-table :data="tableData" v-loading="loading" border style="width: 100%;">
         <el-table-column prop="content" label="评论内容" align="center">
         </el-table-column>
         <el-table-column prop="createTime" label="评论时间" align="center">
         </el-table-column>
         <el-table-column prop="title" label="资讯标题" align="center">
         </el-table-column>
         <el-table-column prop="username" label="评论者" align="center">
         </el-table-column>
         <el-table-column prop="shows" label="审核" align="center">
            <template slot-scope="scope">
               <el-button v-if="scope.row.shows == 0" type="success" icon="el-icon-check" size="mini"
                  @click="passY(scope.row)"> Y</el-button>
               <el-button v-if="scope.row.shows == 0" type="info" icon="el-icon-close" size="mini"
                  @click="passN(scope.row)"> N</el-button>
               <span v-if="scope.row.shows == 1">已通过</span>
               <span v-if="scope.row.shows == 2">未通过</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>
      <Page :total="total" :url="url"></Page>
   </div>
</template>

<script>
import { getData, modifyData, delData } from "../../utils/table.js"
import Page from '../common/Pageing.vue'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         total: 0,//
         url: 'comments',
         formLabelWidth: "80px",
         status: true,
         loading: true,
      }
   },
   created () {
      getData(this, this.url)
   },
   methods: {
      passY (row) {
         modifyData(this, this.url + '/passY', row.id, getData)
      },
      passN (row) {
         modifyData(this, this.url + '/passN', row.id, getData)
      },
      del (row) {
         delData(this, this.url, row.id, getData)
      },
   }
}
</script>

<style lang="scss" scop>
.commentMent {

   .demo-form-inline,
   .el-form-item {
      margin-right: 20px;
      text-align: left;
   }

   .el-pagination {
      margin-top: 20px;
   }
}
</style>
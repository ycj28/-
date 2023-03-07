<template>
   <div class="commentMent">
      <el-table :data="tableData" v-loading="loading" border style="width: 100%;">
         <el-table-column prop="content" label="评论内容" align="center">
         </el-table-column>
         <el-table-column prop="create_time" label="评论时间" align="center">
         </el-table-column>
         <el-table-column prop="title" label="资讯标题" align="center">
         </el-table-column>
         <el-table-column prop="username" label="评论者" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-check" @click="pass(scope.row)">通过</el-button>
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 50]"
         @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
         layout="total,sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
   </div>
</template>

<script>
import { logicDel, getData } from "../../utils/table.js"
export default {
   data () {
      return {
         tableData: [],
         currentPage: 1,// 当前页数是1
         pageSize: 10, // 每页显示条数
         total: 0,//
         formLabelWidth: "80px",
         status: true,
      }
   },
   created () {
      getData(this, '/common')
   },
   computed: {
      compData () {
         return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
   },
   methods: {
      pass (row) {
         logicDel(this, 'common/pass', row.id, getData)
      },
      del (row) {
         console.log(row)
         logicDel(this, 'common/del', row.id, getData)
      },
      handleSizeChange (val) {
         this.pageSize = val
         this.currentPage = 1
         console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
         this.currentPage = val
         console.log(`当前页: ${val}`);
      }
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
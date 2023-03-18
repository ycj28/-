<template>
   <div class="index">
      <el-table :data="tableData" border style="width: 100%;">
         <el-table-column prop="title" label="标题" align="center">
         </el-table-column>
         <el-table-column label="跳转" align="center" width="100">
            <template slot-scope="scope">
               <el-link type="primary" @click="jump(scope.row)">点击跳转</el-link>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>
      <div>
         <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-size="size"
            layout="total, prev, pager, next, jumper" :total="total">
         </el-pagination>
      </div>
   </div>
</template>

<script>
import { getCollectList } from '../../api/api.js'
import { uncollect } from '../../api/api.js'
export default {
   data () {
      return {
         tableData: [],
         page: 1, // 当前页数
         size: 5,   // 每页显示条数
         total: 0,
      };
   }
   , created () {
      getCollectList({ page: 1, size: this.size }).then(res => {
         if (res.data.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.total
            console.log(this.tableData)
         }
      })
   },
   methods: {
      handleCurrentChange (val) {
         this.page = val
         getCollectList({ page: val, size: this.size }).then(res => {
            if (res.data.status === 200) {
               this.tableData = res.data.data
               this.total = res.data.total
               console.log(this.tableData)
            }
         })
         //, ['completed']
      },
      jump (row) {
         this.$router.push('/body/' + row.aid)
      },
      del (row) {
         uncollect(row.aid).then(res => {
            if (res.data.status === 200) {
               this.$message({ message: "取消收藏成功", type: 'success' })
               getCollectList({ page: 1, size: this.size }).then(res => {
                  if (res.data.status === 200) {
                     this.tableData = res.data.data
                     this.total = res.data.total
                     console.log(this.tableData)
                  }
               })
            }
         })
      }

   }
}

</script>

<style lang="scss" scoped>
.index {
   width: 100%;
   margin: auto;
   padding-top: 20px;
}
</style>
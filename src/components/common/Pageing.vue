<template>
   <div>
      <el-pagination background @size-change="handleSizeChange" :page-sizes="[10, 20, 50, 100]"
         @current-change="handleCurrentChange" :current-page="page" :page-size="size"
         layout="total,sizes, prev, pager, next, jumper" :total="total" :url="url">
      </el-pagination>
   </div>
</template>
<script>
import { getTableData } from '../../utils/table.js'
export default {
   props: {
      url: {
         type: String,
         default: ''
      },
      total: {
         type: Number,
         default: 10
      }
   },
   data () {
      return {
         page: 1, // 当前页数
         size: 10,   // 每页显示条数
      }
   },
   created () {

   },
   mounted () {
      this.getList()
   },
   methods: {
      async getList () {
         getTableData(this.$parent, this.url, { page: this.page, size: this.size })
         // this.$emit('name', this.size)
         // const data = await getTableData(this.$parent, this.url, { page: this.page, size: this.size })
         // axios.get('http://localhost:8080/api/elder?page=1&size=10').then(res => {
         //    console.log('res', res);
         // })
         // axios.get('http://localhost:8080/api/elder?page=1&size=10', {
         //    params: {
         //       page: 1,
         //       size: 10
         //    }
         // }).then(res => {
         //    console.log('res', res);
         // })
         // console.log('data', data);
         // const { data } = await getTableData(this.url, { page: this.page, size: this.size })
         // console.log('res', data);
      },
      handleSizeChange (val) {
         this.size = val
         this.page = 1
         getTableData(this.$parent, this.url, { page: this.page, size: val })
      },
      handleCurrentChange (val) {
         this.page = val
         getTableData(this.$parent, this.url, { page: val, size: this.size })
         //, ['completed']
      },
   }
}
</script>
<template>
   <div class="articleList">

      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
         <el-form-item i>
            <el-input v-model="formInline.value" placeholder="请在此输入"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="find">查询</el-button>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
         </el-form-item>
      </el-form>

      <el-table :data="tableData" border style="width: 100%;">
         <el-table-column prop="title" label="标题" align="center">
         </el-table-column>
         <el-table-column prop="summary" label="简介" align="center">
         </el-table-column>
         <el-table-column prop="viewCounts" label="浏览数量" align="center">
         </el-table-column>
         <el-table-column prop="likeNum" label="点赞数量" align="center">
         </el-table-column>
         <el-table-column prop="collectionNum" label="收藏数量" align="center">
         </el-table-column>
         <el-table-column prop="source" label="文章来源" align="center">
         </el-table-column>
         <el-table-column prop="author" label="文章作者" align="center">
         </el-table-column>
         <el-table-column label="文章内容" align="center">
            <template slot-scope="scope">
               <el-button type="info" icon="el-icon-view" @click="handleClick(scope.row)" size="small">查看</el-button>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>
      <Page :total="total" :url="url"></Page>


      <el-dialog title="文章内容" :visible.sync="dialogFormVisible" width="1000px">
         <el-card class="box-card">
            <div class="a_body">
               {{ content }}
            </div>
         </el-card>
         <div slot="footer" class="dialog-footer">
            <el-button @click="closeInfo()">取 消</el-button>
            <el-button type="primary" @click="closeInfo()">确 定</el-button>
         </div>
      </el-dialog>
   </div>
</template>
 
<script>
import { delData, getData, getContent } from "../../utils/table.js"
import Page from '../common/Pageing.vue'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         dialogFormVisible: false,
         total: 0,//
         url: 'articles',
         formInline: {
            value: ''
         },
         content: ""
         ,
      }
   },
   created () {
      getData(this, this.url)
   },
   methods: {
      find () {
         console.log(this.formInline)
         getData(this, '/articles/search', this.formInline)
      },
      reset () {
         this.formInline = {}
         getData(this, this.url, { page: 1, size: 10 })
      },
      del (row) {
         console.log(row)
         delData(this, this.url, row.id, getData)
      },
      handleClick (row) {
         getContent(this, '/articles/getContent', row.id)
         this.dialogFormVisible = true
      },
      closeInfo () {
         this.dialogFormVisible = false
      }
   }
}
</script>

<style lang="scss" scop>
.articleList {

   .demo-form-inline,
   .el-form-item {
      margin-right: 20px;
      text-align: left;
   }

   .el-pagination {
      margin-top: 20px;
   }


   .text {
      font-size: 14px;
   }

   .item {
      padding: 18px 0;
   }

   .box-card {
      width: 100%;

      .a_body {
         font-size: 18px;
         line-height: normal;
      }
   }
}
</style>
<template>
   <div class="infoMent">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
         <el-form-item i>
            <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="find">查询</el-button>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus" @click="addEmployee()">新增</el-button>
         </el-form-item>
      </el-form>

      <el-table :data="tableData" border style="width: 100%;">
         <el-table-column prop="name" label="姓名" align="center">
         </el-table-column>
         <el-table-column prop="age" label="年龄" align="center">
         </el-table-column>
         <el-table-column prop="gender" label="性别" align="center">
         </el-table-column>
         <el-table-column prop="seniority" label="工龄" align="center">
         </el-table-column>
         <el-table-column prop="startTime" label="入职时间" align="center">
         </el-table-column>
         <el-table-column prop="post" label="职位" align="center">
         </el-table-column>
         <el-table-column prop="picture" label="照片" align="center">
         </el-table-column>
         <el-table-column prop="introduce" label="简介" align="center">
         </el-table-column>
         <el-table-column prop="isLeave" label="是否离职" align="center">
         </el-table-column>
         <el-table-column prop="likes" label="点赞数" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>
      <Page :total="total" :url="url"></Page>

      <el-dialog :title="status ? '添加劳工信息' : '修改劳工信息'" :visible.sync="dialogFormVisible" width="500px">
         <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
               <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
               <el-radio v-model="form.gender" label="1">男</el-radio>
               <el-radio v-model="form.gender" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
               <el-input v-model="form.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工龄" :label-width="formLabelWidth" prop="father">
               <el-input v-model="form.seniority" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth" prop="mather">
               <el-input v-model="form.post" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="简介" :label-width="formLabelWidth" prop="address">
               <el-input v-model="form.introduce" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="劳工照片" :label-width="formLabelWidth" prop="is_leave">
               <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
                  :on-exceed="handleExceed" :file-list="fileList" v-model="form.picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
               </el-upload>
            </el-form-item>
            <el-form-item label="是否离职" :label-width="formLabelWidth" prop="sex">
               <el-radio v-model="form.isLeave" label="0">未离职</el-radio>
               <el-radio v-model="form.isLeave" label="1">已离职</el-radio>
            </el-form-item>
            <el-form-item label="入职时间" :label-width="formLabelWidth" prop="time">
               <el-date-picker v-model="form.startTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                  placeholder="选择日期">
               </el-date-picker>
            </el-form-item>
            <el-form-item label="点赞数" :label-width="formLabelWidth" prop="phone">
               <el-input v-model="form.likes" autocomplete="off"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="closeInfo('form')">取 消</el-button>
            <el-button type="primary" @click="sure('form')">确 定</el-button>
         </div>
      </el-dialog>
   </div>
</template>

<script>
import { delData, getData, changeInfo } from "../../utils/table.js"
import Page from '../common/Pageing.vue'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         fileList: [{}],
         dialogFormVisible: false,
         total: 0,//
         url: '/employee',
         formInline: {
            name: ''
         },
         form: {
            name: '',
            gender: '1',
            age: '',
            seniority: '',
            post: '',
            introduce: '',
            picture: '',
            isLeave: '1',
            startTime: '',
            likes: '0',

         },
         rules: {
            name: [{ required: true, message: '请输入姓名' }],
            gender: [{ required: true }],
            isLeave: [{ required: true, message: '请选择是否离职' }],
            startTime: [{ required: true, message: '请选择时间' }]
         },
         formLabelWidth: "80px",
         status: true,
      }
   },
   created () {
      getData(this, this.url)
   },
   methods: {
      find () {
         console.log(this.formInline)
         getData(this, '/employee/byName', this.formInline)
      },
      reset () {
         this.formInline = {}
         getData(this, this.url, { page: 1, size: 10 })
      },
      edit (row) {
         this.status = false
         this, this.dialogFormVisible = true
         this.form = { ...row }
      },
      del (row) {
         console.log(row)
         delData(this, this.url, row.id, getData)
      },
      addEmployee () {
         this.form = {
         },
            this.status = true
         this.dialogFormVisible = true
      }
      ,
      closeInfo (form) {
         this.dialogFormVisible = false
         this.$refs[form].resetFields()
      },
      sure (form) {
         this.$refs[form].validate(valid => {
            if (valid) {
               // if (this.state) {
               //    changeInfo(this,'post','/info',this.form,getData)
               // } else {
               //    changeInfo(this,'put','/info',this.form,getData)
               // }
               let methods = ''
               this.status ? methods = 'post' : methods = 'put'
               changeInfo(this, methods, this.url, this.form, getData)
            }
         })
      },
      handleSizeChange (val) {
         this.pageSize = val
         this.currentPage = 1
         console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
         this.currentPage = val
         console.log(`当前页: ${val}`);
      },
      handleRemove (file, fileList) {
         console.log(file, fileList);
      },
      handlePreview (file) {
         console.log(file);
      },
      handleExceed (files, fileList) {
         this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove (file) {
         return this.$confirm(`确定移除 ${file.name}？`);
      }
   }
}
</script>

<style lang="scss" scop>
.infoMent {

   .demo-form-inline,
   .el-form-item {
      margin-left: 20px;
      text-align: left;
   }

   .el-pagination {
      margin-top: 20px;
   }
}
</style>
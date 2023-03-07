<template>
   <div class="elderList">

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
            <el-button type="primary" icon="el-icon-circle-plus" @click="addElder()">新增</el-button>
         </el-form-item>
      </el-form>


      <el-table :data="compData" border style="width: 100%;">
         <el-table-column prop="name" label="姓名" align="center">
         </el-table-column>
         <el-table-column prop="age" label="年龄" align="center">
         </el-table-column>
         <el-table-column prop="sex_text" label="性别" align="center">
         </el-table-column>
         <el-table-column prop="picture" label="照片" align="center">
         </el-table-column>
         <el-table-column prop="start_time" label="入院时间" align="center">
         </el-table-column>
         <el-table-column prop="level" label="护理等级" align="center">
         </el-table-column>
         <el-table-column prop="is_leave" label="是否出院" align="center">
         </el-table-column>
         <el-table-column prop="dormitory" label="宿舍区域" align="center">
         </el-table-column>
         <el-table-column prop="phone" label="手机号码" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 50]"
         @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
         layout="total,sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <el-dialog :title="status ? '添加学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
         <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
               <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
               <el-input v-model="form.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
               <el-radio v-model="form.sex" label="1">男</el-radio>
               <el-radio v-model="form.sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="是否出院" :label-width="formLabelWidth" prop="picture">
               <el-radio v-model="form.is_leave" label="0">已出院</el-radio>
               <el-radio v-model="form.is_leave" label="1">未出院</el-radio>
            </el-form-item>
            <el-form-item label="老人照片" :label-width="formLabelWidth" prop="is_leave">
               <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
                  :on-exceed="handleExceed" :file-list="fileList" v-model="form.picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
               </el-upload>
            </el-form-item>
            <el-form-item label="护理等级" label-width="formLabelWidth" prop="level">
               <el-select v-model="form.level" placeholder="请选择护理等级">
                  <el-option label="等级一" value="1"></el-option>
                  <el-option label="等级二" value="2"></el-option>
                  <el-option label="等级三" value="3"></el-option>
                  <el-option label="等级四" value="4"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="宿舍区域" :label-width="formLabelWidth" prop="dormitory">
               <el-input v-model="form.dormitory" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="入院时间" :label-width="formLabelWidth" prop="time">
               <el-date-picker v-model="form.time" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                  placeholder="选择日期">
               </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
               <el-input v-model="form.phone" type="textarea" autocomplete="off"></el-input>
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
export default {
   data () {
      return {
         tableData: [],
         fileList: [{}],
         dialogFormVisible: false,
         currentPage: 1,// 当前页数是1
         pageSize: 10, // 每页显示条数
         total: 0,//
         formInline: {
            name: ''
         },
         form: {
            name: '',
            sex: '1',
            age: '',
            level: '',
            picture: '',
            is_leave: '1',
            dormitory: '',
            address: '',
            time: '',
            phone: '',

         },
         rules: {
            name: [{ required: true, message: '请输入姓名' }],
            sex: [{ required: true }],
            is_leave: [{ required: true }],
            time: [{ required: true, message: '请选择时间' }],
            dormitory: [{ required: true, message: '请输入地址' }],
            phone: [{ required: true, message: '请输入联系方式' }]
         },
         formLabelWidth: "80px",
         status: true,
      }
   },
   created () {
      getData(this, '/elder')
   },
   computed: {
      compData () {
         return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
   },
   methods: {
      find () {
         console.log(this.formInline)
         this.getData(this.formInline)
      },
      reset () {
         this.formInline = {}
         this.getData(this.formInline)
      },
      edit (row) {
         this.status = false
         this, this.dialogFormVisible = true
         this.form = { ...row }
      },
      del (row) {
         console.log(row)
         delData(this, 'elder', row.id, getData)
      },
      addElder () {
         this.form = {
            sex: '1',
            is_leave: '1',
         },
            this.status = true
         this.dialogFormVisible = true
      },
      closeInfo (form) {
         this.dialogFormVisible = false
         this.$refs[form].resetFields()
      },
      sure (form) {
         this.$refs[form].validate(valid => {
            if (valid) {
               let methods = ''
               this.status ? methods = 'post' : methods = 'put'
               changeInfo(this, methods, '/elder', this.form, getData)
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
.elderList {

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
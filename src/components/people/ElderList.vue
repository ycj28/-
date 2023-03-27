<template>
   <div class="elderList">

      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
         <el-form-item>
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


      <el-table :data="tableData" border style="width: 100%;">
         <el-table-column prop="name" label="姓名" align="center">
         </el-table-column>
         <el-table-column prop="age" label="年龄" align="center">
         </el-table-column>
         <el-table-column prop="gender" label="性别" align="center" width="80px">
         </el-table-column>
         <el-table-column prop="picture" label="照片" align="center">
         </el-table-column>
         <el-table-column prop="startTime" label="入院时间" align="center">
         </el-table-column>
         <el-table-column prop="level" label="护理等级" align="center">
         </el-table-column>
         <el-table-column prop="isLeave" label="是否出院" align="center">
         </el-table-column>
         <el-table-column prop="dormitory" label="宿舍区域" align="center">
         </el-table-column>
         <el-table-column prop="roomNum" label="房间号" align="center">
         </el-table-column>
         <el-table-column prop="phone" label="手机号码" align="center">
         </el-table-column>
         <el-table-column prop="remark" label="备注" align="center" width="200px">
         </el-table-column>
         <el-table-column label="操作" align="center" width="120px">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>
      <Page :total="total" :url="url"></Page>

      <el-dialog :title="status ? '添加老人信息' : '修改老人信息'" :visible.sync="dialogFormVisible" width="500px">
         <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
               <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
               <el-input v-model="form.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
               <el-radio v-model="form.gender" label="男">男</el-radio>
               <el-radio v-model="form.gender" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="是否出院" :label-width="formLabelWidth" prop="picture">
               <el-radio v-model="form.isLeave" label="0">已出院</el-radio>
               <el-radio v-model="form.isLeave" label="1">未出院</el-radio>
            </el-form-item>
            <el-form-item label="老人照片" :label-width="formLabelWidth" prop="is_leave">
               <el-upload class="upload-demo" action="http://127.0.0.1:8028/resources/static/upload/"
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
            <el-form-item label="房间号" :label-width="formLabelWidth" prop="dormitory">
               <el-input v-model="form.roomNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="入院时间" :label-width="formLabelWidth" prop="time">
               <el-date-picker v-model="form.startTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                  placeholder="选择日期">
               </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
               <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="phone">
               <el-input v-model="form.remark" type="textarea" autocomplete="off"></el-input>
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
import { phone, age, name } from '../../utils/vaildate.js'
import Page from '../common/Pageing.vue'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         fileList: [{
            name: '',
            url: ''
         }],
         dialogFormVisible: false,
         total: 0,//
         url: 'elder',
         formInline: {
            name: ''
         },
         form: {
            name: '',
            gender: '',
            age: '',
            level: '',
            picture: '@/assets/bg.jpg',
            isLeave: '',
            dormitory: '',
            roomNum: '',
            address: '',
            time: '',
            phone: '',
            remark: '',
         },
         rules: {
            name: [{ validator: name, trigger: 'blur' }],
            gender: [{ required: true }],
            isLeave: [{ required: true }],
            dormitory: [{ required: true, message: '请输入地址' }],
            phone: [{ validator: phone, trigger: 'blur' }],
            age: [{ validator: age, trigger: 'blur' }]
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
         getData(this, '/elder/byName', this.formInline)
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
         delData(this, this.url, row.id, getData)
      },
      addElder () {
         this.form = {
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
               changeInfo(this, methods, '/elder', JSON.stringify(this.form), getData)
               this.dialogFormVisible = false
               this.$refs[form].resetFields()

            }
         })
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
<template>
   <div class="carouselMent">
      <el-form :inline="true" class="demo-form-inline" size="small">
         <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus" @click="addPic()">新增</el-button>
         </el-form-item>
      </el-form>

      <el-table :data="tableData" v-loading="loading" border style="width: 100%;">
         <el-table-column prop="name" label="图片名称" align="center">
         </el-table-column>
         <el-table-column prop="value" label="图片地址" align="center">
         </el-table-column>
         <el-table-column prop="is_show" label="是否显示" align="center">
            <el-checkbox :v-model="check1" label="显示" border></el-checkbox>
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-success" @click="pass(scope.row)">显示</el-button>
               <el-button type="danger" size="mini" icon="el-icon-error" @click="del(scope.row)">不显示</el-button>
            </template>
         </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 50]"
         @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
         layout="total,sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <el-dialog title="新增轮播图" :visible.sync="dialogFormVisible" width="500px">
         <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="图片名称" :label-width="formLabelWidth" prop="name">
               <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
               :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
               <img v-if="imageUrl" :src="form.value" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="closeInfo('form')">取 消</el-button>
            <el-button type="primary" @click="sure('form')">确 定</el-button>
         </div>
      </el-dialog>
   </div>
</template>

<script>
import { logicDel, getData, changeInfo } from "../../utils/table.js"
export default {
   data () {
      return {
         tableData: [],
         currentPage: 1,// 当前页数是1
         pageSize: 10, // 每页显示条数
         total: 0,//
         formLabelWidth: "80px",
         status: true,
         dialogFormVisible: false,
         form: {
            name: '',
            value: ''
         }
      }
   },
   created () {
      getData(this, '/carousel')
   },
   computed: {
      compData () {
         return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
   },
   methods: {
      addPic () {
         this.form = {
            name: '',
            value: '',
         },
            this.dialogFormVisible = true
      },
      pass (row) {
         logicDel(this, 'carousel', row.id, getData)
      },
      del (row) {
         console.log(row)
         logicDel(this, 'carousel', row.id, getData)
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
      handleAvatarSuccess (res, file) {
         this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {
         const isJPG = file.type === 'image/jpeg';
         const isLt2M = file.size / 1024 / 1024 < 2;
         if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
         }
         if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
         }
         return isJPG && isLt2M;
      },
      closeInfo (form) {
         this.dialogFormVisible = false
         this.$refs[form].resetFields()
      },
      sure (form) {
         this.$refs[form].validate(valid => {
            if (valid) {
               changeInfo(this, 'post', '/carousel', this.form, getData)
            }
         })
      },
   }
}

</script>

<style lang="scss" scop>
.carouselMent {

   .demo-form-inline,
   .el-form-item {
      margin-right: 20px;
      text-align: left;
   }

   .el-pagination {
      margin-top: 20px;
   }

   .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
   }

   .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
   }

   .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
   }

   .avatar {
      width: 178px;
      height: 178px;
      display: block;
   }
}
</style>
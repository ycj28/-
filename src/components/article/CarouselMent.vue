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
         <el-table-column prop="value" label="图片" align="center">
         </el-table-column>
         <el-table-column prop="isShow" label="是否显示" align="center">
            <template slot-scope="scope">
               <span v-if="scope.row.isShow == 1">显示</span>
               <span v-if="scope.row.isShow == 0">不显示</span>
            </template>
         </el-table-column>
         <el-table-column label="设置" align="center">
            <template slot-scope="scope">
               <el-button type="success" size="mini" icon="el-icon-success" @click="passY(scope.row)">显示</el-button>
               <el-button type="info" size="mini" icon="el-icon-error" @click="passN(scope.row)">不显示</el-button>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>
      <Page :total="total" :url="url"></Page>

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
import { delData, getData, changeInfo, modifyData } from "../../utils/table.js"
import Page from '../common/Pageing.vue'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         total: 0,//
         loading: true,
         imageUrl: "",
         formLabelWidth: "80px",
         status: true,
         dialogFormVisible: false,
         url: '/carousels',
         form: {
            name: '',
            value: ''
         },
         rules: {
            name: [{ required: true, message: '请输入姓名' }],
            value: [{ required: true, message: '请选择图片' }],
         },
      }
   },
   created () {
      getData(this, this.url)
   },
   methods: {
      addPic () {
         this.form = {
            name: '',
            value: '',
         },
            this.dialogFormVisible = true
      },
      passY (row) {
         modifyData(this, this.url + '/passY', row.id, getData)
      },
      passN (row) {
         modifyData(this, this.url + '/passN', row.id, getData)
      },
      del (row) {
         console.log(row)
         delData(this, this.url, row.id, getData)
      },
      handleAvatarSuccess (res, file) {
         console.log(res);
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
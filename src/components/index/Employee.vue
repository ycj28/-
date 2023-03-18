<template>
   <div>
      <template :data="tableData">
         <div class="body">
            <el-row :gutter="20">
               <div v-for="( item, index) in tableData" :key="index">
                  <el-col :span="8">
                     <div class="grid-content bg-purple"><el-card class="box-card">
                           <div slot="header" class="clearfix">
                              <span>劳工:{{ item.name }}</span>
                              <el-button class="el-icon-magic-stick" style="float: right; padding: 3px 0" type="text"
                                 @click="addlikes(item)">点赞</el-button>

                           </div>
                           <div class="msg">
                              <div>照片:<img :src="src" alt=""></div>
                              <p>年龄:{{ item.age }}&emsp;&emsp;&emsp;性别：{{ item.gender
                              }}&emsp;&emsp;&emsp;&emsp;入职时间：{{ item.startTime }}</p>
                              <p>工龄:{{ item.seniority
                              }}年&emsp;&emsp;&emsp;职位：{{ item.post }}&emsp;&emsp;&emsp;点赞数：{{ item.likes }}</p>
                              <p>简介：{{ item.introduce }}</p>

                           </div>
                        </el-card></div>
                  </el-col>
               </div>
            </el-row>
            <Page :total="total" :url="url"></Page>
         </div>
      </template>


   </div>
</template>
<script>
import { getData9, addCount } from "../../utils/table.js"
import Page from '../common/Pageing9.vue'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         total: 0,//
         url: 'employee',
         src: require('../../assets/nurse1.jpg')
      };
   },
   created () {
      getData9(this, this.url)
   },
   methods: {
      addlikes (item) {
         addCount(this, '/employee/addLikes', item, getData9)
      }
   }
}
</script>

<style lang="scss">  .body {
     width: 90%;
     margin: auto;

     .box-card {
        margin-bottom: 20px;

        .msg {
           text-align: left;

           p {
              margin-top: 20px;
              font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
           }
        }
     }
  }

  .el-row {
     margin-bottom: 20px;

     &:last-child {
        margin-bottom: 0;
     }
  }

  .el-col {
     border-radius: 4px;
  }

  .bg-purple-dark {
     background: #99a9bf;
  }

  .bg-purple {
     background: #d3dce6;
  }

  .bg-purple-light {
     background: #e5e9f2;
  }

  .grid-content {
     border-radius: 4px;
     min-height: 36px;
  }

  .row-bg {
     padding: 10px 0;
     background-color: #f9fafc;
  }
</style>
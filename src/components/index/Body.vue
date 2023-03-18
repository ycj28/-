<template>
   <div class="top">
      <template :data="tableData">
         <el-card class="box-card">
            <div class="title">
               <p>
                  {{ tableData.title }}
               </p>
            </div>
            <div class="neck">
               <p>作者:{{ tableData.author }}&emsp;&emsp;&emsp;&emsp;文章来源：{{ tableData.source
               }}&emsp;&emsp;&emsp;&emsp;发布日期：{{ tableData.createTime }}</p>
               <br>
               <p><i class="el-icon-view"></i>浏览数:{{ tableData.viewCounts }}&emsp;&emsp;&emsp;&emsp;<i
                     class="el-icon-star-on"></i>收藏：{{
                        tableData.collectionNum }}&emsp;&emsp;&emsp;&emsp;<i class="el-icon-magic-stick"></i>点赞：{{
      tableData.likeNum }}
               </p>
            </div>
            <div class="body" v-html="tableData.content">

            </div>
            <div class="leg">
               <!-- <template slot-scope="scope"> -->
               <div class="like">
                  <el-button type="primary" icon="el-icon-magic-stick" circle @click="addLike(tableData)"></el-button>
               </div>
               <div class="collect">
                  <el-button type="warning" :icon="isCollect ? 'el-icon-star-on' : 'el-icon-star-off'" circle
                     :v-show="isCollect" @click="addCollect(tableData)"></el-button>
               </div>
               <!-- </template> -->
            </div>
            <div class="foot" :model="formInline">
               <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="请在此输入评论"
                  v-model="formInline.content">
               </el-input>
               <div class="submit">
                  <el-button type="primary" @click="submit">提交</el-button>
               </div>
               <hr>
               <template :data="commonData">
                  <div class="common" v-for="(item, index) in commonData" :key="index">
                     <div class="c_body">
                        <div class="c_left">{{ item.username }}:{{ item.content }}</div>
                        <div class="c_right">{{ item.createTime }}</div>
                     </div>
                     <el-divider></el-divider>
                  </div>
               </template>

            </div>
         </el-card>
      </template>


   </div>
</template>
<script>
import { getArticleBody, insertData, getCommon, getCollect, addCount } from "../../utils/table.js"
import { getToken } from '../../utils/setTokens.js'
import { uncollect, collect } from '../../api/api.js'
export default {
   data () {
      return {
         tableData: [],
         commonData: [],
         textarea: '',
         url: 'articles',
         formInline: {
            aid: this.$route.params.aId,
            shows: '',
            content: '',
            createTime: '',
            username: getToken('username'),
         },
         isCollect: false
      }
   },
   created () {
      getArticleBody(this, this.url + '/getBody', this.$route.params.aId)
      getCommon(this, '/comments/getCommon', this.$route.params.aId)
      getCollect(this, 'favorites', getToken('token'), this.$route.params.aId)
   },
   methods: {
      submit () {
         insertData(this, '/comments', this.formInline, getArticleBody)
         this.formInline = {
            aid: this.$route.params.aId,
            shows: '',
            content: '',
            createTime: '',
            username: getToken('username'),
         }
      },
      addLike (tableData) {
         addCount(this, '/articles/addLikes', tableData)
         console.log(tableData)
      },
      addCollect (tableData) {
         if (this.isCollect) {
            uncollect(tableData.id).then(res => {
               if (res.data.status === 200) {
                  this.isCollect = !this.isCollect
                  this.$message({ message: "取消收藏成功", type: 'success' })
                  this.$router.push('/body/' + this.$route.params.aId)
               }
            })
         }
         if (!this.isCollect) {
            collect(tableData.id).then(res => {
               if (res.data.status === 200) {
                  this.isCollect = !this.isCollect
                  this.$message({ message: "添加收藏成功", type: 'success' })
                  this.$router.push('/body/' + this.$route.params.aId)
               }
            })
         }
      },
   }
}
</script>

<style lang="scss">
.top {
   width: 70%;
   margin: auto;
   display: flexbox;

   .box-card {

      .title {
         width: 100%;
         margin-top: 20px;
         font-size: 30px;
         font-weight: bolder;
      }

      .neck {
         width: 100%;
         margin-top: 30px;
         font-size: 13px;
         color: rgba(0, 0, 0, 0.5);
      }

      .body {
         width: 80%;
         margin: auto;
         margin-top: 30px;
         line-height: normal;
         font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

         p {
            margin: 20px 0px;
            font-size: 16px;
            text-indent: 2em;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
         }
      }

      .leg {
         margin-top: 30px;
         width: 80%;
         display: inline-flex;

         .like {
            margin-right: 20px;
            float: left;
         }
      }

      .foot {
         width: 80%;
         margin: auto;
         padding-top: 30px;
         padding-bottom: 20px;

         .submit {
            width: 100%;
            margin-top: 5px;
            display: flex;
         }
      }

      .common {
         width: 80%;
         margin: auto;
         margin-top: 20px;
         padding-top: 10px;

         .c_body {
            height: auto;

            .c_left {
               float: left;
            }

            .c_right {
               float: right;
            }
         }


      }
   }
}
</style>
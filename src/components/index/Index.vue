<template>
   <div class="index">
      <div class="top">
         <div class="block">
            <el-carousel :interval="4000" @change="changeImg">
               <el-carousel-item v-for="(item, index)  in bannerList" :key="index">
                  <el-image :class="className" style="width: 100%; height: 100%" :src="item" fit="cover"></el-image>
               </el-carousel-item>
            </el-carousel>
         </div>

         <div class="card">
            <template :data="hotData">
               <el-card class="box-card">
                  <div slot="header" class="clearfix">
                     <h1 class="el-icon-medal">最热资讯</h1>
                  </div>
                  <div v-for="(item, index) in hotData" :key="index" class="text item">
                     <tr>
                        <div @click="$router.push(`/body/${item.bodyId}`)"> {{ index + 1 }}、{{ item.title }}</div>
                     </tr>
                  </div>
               </el-card>
            </template>

         </div>
      </div>

      <div class="body">
         <template :data="tableData">
            <ul v-for="(item, index) in tableData" :key="index" @click="$router.push(`/body/${item.bodyId}`)">
               <el-card class="box-card" shadow="hover">
                  <div class="whole">
                     <div class="header">
                        <a href="#">{{ item.title }}</a>
                     </div>
                     <div class="left">
                        <div class="aside"><img :src="src" alt=""></div>

                     </div>
                     <div class="right">
                        <div class="main">&emsp; &ensp; {{ item.summary }}</div>
                        <div class="footer">
                           <div class="f_left">
                              <i class="el-icon-star-off"></i>{{ item.collectionNum }}&emsp;<i
                                 class="el-icon-magic-stick"></i>{{ item.likeNum }}&emsp;<i class="el-icon-view"></i>{{
                                    item.viewCounts }}
                           </div>
                           <div class="f_right">
                              {{ item.author }}&emsp;{{ item.source }}&emsp;{{ item.createTime }}
                           </div>
                        </div>
                     </div>
                  </div>
               </el-card>
            </ul>
         </template>


      </div>
      <Page :total="total" :url="url"></Page>
   </div>
</template>

<script>
import { getData, getHotData } from "../../utils/table.js"
import Page from '../common/Pageing.vue'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         hotData: [],
         total: 0,//
         url: 'articles',
         bannerList: [require('../../assets/car1.jpg'), require('../../assets/car2.jpg'), require('../../assets/car3.jpg')],
         className: "",//轮播图名字
         src: require('../../assets/def.png')
      }
   },
   mounted () {
      // console.log('bannerList', this.bannerList);
      this.className = "lun-img";
      setTimeout(() => {
         this.className = "lun-img-two";
      }, 300);
   },
   created () {
      getData(this, this.url)
      getHotData(this, this.url + '/hotList')
   },
   methods: {
      changeImg () {
         this.className = "lun-img";
         setTimeout(() => {
            this.className = "lun-img-two";
         }, 300);

      },
      getbody (value) {
         console.log(value)
         this.$emit('select')
      }
   }
}

</script>

<style lang="scss" scoped>
.index {


   a {
      text-decoration: none;
   }

   .top {
      width: 78%;
      display: inline-block;

      .block {
         float: left;
         height: 320px;
         width: 717px;
         margin-right: 30px;

         .lun-img {
            transform: scale(1.5); //将图片放大
         }

         .lun-img-two {
            transition: all 3s; //恢复正常过渡的时间
            transform: scale(1); //将图片恢复正常
         }

         .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            margin: 0;
         }

         .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
         }

         .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
         }


      }

      .card {
         float: right;
         margin-left: 30px;
         cursor: pointer;

         .text {
            font-size: 15px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            color: rgb(221, 83, 83);
         }

         .item {
            padding: 18px 0;
         }

         .box-card {
            width: 480px;

            tr:hover {
               box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.15);
            }
         }
      }
   }

   .body {
      width: 80%;
      margin: auto;
      cursor: pointer;

      .whole {
         width: 100%;
         height: 100%;
      }

      .header {
         width: 100%;
         height: 23px;
         line-height: 22px;
         font-size: 20px;
         font-weight: bolder;
         display: flex;
      }

      .left {
         float: left;
         width: 18%;
         height: 130px;
         border: #475669 1px solid;
         margin-top: 10px;
      }

      .right {
         width: 80%;
         float: right;
         height: 130px;
         margin-top: 10px;
      }

      .main {
         height: 110px;
         text-align: left;
         line-height: normal;

      }

      .footer {
         color: rgba(0, 0, 0, 0.5);
         font-family: "San Francisco ui";
         font-size: small;

         .f_left {
            float: left;
         }

         .f_right {
            float: right;
         }
      }

      .box-card {
         height: 200px;
         margin-bottom: 20px;
      }
   }

}
</style>
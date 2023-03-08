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
            <el-card class="box-card">
               <div slot="header" class="clearfix">
                  <h1 class="el-icon-medal">最热标签</h1>
               </div>
               <div v-for="(item, index) in 4" :key="index" class="text item">
                  <tr>
                     <span @click="$router.push(`/body/${item}`)">title o</span>
                  </tr>
               </div>
            </el-card>
         </div>
      </div>

      <div class="body">
         <ul v-for="(item, index) in 10" :key="index" @click="$router.push(`/body/${item}`)">
            <el-card class="box-card" :data="compData" shadow="hover">
               <div class="whole">
                  <div class="header">Header</div>
                  <div class="left">
                     <div class="aside">Aside</div>

                  </div>
                  <div class="right">
                     <div class="main">Main</div>
                     <div class="footer">Footer</div>
                  </div>
               </div>
            </el-card>
         </ul>

      </div>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
         :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
   </div>
</template>

<script>
export default {
   data () {
      return {
         tableData: [],
         currentPage: 1,// 当前页数是1
         pageSize: 10, // 每页显示条数
         total: 0,//
         bannerList: [require('../../assets/car1.jpg'), require('../../assets/car2.jpg'), require('../../assets/car3.jpg')],
         className: ""//轮播图名字
      }
   },
   mounted () {
      // console.log('bannerList', this.bannerList);
      this.className = "lun-img";
      setTimeout(() => {
         this.className = "lun-img-two";
      }, 300);
   },
   computed: {
      compData () {
         return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
   },
   methods: {
      changeImg (e) {
         console.log(e, "当前下标"); //可以打印当前轮播图下标
         this.className = "lun-img";
         setTimeout(() => {
            this.className = "lun-img-two";
         }, 300);

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

         .text {
            font-size: 14px;
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
         line-height: 30px;
         font-size: 28px;
         display: flex;
      }

      .left {
         float: left;
         width: 200px;
         height: 110px;
      }

      .right {
         width: 75%;
         float: right;
         height: 130px;
      }

      .main {
         height: 110px;
         text-align: left;
      }

      .footer {
         float: right;
      }

      .box-card {
         height: 200px;
         margin-bottom: 20px;
      }
   }

}
</style>
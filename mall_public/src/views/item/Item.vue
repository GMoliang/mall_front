
<template>
  <div id="article" style="background: #F5F8FA;">
    <category-nav></category-nav>
    <el-container>
      <el-aside width="100%" style="height: auto; ">
        <div style="padding: 30px 40px 15px" >
          <v-divider></v-divider>
          <div style="max-width: 950px;
                                margin: 0 auto">
            <!--<div style="margin-bottom: 5px"><i class="el-icon-caret-top"></i></div>
            <div style="margin-bottom: 5px">上一篇</div>
            <div style="margin-bottom: 5px">编码字母-让我们成为侦探</div>-->

            <div style="max-width: 950px;
                                        margin: 20px auto 20px auto;">
              <div style="text-align: left">
              </div>
              <v-sheet
                  color="white"
                  elevation="4"
                  height="auto"
                  :rounded=true
                  width="100%"
                  style="padding: 5px 0 10px 5px">
               <goodsinfo></goodsinfo>
              </v-sheet>
            </div>
            <div style="max-width: 950px;
                                        margin: 20px auto 20px auto;">
              <div style="text-align: left">
                <h3>评价</h3>
              </div>
              <v-sheet
                  color="white"
                  elevation="4"
                  height="auto"
                  :rounded=true
                  width="100%"
                  style="padding: 5px 0 10px 5px">
                <el-row style="padding: 50px">
                  <g-comment :itemId="itemId"></g-comment>

                </el-row>
              </v-sheet>
            </div>
          </div>
        </div>

      </el-aside>
<!--      <el-main style="margin: 0; padding: 0">-->
<!--        <el-card class="box-card" style=" background: #F5F8FA; height: auto;-->
<!--                                            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);-->
<!--                                            border-radius: 0 0 0 60px">-->
<!--          <popular-posts :popular-posts="PopularPosts"> </popular-posts>-->
<!--        </el-card>-->

<!--      </el-main>-->
    </el-container>
  </div>
</template>

<script>

import Goodsinfo from "./childComps/Goodsinfo";
import PopularPosts from "./childComps/PopularPosts";
import Review from "components/content/review/Review";
import CategoryNav from "components/content/categoryNav/CategoryNav";

export default {
  name: "Article",
  components: {
    /* ArticleSwiper,

     VideoPlayTest*/
    Goodsinfo,
    Review,
    PopularPosts,
    CategoryNav,
    /*  RComment*/
  },
  data(){
    return{
      PopularPosts: [
        {
          id: "1",
          image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },
        {
          id: "2",
          image: "http://krokotak.com/wp-content/uploads/2021/04/airplanecraft2-150x150.jpg",
          title: "PAPER AIRPLANE",
          date: "2020/02/04"
        },
        {
          id: "3",
          image: "http://krokotak.com/wp-content/uploads/2021/03/paperSun2-1-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },
        {
          id: "4",
          image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },
        {
          id: "5",
          image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },
        {
          id: "6",
          image: "http://krokotak.com/wp-content/uploads/2021/04/airplanecraft2-150x150.jpg",
          title: "PAPER AIRPLANE",
          date: "2020/02/04"
        },
        {
          id: "7",
          image: "http://krokotak.com/wp-content/uploads/2021/03/paperSun2-1-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },
        {
          id: "8",
          image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },

        {
          id: "9",
          image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },
        {
          id: "10",
          image: "http://krokotak.com/wp-content/uploads/2021/04/airplanecraft2-150x150.jpg",
          title: "PAPER AIRPLANE",
          date: "2020/02/04"
        },
        {
          id: "11",
          image: "http://krokotak.com/wp-content/uploads/2021/03/paperSun2-1-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },
        {
          id: "12",
          image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
          title: "SPRING WREATH",
          date: "2020/02/04"
        },
      ],
      starStatus: false,
      star: 199,
      tags: [],
      categories:[],
      goods: [],
      categoryPath: [],
      itemId: this.$route.params.itemId,
      article: {},
    }
  },
  methods: {
    // cancelStar() {
    //   cancelStar(this.articleId).then( res => {
    //     this.article.star -= 1;
    //     this.getStarState();
    //   });
    // },
    // giveStar() {
    //   getStar(this.articleId).then( res => {
    //     this.article.star += 1;
    //     this.getStarState();
    //   });
    // },
    // getStarState() {
    //   getStarState(this.articleId).then( res => {
    //     console.log(res);
    //     this.starStatus = res.data;
    //   })
    // },
    // loadtagList(){
    //   if (this.article.tags!="") {
    //     let tagList= this.article.tags.split(',');
    //     tagList.forEach( (tag) => {
    //       if (tag!=""){
    //         getTagById(tag).then( res => {
    //           this.tags.push(res.data)
    //         })
    //       }
    //
    //     });
    //   }
    // },
    // subCategory(){
    //   if (this.article.subCategory!=""){
    //     let cateList = this.article.subCategory.split(',');
    //     console.log(cateList);
    //     cateList.forEach( (cate) => {
    //       if (cate!="") {
    //         getCategoryById(cate).then( res => {
    //           this.categories.push(res.data);
    //         })
    //       }
    //
    //     })
    //   }
    // },
    // loadArticleInfo() {
    //   // getArticleById(this.articleId).then( res => {
    //   //   this.article = res.data;
    //   //   //获得文章的分类信息
    //   //   this.loadCategory(res.data.categoryId);
    //   //   //获得用户是否star该文章
    //   //   this.getStarState();
    //   //   this.loadtagList();
    //   //   this.subCategory();
    //   //
    //   // });
    // },
    // loadGoodsInfo() {
    //
    // },
    // loadCategory(cid) {
    //   getAllCategory(cid).then( res=> {
    //     this.categoryPath = res.data;
    //   })
    // },
    // goAnchor(id) {
    //   var anchor = document.getElementById(id);
    //   // chrome
    //   document.body.scrollTop = anchor.offsetTop;
    //   // firefox
    //   document.documentElement.scrollTop = anchor.offsetTop;
    //   // safari
    //   window.pageYOffset = anchor.offsetTop;
    // }
  },
  mounted() {
   // this.loadArticleInfo();

  }
}
</script>

<style scoped>

</style>

<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col
            v-for="(item, id) in favoriteList"
            :key="id"
            cols="3">
          <v-card height="300">

            <img :src="item.mainImage" alt="商品图片" @click="toItemDetail(item.spuId)"
                 style="width: 250px;height:180px" />
            <p>标题:{{item.title}}</p>
            <p>分类:{{item.cname}}</p>
            <p>地址:{{item.province}}{{item.city}}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import {favoriteList,deleteFavoriteItem} from "../../../network/item";
export default {
  name: "Favorite",
  mounted() {
    this.getFavoriteList()
  },
  data () {
    return {
      favoriteList:[],
    }
  },
  computed: {
    //vuex里取数据 只要token不失效 就可以一直取
    userId(){
      return this.$store.state.login.userId
    }
  },
  methods: {
    getFavoriteList() {
      favoriteList(this.userId).then(res => {
        console.log(res.data);
        this.favoriteList = res.data;
        this.favoriteList.forEach((tmp) => {
          let image = JSON.parse(tmp.mainImage);
          tmp.mainImage = image[0];
        })
      });
    },
      //点击图片进入图片详情
      toItemDetail(spuId){
        this.$router.push("/item/"+spuId)
      },

      //删除收藏
    deleteFavorite(item){
      deleteFavoriteItem(this.userId,item.spuId).then(res => {
          for (let i=0; i<this.favoriteList.length; i++){
            if (this.favoriteList[i].spuId == item.spuId){
              this.favoriteList.splice(i, 1)
            }
          }
        });
      }
  }
}
</script>

<style scoped>

</style>

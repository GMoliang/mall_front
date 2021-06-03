<template>
  <div id="item_list">

    <category-nav></category-nav>

    <v-main>
      <v-container>
        <v-row>
          <v-col
              v-for="(item, id) in itemList"
              :key="id"
              cols="3">
            <v-card height="300">

              <img :src="item.mainImage" alt="商品图片" @click="toItemDetail(item.id)"
                   style="width: 250px;height:180px" />
              <p>价格:{{item.prices}}元/{{item.unit}}</p>
              <p>标题:{{item.title}}</p>
              <p>地址:{{item.province}}{{item.city}}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </div>

</template>
<script>

import CategoryNav from "components/content/categoryNav/CategoryNav";

import { throttle } from '@/utils/utils'
import {getAllGoods, selectItemList, getItemStar} from "../../network/item";
export default {
  name: 'ItemList',
  components: {
    CategoryNav
  },

  data() {
    return {
      cid3:this.$route.params.cid3,
      itemList: [],
    }
  },
  mounted() {

    this.getItemList()
  },
  methods: {
    getItemList(){
      console.log(this.cid3);
      selectItemList(this.cid3).then( res => {
        this.itemList=res.data;
        //商品列表页展示的图片 处理图片
        this.itemList.map((item)=>{
          let image=JSON.parse(item.mainImage);
          item.mainImage=image[0];
        });
        console.log(this.itemList);
        //商品列表页展示的价格 添加一个spu展示的价格
        this.itemList.forEach( (tmp)=> {
          tmp.unit=tmp.skus[0].ownSpec;
          tmp.prices=tmp.skus[0].price;
        })
      })
    },
    //点击图片跳转到商品详情页
    toItemDetail(spuId) {
      this.$router.push("/item/" + spuId)
    },

  },
  created() {

  },


}
</script>
<style lang="scss" scoped>

.container {
  max-width: 1330px;
  margin: 0 auto;
}
#home {
  background-color: #F5F8FA;
}
.waterfall-width-js {
  margin: 0 auto;
  overflow: hidden;
}
.image-col {
  float: left;
  width: 320px;
  .image-box {
    margin: 10px 5px;
  }
  img {
    display: block;
    width: 98%;
  }
}
</style>

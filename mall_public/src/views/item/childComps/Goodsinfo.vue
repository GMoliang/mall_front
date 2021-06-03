<template>
  <div id="goods-info">
    <el-row style="margin-top: 5px">
      <el-col :span="12">
        <image-swipe :images="images"></image-swipe>
      </el-col>
      <el-col :span="12">
        <goods-detail :goodsItem="goods"></goods-detail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GoodsDetail from "./GoodsDetail";
import ImageSwipe from "./ImageSwipe";
import {getSpuBySpuId} from "../../../network/item";
export default {
  name: "Goodsnfo",
  components: {
    GoodsDetail,
    ImageSwipe
  },
  data(){
    return  {
      spuId: this.$route.params.itemId,
      goods: {},
      images: [],
    }
  },
  mounted() {
    this.loadGoodsInfo();
  },
  methods: {
    loadGoodsInfo() {
       getSpuBySpuId(this.spuId).then(res => {
       console.log("spu===================>");
       console.log(res);
       this.goods = res.data;
       this.images = JSON.parse(this.goods.mainImage);

     })
    }
  },

}
</script>

<style scoped>

</style>

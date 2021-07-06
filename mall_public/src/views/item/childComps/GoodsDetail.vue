

<template>
  <div id="goods-detail" style="margin: 0 10px">

    <div style="text-align: left; margin:10px 20px 5px 20px">
            <span v-if="starStatus">
                <v-btn icon color="red" @click="cancelLike">
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <span style="margin-top: 5px">收藏</span>
            </span>
            <span v-else>
                <v-btn icon color="red" @click="giveLike">
                    <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
               <span style="margin-top: 5px">收藏</span>
            </span>
    </div>

    <h3><p>{{spu.title}}</p></h3>
    <div style="text-align: left; margin: 10px">
      <ul class="promo-meta">
        <li class="detail-price">
          <span class="property-type" style="">价格</span>
          <span class="property-cont" style="">
            <em class="r-rmb">￥</em>{{sku.price}}/{{sku.ownSpec}}
          </span>
        </li>
      </ul>
      <ul class="promo-meta">
        <li class="detail-price">
          <span class="property-type" style="">起批量</span>
          <span class="property-type" style="">{{sku.amount}}/{{sku.ownSpec}}</span>
        </li>
      </ul>
      <div style="text-align: left;
                 padding-left: 24px;
                 display: inline-flex">
        <div class="spce-type" style="display: inline-block;
                                            width: 60px;
                                            line-height: 40px;
                                            color: #6c6c6c;">
          规格：
        </div>
        <div class="" style="width: 360px; float: right">
          <div style="float: left;">
            <div style="margin-top: 15px">
              <image-select v-model="selected"
                            :width="50"
                            :is-img=false
                            :height="50"
                            :data-list="skuOption"
                            :defaultIndex=0
              ></image-select>
            </div>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <div style="text-align: left; padding-left: 24px; width: 100%">
        <span class="property-type" style="float: left; line-height: 75px;">地址</span>
        <div class="J_LogisticInfo" style=" float: left; width: 80%">
          <span id="J-from" style=" display: inline-block; line-height: 75px; width: 100%">{{spu.province}}&#12288{{spu.city}}&#12288{{spu.area}}</span>
          <div style="float: right"></div>
        </div>
      </div>
      <br>
      <div style="text-align: left; padding: 10px 0 0 24px">
        <br>
        <div class="property-type" style="width: 60px; float: left">数量</div>
        <span  style="width: 300px; display:inline-block; padding-left:10px">
                    <el-input-number v-model="selItem.count" controls-position="right" @change="" :min="sku.amount" :max="sku.stock"></el-input-number>
                    <span>(库存{{sku.stock}}{{sku.ownSpec}})</span>
                </span>

      </div>
      <div style="margin-top: 20px">
        <el-row>
<!--          <el-col :span="4">f</el-col>-->
<!--          <el-col :span="10"  style="text-align: center">-->
<!--            <el-button @click="addCart">加入购物车</el-button>-->
<!--          </el-col>-->
          <el-col :span="20" style="text-align: center">
            <el-button @click="addCart">加入购物车</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
   </div>
</template>

<script>


import VueSelectImage from 'vue-select-image'
require('vue-select-image/dist/vue-select-image.css');
import ImageSelect from "../../../components/common/imageSelect/ImageSelect";
import {cancelItemStar, getItemStar, getItemStarState,getSpuBySpuId,addCartItem} from "../../../network/item";

export default {
  name: "GoodsDetail",
  components:{
    VueSelectImage,
    ImageSelect
  },
  props: {
    goodsItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    //vuex里取数据 只要token不失效 就可以一直取
    userId(){
      return this.$store.state.login.userId
    },
    loginState() {
      return this.$store.state.login.loginState
    }
  },
  data() {
    return{
      selected: '',
      starStatus: false,
      skuOption: [],

      selItem: {
        id: "",  //spu编号
        skuId:"",
        count: '',       //数量
        price: 0.00,   //总金额
        unitPrice: 0.00, //单价
        freight:"",//运费
        ownSpec:"",//单位
        image:"",//图片
      },
      //商品列表页传来
      spuId: this.$route.params.itemId,
      skus: [],


      spu:{},
      sku: {},
    }
  },
  mounted() {
    this.loadSpuInfo()
  },
  methods: {
    //获得SpuInfo
    loadSpuInfo(){
      const item = JSON.parse(JSON.stringify(this.goodsItem));
      console.log("1111111111"+item);
      this.spu = item;
      this.skus = this.spu.skus;
      this.sku = this.skus[0];
      this.selItem.count = this.sku.amount;
      this.selItem.skuId=this.sku.id;
      this.selItem.unitPrice=this.sku.price;
      this.selItem.freight=this.sku.freight;
      this.selItem.ownSpec=this.sku.ownSpec;
      let image=JSON.parse(this.spu.mainImage);
      this.selItem.image=image[0];
      this.skus.forEach( (sku)=> {
        const option = {
          id: sku.id,
          src: '',
          alt: sku.name,
          disabled: false,
        }
        this.skuOption.push(option);
      })
      //还得处理图片。。。

      console.log(this.skus)
      this.likeState();
    },
    //点赞
    giveLike() {
      console.log("点赞")
      getItemStar(this.userId,this.spuId).then( res => {
        //渲染点赞效果
        this.likeState();
        console.log(res);
      })
    },
    //取消点赞
    cancelLike() {
      cancelItemStar(this.userId,this.spuId).then( res => {
        //渲染点赞效果
        this.likeState();
      })
    },
    //更新点赞状态
    likeState() {
      getItemStarState(this.userId,this.spuId).then( res => {
        console.log(res);
        this.starStatus = res.data;
      })
    },

    addCart() {
      if(this.loginState==false){
        alert("请先登录！")
      }


      const cartItem={
          "shopId":this.spu.shopId,
          "itemId":this.spuId,
          "skuId":this.selItem.skuId,
          "userId":this.userId,
          "count":this.selItem.count,
          "amount":this.selItem.unitPrice*this.selItem.count,

      }
      console.log(cartItem);
      addCartItem(cartItem).then( res => {
        console.log(res);
        // this.starStatus = res.data;
      })



    },
    purchaseNow() {

    },

  },
  watch:{
    selected: {
      deep: true,
      handler(){
        this.sku = this.skus[this.selected];
        this.selItem.count = this.sku.amount;
        this.selItem.skuId=this.sku.id;
        this.selItem.unitPrice=this.sku.price;
        this.selItem.freight=this.sku.freight;
        this.selItem.ownSpec=this.sku.ownSpec;

        let image=JSON.parse(this.spu.mainImage);
        this.selItem.image=image[0];
        //console.log(this.selected);
      }
    },
    goodsItem: {
      deep: true,
      handler() {
        this.loadSpuInfo();
      }
    }
  }


}
</script>

<style scoped>

.promo-meta {
  list-style-type: none;
}
.property-type {
  display: inline-block;
  width: 60px;
  line-height: 40px;
  color: #6c6c6c;
}
.property-cont {
  font-size: 26px;
  color: #FF4400;
  line-height: 12px;
}
.r-rmb {

  font-style: normal;
  font-weight: bolder;
  margin-right: 4px;

}
.J_LogisticInfo {

}
/deep/ vue-select-image__wrapper li {
  margin-left: 0;
}
</style>

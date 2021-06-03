<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/2
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/2
 -->

<template>
    <div id="cart" style="width: 90%;margin: auto">

      <div class="confirm-info" v-if="">
        <order-address v-on:addressId="getAddressId"></order-address>
      </div>

        <div class="Cart">
            <div v-if="cartListLength>0">
                <div class="cartTableHeader">
                    <span style="width: 25%" >商品信息</span>
                    <span style="width: 15%">单价</span>
                    <span style="width: 20%">数量</span>
                    <span style="width: 20%">小计</span>
                    <span style="width: 20%">交易操作</span>
                </div>
                <ul class="orderList" style="list-style-type: none; padding-left: 0">
                    <li v-for="(item,index) in cartList" :key="index">

                        <div class="orderDetail" style="display: flex;flex-direction: row">
                          <div style="width: 25% ;display: flex;flex-direction: row">
                            <span style="padding: 0 5px;">
                            <v-checkbox
                                v-model="selected"
                                label=""
                                :value="item.cartId"
                            ></v-checkbox>
                          </span>
                            <img :src="item.img" alt="商品图片"/>
                            <div class="goodsName">
                              <p @click="navTo('/mall/goods/'+item.itemId)">{{item.spu.title}}</p>
                              <span>{{item.sku.name}}</span>
                            </div>
                          </div>

                            <div class="unitPrice" style="width: 15% ;" >{{'￥'+item.sku.price}}</div>
                            <div class="num"  style="width: 20% ;height:100%;display: flex; align-items:center;
   justify-content:center;" >
                                <NumberInput
                                    @changeHandle="numberChange(item.cartId)"
                                    :initNum="item.count"
                                    v-model="item.count"
                                    :min="1"
                                    :max="item.count"/>
                            </div>
                            <!-- <input @change="numberChange(item.id)" type="text" v-model="item.temGoodsNum" min="1" class="numInput" /> -->
                            <div class="amount"  style="width: 20% ;" >{{'￥'+item.prices}}</div>
                          <div  style="width: 20% ;" >

                            <button  @click="deleteCartItem(item.cartId)">删除</button>
                          </div>
                        </div>
                    </li>
                </ul>
                <div class="cartFooter">
                    <span>应付金额：</span>
                    <span class="total">{{'￥'+totalAmount}}</span>
                    <button @click="settleAccounts">下单</button>
                </div>
            </div>
            <p class="emptyTips" v-else>购物车还是空滴~</p>
        </div>
    </div>

</template>

<script>
    import OrderAddress from "../order/orderDetail/childComps/OrderAddress";
    import NumberInput from 'components/NumberInput';
    import {selectCart, deleteCartItem, updateCartCount} from "../../network/item";
    import {createOrderByCart} from "../../network/order";

    export default {
        name: 'Cart',
        components:{
            NumberInput,
            OrderAddress,
        },

        data () {
          return {
            orderList:[],
            cartList:[],
            selected:["",],
            cartListLength:1,
            totalAmount:0.0,
            addressId:"",
          }
        },
        computed:{
          //vuex里取数据 只要token不失效 就可以一直取
          userId(){
            return this.$store.state.login.userId
          },

        },
      mounted() {
        this.getCartList()
      },

      methods:{
          getCartList(){
            selectCart(this.userId).then( res => {
              console.log(res);
              this.cartList=res.data;
              this.cartListLength=this.cartList.length;

              //小计
              this.cartList.forEach( (tmp)=> {
                //小计
                 tmp.prices=tmp.sku.price*tmp.count;
                 let image=JSON.parse(tmp.spu.mainImage);
                 tmp.img=image[0];

              })

              //总价
              let allPrices=0.0;
              this.cartList.forEach( (tmp)=> {
                allPrices=this.addfunction(allPrices,tmp.prices)
              })
              this.totalAmount=allPrices;
            })
          },

            numberChange(cartId){
              // console.log("改变数量"+cartId);
              let cartDO={};
              this.cartList.map((item)=>{
                    if(cartId==item.cartId){
                        item.prices = item.sku.price*item.count;
                        // console.log(item.count,item.prices)
                      cartDO=item;
                      cartDO.amount= item.prices;
                    }
              })
              // console.log("cartDO"+cartDO);
              updateCartCount(cartDO).then( res => {

              });
              //总价
              let allPrices=0.0;
              this.cartList.forEach( (tmp)=> {
                allPrices=this.addfunction(allPrices,tmp.prices)
              })
              this.totalAmount=allPrices;

            },
          deleteCartItem(cartId){
            deleteCartItem(cartId).then( res => {
              console.log("删除成功")
              for (let i=0; i<this.cartList.length; i++){
                if (this.cartList[i].cartId == cartId){
                  this.cartList.splice(i, 1)
                }
              }
              //总价
              let allPrices=0.0;
              this.cartList.forEach( (tmp)=> {
                allPrices=this.addfunction(allPrices,tmp.prices)
              })
              this.totalAmount=allPrices;
             // this.getCartList();
            })
          },

            navTo(route){
                this.$router.push(route);
            },

          //下订单
            settleAccounts(){

              // console.log("购物车页选择的地址"+this.addressId);
              // console.log(this.selected);
              const cartIdList=this.selected.slice(1);
              // console.log(cartIdList);
              createOrderByCart(cartIdList,this.addressId).then( res => {

                this.$router.push("/order/detail/"+res.data)
               })
            },
          getAddressId(aid){
            this.addressId=aid;
          },
          addfunction(arg1, arg2) {
            var r1, r2, m, n;
            try {
              r1 = arg1.toString().split(".")[1].length
            } catch (e) {
              r1 = 0
            }
            try {
              r2 = arg2.toString().split(".")[1].length
            } catch (e) {
              r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2))
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m + arg2 * m) / m).toFixed(n);
          }
        },

      watch: {
        selected: {
          deep: true,
          handler() {
            console.log(this.selected);
            const cartIdList=this.selected.slice(1);
            let allPrices=0.0;
            console.log(this.cartList);
            cartIdList.forEach( (tmp)=> {
              console.log(tmp);
              this.cartList.forEach((res) => {
                      if(tmp==res.cartId){

                        allPrices=this.addfunction(allPrices,res.prices)
                        console.log(allPrices);
                      }
              })
            });
            this.totalAmount=allPrices;
          }
        },
      }
    }
</script>

<style scoped lang="less">
    @import "~assets/css/var.less";
    .Cart{
        width: 100%;
        .emptyTips{
            width: 200px;
            text-align: center;
            display: block;
            margin: 30px auto;
            color:@thirdColor;
            font-size: 20px;
        }

        .cartTableHeader{
            width: 100%;
            height: 40px;
            background-color: #f5f5f5;
            border: 1px solid @borderColor;
            color: @fontDefaultColor;
            font-size: 14px;
            line-height: 40px;
            span{
                display: inline-block;
                width: 14%;
                &:first-child{
                    width:30%;
                    text-align: center;
                }
            }
        }
        .orderList{
            width: 100%;
            li{
                border: 1px solid @borderColor;
                border-top: none;
                font-size: 13px;
                .orderHeader{
                    background-color: #f1f1f1;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 5px;
                    .orderTime{
                        font-weight: 600;
                    }
                    .orderId,.state{
                        margin-left: 10px;
                    }
                }
                .orderDetail{
                    width: 100%;
                    padding: 10px 10px 10px 0;
                    position: relative;
                    overflow: hidden;
                    img{
                        width: 84px;
                        height: 84px;
                        display: inline-block;
                    }
                    .goodsName{
                        display: inline-block;
                        margin-left: 5px;
                        width: 230px;
                        vertical-align: top;
                        p{
                            cursor: pointer;
                            line-height: 20px;
                            &:hover{
                                text-decoration:underline;
                            }
                        }
                        span{
                            color:@fontDefaultColor;
                            display: block;
                            margin-top: 10px;
                        }
                    }
                    .unitPrice,.num,.amount{
                        display: inline-block;
                        vertical-align: top;
                        width: 15%;
                        height: 85px;
                        line-height: 85px;
                        text-align: center;
                    }
                    .NumberInput{
                        position: relative;
                        top: 25px;
                    }
                    button{
                        position: absolute;
                        right: 90px;
                        bottom: 40px;
                        width: 70px;
                        height: 30px;
                        border-radius: 3px;
                        background-color: @falseColor;
                        color:white;
                        border: none;

                    }
                }
            }
        }
        .cartFooter{
            width: 100%;
            height: 60px;
            line-height: 60px;
            padding: 0 10px;
            border: 1px solid @borderColor;
            border-top: none;
            background-color: #f5f5f5;
            position: relative;
            span{
                color: @fontDefaultColor;
                display: inline-block;
                vertical-align: top;
            }
            .total{
                color:@falseColor;
                font-size: 25px;
                font-weight: 600;
            }
            button{
                position: absolute;
                right: 0;
                top: 0;
                width: 100px;
                height: 100%;
                //background-color: @thirdColor;
              background-color: #cc5943;
                border: none;
                color:white;
                font-size: 20px;
            }
        }
    }

</style>

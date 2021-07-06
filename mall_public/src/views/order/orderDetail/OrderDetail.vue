

<template>
    <div id="order-detail">
        <div class="order-box">
<!--            <div class="order-step">-->
<!--                <el-steps  finish-status="success" simple>-->
<!--                    <el-step title="确认订单信息" ></el-step>-->
<!--                    <el-step title="付款" ></el-step>-->

<!--                </el-steps>-->
<!--            </div>-->

            <div class="confirm-info" v-if="">
                <order-address v-on:addressId="getAddressId"></order-address>
            </div>

          <div>
            <order-box :item="item"></order-box>
          </div>

          <div class="submit-order">
            <div style="width: 90%; margin:0px auto;">
                <h3 style="color: red;padding: 10px 0;">实付款：￥{{item.allPrices}}</h3>
              <div>
                <el-button @click="aliPay">立即支付</el-button>
              </div>
            </div>
          </div>
        </div>

    </div>
</template>

<script>
    import OrderAddress from "./childComps/OrderAddress";
    import {getOrderByOid} from "../../../network/order";
    import OrderBox from "./OrderBox";
    import {aliPcPay} from "../../../network/aliPay";
    import router from "../../../router/router";
    export default {
        name: "OrderDetail",
        components:{
          OrderAddress,
          OrderBox
        },
        data(){
           return{
             oid: this.$route.params.oid,
             item:{},
             addressId:"",
           }
        },
      mounted() {
        this.loadOrderDetail();
      },
        methods: {
            loadOrderDetail(){
                console.log("oid");
                console.log(this.oid);
                getOrderByOid(this.oid).then( res => {
                    console.log(res);
                    this.item = res.data;
                    let pricesTmp=0;
                    this.item.orderDetailList.forEach( (test) =>{
                          let image=JSON.parse(test.spu.mainImage);
                          test.img=image[0];
                          pricesTmp+=test.amount;
                    });
                    this.item.allPrices=pricesTmp;
                })
            },
          aliPay() {
            console.log("进入支付页面")
            const outTradeNo="20210111"+(this.oid);
            console.log(outTradeNo);
            const allPrices=this.item.allPrices;
            console.log(allPrices);
            console.log(this.addressId);

            let newpage = this.$router.resolve({
              name: 'aliPay',
              query:{
                out_trade_no: outTradeNo,
                total_amount: allPrices,
                subject: "店铺",
                product_code: "FAST_INSTANT_TRADE_PAY",
              },
              path: "/order/alipay/",
            });
            window.open(newpage.href, '_blank');
            this.$router.push("/home");
          },
          getAddressId(aid){
              this.addressId=aid;
          }
        },

    }
</script>

<style scoped>

    #order-detail {
        background-color: #FFFFFF;
    }
    .order-box {
        width: 90%;
        margin: 0 auto;
    }
    .order-step {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .confirm-info {
      width:90%;
      margin: 0 auto;
        text-align: left;
    }

</style>

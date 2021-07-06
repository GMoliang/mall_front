

<template>
    <div id="order-box">


      <thead>
      <tr>
        <th class="text-center" width="300px">商品</th>
        <th class="text-center" width="180px">单价</th>
        <th class="text-center" width="170px">数量</th>
        <th class="text-center" width="170px">实付款</th>
        <th class="text-center" width="150px">邮费</th>
        <th class="text-center" width="150px">交易状态</th>
      </tr>
      </thead>
        <div class="item-box">
<!--            <div style="padding-top: 20px; width: 100%; text-align: left">-->
<!--                &lt;!&ndash;这是一个路由跳转&ndash;&gt;-->
<!--                <h4 style="width: 90%; float: left">确认订单</h4>-->
<!--            </div><br>-->
            <br>
            <div class="item-head" style="background-color: #F8F8FF; height: 50px">
                <div style="text-align: left">
                    <span style="width: auto">订单号：20210111{{item.order.id}}</span>
                    <span style="width: auto">订单创建时间：{{item.order.createdTime}}</span>
                </div>
            </div>
            <div class="item-body" v-for="(detail, id) in item.orderDetailList" :key="id">
                <div class="item-info item" style="border-left: white">
                    <div style="width: 80px; height: 80px; float: left">
                        <el-image
                                style="width: 100%; height:100%"
                                :src="detail.img"
                                fit="cover"></el-image>
                    </div>
                    <div class="info-text" style="">
                        <p @click="">{{detail.spu.title}}</p>
                        <span>{{detail.sku.name}}</span>
                    </div>
                </div>
                <div class="item-price item">
                    <span>{{detail.sku.price}}元</span>
                </div>
                <div class="item-count item">
                    <span>{{detail.count}}{{detail.sku.ownSpec}}</span>
                </div>
                <div class="item-pay item">
                  <span>{{detail.amount}}元</span>
                </div>
                <div class="item-option item">
                  <span>包邮</span>
                </div>
                <div class="item-state item">
                  <span>未支付</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderBox",
        props: {
            item: {
                type: Object,
                default() {
                    return null
                }
            }
        },
        data() {
            return {

            }
        },
        methods: {

        },
        watch: {
            item: {
                deep: true,
                handler() {
                   // console.log(this.item);
                }
            }
        }

    }
</script>

<style scoped>

    #order-box {
        width: 85%;
        margin: 0 auto;
    }
    .item-body {
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        border: #daf3ff solid 1px;
        text-align: center;
    }
    .item-info {
        width: 300px;
        text-align: center;
        margin-left: 15px;
    }
    .info-text {
        margin-left: 150px;
        text-align: left;
        width: auto;
    }

    .info-text p {
        font-size: 12px;
        cursor: pointer;
        margin: 8px 5px 8px 0;
        line-height: 20px;
    }
    .info-text span {
        margin-top: 0;
        color: #aeaeae;
    }
    .goodsName p:hover{
        text-decoration:underline;
    }
    .item-price {
        width: 156px;
    }
    .item-count {
        width: 188px;
    }
    .item-option {
        width: 169px;
    }
    .item-pay {
        width: 150px;
    }
    .item-state {
        width: 140px;

    }
    .item-deal {
        width: 120px;
    }
    .item {
        border-left: #daf3ff solid 1px;
        padding-top: 10px;
        padding-bottom: 10px

    }
    span{
        color:@fontDefaultColor;
        display: block;
        margin-top: 10px;
    }

</style>



<template>
    <div id="order-list" style="width: 100%;">
        <div class="" style="text-align: left; font-size: 12px">
            <div class="sel-all" style="padding-left: 20px">
<!--                <v-checkbox-->
<!--                        label="全选"-->
<!--                        @change="handleCheckAllChange"-->
<!--                        v-model="checkAll"-->
<!--                        indeterminate>-->
<!--                </v-checkbox>-->
            </div>

            <div style="margin: 15px 0;"></div>
           <div class="item-box" v-for="(item, id) in orderList" :key="id">

               <div class="item-head" style="background-color: #FFFFFF; height: 50px" >
                   <div>
                       <span style="width: auto">订单编号：20210111{{item.order.id}}</span>
                       <span style="width: auto">订单创建时间：{{item.order.createdTime}}</span>
                   </div>
               </div>

               <div class="item-body" v-for="(detail, id) in item.orderDetailList" :key="id">
                   <div class="item-info item" style="width:20%;border-left: white;">
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
                   <div class="item-price item" style="width: 10%;" >
                       <span>{{detail.sku.price}}元</span>
                   </div>
                   <div class="item-count item" style="width: 15%">
                       <span>{{detail.count}}{{detail.sku.ownSpec}}</span>
                   </div>
                   <div class="item-option item" style="width: 15%">
                       <div>退货/退款</div>
                       <div>投诉卖家</div>
                   </div>
                   <div class="item-pay item" style="width: 15%">
                     <span>{{detail.amount}}元</span>
                   </div>
                   <div class="item-state item"  style="width: 15%">
                     <span v-if="item.order.orderStatus==1">未支付</span>
                     <span v-else-if="item.order.orderStatus==4">取消支付</span>
                     <span v-else >已支付</span>
                   </div>
                   <div class="item-deal item"  style="width: 10%">
                     <span v-if="item.order.orderStatus==1">去支付</span>
                     <span v-else-if="item.order.orderStatus==4">已取消支付</span>
                     <span v-else-if="item.order.orderStatus==2">已付款</span>
                     <span v-else-if="item.order.orderStatus==3">已发货</span>
                   </div>
               </div>
             <div v-if="item.order.orderStatus==1" style="text-align: right">
               <div style="display: flex;justify-content:flex-end;text-align: right">
<!--                 <div> <span>去支付</span> </div>-->
                 <div style="margin-left: 20px"> <el-button type="warn" size="mini" @click="cancleOrder(item)">取消订单</el-button></div>
               </div>
             </div>

           </div>

        </div>
    </div>
</template>

<script>

    import OrderListItem from "./OrderListItem";
    import {cancleOrderByUser} from "../../../network/order";
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "OrderList",
        components: {
            OrderListItem
        },
        props: {
            orderList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                checkAll: false,
                selected: true,
                time: "2021-05-18",
                orderId: "1804557530014091415",
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true
            };
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            cancleOrder(item){
                let orderDetailIdList=[];
                item.orderDetailList.forEach(tmp => {
                  orderDetailIdList.push(tmp.id)
                })
              console.log(orderDetailIdList);
              cancleOrderByUser(item.order.id,orderDetailIdList).then(res=>{
                item.order.orderStatus=4;

              })

            }
        }
    }
</script>

<style scoped>

    .item-body {
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        border: #daf3ff solid 1px;
        text-align: center;
    }
    .item-info {

        text-align: center;
        margin-left: 15px;
    }
    .info-text {
        margin-left: 90px;
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

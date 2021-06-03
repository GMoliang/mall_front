<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/3
 -->

<template>
  <div id="order">
    <v-card>
      <v-toolbar class="elevation-0">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item v-for="(item, id) in statusMenus"
                              class="order-head"
                              v-bind:class='item.active ? orderMenuA : orderMenuB' >

                        <span v-bind:class="id==activeIndex ? orderMenuA : orderMenuB"
                              @click="orderStatus(id)">{{item.text}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </v-toolbar>

      <v-divider/>
      <div style="margin: 0 20px">
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-center" width="20%">商品</th>
              <th class="text-center" width="10%">单价</th>
              <th class="text-center" width="15%">数量</th>
              <th class="text-center" width="15%">商品操作</th>
              <th class="text-center" width="15%">实付款</th>
              <th class="text-center" width="15%">交易状态</th>
              <th class="text-center" width="10%">交易操作</th>
            </tr>
            </thead>
<!--            <tbody>-->
<!--            <tr v-for="item in desserts"-->
<!--                :key="item.name">-->
<!--              <td>{{ item.name }}</td>-->
<!--              <td>{{ item.calories }}</td>-->
<!--            </tr>-->
<!--            </tbody>-->
          </template>
        </v-simple-table>
        <order-list :orderList="newOrderList" type=""></order-list>
      </div>
    </v-card>


  </div>
</template>


<script>
    import OrderList from "./childComps/OrderList";
    import {loadOrder} from "../../network/order";
    export default {
        name: "Orders",
        components: {
            OrderList
        },
        data() {
            return {
                orderList: [],
                newOrderList:[],
                activeIndex: 0,
                orderMenuA: "order-menu-active",
                orderMenuB: "",
                statusMenus: [
                    {
                        type: "All",
                        text: "所有订单",
                        active: true,
                    },
                    {
                        type: "WitPay",
                        text: "待支付",
                        active: false,
                    },
                    {
                        type: "WaitSend",
                        text: "已发货",
                        active: false,
                    },
                ],
            }
        },
      mounted() {
        this.getOrderList();

      },
        methods:{
            //改变订单状态
            orderStatus(id) {
              console.log(id);
              this.activeIndex = id;
              if(id!=0){
                this.newOrderList=this.getTwoOrderList(id);
              }else{
               this.getOrderList();
              }
            },
            //加载订单
            getOrderList() {
            loadOrder().then( res => {
              this.orderList = res.data;

              this.orderList.forEach( (tmp)=> {
                tmp.orderDetailList.forEach( (test)=>{
                  let image=JSON.parse(test.spu.mainImage);
                  test.img=image[0];
                })
              })
              this.newOrderList=this.orderList;
            })
          },
          //orderList过滤
          getTwoOrderList(id){
            console.log("开始过滤")
            return this.orderList.filter( (tmp)=> {
              return tmp.order.orderStatus==id;
            })
          }


        }
    }
</script>

<style scoped>

    .order-box {
        width: 90%;
        margin: 0 auto;
    }
    .order-head {
        font-size: 16px;
        font-weight: 700;
    }
    .order-menu-active {
        color: black;

    }
    .order-head span {
        padding: 0 10px;
    }
    .order-head span:hover {
        color: black;
    }

</style>

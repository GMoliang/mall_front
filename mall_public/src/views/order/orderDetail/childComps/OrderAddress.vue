

<template>
    <div id="order-address">
        <div class="confirm-box">
            <div style="padding: 20px 0px 0px 25px; width: 100%">
                <!--这是一个路由跳转-->
<!--                <h4 style="width: 90%; text-align: left">确认收货地址</h4>-->
<!--                <div style="float: right; width: 10%">-->
<!--                    <span>管理收货地址</span>-->
<!--                </div>-->
            </div><br>

            <v-divider/>

            <ul style="list-style-type: none;">
                <li class="addr-li" v-for="(addr, index) in  this.addressList" :key="addr.id">
                    <div style="display: flex"
                         class="addr-item"
                         v-bind:class="selected[index]? 'addr-selected' : addr.defaultAddr==1? 'addr-default' : '' ">

                        <span class="addr-span" style="display:block; width: 80px; padding-left: 20px">
                            <span v-if="addr.defaultAddr==1">寄送至</span>
                        </span>
                        <span style="display:block; width: 40px">
                           <v-checkbox
                                   style="width: 100%"
                                   v-model="selected[index]"
                                   @click="selectAddr(addr.id, index)"
                           ></v-checkbox>
                        </span>
                        <span v-for="add in addr.addrList" class="addr-span" style="">
                            {{add.label}}
                        </span>
                        <span class="addr-span">{{addr.receiverProvince}}{{addr.receiverCity}}
                        {{addr.receiverArea}}{{addr.receiverAddress}}</span>
                        <span class="addr-span">({{addr.receiverName}} 收)</span>
                        <span class="addr-span">{{addr.receiverMobile}}</span>
                        <span class="addr-span">
                            <span v-if="addr.defaultAddr==1">
                                默认地址
                            </span>
                        </span>
                        <span class="addr-span" style="font-size: 12px;margin-left: 20px">

                        </span>
                    </div>
                </li>
                <li>
<!--                    <div style="padding-left: 80px">-->
<!--                        <el-button size="small" @click="aadDialogVisible=true">使用新地址</el-button>-->
<!--                    </div>-->
                </li>
            </ul>
<!--            {{addresses}}-->
            <v-divider/>
        </div>
<!--        <el-dialog-->
<!--                title="创建地址"-->
<!--                :visible.sync="aadDialogVisible"-->
<!--                width="50%">-->
<!--            <new-address></new-address>-->
<!--        </el-dialog>-->
    </div>
</template>

<script>

    import {mapState, mapGetters } from 'vuex';
    import NewAddress from "components/common/address/NewAddress";
    import {selectAddress} from "../../../../network/address";

    export default {
        name: "OrderAddress",
        components: {
            NewAddress
        },
        data() {
            return {
                selected: [],
                aadDialogVisible: false,
                addressList:[],
            }
        },
        computed: {

          userId(){
            return this.$store.state.login.userId
          },
        },
      mounted() {
        this.getAddressList();

      },
        methods:{
          getAddressList(){
            selectAddress(this.userId).then( res => {
            //  console.log(res);
              this.addressList=res.data
              console.log("进入地址++++"+this.addressList);
                for (let i=0; i<this.addressList.length; i++) {
                  if (this.addressList[i].defaultAddr === "1") {
                    this.selected[i] = true;
                  }else {
                    this.selected[i] = false;
                  }
                }
            })
          },
            selectAddr(aid, index) {
              console.log(aid);
              for (let i=0; i<this.selected.length; i++) {
                    if (i === index) {
                        continue;
                    }
                    else {
                        this.selected[i] = false;
                    }
                }
              this.$emit("addressId", aid);
            }
        },
    }
</script>

<style scoped>

    .confirm-box{
        /*width: 85%;*/
        margin: 0 auto;
       /* background-color: #00a0e9;*/
    }

    .addr-span {
        padding-right: 5px;
        margin: auto 0
    }
    .addr-li div:hover {
        /*background-color: #fff0e8;*/
    }
    .addr-selected {
        font-weight: bolder;
        /*border: #f40 solid 1px;*/
        /*background-color: #fff0e8;*/
        /*box-shadow: 5px 5px 0 #f3f3f3;*/
    }

</style>

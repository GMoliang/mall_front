<template>
<div id="alu-pay">
   <div v-if="paysStatus">
     支付
   </div>
  <div v-else>
    支付
  </div>

</div>
</template>

<script>
import {aliPcPay} from "../../../network/aliPay";
import {UpdateOrderPayStatus} from "../../../network/order";

export default {
  name: "AliPay",
  data(){
    return {
        paysStatus:true
    }
  },
  mounted() {
    var idx = window.location.search.substring("1").indexOf("payStatus")
    if (idx != -1) {
      const s = this.getQueryVariable("payStatus");
      if (s == 'f') {
        // 支付
        this.paysStatus = false;
      } else if (s == 't') {
        this.paysStatus = true;
        //TODO   订单支付完成 之后自己做处理 -----
        const out_trade_no = this.getQueryVariable("out_trade_no");
        const trade_no = this.getQueryVariable("trade_no");
        const addressId = this.getQueryVariable("address_id");
        this.sendOrderInfo(out_trade_no,trade_no);
      }
    } else {
      this.paysStatus = false;
    }

    if (!this.paysStatus) {
      const data = this.$route.query;
      console.log(this.$route.query);
      console.log(this.$router);
      aliPcPay(JSON.stringify(data)).then(res => {
        //res即为后端返回的form表单
        //js创建一个div将form表单添加上去
        const div = document.createElement('div')
        div.innerHTML = res;
        document.body.appendChild(div);
        //调用form表单
        document.forms[0].submit();
        this.paysStatus = true;
      });
    }
  },

  methods:{
    //发送交易流水号
    sendOrderInfo(out_trade_no,trade_no){
      UpdateOrderPayStatus(out_trade_no,trade_no).then(res =>{
        console.log("改变订单状态为已支付"+res);

      });


    },
    getQueryVariable(variable){
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
          return pair[1];
        }
      }
      return(false);
    },
  },
}
</script>

<style scoped>

</style>

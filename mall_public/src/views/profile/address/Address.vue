<template>
  <div id="form2">
    <v-card>
    <div style="text-align: left; width: 700px; margin: 0 auto">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收货人" prop="receiverName" placeholder="收货人姓名">
          <el-input v-model="ruleForm.receiverName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="receiverMobile" placeholder="收货人手机号">
          <el-input v-model="ruleForm.receiverMobile"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="name">
          <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
          </v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="receiverAddress" placeholder="收货人详细地址">
          <el-input v-model="ruleForm.receiverAddress"></el-input>
        </el-form-item>
        <el-form-item label="设为默认地址" >
          <div style="width: 50%; float: left">
            <el-switch
                v-model="switchValue"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </div>
          <div style="width: 50%; float: right">
            <el-button @click="submitForm(ruleForm)">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>


    <el-table
        :data="addressList"
        border
        style="width: 100%">
      <el-table-column
          prop="receiverName"
          label="收货人"
          width="180">
      </el-table-column>
      <el-table-column
          prop="receiverMobile"
          label="手机号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="receiverProvince"
          label="收货省份"
          width="180">
      </el-table-column>
      <el-table-column
          prop="receiverCity"
          label="收货城市"
          width="180">
      </el-table-column>
      <el-table-column
          prop="receiverArea"
          label="收货区域"
          width="180">
      </el-table-column>
      <el-table-column
          prop="receiverAddress"
          label="详细地址">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
         <el-button type="text" @click="delAddress(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table></v-card>
  </div>

</template>

<script>
import {deleteAddress, saveAddress, selectAddress} from "../../../network/address";
import VDistpicker from 'v-distpicker'
export default {
  name: "Address.vue",
  components: { VDistpicker },
  data() {
    return {
      ruleForm: {
        receiverName: '',
        receiverMobile: '',
        receiverProvince: '',
        receiverCity: '',
        receiverArea: '',
        receiverAddress: '',
        defaultAddr: ''
      },
      addressList:[],
      switchValue: false,
      rules: {
        receiverName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        receiverMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
        ],
        receiverAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],

      }
    };
  },
  computed:{
    userId(){
      return this.$store.state.login.userId
    },
  },
  mounted() {
    this.getAddressList()
  },
  methods: {
    //得到发货地址
    onChangeProvince(data) {
      this.ruleForm.receiverProvince = data.value
    },
    onChangeCity(data) {
      this.ruleForm.receiverCity = data.value
    },
    onChangeArea(data) {
      this.ruleForm.receiverArea = data.value
    },
    //得到用户地址
    getAddressList(){
      selectAddress(this.userId).then( res => {
        console.log(res);
        this.addressList=res.data
        console.log(this.addressList);
      })
    },
    //保存地址
    submitForm(address) {
      if(this.switchValue==true){
        address.defaultAddr=1
      }else{
        address.defaultAddr=0
      }
      saveAddress(this.userId,address).then( res => {
        //console.log(res);
      })
    },

    delAddress(addressId){
      console.log(addressId);
      deleteAddress(addressId).then(res=>{
        for (let i=0; i<this.addressList.length; i++){
          if (this.addressList[i].id == addressId){
            this.addressList.splice(i, 1)
          }
        }
        console.log(res);
      })
    }

  }
}
</script>

<style scoped>

</style>

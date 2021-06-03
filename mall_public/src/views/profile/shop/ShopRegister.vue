<template>
  <v-card width="100% " height="100%">
  <div style="text-align: left; width: 700px; margin: 0 auto">

    <el-form ref="form" :model="form" label-width="100px"  @keyup.enter.native="getData()">
    <el-form-item label="店铺名称">
      <el-input v-model="form.shopName" placeholder="请输入店名"></el-input>
    </el-form-item>
    <el-form-item label="店铺主营">
      <el-input v-model="form.shopType" placeholder="请输入店铺主营类目"></el-input>
    </el-form-item>
    <el-form-item label="店主">
      <el-input v-model="form.shopOwner" placeholder="请输入店主姓名"></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="form.mobile" placeholder="请输入联系方式"></el-input>
    </el-form-item>
    <el-form-item label="店铺简介">
      <el-input type="textarea" v-model="form.shopNotice" placeholder="请描述一下店铺"></el-input>
    </el-form-item>
    <!--    <el-form-item label=店铺主图>-->
    <!--      <el-image style="width: 100px; height: 100px" :src="form.shopPhotos" fit="cover"></el-image>-->
    <!--      <el-input v-model="form.shopPhotos"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label=修改主图>-->
    <!--      <template>-->
    <!--        <el-upload-->
    <!--          class="upload-demo"-->
    <!--          drag-->
    <!--          action="/proxyApi/generator/file/importPhotos"-->
    <!--          :headers="myHeaders"-->
    <!--          multiple>-->
    <!--          <i class="el-icon-upload"></i>-->
    <!--          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
    <!--          <template #tip>-->
    <!--            <div class="el-upload__tip">-->
    <!--              只能上传 jpg/png 文件，且不超过 500kb-->
    <!--            </div>-->
    <!--          </template>-->
    <!--        </el-upload>-->
    <!--      </template>-->
    <!--    </el-form-item>-->
    <el-form-item label="店铺位置">
      <v-distpicker :province="form.province" :city="form.city" :area="form.area"
                    @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
      </v-distpicker>
    </el-form-item>
    <el-form-item label=具体地址>
      <el-input v-model="form.address" placeholder="请输入店铺具体地址"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button  @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
  </v-card>
</template>


<script>
import VDistpicker from 'v-distpicker'
import {shopRegister} from "../../../network/shop";
export default {
  components: { VDistpicker },
  name: "ShopRegister",
  data() {
    return {
      form:{},
    }
  },
  computed:{
    userId(){
      return this.$store.state.login.userId
    },
  },
  methods: {
    onChangeProvince(data) {
      this.form.province = data.value
    },
    onChangeCity(data) {
      this.form.city = data.value
    },
    onChangeArea(data) {
      this.form.area = data.value
    },
    onSubmit() {
      this.form.userId=this.userId;
      console.log(this.form);
      shopRegister(this.form).then((res) => {
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>

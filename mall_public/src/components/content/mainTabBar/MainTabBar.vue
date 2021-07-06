<template>
  <div class="main-tab-bar" >
    <el-row :gutter="40" >
      <el-col  class="nav-left"  :span="4"  >

        <el-button class="sign-in-btn" type="text"  @click="clickToPage('/home')">
          <img  src="https://nuc-gml-bishe-oss.oss-cn-beijing.aliyuncs.com/bishe/image/homelogo.jpg"
                style="width: 30px;hight:30px;position: absolute;top:12px; "

                alt="">
          <span style="margin-left: 35px"><b>欢迎来到农销网</b></span>
        </el-button>

      </el-col>
      <el-col :span="20">
        <div class="nav-right">
          <el-row :gutter="20">
            <!--搜索框-->
            <el-col :span="12" offset="7">
<!--              <el-input v-model="input" placeholder="请输入内容" class="search-input sec-tex">-->
<!--                <template #append>-->
<!--                  <el-button class="search-btn">-->
<!--                    <i class="el-icon-search"></i>-->
<!--                  </el-button>-->
<!--                </template>-->
<!--              </el-input>-->
            </el-col>


            <el-col :span="5">
              <!--登录后的导航-->
              <div class="login-navigate navigate" v-show="loginState">
                <el-tooltip class="item sec-tex" effect="dark" content="个人中心" placement="bottom">
                  <template #content>
                    <span class="tooltip-text">个人中心</span>
                  </template>
                  <el-button @click="clickToPage('/profile/item/order')">
                    <div class="block">
                      <i class="el-icon-user"></i>
                    </div>
                  </el-button>
                </el-tooltip>
                <span style="height: 35px;margin-top: 10.5px">个人中心</span>
                <el-tooltip class="item sec-tex" effect="dark" content="购物车" placement="bottom">
                  <template #content>
                    <span class="tooltip-text">购物车</span>
                  </template>
                  <el-button @click="clickToPage('/cart')">
                    <i class="el-icon-shopping-cart-1"></i>
                  </el-button>
                </el-tooltip>
                <span style="height: 35px;margin-top: 10.5px">购物车</span>

              </div>
              <!--未登录时的导航-->
              <div class="not-login-navigate navigate" v-show="!loginState">
                <el-button class="sign-in-btn" type="text" @click="logVisible">
                  登录
                </el-button>
                <el-button class="sign-in-btn" type="text" @click="registerVisible">
                  注册
                </el-button>
                <el-button class="sign-in-btn" type="text" @click="shopRegister">
                  供应商登录
                </el-button>
                <!--<el-tooltip class="item" effect="dark" content="购物车" placement="bottom">
                  <el-button>
                    <i class="el-icon-shopping-cart-1"></i>
                  </el-button>
                </el-tooltip>-->
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <login v-on:ForgetPwd="forgetPwd" v-on:LoginSuccess="afterLogin" ref="login"/>
    <register ref="register"/>
    <forget ref="forget"/>
  </div>
</template>
<script>

  import Login from "components/common/account/Login";
  import Register from "components/common/account/Register";
  import Forget from "components/common/account/Forget";

  let newVar = {
    name: "MainTabBar",
    components: {
      Login,
      Register,
      Forget
    },
    computed: {
      profile() {
        return this.$store.state.profile;
      },
      loginState() {
        return this.$store.state.login.loginState;
      }
    },
    data(){
      return {
        input: '',
        profileBar: {
          img: '',
          describe: '跳转'
        },
      }
    },
    methods: {
      //跳到后台登录页面
      shopRegister(){
        window.location.replace("http://localhost:8001/#/login")
      },
      logVisible() {
        console.log(this.$refs.login.visible);
        this.$refs.login.visible = true;

      },
      registerVisible() {
        this.$refs.register.visible = true;
      },
      forgetPwd() {
        this.$refs.login.visible = false;
        this.$refs.forget.visible = true;
      },
      afterLogin() {
        console.log("MainTabBar=>loginSuccess");
        this.loginSuccess = true;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },

      clickToPage(path) {
        if (this.$route.path==path) {
          return;
        }
        this.$router.push(path);
      },
    },
    created() {
      //category
      this.$store.dispatch("loadCategories");
      //
    },

  };
  export default newVar
</script>

<style scoped>
  .el-col {
    min-height: 1px
  }
  .logo img {
    height: 50px;
  }

  .nav-right,.nav-left {
    margin-top: 8px;
  }

  /deep/ .search-input input {
    height: 35px;
    border-radius: 33px 0 0 33px;
    font-size: 15px;
  }

  .search-btn {
    border-radius: 33px;
  }

  .navigate button {
    height: 35px;
    border-radius: 33px;
    font-weight: 700;
    border: #ffffff;
  }

  .not-login-navigate {
    display: flex;
    justify-content: center;

  }

  .login-navigate {
    display: flex;
  }

  [class*="el-icon-"], [class^=el-icon-] {
    font-weight: 600;
    font-size: large;
  }
  .tooltip-text {
    font-size: 15px;
  }

  .profile-btn {
    width: 100%;
    padding: 0;
    margin: 0;
  }
</style>

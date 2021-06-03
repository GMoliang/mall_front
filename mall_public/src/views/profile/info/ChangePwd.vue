<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/3
 -->

<template>
  <v-card width="100% " height="100%">
    <div id="change-pwd" style="text-align: left; width: 700px; margin: 0 auto">

        <div class="change-pwd" align="center">
            <el-form ref="pwdForm" :model="formData" :rules="pwdRules" label-width="80px" style="align:center">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input v-model="formData.oldPwd" type="password"/>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="formData.newPwd" type="password"/>
                </el-form-item>
                <el-form-item label="重复密码" prop="rePwd">
                    <el-input v-model="formData.rePwd" type="password"/>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="formData.mobile"/>
                </el-form-item>
                <el-form-item label="验证码" >
                    <div class="code-box">
                        <el-input class="code-input" v-model="formData.code"/>
                        <span>
                            <el-button class="code-btn" @click="" :disabled="codeDisabled">
                                {{codeMsg}}
                            </el-button>
                        </span>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit">确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
  </v-card>
</template>

<script>


    import {changePwd} from "../../../network/account";

    export default {
        name: "ChangePwd",
        data() {
            var validateOldPwd = (rule, value, callback) => {
                if (value==='') {
                    callback(new Error('请输入原密码'));
                }
            }
            var validateNewPwd =  (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formData.rePwd !== '') {
                        this.$refs.pwdForm.validateField('rePwd');
                    }
                    callback();
                }
            };
            var validateRePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formData.newPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validateMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return{
                codeMsg:'获取验证码',
                countdown: 6, //倒计时秒数
                codeDisabled: false,// 是否禁用按钮
                timer: null,
                formData: {
                    oldPwd: "",
                    newPwd: "",
                    rePwd: "",
                    mobile: "",
                    code: "",
                },
                pwdRules: {
                    oldPwd: [
                        { validator: validateOldPwd, trigger: 'blur' }
                    ],
                    newPws: [
                        { validator: validateNewPwd, trigger: 'blur' }
                    ],
                    rePwd: [
                        { validator: validateRePwd, trigger: 'blur' }
                    ],
                    mobile: [
                        { validator: validateMobile, trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            submit() {
              console.log(this.formData);
              changePwd(this.formData).then( res => {
                if(res.status=="success"){
                  alert("密码修改成功")
                }else{
                  alert("密码修改失败")
                }
              })
            }
        }
    }
</script>

<style scoped>

    .change-pwd {
        width: 400px;
        margin-top: 50px;
        margin-left: 100px;
        text-align:center
    }
    .code-box{
        display: flex;
    }
    .code-input{
        width: 150px;
    }
    .code-btn{
        margin-left: 20px;
        width: 130px;
    }

</style>

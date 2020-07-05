<template>
    <el-row>
        <el-col :span="17">
            <div class="login-wrap">
                <img src="../../../shared/components/assets/img/login-bg.jpg" />
            </div>
        </el-col>
        <el-col :span="7">
            <div class="ms-login">
            <div class="ms-title">到云后端管理系统</div>
            <el-form :model="query" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="loginToken">
                    <el-input v-model="query.loginToken" placeholder="用户名/邮箱/手机号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="passwordToken">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="query.passwordToken"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-button type="text" class="login-tips-forget" @click="forgetpassward()">忘记密码？</el-button>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">还没有账号？快来
                <el-button type="text" class="login-tips-register" @click="registernew()">立即注册</el-button>
                吧！</p>
                <p class="login-tips">PS：用户名admin是管理员，teacher是教师，其它是学生</p>
            </el-form>
        </div></el-col>
        
    </el-row>
</template>

<script>
import { UserLogin } from '../../../core/index_login';


export default {
    data: function() {
        return {
            query:{
                loginToken: '',
                passwordToken: '',
                loginType:1
            },
            test:[],
            rules: {
                loginToken: [{ required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                passwordToken: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },

        };
    },
    methods: {
        submitForm() {
            UserLogin(this.query).then(res => {
                this.test = res;
                console.log(this.test);
                localStorage.setItem('ms_token', this.test.data.token);
                this.$refs.login.validate(valid => {
                if (valid) {
                    if(this.test.message == "custome Error!!!"){
                        this.$message.error('登录异常，请联系管理员！');
                        return false;
                    }else if(this.test.data.user.status == 1 || this.test.data.user.status == 2){
                        if(this.test.data.person != null){
                            this.$message.success('登录成功');
                            localStorage.setItem('ms_username', this.test.data.person.peName);
                            localStorage.setItem('ms_userpeid', this.test.data.person.peId);
                            localStorage.setItem('ms_status', this.test.data.user.status);
                            localStorage.setItem('ms_uid', JSON.stringify(this.test.data.user));
                            this.$router.push('/');
                        }else{
                            this.$message.error('无效账户，请检查账号密码！');
                            return false;
                        }
                    } else {
                        this.$message.error('该系统只对教师和管理员开放！');
                        return false;
                    }
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
                });
            });         
        },
        registernew() {
            this.$router.push('/register');
        },
        forgetpassward(){
            this.$router.push('/forgetpassword');
        }
    },
};
</script>

<style scoped>
.login-wrap {
    width: 66%;
    float: left;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.ms-login {
    padding: 30px 30px 1000px 30px;
    background: #fff;
    width: 350px;
    display: absolute;
    height:100%;
}
.ms-title {
    width: 100%;
    line-height: 100px;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    color: #000000;   
}
.ms-content {
    padding: 30px 60px;
}

.login-btn {
    text-align: center;
    height: 50px;
    line-height: 50px;
    padding: 0;
    font-size: 20px;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #000000;
}
.login-tips-register {
    font-size: 12px;
    line-height: 30px;
    color: #004ef7;
}
.login-tips-forget {
    font-size: 12px;
    line-height: 30px;
    color: #004ef7;
    display: absolute;
    right:0px;
}
</style>
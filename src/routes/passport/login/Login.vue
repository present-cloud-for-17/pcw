<template>
    <el-row>
        <el-col :span="17">
            <div class="login-wrap">
                <img src="../../../shared/components/assets/img/login-bg.jpg" />
            </div>
        </el-col>
        <el-col :span="7">
            <div class="ms-login">
            <div class="ms-title">云到后端管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="loginToken">
                    <el-input v-model="param.loginToken" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="passwordToken">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.passwordToken"
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
import { subData } from '../../../core/index_login';
import { fetchData } from '../../../core/index';

export default {
    data: function() {
        return {
            param: {
                loginToken: '',
                passwordToken: '',
                token:''
            },
            query:{
                loginToken: 'admin',
                passwordToken: '123456',
                loginType:'web'
            },
            test:{},
            rules: {
                loginToken: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                passwordToken: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },

        };
    },
    methods: {
        submitForm() {
            //this.param.token ="0abcd01";
            // this.axios.get('api/userVerification/login.do',this.query)
            //     .then(res =>{
            //             console.log(res)
            //     });

            this.songData();
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.getData();
                    if(test.flag !== 0){
                        this.$message.success('登录成功');
                        localStorage.setItem('ms_username', this.param.loginToken);

                        //需要从后端获取一个初始token
                        localStorage.setItem('ms_token', this.param.token);
                        

                        this.$router.push('/');
                    } else{
                        this.$message.error('账号或密码错误');
                        console.log('error submit!!');
                        return false;
                    }
                    
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        registernew() {
                this.$router.push('/register');
        },
        forgetpassward(){
            this.$router.push('/forgetpassword');
        },
        getData() {
            fetchData(this.test).then(res => {
                console.log(res);
                this.test = res;
            });
        },
        songData() {
            subData(this.query).then(res => {
                console.log(res);
            });
        },
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
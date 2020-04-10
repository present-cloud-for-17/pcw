<template>
    <el-row>
        <el-col :span="17">
            <img src="../../../shared/components/assets/img/login-bg.jpg" />
        </el-col>
        <el-col :span="7">
            <div class="ms-login">
            <div class="ms-title">用户注册</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请确认密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">提交</el-button> 
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="comeback()">返回</el-button>
                </div>    
            </el-form>
        </div></el-col>
        
    </el-row>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                password: [{ required: true, message: '请确认密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('注册成功');
                    //localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/login');
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
        comeback(){
            this.$router.push('/login');
        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../shared/components/assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-login {
    padding: 30px 30px 1000px 30px;
    background: #fff;
    width: 350px;
    display: absolute;
    height:100%;
    left:0px;
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
</style>
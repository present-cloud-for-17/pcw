<template>
    <el-row>
        <el-col :span="17">
            <img src="../../../shared/components/assets/img/login-bg.jpg" />
        </el-col>
        <el-col :span="7">
            <div class="ms-login">
            <div class="ms-title">用户注册</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="uName">
                    <el-input v-model="param.uName" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="uNumber">
                    <el-input v-model="param.uNumber" placeholder="请输入账号">
                        <el-button slot="prepend" icon="el-icon-tickets"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="param.phone" placeholder="请输入手机号">
                        <el-button slot="prepend" icon="el-icon-mobile-phone"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="emaile">
                    <el-input v-model="param.emaile" placeholder="请输入邮箱">
                        <el-button slot="prepend" icon="el-icon-message"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">提交</el-button> 
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="comeback()">返回</el-button>
                </div>
                <p class="login-tips">PS：当前页面注册用户默认为教师角色，需要由管理员进行权限调整，且密码为123456</p>    
            </el-form>
        </div></el-col>
        
    </el-row>
</template>

<script>
import { UserRegister } from '../../../core/index_login';
export default {
    data: function() {
        return {
            param: {
                uName: '',
                uNumber:'',
                phone:'',
                emaile:'',
                status:2
            },
            rules: {
                uName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                uNumber: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
                { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }],
                emaile: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
                { pattern:/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: "请输入正确的邮箱", trigger: "blur"}],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var aData = new Date();
                    this.param.createDate = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
                    console.log(this.param);
                    if(this.param.phone)
                    UserRegister(this.param).then(res =>{    
                        console.log(res);
                        localStorage.setItem('ms_registeruid', JSON.stringify(res.data.user));
                        this.$message.success('注册成功');
                        this.$router.push('/registerfinal');
                        localStorage.setItem('ms_token', res.data.token);
                    })
                } else {
                    this.$message.error('请输入完整信息');
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
<template>
    <el-row>
        <el-col :span="17">
            <img src="../../../shared/components/assets/img/login-bg.jpg" />
        </el-col>
        <el-col :span="7">
            <div class="ms-login">
            <div class="ms-title">完善信息</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.peName" placeholder="请输入真实姓名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="usernumber">
                    <el-input v-model="param.grade" placeholder="请输入入学年份">
                        <el-button slot="prepend" icon="el-icon-tickets"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="useremail">
                    <el-input v-model="param.major" placeholder="请输入专业">
                        <el-button slot="prepend" icon="el-icon-message"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="userschool">
                        <el-select v-model="formn.unknown"  placeholder="请选择学校" class="handle-select mr10">
                            <el-option key="1" label="福州大学" value="福州大学"></el-option>
                            <el-option key="2" label="北京大学" value="北京大学"></el-option>
                            <el-option key="3" label="厦门大学" value="厦门大学"></el-option>       
                        </el-select>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">提交</el-button> 
                </div>
                <div class="login-btn">
                    <el-button type="danger" @click="comeback()">放弃</el-button>
                </div>
                <p class="login-tips">PS：完善个人信息以便能正常使用</p>    
            </el-form>
        </div></el-col>
        
    </el-row>
</template>

<script>
import { UserInfoRegister } from '../../../core/index_login';
import { SearchUserPData, ModifyUserData } from '../../../core/index_user';
import { ModifyStuData } from '../../../core/index_student';
export default {
    data: function() {
        return {
            param: {
                peName: '',
                peNumber:'unknown',
                classes:1,
                gender:1,
                sId:1,
                uId:0,
                grade:'',
                major:'',
                isTeacher:1
            },
            formn:{},
            params:{},
            tempsa:{
                uId:0,
            },
            rules: {
                uName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
                uNumber: [{ required: true, message: '请输入入学年份', trigger: 'blur' }],
                emaile: [{ required: true, message: '请输入专业', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.params = JSON.parse(localStorage.getItem('ms_registeruid'));
                    this.param.uId = this.params.uId;
                    this.param.peId = this.params.peId;
                    console.log(this.param);
                    ModifyStuData(this.param).then(res =>{ 
                        console.log(res);
                        this.$router.push('/login');
                        this.$message.success('完善信息成功');
                        localStorage.removeItem('ms_registeruid');
                        localStorage.removeItem('ms_token');
                    })
                } else {
                    this.$message.error('请输入完整信息');
                    return false;
                }
            });
        },
        comeback(){
            this.$router.push('/login');
            localStorage.removeItem('ms_registeruid');
            localStorage.removeItem('ms_token');
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
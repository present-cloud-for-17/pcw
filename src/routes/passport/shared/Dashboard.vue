<template>
    <div>
        <el-row :gutter="20">
            
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{level}}</div>
                                    <div>用户等级</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">3</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">3</div>
                                    <div>待办事项</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:383px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:260px;">
                    <div class="user-info">
                        <img src="../../../shared/components/assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div class="user-info-list-l">{{role}}</div>  
                        </div>
                    </div>

                    <div class="user-info-list-l">
                        本次登录时间：
                        <span>{{date}}</span>
                        <el-button 
                            type="success" 
                            size="mini"
                            class="handle-add mr10" 
                            @click="editMisible = true">密码修改</el-button>
                    </div>
                    <div class="user-info-list-l">
                        本次登录地点：
                        <span>福建福州</span>
                        <el-button 
                            type="info" 
                            size="mini"
                            class="handle-add mr10" 
                            @click="saveEditU">信息完善</el-button>
                    </div>
                    
                </el-card>

                 <el-card shadow="hover" style="height:223px;">
                    <div slot="header" class="clearfix">
                        <span>详细信息</span>
                    </div>

                    <div class="user-info-list-l">
                        上次登录时间：
                        <span>2020-03-15</span>
                    </div>
                    <div class="user-info-list-l">
                        上次登录地点：
                        <span>福建三明</span>
                    </div>

                    
                    <div class="user-info-list-l">
                        用户当前状态：
                        <span>正常</span>
                    </div>
                    <div class="user-info-list-l">
                        当前经验值：
                        <span>unknown</span>
                    </div>

                </el-card> 

            </el-col>

        </el-row>
        <!-- 修改密码弹出框 -->
        <el-dialog  title="修改密码" :visible.sync="editMisible" width="30%">
            <el-form ref="form" :model="formm" label-width="70px">
                
                <el-form-item label="新密码">
                    <el-input v-model="formm.passwordToken"></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editMisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditM">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情弹出框 -->
        <el-dialog title="详情" :visible.sync="detVisible" width="30%">
            <el-form ref="form" :model="formd" label-width="70px">
                
                <el-form-item label="姓名">
                    <el-input v-model="formd.peName"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="formd.major"></el-input>
                </el-form-item>
                <el-form-item label="年级">
                    <el-input v-model="formd.grade"></el-input>
                </el-form-item>
                <!-- <el-form-item label="教师">
                    <el-input v-model="formd.isTeacher"></el-input>
                </el-form-item> -->

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditU">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../../../layout/default/bus';
import { ModifyLoginData } from '../../../core/index_login';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            root:localStorage.getItem('ms_status'),
            detVisible:false,
            editMisible:false,
            formm:{},
            formd:{},
            params:{},
            todoList: [
                {
                    title: '今天要做完登录页',
                    status: true
                },
                {
                    title: '今天要做完编辑页',
                    status: false
                },
                {
                    title: '今天要做完权限页',
                    status: false
                },
            ]
            
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.root === '1' ? '管理员' :((this.root ==='2')?'教师':'学生');
        },
        level() {
            return this.root === '1' ? 'MAX' : '1';
        },
        date(){
            var aData = new Date();
            this.value = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
            return this.value; 
        }
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        //密码修改
        saveEditM(){
            this.params = JSON.parse(localStorage.getItem('ms_uid'));
            this.formm.uId = this.params.uId;
            this.editMisible = false;
            this.$message.success(`修改密码成功`);
            console.log(this.formm);
            ModifyLoginData(this.formm).then(res => {
                console.log(res);
            })

        },
        //信息修改
        saveEditU(){
            // this.params = JSON.parse(localStorage.getItem('ms_uid'));
            // this.formm.uId = this.params.uId;
            // this.detVisible = false;
            // this.$message.success(`修改成功`);
            // if(this.formd.sId == null) this.formd.sId = 1;
            // this.temp = this.formd;
            // console.log(this.formd);
            // ModifyStuData(this.temp).then(res => {
            //     console.log(res);
            // })
            // this.detVisible = false;
            this.$message.success(`该功能暂由管理员身份下的用户信息界面执行！`);
        },


    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}
.user-info-list-l {
    font-size: 17px;
    color: #999;
    line-height: 30px;
}
.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
.mr10 {
    margin-right: 10px;
    margin-left: 22px;
}

</style>

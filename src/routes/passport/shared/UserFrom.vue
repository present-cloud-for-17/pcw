<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
            <div class="handle-box">
                <!-- <el-button
                    type="primary"
                    icon="el-icon-delete"
                    @click="delAllSelection"
                >批量删除</el-button> -->

                <el-button 
                type="success" 
                icon="el-icon-plus" 
                class="handle-add mr10" 
                @click="handleAdd">新增用户</el-button>

                <!-- <el-select v-model="query.major" placeholder="专业" class="handle-select mr10">
                    <el-option key="1" label="教师" value="教师"></el-option>
                    <el-option key="2" label="学生" value="学生"></el-option>
                    <el-option key="3" label="未知" value="未知"></el-option>
                </el-select> -->
                <el-input v-model="query2.uName" placeholder="请输入完整用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-setting" @click="getData()">重置</el-button>
            </div>

            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!-- <el-table-column prop="uId" label="ID" width="55" align="center"></el-table-column> -->
                <el-table-column prop="uName" label="用户名" align="center"></el-table-column>

                <el-table-column label="账号"  width="100" align="center">
                    <template slot-scope="scope">{{scope.row.uNumber}}</template>
                </el-table-column>
                
                <el-table-column prop="phone" width="150" label="手机" align="center"></el-table-column>
                <el-table-column prop="emaile" label="邮箱" align="center"></el-table-column>
                <el-table-column prop="sId" label="学校" align="center">{{"福州大学"}}</el-table-column>
                <el-table-column prop="createDate" label="创建时间" width="150" align="center"></el-table-column>

                <el-table-column label="身份" width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.status===3?'success':(scope.row.status===2?'':'danger')"
                        >
                        <template v-if="scope.row.status == 1">{{'管理员'}}</template>
                        <template v-else-if="scope.row.status == 2">{{'教师'}}</template>
                        <template v-else-if="scope.row.status == 3">{{'学生'}}</template>
                        <template v-else>{{'修改中'}}</template> 
                        </el-tag>
                    </template>
                </el-table-column>
                
                <!-- <el-table-column prop="exp" label="密码" align="center">{{'123456'}}</el-table-column> -->
                <!-- <el-table-column prop="date" label="注册时间"></el-table-column> -->

                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="yellow"
                            @click="handleM(scope.$index, scope.row)"
                        >修改密码</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="green"
                            @click="handleDet(scope.$index, scope.row)"
                        >详情</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>

        </div>

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

        <!-- 编辑弹出框 -->
        <el-dialog  title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                
                <el-form-item label="用户名">
                    <el-input v-model="form.uName"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.uNumber"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.emaile"></el-input>
                </el-form-item>

                <!-- <el-form-item label="身份">
                        <el-radio-group v-model="form.status">
                            <el-radio label="教师"></el-radio>
                            <el-radio label="学生"></el-radio>
                            <el-radio label="管理员"></el-radio>
                        </el-radio-group>
                </el-form-item> -->
                <el-form-item label="身份" prop="status">
                    <el-select v-model="formp.status"  placeholder="请选择身份" class="handle-select mr10">
                        <el-option key="2" label="教师" value="教师"></el-option>
                        <el-option key="3" label="学生" value="学生"></el-option>
                        <el-option key="1" label="管理员" value="管理员"></el-option>       
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 新增弹出框 -->
        <el-dialog title="新增用户" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="用户名">
                        <el-input v-model="formadd.uName"></el-input>
                    </el-form-item>

                    <el-form-item label="账号">
                        <el-input v-model="formadd.uNumber"></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="真实姓名">
                        <el-input v-model="formadd.peName"></el-input>
                    </el-form-item> -->

                    <el-form-item label="邮箱">
                        <el-input v-model="formadd.emaile"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input v-model="formadd.phone"></el-input>
                    </el-form-item>

                    <el-form-item label="学校">
                        <el-select v-model="formn.unknown" placeholder="请选择学校" class="handle-select mr10">
                            <el-option key="1" label="福州大学" value="福州大学"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="身份">
                        <el-radio-group v-model="formadd.status">
                            <el-radio label="教师"></el-radio>
                            <el-radio label="学生"></el-radio>
                            <el-radio label="管理员"></el-radio>
                        </el-radio-group>
                    </el-form-item>

        
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd(tableData)">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { fetchUserData, ModifyUserData, AddUserData, AddUserPData, SearchUserData, DelUserData, SearchUserPData } from '../../../core/index_user';
import { ModifyStuData } from '../../../core/index_student';
import { ModifyLoginData } from '../../../core/index_login';
export default {
    name: 'userfrom',
    data() {
        return {
            query: {
            },
            query2:{
                uName:""
            },
            temp:{
            },
            tempsa:{
                peId:0,
            },
            formn:{},
            formp:{
                status:"教师"
            },
            temps:[],
            tableData: [],
            tableData2: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editVisible: false,
            detVisible:false,
            editMisible:false,
            pageTotal: 0,
            form: {},
            formd:{},
            formm:{},
            foemp:{
                uId:1,
                sId:1,
                classes:1,
                isTeacher:1,

            },
            formadd:{},
            idx: -1,
            id: -1
        }
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchUserData(this.query).then(res => {
                this.tableData = res;
                this.pageTotal = this.tableData.length;
            });
            this.query2.uName = "";
        },
        // 触发搜索按钮
        handleSearch() {
            const testN = this.query2.uName;
            this.tableData = this.tableData.filter(function(item){
                return item.uName == testN;
            })
        },
        handleM(index, row){
            this.idx = index;
            this.formm.uId = row.uId;
            console.log(row);
            this.editMisible = true;
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    if(this.tableData.length > 1){
                        this.temp = row;
                        DelUserData(this.temp).then(res => {
                            if(res == 1){
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }else{
                                this.$message.error('删除失败，请通知管理员！');
                            }
                            
                        })
                    }else{
                        this.$message.error('数据库内至少需要保留一条信息！');
                    }
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].uName + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 新增用户
        handleAdd() {
            this.addVisible = true;
        },

        //详情查看
        handleDet(index, row) {
            this.idx = index;
            this.tempsa.peId = row.peId;
            SearchUserPData(this.tempsa).then(res =>{
                this.formd = res;
            })
            this.detVisible = true;
        },
        //新增操作
        saveAdd(tableData,event) {
            this.addVisible = false;
            this.$message.success(`新增成功`);
            if(this.formadd.status == "管理员"){
                this.formadd.status = 1;
            }else if(this.formadd.status == "教师"){
                this.formadd.status = 2;
            }else if(this.formadd.status == "学生"){
                this.formadd.status = 3;
            }else{
                this.formadd.status = 0;
            }
            var aData = new Date();
            this.formadd.createDate = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate(); 
            //this.foemp.peName = this.formadd.peName;
            //delete this.formadd.peName;
            AddUserData(this.formadd);
            //AddUserPData(this.foemp);
            this.getData();

        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.tempsa.peId = row.peId;
            SearchUserPData(this.tempsa).then(res =>{
                this.formd = res;
            })
            if(this.form.status == 1) this.formp.status = "管理员";
            else if(this.form.status == 2) this.formp.status = "教师";
            else if(this.form.status == 3) this.formp.status = "学生";
            else this.formp.status = "未知";
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            if(this.formp.status == "管理员") this.form.status = 1;
            else if(this.formp.status == "教师") this.form.status = 2;
            else if(this.formp.status == "学生") this.form.status = 3;
            else this.form.status = 0;
            this.temp = this.form;
            ModifyUserData(this.temp);
            if(this.form.status == 2) this.formd.isTeacher = 1;
            else this.formd.isTeacher = 0;
            ModifyStuData(this.formd);
 
        },
        saveEditM() {
            this.editMisible = false;
            this.$message.success(`修改密码成功`);
            ModifyLoginData(this.formm).then(res => {
                console.log(res);
            })
        },
        //保存详情
        saveEditU() {
            this.editVisible = false;
            this.$message.success(`修改成功`);
            if(this.formd.sId == null) this.formd.sId = 1;
            this.temp = this.formd;
            ModifyStuData(this.temp);
            this.detVisible = false;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.green {
    color: #0f8005b2;
}
.yellow{
    color:#f8bf04b2;
}
</style>

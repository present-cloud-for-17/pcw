<template>
    <div id="limit">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 角色信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
            <div class="handle-box">
                <el-button 
                type="danger" 
                icon="el-icon-plus" 
                class="handle-add mr10" 
                @click="SaveModify">保存设置</el-button>
                <p class="login-tips">PS：建议一次只修改一条信息</p>

            </div>

            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="rName" label="角色名" width="200"></el-table-column>              

                <el-table-column prop="permissions" label="用户信息" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.permissions[0].status===1?'success':(scope.row.permissions[0].status===0?'danger':'')"
                        >{{scope.row.permissions[0].status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="b" label="班课信息" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.permissions[1].status===1?'success':(scope.row.permissions[1].status===0?'danger':'')"
                        >{{scope.row.permissions[1].status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="c" label="我的班课" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.permissions[2].status===1?'success':(scope.row.permissions[2].status===0?'danger':'')"
                        >{{scope.row.permissions[2].status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="d" label="个人消息" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.permissions[3].status===1?'success':(scope.row.permissions[3].status===0?'danger':'')"
                        >{{scope.row.permissions[3].status}}</el-tag>
                    </template>
                </el-table-column>
                
                
                
                <el-table-column prop="description" label="备注"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >权限修改</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog  title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                
                <el-form-item label="角色名">
                    <el-input v-model="form.rName"></el-input>
                </el-form-item>
                <el-form-item label="用户信息">
                    <el-switch v-model="quanxian.a"></el-switch>
                </el-form-item> 
                <el-form-item label="班课信息">
                    <el-switch v-model="quanxian.b"></el-switch>
                </el-form-item>
                <el-form-item label="我的班课">
                    <el-switch v-model="quanxian.c"></el-switch>
                </el-form-item>
                <el-form-item label="个人消息">
                    <el-switch v-model="quanxian.d"></el-switch>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 新增弹出框 -->
        <el-dialog id="limit" title="新增用户" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="formadd" label-width="70px">
                    <el-form-item label="新增角色">
                        <el-input v-model="formadd.rName"></el-input>
                    </el-form-item>

                    <el-form-item label="基础功能">
                        <el-switch v-model="formadd.a">{{true}}</el-switch>
                    </el-form-item> 
                    <el-form-item label="个人消息">
                        <el-switch v-model="formadd.b"></el-switch>
                    </el-form-item>
                    <el-form-item label="班课管理">
                        <el-switch v-model="formadd.c"></el-switch>
                    </el-form-item>
                    <el-form-item label="高级设置">
                        <el-switch v-model="formadd.d"></el-switch>
                    </el-form-item>
            
                    <el-form-item label="备注">
                        <el-input type="textarea" rows="5" v-model="formadd.description"></el-input>
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
import { fetchData, fetchRoleData, DelRoleData, ModifyRoleData, AddRoleData, fetchRolePData} from '../../../core/index_role';
export default {
    name: 'rolefrom',
    data() {
        return {
            query: {
                major: '',
                test:'',
                name: '',
                id:1,
                pageIndex: 1,
                pageSize: 10
            },
            quanxian:{
                a:true,
                b:true,
                c:true,
                d:true,
            },
            formmodify1:{
                rId:0,
                pId:1,
                status:0
            },
            formmodify2:{
                rId:0,
                pId:2,
                status:0
            },
            formmodify3:{
                rId:0,
                pId:3,
                status:0
            },
            formmodify4:{
                rId:0,
                pId:4,
                status:0
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {
                a:true,
                b:true,
                c:true,
                d:true,
            },
            tempt:{},
            formadd:{
                pName:[]
            },
            formaddtrue:{
                
            },
            sort1:{
                pId:1,
            },
            sort2:{
                pId:2,
            },
            sort3:{
                pId:3,
            },
            sort4:{
                pId:4,
            },
            w:0,
            idx: -1,
            id: -1
        }
    },
    computed:{
        sortNumbers:function(){
              return this.numbers.sort( sortNumbers);
          },

    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchRoleData(this.query).then(res => {
                this.tableData = res;
                this.pageTotal = this.tableData.length;   
                for(var x = 0; x < 4; x++){
                    if(this.tableData[0].permissions[x].pId == this.sort1.pId){
                        this.sort1 = this.tableData[0].permissions[x];
                    }
                    if(this.tableData[0].permissions[x].pId == this.sort2.pId){
                        this.sort2 = this.tableData[0].permissions[x];
                    }
                    if(this.tableData[0].permissions[x].pId == this.sort3.pId){
                        this.sort3 = this.tableData[0].permissions[x];
                    }
                    if(this.tableData[0].permissions[x].pId == this.sort4.pId){
                        this.sort4 = this.tableData[0].permissions[x];
                    }
                }
                this.tableData[0].permissions[0] = this.sort1;
                this.tableData[0].permissions[1] = this.sort2;
                this.tableData[0].permissions[2] = this.sort3;
                this.tableData[0].permissions[3] = this.sort4;

                for(var y = 0; y < 4; y++){
                    if(this.tableData[1].permissions[y].pId == this.sort1.pId){
                        this.sort1 = this.tableData[1].permissions[y];
                    }
                    if(this.tableData[1].permissions[y].pId == this.sort2.pId){
                        this.sort2 = this.tableData[1].permissions[y];
                    }
                    if(this.tableData[1].permissions[y].pId == this.sort3.pId){
                        this.sort3 = this.tableData[1].permissions[y];
                    }
                    if(this.tableData[1].permissions[y].pId == this.sort4.pId){
                        this.sort4 = this.tableData[1].permissions[y];
                    }
                }
                this.tableData[1].permissions[0] = this.sort1;
                this.tableData[1].permissions[1] = this.sort2;
                this.tableData[1].permissions[2] = this.sort3;
                this.tableData[1].permissions[3] = this.sort4;

                for(var z = 0; z < 4; z++){
                    if(this.tableData[2].permissions[z].pId == this.sort1.pId){
                        this.sort1 = this.tableData[2].permissions[z];
                    }
                    if(this.tableData[2].permissions[z].pId == this.sort2.pId){
                        this.sort2 = this.tableData[2].permissions[z];
                    }
                    if(this.tableData[2].permissions[z].pId == this.sort3.pId){
                        this.sort3 = this.tableData[2].permissions[z];
                    }
                    if(this.tableData[2].permissions[z].pId == this.sort4.pId){
                        this.sort4 = this.tableData[2].permissions[z];
                    }
                }
                this.tableData[2].permissions[0] = this.sort1;
                this.tableData[2].permissions[1] = this.sort2;
                this.tableData[2].permissions[2] = this.sort3;
                this.tableData[2].permissions[3] = this.sort4;
                //console.log(this.tableData);
                
            });


        },
        
        //保存角色更改
        SaveModify(){
            this.$confirm('重启后方能生效，确定要退出吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('保存成功');
                    this.$router.push('/login');
                })
                .catch(() => {});
        },
        IndentifypId(pId,status){
            if(status == 1){
                if(pId == 1) this.quanxian.a = true;
                if(pId == 2) this.quanxian.b = true;
                if(pId == 3) this.quanxian.c = true;
                if(pId == 4) this.quanxian.d = true;
            }else{
                if(pId == 1) this.quanxian.a = false;
                if(pId == 2) this.quanxian.b = false;
                if(pId == 3) this.quanxian.c = false;
                if(pId == 4) this.quanxian.d = false;
            }
        },
        
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                    DelRoleData(this.row).then(res => {
                            if(res == 1){
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }else{
                                this.$message.error('删除失败，请通知管理员！');
                            }
                            
                    })
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
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 新增用户
        handleAdd() {
            this.addVisible = true;
        },
        saveAdd(tableData,event) {
            this.addVisible = false;
            this.$message.success(`新增成功`);
            this.formaddtrue.rName = this.formadd.rName;
            this.formaddtrue.description = this.formadd.description;
            if(this.formadd.a == true){
                this.formadd.pName[this.w] = "基础功能";
                this.w++;
                this.formaddtrue.pName = "基础功能";
                AddRoleData(this.formaddtrue);
            }else{
                this.formadd.a = false;
            }
            if(this.formadd.b == true){
                this.formadd.pName[this.w] = "个人消息";
                this.w++;
                this.formaddtrue.pName = "个人消息";
                AddRoleData(this.formaddtrue);
            }else{
                this.formadd.b = false;
            }    
            if(this.formadd.c == true){
                this.formadd.pName[this.w] = "班课管理";
                this.w++;
                this.formaddtrue.pName = "班课管理";
                AddRoleData(this.formaddtrue);
            }else{
                this.formadd.c = false;
            } 
            if(this.formadd.d == true){
                this.formadd.pName[this.w] = "高级设置";
                this.w++
                this.formaddtrue.pName = "高级设置";
                AddRoleData(this.formaddtrue);
            }else{
                this.formadd.d = false;
            }
            this.tableData.push(this.formadd);
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.IndentifypId(this.form.permissions[0].pId,this.form.permissions[0].status);
            this.IndentifypId(this.form.permissions[1].pId,this.form.permissions[1].status);
            this.IndentifypId(this.form.permissions[2].pId,this.form.permissions[2].status);
            this.IndentifypId(this.form.permissions[3].pId,this.form.permissions[3].status);
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改成功`);
            this.formmodify1.rId = this.form.rId;
            this.formmodify2.rId = this.form.rId;
            this.formmodify3.rId = this.form.rId;
            this.formmodify4.rId = this.form.rId;
            if(this.quanxian.a == true){
                this.formmodify1.status = 1;
                ModifyRoleData(this.formmodify1);
            }else{
                this.formmodify1.status = 0;
                ModifyRoleData(this.formmodify1);
            }
            if(this.quanxian.b == true){
                this.formmodify2.status = 1;
                ModifyRoleData(this.formmodify2);
            }else{
                this.formmodify2.status = 0;
                ModifyRoleData(this.formmodify2);
            }    
            if(this.quanxian.c == true){
                this.formmodify3.status = 1;
                ModifyRoleData(this.formmodify3);
            }else{
                this.formmodify3.status = 0;
                ModifyRoleData(this.formmodify3);
            } 
            if(this.quanxian.d == true){
                this.formmodify4.status = 1;
                ModifyRoleData(this.formmodify4);
            }else{
                this.formmodify4.status = 0;
                ModifyRoleData(this.formmodify4);
            }
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
function sortNumbers(a,b){
    return a-b;
}
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

#limit{
    min-width:1000px;
}
</style>

<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 班课管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button 
                type="success" 
                icon="el-icon-plus" 
                class="handle-add mr10" 
                @click="handleAdd">申请班课</el-button>

                <el-input v-model="query.name" placeholder="请输入完整班课名称" clearable maxlength="2000" class="handle-input mr10"></el-input>
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
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="cNumber" width="110" label="编号" align="center"></el-table-column>

                <el-table-column prop="cName" width="200" label="班课名"></el-table-column>
                <el-table-column width="55" label="绩点">
                    <template slot-scope="scope">{{scope.row.credit}}</template>
                </el-table-column>
                
                <el-table-column prop="date" width="55" label="学时"></el-table-column>
                <el-table-column prop="dailyWeight" width="80" label="平时占比"></el-table-column>
                <el-table-column prop="finalWeight" width="80" label="期末占比"></el-table-column>

                <el-table-column prop="description" label="备注"></el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
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
        <el-dialog  title="详情" :visible.sync="detVisible">
            <div class="handle-box">
                <el-button 
                    type="info" 
                    icon="el-icon-plus" 
                    class="handle-add mr10" 
                    @click="handleAddN">新增成员</el-button>
            </div>

            <el-table
                :data="tableData2"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column prop="id" label="编号" width="55" align="center"></el-table-column> -->
                <el-table-column prop="peName"  label="学生姓名"></el-table-column>
                <el-table-column prop="peNumber" label="学生编号"></el-table-column>
                <el-table-column prop="peNumber" label="经验值"></el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">

                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>

                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDeleteS(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog  id="limit" title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                
                <el-form-item label="班课名">
                    <el-input v-model="form.cName"></el-input>
                </el-form-item>
                <el-form-item label="学时">
                    <el-input v-model="form.date"></el-input>
                </el-form-item>
                <el-form-item label="学分">
                    <el-input v-model="form.credit"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 新增弹出框 -->
        <el-dialog title="新增班课" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="班课名">
                        <el-input v-model="formadd.cName"></el-input>
                    </el-form-item>

                    <el-form-item label="班课ID">
                        <el-input v-model="formadd.cNumber"></el-input>
                    </el-form-item>

                    <el-form-item label="学分">
                        <el-input v-model="formadd.credit"></el-input>
                    </el-form-item>

                    <el-form-item label="学时">
                        <el-input v-model="formadd.date"></el-input>
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
import { fetchCourseData, ModifyCourseData, AddCourseData, SearchCourseData, DelCourseData, fetchCoursePData } from '../../../core/index_course';
import { fetchStuData, ModifyStuData, AddStuData, SearchStuData, DelStuData } from '../../../core/index_student';
export default {
    name: 'userfrom',
    data() {
        return {
            btnKeyCode: '',
            queryKeyCode: '',
            query: {
                major: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            query2: {
                major: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            query3:{},
            temps:{
                peId:''
            },
            tableData: [],
            tableData2: [],
            tableData3: [],
            tableData4:[],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editVisible: false,
            detVisible:false,
            pageTotal: 0,
            pageTotal2: 0,
            pageTotal3: 0,
            form: {},
            formadd: {id:6},
            oneinfo:{peId:0},
            idx: -1,
            id: -1
        }
    },

    created() {
        this.getData();
        //this.getData2();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchCourseData(this.query).then(res => {
                //console.log(res);    
                const tpeid = localStorage.getItem("ms_userpeid");
                this.tableData = res.filter(function(item){
                     return item.peId == tpeid;
                })
                this.pageTotal = this.tableData.length;
            });
            this.query.name="";
            
        },
        
        // 触发搜索按钮
        handleSearch() {
            const testN =this.query.name;
            this.tableData = this.tableData.filter(function(item){
                return item.cName === testN;
            })
        },

        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    if(this.tableData.length > 1){
                        delete row.peId;
                        this.temp = row;
                        console.log(this.temp);
                        DelCourseData(this.temp).then(res => {
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

        //删除学生
        handleDeleteS(index, row) {
            // 二次确认删除
            this.$confirm('确定要剔除该成员吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    if(this.tableData2.length > 1){
                        this.temps.peId = row.peId;
                        console.log(this.temps);
                        DelStuData(this.temps).then(res => {
                            if(res == 1){
                                this.$message.success('删除成功');
                                this.tableData2.splice(index, 1);
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
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },

        // 新增用户
        handleAdd() {
            this.addVisible = true;
        },
        handleAddN() {
            this.$message.error(`此功能暂由学生用户于移动端进行申请!`);
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        selectInfo(){
            for(var n = 0; n <= this.pageTotal3; n++){
                this.oneinfo.peId = this.tableData3[n].peId;
                console.log(this.oneinfo.peId);
                SearchStuData(this.oneinfo).then(res => {
                    console.log(res);
                    this.tableData2.push(res);
                })
            }
            this.pageTotal2 = this.tableData2.length;
        },
        //详情查看(每班学生)
        handleDet(index, row) {
            this.idx = index;
            this.form = row;
            this.detVisible = true;
            fetchStuData(this.query2).then(res => {
                // this.tableData2 = res.filter(function(item){
                //     return item.isTeacher == 0;
                // })

                fetchCoursePData(this.query).then(res2 => {
                    this.tableData3 = res2.filter(function(item){
                        return item.cId == row.cId;
                    })
                    this.pageTotal3 = this.tableData3.length;
                    this.oneinfo.peId = this.tableData3[0].peId;
                    SearchStuData(this.oneinfo).then(res => {
                        if(res.isTeacher == 0){
                            this.tableData2.push(res);
                            console.log(this.tableData2);
                            this.pageTotal2 = 1;
                        }
                    })
                })
                
                   
                
                //console.log(this.tableData2);
                
            });


        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        //保存新增
        saveAdd(tableData,event){
            this.addVisible = false;
            this.$message.success(`新增成功`);
            this.formadd.term = "2020-12";
            this.formadd.peId = localStorage.getItem('ms_userpeid');
            this.formadd.dailyWeight = 0.5;
            this.formadd.finalWeight = 0.5;
            AddCourseData(this.formadd);
            this.formadd.peName = localStorage.getItem('ms_username');
            console.log(this.formadd);
            this.tableData.push(this.formadd);
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
.green {
    color: #0f8005b2;
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
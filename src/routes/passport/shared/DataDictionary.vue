<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 数据字典
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button 
                type="warning" 
                icon="el-icon-plus" 
                class="handle-add mr10" 
                @click="handleAdd">新增字典</el-button>
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
                <el-table-column prop="dId" label="编号" width="55" align="center"></el-table-column>

                <el-table-column prop="chineseName" align="center" label="中文名"></el-table-column>
                <el-table-column prop="englishName" align="center" label="英文名"></el-table-column>


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
        <el-dialog  title="详情" :visible.sync="detVisible" width="50%">
            <div class="handle-box">
                <el-button 
                    type="primary" 
                    icon="el-icon-plus" 
                    class="handle-add mr10" 
                    @click="handleAddT">新增详情</el-button>
            </div>

            <el-table
                :data="tableData3"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="ddId" label="编号" width="55" align="center"></el-table-column>
                <el-table-column prop="dId" label="所属" width="55" align="center"></el-table-column>
                <el-table-column prop="ddName"  label="名称"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">

                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit2(scope.$index, scope.row)"
                        >编辑名称</el-button>

                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete2(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detVisible = false">取 消</el-button>
                <el-button type="primary" @click="detVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情新增弹出框 -->
        <el-dialog  title="新增详情" :visible.sync="addVisible2" width="30%">
            <el-form ref="form" :model="formaddd" label-width="70px">
                
                <el-form-item label="名称">
                    <el-input v-model="formaddd.ddName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="saveADDD">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情编辑弹出框 -->
        <el-dialog  title="编辑名称" :visible.sync="editVisible2" width="30%">
            <el-form ref="form" :model="formdet" label-width="70px">
                
                <el-form-item label="名称">
                    <el-input v-model="formdet.ddName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="saveEditD">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog  id="limit" title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                
                <el-form-item label="中文名">
                    <el-input v-model="form.chineseName"></el-input>
                </el-form-item>
                <el-form-item label="英文名">
                    <el-input v-model="form.englishName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 新增弹出框 -->
        <el-dialog id="limit" title="新增字典" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="formadd" label-width="70px">  
                <el-form-item label="中文名">
                    <el-input v-model="formadd.chineseName"></el-input>
                </el-form-item>

                <el-form-item label="英文名">
                    <el-input v-model="formadd.englishName"></el-input>
                </el-form-item>   

                <el-form-item label="字典项1">
                    <el-input v-model="formaddetail.ddName"></el-input>
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
import { fetchDictData, fetchDictDetaData, ModifyDictData, AddDictData, SearchDictData, DelDictData, fetchDictSubData, ModifyDictDeData, AddDictSubData, DelDictDeData } from '../../../core/index_dictionary';
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
            tableData: [],
            tableData2: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            addVisible2: false,
            editVisible: false,
            editVisible2: false,
            detVisible:false,
            pageTotal: 0,
            pageTotal2: 0,
            tableData3:[],
            form: {},
            formdet:{},
            formadd: {},
            formaddetail:{
                dId:'',
                ddName:''
            },
            formaddd: {},
            idx: -1,
            id: -1,
            decId:0
        }
    },

    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchDictData(this.query).then(res => {
                this.tableData = res;
                this.pageTotal = res.length;
                this.formaddetail.dId = this.tableData[0].dId + 1;
                console.log(this.formaddetail.dId);
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.tableData = [{
                "id":1,
                "username":"job_status",
                "password":"测试数据",
                "state": "true",
            }]
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除该字典吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    fetchDictSubData(row).then(res => {
                        if(res.length != 0){
                            this.$message.error('无法删除非空数据字典！');
                        }else{
                            this.form = row;
                            DelDictData(this.form);
                            this.getData();
                            this.$message.success('字典删除成功！');
                    }     
                    })
                                
                })
                .catch(() => {});
        },
        //删除详情操作
        handleDelete2(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除该字典项吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    //this.$message.error('无法删除默认字典项！');
                    this.$message.success('删除成功');
                    this.detVisible = false;
                    DelDictDeData(row);
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
        //新增详情
        handleAddT() {
            this.addVisible2 = true;
        },
        // 编辑操作
        handleEdit2(index, row) {
            this.idx = index;
            this.formdet = row;
            this.editVisible2 = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        //详情查看
        handleDet(index, row) {
            this.idx = index;
            fetchDictSubData(row).then(res => {
                this.tableData3 = res;
            })
            this.detVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
            ModifyDictData(this.form);

        },
        saveEditD() {
            this.editVisible2 = false;
            this.$message.success(`修改成功`);
            this.$set(this.tableData, this.idx, this.form);
            ModifyDictDeData(this.formdet);
        },

        //保存新增
        saveAdd(tableData,event){
            this.addVisible = false;
            this.$message.success(`新增字典成功`);
            AddDictData(this.formadd);
            this.getData();
            console.log(this.formaddetail);
            AddDictSubData(this.formaddetail);
            this.getData();
        },
        //新增字典项
        saveADDD(){
            this.formaddd.dId = this.tableData3[0].dId;//因为索引一致
            this.$message.success(`新增字典项成功`);
            console.log(this.formaddd);
            AddDictSubData(this.formaddd);
            this.getData();

            this.detVisible = false;
            this.addVisible2 = false;
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
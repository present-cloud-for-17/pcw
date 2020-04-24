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
                type="success" 
                icon="el-icon-plus" 
                class="handle-add mr10" 
                @click="handleAdd">新增字典</el-button>

                <el-input v-model="query.name" placeholder="字典名称" clearable maxlength="2000" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>

            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                v-loading="TableLoading"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="编号" width="55" align="center"></el-table-column>

                <el-table-column prop="username" width="200" label="名称"></el-table-column>

                <el-table-column label="是否启动" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='是'?'success':(scope.row.state==='false'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="password" label="备注"></el-table-column>


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
                    @click="handleAdd">新增详情</el-button>
            </div>

            <el-table
                :data="tableData2"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="id" label="编号" width="55" align="center"></el-table-column>
                <el-table-column prop="name"  label="名称"></el-table-column>
                <el-table-column prop="password" label="备注"></el-table-column>


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
                            @click="handleDelete(scope.$index, scope.row)"
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
                
                <el-form-item label="字典名称">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.password"></el-input>
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
                <el-form-item label="字典名称">
                    <el-input v-model="formadd.username"></el-input>
                </el-form-item>
                
                <el-form-item label="是否启用">
                    <el-switch v-model="formadd.state"></el-switch>
                </el-form-item>
            
                <el-form-item label="备注">
                    <el-input type="textarea" rows="5" v-model="formadd.password"></el-input>
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
import { fetchData } from '../../../core/index_unknown';
import { fetchData2 } from '../../../core/index';
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
            editVisible: false,
            detVisible:false,
            pageTotal: 0,
            pageTotal2: 0,
            form: {},
            formadd: {id:6},
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
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 获取 easy-mock 的模拟数据
        getData2() {
            fetchData2(this.query).then(res => {
                console.log(res);
                this.tableData2 = res.list;
                this.pageTotal2 = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.tableData = [{
                "id":1,
                "username":"job_status",
                "password":"测试数据",
                "state": "true",
                "level":3
            }]
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
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        //详情查看
        handleDet(index, row) {
            this.idx = index;
            this.form = row;
            this.detVisible = true;
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
            this.formadd.id +=1;
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
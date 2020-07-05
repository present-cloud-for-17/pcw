<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 参数设置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="paName" label="参数名" align="center"></el-table-column>
                <el-table-column prop="description" label="描述" align="center"></el-table-column>

                <el-table-column label="值"  width="100" align="center">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                </el-table-column>
                

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
                        >停用</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                        <el-button icon="el-icon-download" background class="handle-add mr10" type="primary" @click="saveset">保存设置</el-button>
                        <el-button icon="el-icon-plus" type="danger" @click="handleAdd">新增参数</el-button>
            </div>

        </div>

        <!-- 编辑弹出框 -->
        <el-dialog  id="limit" title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="描述">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="值">
                    <el-input v-model="form.value"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 新增弹出框 -->
        <el-dialog id="limit" title="新增参数" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="参数名">
                        <el-input v-model="formadd.paName"></el-input>
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input v-model="formadd.description"></el-input>
                    </el-form-item>

                    <el-form-item label="值">
                        <el-input v-model="formadd.value"></el-input>
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
import { fetchParData, ModifyParData, AddParData, SearchParData, DelParData } from '../../../core/index_parameter';

export default {
    name: 'setparameter',
    data() {
        return {
            query: {
            },
            temp:{
            },
            tempsa:{
                uId:38,
            },
            temps:[],
            tableData: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {},
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
            fetchParData(this.query).then(res => {
                this.tableData = res;
                console.log(res);
                this.pageTotal = this.tableData.length;
            });
            
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要停用吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    if(this.tableData.length > 1){
                        this.temp = row;
                        DelParData(this.temp).then(res => {
                            if(res == 1){
                                this.$message.error('已停用');
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

        //新增操作
        saveAdd(tableData,event) {
            this.addVisible = false;
            this.$message.success(`新增成功`);
            AddParData(this.formadd);
            this.tableData.push(this.formadd);
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        saveset(){
            this.$message.success(`保存成功`);
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.temp = this.form;
            ModifyParData(this.temp);
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

#limit{
    min-width:1000px;
}
</style>

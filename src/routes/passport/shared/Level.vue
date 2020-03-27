<template>
    <div id="limit">  
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> 等级设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <el-row :gutter="20">
            
            <el-col :span="9">

                <div class="container">
                    <div class="handle-box">

                        <el-button 
                        type="success" 
                        icon="el-icon-plus" 
                        class="handle-add mr10" 
                        @click="handleAdd">新增等级</el-button>

               
                    </div>

                    <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                    >

                    <el-table-column prop="id" width="55" align="center" label="等级"></el-table-column>
                    <el-table-column prop="exp" align="center" label="阈值"></el-table-column>
                    

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
                </div>
            </el-col>
            
            <el-col :span="15">
                <div class="containert">
                    
                </div>
            </el-col>
        </el-row>    
    </div>
        
</template>

<script>
    import { fetchData } from '../../../core/index2';
    export default {
        name: 'levelpage',
        data() {
            return {
                query: {
                    major: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                pageTotal: 0,
                form: {},
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
                fetchData(this.query).then(res => {
                    console.log(res);
                    this.tableData = res.list;
                    this.pageTotal = res.pageTotal || 50;
                });
            }
        }
    }

</script>

<style scoped>
    .form-box {
        width: 400px;
    }

    .form-box .line {
        text-align: center;
    }

    .red {
        color: #ff0000;
    }
    .el-time-panel__content::after,
    .el-time-panel__content::before {
        margin-top: -7px;
    }

    .el-time-spinner__wrapper .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default) {
        padding-bottom: 0;
    }

    .containert {
        padding: 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        display: flex;
        direction:vertical;
    }

    .handle-box {
        margin-bottom: 20px;
    }
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 120%;
        height: 100%;
        
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        margin-right: 160px;
        font-weight: bolder;
        color: #f02d2d;
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
        
    }
    
</style>

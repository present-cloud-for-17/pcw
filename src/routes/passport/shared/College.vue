<template>
<div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 院校信息
                </el-breadcrumb-item>
            </el-breadcrumb>
    </div>

    <div class="container">
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="length"
            border
            class="table"
            ref="multipleTable"
            default-expand-all
            :tree-props="{children: 'colleges', hasChildren: 'hasChildren'}">
            
            
            <el-table-column
                prop="sName"
                label="学校名"
                >
            </el-table-column>
            <el-table-column
                prop="college"
                label="学院名"
                >
            </el-table-column>
            <el-table-column
                prop="major"
                label="专业名"
                >
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
                        >删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
    </div>
</div>
</template>
        
   

<script>
import { fetchCollData, ModifyCollData, AddCollData, SearchCollData, DelCollData } from '../../../core/index_college';
export default {
    data() {
      return {
        query:{},
        tableData:[], 
      }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetchCollData(this.query).then(res => {
                this.tableData = res;
                console.log(res);
                this.pageTotal = this.tableData.length;
            });           
        },
      
    },
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


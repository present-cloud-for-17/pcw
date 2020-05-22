<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 参数设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`相关参数(${parameter.length})`" name="first">
                    <el-table :data="parameter" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title" style="width: 20%">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" width="700"></el-table-column>
                        <el-table-column prop="date" width="200"></el-table-column>
                        <!-- <el-table-column v-model="parameter.date"  prop="date" width="180"></el-table-column> -->
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">修改数值</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button icon="el-icon-download" type="primary" @click="saveset()">保存设置</el-button>
                        <el-button icon="el-icon-plus" type="success" @click="addset">新增参数</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`签到规则(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`后续功能(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>

         <!-- 编辑弹出框 -->
        <el-dialog  title="修改参数" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                
                <el-form-item label="参数值">
                    <el-input v-model="form.exp"></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog  title="新增参数" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                
                <el-form-item label="参数名">
                    <el-input v-model="form.exp"></el-input>
                </el-form-item>
                <el-form-item label="参数值">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.b"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { fetchData } from '../../../core/index';
    export default {
        name: 'role',
        data() {
            return {
                message: 'first',
                showHeader: false,
                editVisible:false,
                addVisible:false,
                form:{},
                parameter: [{
                    remark:'单次签到可获得的经验值',
                    date: '当前数值：1',
                    title: '【签到经验值】',
                },
                {
                    remark:'开发中',
                    date: '当前数值：100',
                    title: '【后续功能】',
                }],
                read: [{
                    date: '2020-03-15 20:00:00',
                    title: '【系统通知】该系统将于3月18日上午8点到12点进行升级维护'
                }],
                recycle: [{
                    date: '2020-03-15 20:00:00',
                    title: '老板喊你今晚加班啦！'
                }],

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
            },
            handleRead(index) {
                this.editVisible = true;
            },
            addset(index) {
                this.addVisible = true;
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            saveEdit(){
                this.parameter[0].date="当前数值：100";
                this.editVisible = false;
            },
            saveAdd(){
                this.parameter.push({date:"当前数值：1",
                                    title:"【测试数据】",
                                    remark:"无"});
                this.addVisible = false;
            },
            saveset() {
                this.$message.success('保存成功');
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            }
        },
        computed: {
            parameterNum(){
                return this.parameter.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
#limit{
    min-width:1000px;
}
</style>


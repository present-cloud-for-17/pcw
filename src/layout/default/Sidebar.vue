<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items ">

                <template v-if="root_test != item.unknown && item.unknown !='all'"></template>

                <template v-else-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>

                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>

            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../default/bus';
import { fetchRoleData } from '../../core/index_role';
export default {
    name: 'sidebar',
    data() {
        return {
            tableData:[],
            name: localStorage.getItem('ms_username'),
            root_test:localStorage.getItem('ms_status'),
            collapse: false,
            n:0,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页',
                    unknown:'all'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: 'user',
                    title: '用户信息',
                    unknown:'all'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'class',
                    title: '班课信息',
                    unknown:'all',
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'level',
                    title: '我的班课',
                    unknown:'all',
                },
                {
                    icon: 'el-icon-s-order',
                    index: 'tabs',
                    title: '个人消息',
                    unknown:'all',
                },
                {
                    icon: 'el-icon-s-order',
                    index: 'role',
                    title: '角色信息',
                    unknown:'1'
                },
                {
                    icon: 'el-icon-document',
                    index: 'college',
                    title: '院校信息',
                    unknown:'no',
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    unknown:'no',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '8',
                    title: '高级权限',
                    unknown:'1',
                    subs: [
                        {
                            index:'set',
                            title:'参数设置'
                        },
                        {
                            index: 'datadictionary',
                            title: '数据字典'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '使用说明',
                    unknown:'no'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        fetchRoleData(this.query).then(res => {
            this.tableData = res;
            if(this.root_test == '1') this.n = 2;
            else if(this.root_test == '2') this.n = 1;
            else{
                this.$router.push('/login');
            }
            this.pageTotal = this.tableData.length;
            for(var x = 1, y = 0; y < 4; y++){
                x = 0 + this.tableData[this.n].permissions[y].pId;
                if(this.tableData[this.n].permissions[y].status == 0){
                    this.items[x].unknown = 'no';
                }else{
                    this.items[x].unknown = 'all';
                }
            }
        });
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>

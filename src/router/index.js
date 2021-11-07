// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */


/****************************教务管理*****************************/
// 教师管理
import Teacher from '@/views/educational/Teacher';
// 学生管理
import Student from '@/views/educational/Student';
// 组织管理
import Organization from '@/views/educational/Organization';
// 教学统计
import Statistics from '@/views/educational/Statistics';

/****************************教学管理*****************************/
// 实训管理
import Train from '@/views/teaching/Train';
// 教案管理
import TeachingPlan from '@/views/teaching/TeachingPlan';
// 考核管理
import Assessment from '@/views/teaching/Assessment';

/****************************资料中心*****************************/
// 课件资源库
import Courseware from '@/views/resources/Courseware';
// 媒体资源库
import Media from '@/views/resources/Media';
// 文献资源库
import Literature from '@/views/resources/Literature';


/****************************系统管理*****************************/
// 用户管理
import user from '@/views/system/user';
// 菜单管理
import Module from '@/views/system/Module';
// 角色管理
import Role from '@/views/system/Role';
// 公司管理
import Dept from '@/views/system/Dept';
// 系统环境变量
import Variable from '@/views/system/Variable';
// 权限管理
import Permission from '@/views/system/Permission';


/**
 * 数据监控
 */
// 监控查询
import druidLogin from '@/views/druid/login';

// 图表界面
import statistics from '@/views/charts/statistics';

// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/educational/Teacher',
            name: '教师管理',
            component: Teacher,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/educational/Student',
            name: '学生管理',
            component: Student,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/educational/Organization',
            name: '组织管理',
            component: Organization,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/educational/Statistics',
            name: '教学统计',
            component: Statistics,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/teaching/Train',
            name: '实训管理',
            component: Train,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/teaching/TeachingPlan',
            name: '教案管理',
            component: TeachingPlan,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/teaching/Assessment',
            name: '考核管理',
            component: Assessment,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/resources/Courseware',
            name: '课件资源库',
            component: Courseware,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/resources/Media',
            name: '媒体资源库',
            component: Media,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/resources/Literature',
            name: '文献资源库',
            component: Literature,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/user',
            name: '用户管理',
            component: user,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Module',
            name: '菜单管理',
            component: Module,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Role',
            name: '角色管理',
            component: Role,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Dept',
            name: '公司管理',
            component: Dept,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Variable',
            name: '系统环境变量',
            component: Variable,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Permission',
            name: '权限管理',
            component: Permission,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/druid/login',
            name: '监控查询',
            component: druidLogin,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/charts/statistics',
            name: '数据可视化',
            component: statistics,
            meta: {
                requireAuth: true
            }
        }]
    }]
})
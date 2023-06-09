import { createRouter, createWebHistory } from "vue-router";


import index from '../views/index.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import submitRepair from '../views/submitRepair.vue'
import repairList from '../views/repairList.vue'
import work from '../views/work.vue'
import repair from '../views/repair.vue'
import audit from '../views/audit.vue'

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: 'index',
    component: index,
    children: [
        {
          path: 'submitRepair',
          component: submitRepair,
        },
        {
          path: 'repairList',
          component: repairList,
        },
        {
            path: 'work',
            component: work,
        },
        {
            path: 'repair',
            component: repair,
        },
        {
          path: 'audit',
          component: audit,
        }
    ]
  },
  {
    path: "/login",
    name: 'login',
    component: login,
  },
  {
    path: "/register",
    name: 'register',
    component: register,
  }  
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
    var addr = localStorage.getItem('privateKey');
    if (addr == null && to.name !== 'login' && to.name !== 'register') {
      // 将用户重定向到登录页面
      return { name: 'login' }
    }
  })
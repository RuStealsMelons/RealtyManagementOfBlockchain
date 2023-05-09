<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

let role = localStorage.getItem("role");

const navList = ref([
    { title: "上报维修", router: "/index/submitRepair", see: "Homeowner|PropertyManager", img: "https://pic1.afdiancdn.com/static/img/category/all@2x.png?imageView2/1" },
    { title: "维修公示", router: "/index/repairList", see: "Homeowner|PropertyManager", img: "https://pic1.afdiancdn.com/user/27f7cea2370d11e8ae8852540025c377/common/fd687405f66425e6308ec683b3fe22a3_w500_h500_s59.jpg?imageView2/1" },
    { title: "工作分配", router: "/index/work", see: "PropertyManager", img: "https://pic1.afdiancdn.com/user/27f7cea2370d11e8ae8852540025c377/common/1a4490c31e402d1f5e95109d0f7cb85e_w500_h500_s33.jpg?imageView2/1" },
    { title: "维修管理", router: "/index/repair", see: "MaintenancePersonnel", img: "https://pic1.afdiancdn.com/user/27f7cea2370d11e8ae8852540025c377/common/1a4490c31e402d1f5e95109d0f7cb85e_w500_h500_s33.jpg?imageView2/1" },
    { title: "维修审核", router: "/index/audit", see: "PropertyManager", img: "https://pic1.afdiancdn.com/user/27f7cea2370d11e8ae8852540025c377/common/1a4490c31e402d1f5e95109d0f7cb85e_w500_h500_s33.jpg?imageView2/1" }
])

const open = () => {
  ElMessageBox({
    title: '',
    message: '确定要退出登录吗？',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose:(action, instance, done) => {
     if(action === 'confirm'){
        console.log(123)
        localStorage.setItem("role", null)
        router.push("/login")
        done()
     }else{
        console.log(456)
        done()
        }
    }
  })
}

</script>

<template>
    <div class="bg">
        <div class="nr">
            <div class="navs">
                <h1 style="font-size: 30px; margin-top: 20px;">功能分类</h1>
                <div v-for="(value, index) in navList" :key="index" style="width: 100%">
                    <el-button v-if="value.see.indexOf(role) != -1" style="height: 60px;width: 100%" @click="router.push(value.router)" size="large" class="nav" plain>
                        <img :src="value.img" style="height: 40px;" />
                        {{ value.title }}
                    </el-button>
                </div>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <div class="loginOut">
        <el-button type="info" plain @click="open">登出</el-button>
    </div>
</template>

<style scoped>
.bg {
    background-color: #f7f7f7;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
}

.nr {
    width: 1000px;
    /* height: 800px; */
    display: flex;
}

.navs {
    width: 30%;
    height: 100px;
    display: flex;
    flex-direction: column;
}

.main {
    width: 70%;
    height: 100px;
    margin-top: 60px;
    padding: 20px;
}

.el-button+.el-button {
    margin-left: 0px;
}

.nav {
    margin-top: 20px;
}

.loginOut{
    position: absolute;
    right: 50px;
    top:20px;
}
</style>
<script setup>
import {ref} from 'vue'
import PMS from '../api/PropertyManagementSystem'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = useRouter()
const privateKey = ref("");


const loginBtnClick = async () => {
    let data = await PMS.login(privateKey.value)
    if(data.length == 0 || data[0] == "找不到当前用户"){
        ElMessage.error("登录失败！");
        return;
    }
    localStorage["role"]=data[0];
    localStorage["privateKey"]=privateKey.value;
    router.push("/index")
    ElMessage.success("登录成功！");
}

const toRegister = () => {
    
    router.push("register")
}
</script>

<template>
    <div class="bg">
        <el-card class="box-card">
            <template #header>
            <div class="card-header">
                <span>登录</span>
            </div>
            </template>
            <div class="btn-div">
                <el-input
                v-model="privateKey"
                type="password"
                placeholder="填入私钥地址"
                show-password
                class="login-input"
            >
            
            </el-input>
            <el-button v-if="privateKey==''" class="choose" slot="suffix" @click="toRegister" >获取私钥</el-button>
            </div>
            <div style="height: 20px;"></div>
            <el-button class="login" type="primary" @click="loginBtnClick">登录</el-button>
        </el-card>
    </div>
    
</template>

<style scoped>
.bg{
    width: 100%;
    height: 100%;
    background-image: url('../assets/bg.png');
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.box-card{
    width: 600px;
}
.card-header{
    text-align: center;
}
.login{
    width: 100%;
}
.choose{
    position:absolute;
    right: 10px;
    border: 1px solid transparent;
    height: 25px;
    top: 4px;
}
.btn-div{
    position: relative;
}
</style>
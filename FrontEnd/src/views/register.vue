<script setup>
import {reactive} from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus'
import PMS from '../api/PropertyManagementSystem'
import { useRouter } from 'vue-router';
// import { router } from '../router';

const router = useRouter()
const registerFrom = reactive({ role: "业主", id: "", name: "", contactNumber: "", other: ""})

const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

const fetchKey = async () => {
    let {data} = await axios.get(`/api5004/WeBASE-Sign/user/newUser?appId=${1}&encryptType=0&returnPrivateKey=true&signUserId=${generateRandomString(12)}`)
    registerFrom.id = data.data.address
}

const registerBtnClick = async () => {
    // console.log(registerFrom)
    if(registerFrom.role == "" || registerFrom.id == "" || registerFrom.name == "" || registerFrom.contactNumber == ""){
        ElMessage.warning("信息不完整！");
        return;
    }
    let res ;
    switch(registerFrom.role) {
        case "业主": res = await PMS.registerHomeowner(registerFrom.id, registerFrom.name, registerFrom.other, registerFrom.contactNumber); break;
        case "物业": res = await PMS.registerPropertyManager(registerFrom.id, registerFrom.name, registerFrom.contactNumber,  registerFrom.other); break;
        case "维修人员": res = await PMS.registerMaintenancePersonnel(registerFrom.id, registerFrom.name, registerFrom.other, registerFrom.contactNumber); break;
        default: res = {statusOK: true};
    }
    if(res.statusOK){
        ElMessage.success("注册完成！");
    }else{
        ElMessage.error("注册失败！");
        return;
    }
    router.push("login")
}

</script>

<template>
    <div class="bg">
        <el-card class="box-card">
            <template #header>
            <div class="card-header">
                <span>注册</span>
            </div>
            </template>
            <div class="form-line">
                <span  class="form-label">角色：</span>  
                <el-radio-group v-model="registerFrom.role" size="large">
                    <el-radio-button label="业主" />
                    <el-radio-button label="物业" />
                    <el-radio-button label="维修人员" />
                </el-radio-group>
            </div>
            <div class="form-line">
                <span class="form-label">私钥：</span>  
                <el-input class="form-context" disabled v-model="registerFrom.id" />
                <el-button class="form-btn" @click="fetchKey" v-if="registerFrom.id==''">获取私钥</el-button>
            </div>
            <div class="form-line">
                <span class="form-label">姓名：</span>  
                <el-input class="form-context" v-model="registerFrom.name" />
            </div>
            <div class="form-line">
                <span class="form-label">
                    {{registerFrom.role=="业主"?"家庭地址：": (registerFrom.role=="物业"?"电子邮箱": "专业领域")}}
                </span>  
                <el-input class="form-context" v-model="registerFrom.other" />
            </div>
            <div class="form-line">
                <span class="form-label">联系电话：</span>  
                <el-input class="form-context" v-model="registerFrom.contactNumber" />
            </div>
            <el-button class="login" type="primary" @click="registerBtnClick">登录</el-button>
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
.form-line{
    height: 40px; 
    display: flex;
    margin-bottom: 10px;
    position: relative;
}
.form-label{
    line-height: 40px; 
    width: 20%;
}
.form-context{
    width: 80%;
}
.form-btn{
    position: absolute;
    right: 10px;
    top: 4px;
    border:1px solid transparent;
}
</style>
<script setup>
import RPC from '../api/RepairPersonnelContract'
import RRC from '../api/RepairRequestContract'
import {ref} from 'vue'

const privateKey = localStorage["privateKey"]

const list = ref([])

const init = async () => {
    const data = await RPC.getAssignedRequests(privateKey)
    for(let index of JSON.parse(data[0])){
        const data = await RRC.repairRequests(index)
        list.value.push({
            owner: data[0],
            repairType: data[1],
            description: data[2],
            urgency: data[3],
            status: data[4]
        })
    }
}
init()

</script>

<template>
    <el-card v-for="(repairFrom, index) of list" :key="index">
        <h1 style="text-align: center; font-size: 20px;">维修申报单</h1>
        <div style="height: 15px;"></div>
        <div class="form-line">
            <span class="form-label">报修类型：</span>  
            {{ repairFrom.repairType }}
        </div>
        <div class="form-line" style="height: auto;">
            <span class="form-label">问题描述：</span>  
            {{ repairFrom.description }}
        </div>
        <div class="form-line">
            <span class="form-label">紧急程度：</span>  
            {{ repairFrom.urgency }}
        </div>
        <div class="form-line">
            <span class="form-label">维修状态：</span>  
            {{ repairFrom.status }}
        </div>
        <div style="display: flex; justify-content: center;">
            <el-button type="primary" @click="submit">估算费用</el-button>
            <el-button type="primary" @click="submit">维修完成</el-button>
        </div>
        
    </el-card>
</template>

<style scoped>

</style>
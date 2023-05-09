<script setup>
import {ref} from 'vue'
import RRC from '../api/RepairRequestContract'

const list = ref([])

const role = localStorage["role"]

const init = async() => {
    let i = 0;
    while(true){
        const data = await RRC.repairRequests(i)
        if(data.length == 1 ){ break;}
        if(data[4] == "待验收" ){ 
            list.value.unshift({
                index: i,
                owner: data[0],
                repairType: data[1],
                description: data[2],
                urgency: data[3],
                status: data[4],
                timer: new Date()
            })
        }
        i++;

    }
}


const pass = async (index) => {
    const data = await RRC.updateRequestStatus(index, "已完成")
    list.value.filter(v=>v.index==index).forEach(v=>{
        v.status = "已完成"
    })
}

const reject = async (index) => {
    const data = await RRC.updateRequestStatus(index, "待处理")
    list.value.filter(v=>v.index==index).forEach(v=>{
        v.status = "待处理"
    })
}

init()
</script>

<template>
    <div v-for="(value, index) in list" :key="index">
        <el-card v-if="value.status=='待验收'">
            <h4>上报人：{{ value.owner }}</h4>
            <h4>维修类型：{{ value.repairType }}</h4>
            <h4>紧急程度：{{ value.urgency }}级</h4>
            <h6>故障描述：{{ value.description }}</h6>
            <h6>故障状态：{{ value.status }}</h6>
            <el-button type="primary" @click="pass(value.index)">通过</el-button>
            <el-button type="primary" @click="reject(value.index)">驳回</el-button>
        </el-card>
    </div>
  </template>

<style scoped>

</style>
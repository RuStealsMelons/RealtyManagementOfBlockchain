<script setup>
import {ref} from 'vue'
import RRC from '../api/RepairRequestContract'

const list = ref([])

const role = localStorage["role"]

const loading = ref(false)

const init = async() => {
    let i = 0;
    loading.value = true;
    let _list = []
    while(true){
        const data = await RRC.repairRequests(i)
        i++;
        if(data.length == 1){
            break;
        }
        _list.unshift({
            owner: data[0],
            repairType: data[1],
            description: data[2],
            urgency: data[3],
            status: data[4],
            timer: new Date()
        })
    }
    list.value = _list
    loading.value = false
}



init()
</script>

<template>
    <el-timeline v-loading="loading">
      <el-timeline-item v-for="(value, index) in list" :key="index" :timestamp="value.timer" placement="top">
        <el-card>
          <h4>上报人：{{ value.owner }}</h4>
          <h4>维修类型：{{ value.repairType }}</h4>
          <h4>紧急程度：{{ value.urgency }}级</h4>
          <h6>故障描述：{{ value.description }}</h6>
          <h6>故障状态：{{ value.status }}</h6>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </template>

<style scoped>

</style>
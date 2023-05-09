<script setup>
import RPC from '../api/RepairPersonnelContract'
import RRC from '../api/RepairRequestContract'
import PC from '../api/PaymentContract'
import { ElMessage } from 'element-plus'
import {reactive, ref} from 'vue'

const dialogFormVisible = ref(false)
const privateKey = localStorage["privateKey"]
const price = reactive({
    index: 0,
    cost: 0
})

const list = ref([])

const init = async () => {
    const data = await RPC.getAssignedRequests(privateKey)
    for(let index of JSON.parse(data[0])){
        const data = await RRC.repairRequests(index)
        let node = {
            index: index,
            owner: data[0],
            repairType: data[1],
            description: data[2],
            urgency: data[3],
            status: data[4]
        }
        const p = await PC.repairCosts(index)
        node.cost = Number(p[0]);
        list.value.push(node)
    }
}

init()

const valuation = (index) => {
    price.index = index;
    dialogFormVisible.value = true;
}

const valuationEnd = async () => {
    dialogFormVisible.value = false
    const data = await PC.estimateRepairCost(price.index, price.cost)
    if(data.statusOK == true){
        ElMessage.success("维修费用估算已提交！")
        RRC.updateRequestStatus(price.index, "维修中")
        list.value.filter(v => v.index==price.index).forEach(v=>{
            v.cost = price.cost
            v.status = "维修中"
        })
    }
}

const maintenanceEnd = async (index) => {
    const data = await RRC.updateRequestStatus(index, "待验收")
    if(data.statusOK == true){
        list.value.filter(v => v.index==index).forEach(v=>{
            v.status = "待验收"
        })
    }
}
</script>

<template>
    <div  v-for="(repairFrom, index) of list" :key="index">
        <el-card v-if="repairFrom.status == '维修中' || repairFrom.status == '已分派'" style="margin-bottom: 16px;">
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
            <div class="form-line" v-if="repairFrom.cost!=0">
                <span class="form-label">估算费用：</span>  
                {{ repairFrom.cost }}
            </div>
            <div style="display: flex; justify-content: center;">
                <el-button type="primary" v-if="repairFrom.cost==0" @click="valuation(repairFrom.index)">估算费用</el-button>
                <el-button type="primary" v-else @click="valuation(repairFrom.index)">重新评估</el-button>
                <el-button type="primary" @click="maintenanceEnd(repairFrom.index)">维修完成</el-button>
            </div>
        </el-card>
    </div>
    <el-dialog v-model="dialogFormVisible" title="估算费用">
        <div style="display: flex;justify-content: center;align-items: center;">
            <span>费用估算：</span>
            <el-input v-model="price.cost" placeholder="请输入估算费用" style="width: 300px;"/>
        </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="valuationEnd">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
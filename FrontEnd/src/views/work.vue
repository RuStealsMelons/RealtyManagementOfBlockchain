<script setup>
import {ref, reactive} from 'vue'
import RRC from '../api/RepairRequestContract'
import RPC from '../api/RepairPersonnelContract'
import PMS from '../api/PropertyManagementSystem'
import { ElMessage } from 'element-plus'

const list = ref([])

const role = localStorage["role"]
const dialogVisible = ref(false)
const MPKs = ref([])
const assignTmp = reactive({acceptIndex: -1, acceptArrIndex: -1, MPKIndex: -1})

const init = async() => {
    let i = 0;
    while(true){
        const data = await RRC.repairRequests(i)
        i++;
        if(data.length == 1){
            break;
        }
        if(data[4] == "待处理" || data[4] == "处理中" || data[4] == "待分派"){
            list.value.unshift({
                owner: data[0],
                repairType: data[1],
                description: data[2],
                urgency: data[3],
                status: data[4],
                timer: new Date(),
                index: i-1
            })
        }
    }
    i = 0;
    while(true){
        const data = await PMS.maintenancePersonnelKeys(i)
        console.log(data)
        i++;
        if(data[0].length != 42){
            break;
        }
        const mess = await PMS.maintenancePersonnels(data[0])
        MPKs.value.push({
            id: mess[0],
            name: mess[1],
            specialization: mess[2],
            contactNumber: mess[3]
        })
    }

}

const accept = async (index, arrIndex) => {
    const data = await RRC.updateRequestStatus(index, "处理中")
    if(data.statusOK == true){
        list.value[arrIndex]["status"] = "处理中"
        ElMessage.success("已接受处理！");
    }else{
        ElMessage.success("处理失败");
    }
}


const assignment = async (id) => {
    const data = await RPC.assignRequest(id, assignTmp.acceptIndex)
    dialogVisible.value = false
    if(data.statusOK == true){
        const data = await RRC.updateRequestStatus(assignTmp.acceptIndex, "已分派")
        if(data.statusOK == true){
            list.value[assignTmp.acceptArrIndex]["status"] = "已分派"
            ElMessage.success("分派成功");
            return;
        }
    }
    ElMessage.error("分派失败！")
}

init()
</script>

<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="repairType" label="维修类型" width="100" />
    <el-table-column prop="description" label="损坏类容" width="180" />
    <el-table-column prop="urgency" label="紧急程度" />
    <el-table-column prop="status" label="状态" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" v-if="scope.row.status=='待处理'" @click="accept(scope.row.index, scope.$index)">接受处理</el-button>
    
        <el-button link type="primary" size="small" v-if="scope.row.status=='处理中'" @click="dialogVisible = true;assignTmp.acceptIndex=scope.row.index;assignTmp.acceptArrIndex=scope.$index">分配任务</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    title="任务分配"
    width="80%"
  >
    <el-table :data="MPKs" style="width: 100%">
        <!-- <el-table-column prop="id" label="私钥地址" width="100" /> -->
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="specialization" label="专属领域" />
        <el-table-column prop="contactNumber" label="联系电话" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="assignment(scope.row.id)">分配</el-button>
            </template>
        </el-table-column>
    </el-table>
  </el-dialog>
</template>

<style scoped>

</style>
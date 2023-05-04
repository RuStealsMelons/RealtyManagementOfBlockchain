<script setup>
import {reactive} from 'vue'
import RRC from '../api/RepairRequestContract'

const repairFrom = reactive({
    "address": localStorage["privateKey"],
    "repairType": "",
    "description": "",
    "urgency": "",
    "status": "待处理"
})

const repairTypes = [
    {label: "电器维修：修理或更换故障的电器设备，如灯具、插座、电视等。", value: "电器维修"},
    {label: "水电维修：解决水管、水龙头、水泵、水槽等相关的问题。", value: "水电维修"},
    {label: "门窗维修：修复门窗的损坏、更换门锁、调整窗户等。", value: "门窗维修"},
    {label: "管道维修：修复下水道、排水管道、燃气管道等的堵塞或漏水问题。", value: "管道维修"},
    {label: "油漆维修：涂刷墙壁、修复漏水后的墙面、修复划痕等。", value: "油漆维修"},
    {label: "卫生间维修：修复马桶、浴缸、淋浴器、洗手盆等的问题。", value: "卫生间维修"},
    {label: "空调维修：修理或清洁空调设备，解决制冷或制热问题。", value: "空调维修"},
    {label: "楼梯维修：修复楼梯的损坏、更换扶手、修复踏板等。", value: "楼梯维修"},
    {label: "绿化维护：修剪花草、浇水、清理园区、除草等。", value: "绿化维护"},
    {label: "安防维修：修复门禁系统、监控摄像头、报警器等的故障", value: "安防维修"},
]

const urgencys = [
    {label: "紧急：需要立即解决的问题，可能会对安全、健康或生活质量产生严重影响，如严重漏水、电路故障等。", value: 1},
    {label: "高：需要尽快解决的问题，可能会对居住环境或设施正常使用产生较大影响，如窗户无法关闭、卫生间堵塞等。", value: 2},
    {label: "中：需要在合理的时间内解决的问题，可能会对居住环境或设施的正常使用产生一定影响，如墙面划痕、轻微漏水等。", value: 3},
    {label: "低：不会对居住环境或设施的正常使用产生明显影响，可以在较长时间内解决的问题，如一些维护性的任务或小问题修复。", value: 4},
]

const submit = async () => {
    // _owner, _repairType, _description, _urgency
    let data = await RRC.submitRepairRequest(repairFrom.address, repairFrom.repairType, repairFrom.description, repairFrom.urgency)
}

</script>

<template>
    <el-card>
        <h1 style="text-align: center; font-size: 20px;">维修申报单</h1>
        <div style="height: 15px;"></div>
        <div class="form-line">
            <span class="form-label">提交人地址：</span>  
            <el-input class="form-context" disabled v-model="repairFrom.address" />
        </div>
        <div class="form-line">
            <span class="form-label">报修类型：</span>  
            <el-select v-model="repairFrom.repairType" placeholder="选择维修类型" style="width: 80%;" size="large">
                <el-option
                v-for="item in repairTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
        </div>
        <div class="form-line" style="height: auto;">
            <span class="form-label">问题描述：</span>  
            <el-input
                style="width: 80%;"
                v-model="repairFrom.description"
                type="textarea"
                rows="6"
                placeholder="请对相关问题进行描述！"
            />
        </div>
        <div class="form-line">
            <span class="form-label">紧急程度：</span>  
            <el-select v-model="repairFrom.urgency" placeholder="选择紧急程度" style="width: 80%;" size="large">
                <el-option
                v-for="item in urgencys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
        </div>
        <div class="form-line">
            <span class="form-label">维修状态：</span>  
            <el-input class="form-context" disabled v-model="repairFrom.status" />
        </div>
        <div style="display: flex; justify-content: center;">
            <el-button type="primary" @click="submit">申报</el-button>
        </div>
        
    </el-card>
</template>

<style scoped>
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
</style>
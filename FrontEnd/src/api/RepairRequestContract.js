import axios from 'axios'

const signUserId = "aa2aa26ebf564bcb893f6fbd838a01dd"; // 用户编号
const contractName = "RepairRequestContract"; // 合约名称
const contractAddress = "0xa2e9c210cb6854ee3b34a3da39c36c8b343542f0"; // 合约地址
const abi = '[{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_repairType","type":"string"},{"name":"_description","type":"string"},{"name":"_urgency","type":"uint256"}],"name":"submitRepairRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"repairRequests","outputs":[{"name":"owner","type":"address"},{"name":"repairType","type":"string"},{"name":"description","type":"string"},{"name":"urgency","type":"uint256"},{"name":"status","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"},{"name":"_newStatus","type":"string"}],"name":"updateRequestStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_requestId","type":"uint256"}],"name":"getRequestStatus","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"requestId","type":"uint256"},{"indexed":true,"name":"owner","type":"address"}],"name":"RepairRequestCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"requestId","type":"uint256"},{"indexed":false,"name":"newStatus","type":"string"}],"name":"RequestStatusUpdated","type":"event"}]'; 
const groupId = 1;  
const useCns = false; // 不使用 cns调用

const baseFrom = {
    signUserId: signUserId,
    contractName: contractName,
    contractAddress: contractAddress,
    contractAbi: JSON.parse(abi),
    groupId: groupId,
    useCns: useCns
}

async function submitRepairRequest(_owner, _repairType, _description, _urgency){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "submitRepairRequest",
        funcParam: [_owner, _repairType, _description, _urgency]
    })
    return data;
}

async function repairRequests(index){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "repairRequests",
        funcParam: [index]
    })
    return data;
}

export default{
    submitRepairRequest,
    repairRequests
}
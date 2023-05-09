import axios from 'axios'

const signUserId = "f70db61a37b34eefb71756fb78e4d8d0"; // 用户编号
const contractName = "RepairPersonnelContract"; // 合约名称
const contractAddress = "0x8f8aef1e56631d517b30dad5e37d8e9bb0e52ade"; // 合约地址
const abi = '[{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"assignedRequests","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_personnel","type":"address"}],"name":"getAssignedRequests","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_personnel","type":"address"},{"name":"_requestId","type":"uint256"}],"name":"assignRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"personnel","type":"address"},{"indexed":true,"name":"requestId","type":"uint256"}],"name":"RequestAssigned","type":"event"}]'; 
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

async function assignRequest(_personnel, _requestId){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "assignRequest",
        funcParam: [_personnel, _requestId]
    })
    return data;
}

async function getAssignedRequests(_personnel){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "getAssignedRequests",
        funcParam: [_personnel]
    })
    return data;
}

export default{
    assignRequest,
    getAssignedRequests
}
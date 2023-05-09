import axios from 'axios'

const signUserId = "aa2aa26ebf564bcb893f6fbd838a01dd"; // 用户编号
const contractName = "RepairPersonnelContract"; // 合约名称
const contractAddress = "0x16935f3c6b9056e07e717b863a07a1ba86b05ab4"; // 合约地址
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
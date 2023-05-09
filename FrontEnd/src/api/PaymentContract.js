import axios from 'axios'

const signUserId = "aa2aa26ebf564bcb893f6fbd838a01dd"; // 用户编号
const contractName = "PaymentContract"; // 合约名称
const contractAddress = "0xb4bd4b6bf88a95f1802600fab4d63dbf5434d8c0"; // 合约地址
const abi = '[{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"},{"name":"_cost","type":"uint256"}],"name":"estimateRepairCost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"repairCosts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"},{"name":"_amount","type":"uint256"}],"name":"makePayment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"requestId","type":"uint256"},{"indexed":false,"name":"cost","type":"uint256"}],"name":"RepairCostEstimated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"requestId","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentMade","type":"event"}]'; 
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

async function estimateRepairCost(_requestId, _cost){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "estimateRepairCost",
        funcParam: [_requestId, _cost]
    })
    return data;
}

async function makePayment(_requestId, _amount){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "makePayment",
        funcParam: [_requestId, _amount]
    })
    return data;
}

async function repairCosts(index){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "repairCosts",
        funcParam: [index]
    })
    return data;
}

export default{
    estimateRepairCost,
    makePayment,
    repairCosts
}
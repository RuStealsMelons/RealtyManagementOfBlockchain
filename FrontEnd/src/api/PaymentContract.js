import axios from 'axios'

const signUserId = "f70db61a37b34eefb71756fb78e4d8d0"; // 用户编号
const contractName = "PaymentContract"; // 合约名称
const contractAddress = "0xbfcc0e7f8fe23c013f8eaf819db51b79f9387465"; // 合约地址
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
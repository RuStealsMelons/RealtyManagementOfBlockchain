import axios from 'axios'

const signUserId = "aa2aa26ebf564bcb893f6fbd838a01dd"; // 用户编号
const contractName = "PropertyManagementSystem"; // 合约名称
const contractAddress = "0x359290249d19687cde8998db5bdfbf4c518b1f88"; // 合约地址
const abi = '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"maintenancePersonnels","outputs":[{"name":"id","type":"address"},{"name":"name","type":"string"},{"name":"specialization","type":"string"},{"name":"contactNumber","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"login","outputs":[{"name":"role","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"duration","type":"uint256"}],"name":"startVoting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"fromVoters","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"homeowners","outputs":[{"name":"id","type":"address"},{"name":"name","type":"string"},{"name":"addr","type":"string"},{"name":"contactNumber","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"propertyManagers","outputs":[{"name":"id","type":"address"},{"name":"name","type":"string"},{"name":"contactNumber","type":"string"},{"name":"email","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"address"},{"name":"name","type":"string"},{"name":"specialization","type":"string"},{"name":"contactNumber","type":"string"}],"name":"registerMaintenancePersonnel","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"address"},{"name":"name","type":"string"},{"name":"addr","type":"string"},{"name":"contactNumber","type":"string"}],"name":"registerHomeowner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTop9Voters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"endVoting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"address"},{"name":"name","type":"string"},{"name":"contactNumber","type":"string"},{"name":"email","type":"string"}],"name":"registerPropertyManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"sortAllVotersByValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"toVoters","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]'; 
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

async function login(addr){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "login",
        funcParam: [addr]
    })
    return data;
}

async function registerHomeowner(id, name, addr, contactNumber){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "registerHomeowner",
        funcParam: [id, name, addr, contactNumber]
    })
    return data;
}

async function registerPropertyManager(id, name, contactNumber, email){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "registerPropertyManager",
        funcParam: [id, name, contactNumber, email]
    })
    return data;
}

async function registerMaintenancePersonnel(id, name, specialization, contactNumber){
    const {data} = await axios.post("/api5002/WeBASE-Front/trans/handleWithSign", {
        ...baseFrom,
        funcName: "registerMaintenancePersonnel",
        funcParam: [id, name, specialization, contactNumber]
    })
    return data;
}

export default {
    login,
    registerHomeowner,
    registerPropertyManager,
    registerMaintenancePersonnel
}
pragma solidity ^0.4.25;

contract PropertyManagementSystem {
    // Homeowner（业主）：包含业主的唯一标识符（id）、姓名（name）、地址（address）和联系电话（contactNumber）等信息。
    struct Homeowner {
        address id;
        string name;
        string addr;
        string contactNumber;
    }

    // PropertyManager（物业）：包含物业管理员的唯一标识符（id）、姓名（name）、联系电话（contactNumber）和电子邮箱（email）等信息。
    struct PropertyManager {
        address id;
        string name;
        string contactNumber;
        string email;
    }

    // MaintenancePersonnel（维修人员）：包含维修人员的唯一标识符（id）、姓名（name）、专业领域（specialization）和联系电话（contactNumber）等信息。
    struct MaintenancePersonnel {
        address id;
        string name;
        string specialization;
        string contactNumber;
    }

    // ArbitrationBody（审判机构）：包含审判机构的唯一标识符（id）、名称（name）、联系电话（contactNumber）和电子邮箱（email）等信息。
    // struct ArbitrationBody {
    //     uint256 id;
    //     string name;
    //     string contactNumber;
    //     string email;
    // }

    // 存储业主的地址向具体信息映射
    mapping(address => Homeowner) public homeowners;
    address[] homeownerKeys;

    // 存储物业的地址向具体信息映射
    mapping(address => PropertyManager) public propertyManagers;
    address[] propertyManagerKeys;

    // 存储维修人员的地址向具体信息映射
    mapping(address => MaintenancePersonnel) public maintenancePersonnels;
    address[] maintenancePersonnelKeys;

    // 业主 注册
    function registerHomeowner(address id, string name, string addr, string contactNumber) public {
        homeowners[id] = Homeowner(id, name, addr, contactNumber);
        homeownerKeys.push(id);
    }

    // 物业 注册
    function registerPropertyManager(address id, string name, string contactNumber, string email) public {
        propertyManagers[id] = PropertyManager(id, name, contactNumber, email);
        propertyManagerKeys.push(id);
    }

    // 维修人员 注册
    function registerMaintenancePersonnel(address id, string name, string specialization, string contactNumber) public {
        maintenancePersonnels[id] = MaintenancePersonnel(id, name, specialization, contactNumber);
        maintenancePersonnelKeys.push(id);
    }

    // 登录
    function login(address addr) public view returns(string role) {
        if(homeowners[addr].id != address(0) ){
            return("Homeowner");
        }else if(propertyManagers[addr].id != address(0)) {
            return("PropertyManager");
        }else if(maintenancePersonnels[addr].id != address(0)){
            return("MaintenancePersonnel");
        }else{
            return("找不到当前用户");
        }
    }


    // 每个人拥有1票
    mapping(address => uint256) public fromVoters;
    // 被选举者
    mapping(address => uint256) public toVoters;
    // 所有人的地址
    address[] allVoters;

    // 投票截止时间
    uint256 votingEndTime = 0;

    // 投票初始化个人信息
    function initStatus(address addr) private {
        fromVoters[addr] = 1;
        toVoters[addr] = 0;
        allVoters.push(addr);
    }

    // 从外部传入投票持续时长，开始投票
    function startVoting(uint256 duration) public {
        require(votingEndTime < block.timestamp, "已有投票正在进行"); // 确保没有其他投票正在进行中

        votingEndTime = block.timestamp + duration; // 根据传入的持续时长计算投票的截止时间

        uint256 i = 0;
        for (i = 0; i < homeownerKeys.length; i++) {
            initStatus(homeownerKeys[i]);
        }
        for (i = 0; i < propertyManagerKeys.length; i++) {
            initStatus(propertyManagerKeys[i]);
        }
        for (i = 0; i < maintenancePersonnelKeys.length; i++) {
            initStatus(maintenancePersonnelKeys[i]);
        }
    }

    // 投票结束 统计投票结果
    function endVoting() public {
        require(votingEndTime > block.timestamp, "投票尚未结束"); // 确保投票正在进行中

        sortAllVotersByValue();
    }

    // 获取投票前9人 作为仲裁成员
    function getTop9Voters() public view returns (address[] memory) {
        uint256 length = allVoters.length < 9 ? allVoters.length : 9;
        address[] memory top9 = new address[](length);

        for (uint256 i = 0; i < length; i++) {
            top9[i] = allVoters[i];
        }

        return top9;
    }

    // 对投票结果进行排序
    function sortAllVotersByValue() public {
        quickSort(0, int256(allVoters.length - 1));
    }

    // 快速排序实现
      function quickSort(int256 left, int256 right) internal {
        if (left < right) {
            int256 pivotIndex = int256(partition(uint256(left), uint256(right)));
            quickSort(left, pivotIndex - 1);
            quickSort(pivotIndex + 1, right);
        }
    }

    function partition(uint256 left, uint256 right) internal returns (uint256) {
        uint256 pivotValue = toVoters[allVoters[(left + right) / 2]];
        uint256 i = left;
        uint256 j = right;

        while (i <= j) {
            while (toVoters[allVoters[i]] > pivotValue) {
                i++;
            }

            while (toVoters[allVoters[j]] < pivotValue) {
                j--;
            }

            if (i <= j) {
                (allVoters[i], allVoters[j]) = (allVoters[j], allVoters[i]);
                i++;
                j--;
            }
        }

        return j;
    }
}

pragma solidity ^0.4.25;

/**
维修请求合约：
    提交维修请求：业主可以通过调用该合约的方法提交维修请求，包括维修类型、描述、紧急程度等信息。
    查询请求状态：业主和物业可以查询特定维修请求的状态和详细信息。
    更新请求状态：物业可以更新维修请求的状态，例如分派给维修人员、维修完成等。

    维修类型包括：
        电器维修：修理或更换故障的电器设备，如灯具、插座、电视等。
        水电维修：解决水管、水龙头、水泵、水槽等相关的问题。
        门窗维修：修复门窗的损坏、更换门锁、调整窗户等。
        管道维修：修复下水道、排水管道、燃气管道等的堵塞或漏水问题。
        油漆维修：涂刷墙壁、修复漏水后的墙面、修复划痕等。
        卫生间维修：修复马桶、浴缸、淋浴器、洗手盆等的问题。
        空调维修：修理或清洁空调设备，解决制冷或制热问题。
        楼梯维修：修复楼梯的损坏、更换扶手、修复踏板等。
        绿化维护：修剪花草、浇水、清理园区、除草等。
        安防维修：修复门禁系统、监控摄像头、报警器等的故障

    紧急程度：
        紧急：需要立即解决的问题，可能会对安全、健康或生活质量产生严重影响，如严重漏水、电路故障等。
        高：需要尽快解决的问题，可能会对居住环境或设施正常使用产生较大影响，如窗户无法关闭、卫生间堵塞等。
        中：需要在合理的时间内解决的问题，可能会对居住环境或设施的正常使用产生一定影响，如墙面划痕、轻微漏水等。
        低：不会对居住环境或设施的正常使用产生明显影响，可以在较长时间内解决的问题，如一些维护性的任务或小问题修复。
 
    维修状态：
        待处理：表示维修请求已经提交，但尚未被物业或维修人员处理。
        处理中：表示维修请求正在处理中，已经被物业或维修人员接收并开始处理。
        待分派：表示维修请求已被接收，但尚未被分派给具体的维修人员。
        已分派：表示维修请求已经被分派给了具体的维修人员，等待其进行维修操作。
        维修中：表示维修人员正在执行维修任务，解决相关问题。
        待验收：表示维修任务已经完成，等待业主或物业的验收确认。
        已完成：表示维修任务已经完成，并且得到了业主或物业的验收确认。
        已关闭：表示维修请求已经关闭，不再进行任何处理。
 */

contract RepairRequestContract {
    struct RepairRequest {
        address owner; // 请求提交者地址
        string repairType; // 维修类型
        string description; // 维修描述
        uint256 urgency; // 紧急程度
        string status; // 维修状态
    }

    RepairRequest[] public repairRequests;

    event RepairRequestCreated(uint256 indexed requestId, address indexed owner);
    event RequestStatusUpdated(uint256 indexed requestId, string newStatus);

    // 提交维修请求：业主可以通过调用该合约的方法提交维修请求，包括维修类型、描述、紧急程度等信息。
    function submitRepairRequest(address _owner, string memory _repairType, string memory _description, uint256 _urgency) public {
        RepairRequest memory newRequest = RepairRequest({
            owner: _owner,
            repairType: _repairType,
            description: _description,
            urgency: _urgency,
            status: "待处理"
        });

        uint256 requestId = repairRequests.push(newRequest) - 1;
        emit RepairRequestCreated(requestId, msg.sender);
    }

    // 查询请求状态：业主和物业可以查询特定维修请求的状态和详细信息。
    function getRequestStatus(uint256 _requestId) public view returns (string memory) {
        require(_requestId < repairRequests.length, "无效的请求 ID");
        return repairRequests[_requestId].status;
    }

    // 更新请求状态：物业可以更新维修请求的状态，例如分派给维修人员、维修完成等。
    function updateRequestStatus(uint256 _requestId, string memory _newStatus) public {
        require(_requestId < repairRequests.length, "无效的请求 ID");
        // require(msg.sender == repairRequests[_requestId].owner, "只有所有者可以更新请求状态");

        repairRequests[_requestId].status = _newStatus;
        emit RequestStatusUpdated(_requestId, _newStatus);
    }
}
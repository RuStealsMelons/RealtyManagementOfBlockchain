pragma solidity ^0.4.25;

/**
支付合约：
    维修费用估算：根据维修请求的类型和维修人员提供的估算，计算维修费用。
    支付维修费用：物业可以通过调用该合约的方法支付维修费用。
 */

contract PaymentContract {
    mapping(uint256 => uint256) public repairCosts; // 维修请求ID到费用的映射

    event RepairCostEstimated(uint256 indexed requestId, uint256 cost);
    event PaymentMade(uint256 indexed requestId, uint256 amount);

    // 维修费用估算：根据维修请求的类型和维修人员提供的估算，计算维修费用。
    function estimateRepairCost(uint256 _requestId, uint256 _cost) public {
        repairCosts[_requestId] = _cost;
        emit RepairCostEstimated(_requestId, _cost);
    }

    // 支付维修费用：物业可以通过调用该合约的方法支付维修费用。
    function makePayment(uint256 _requestId, uint256 _amount) public {
        require(repairCosts[_requestId] > 0, "维修费用尚未估算");
        require(_amount >= repairCosts[_requestId], "付款金额不足");

        // 进行支付操作

        emit PaymentMade(_requestId, _amount);
    }
}
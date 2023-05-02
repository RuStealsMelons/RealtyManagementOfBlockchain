pragma solidity ^0.4.25;

/**
审判合约：
    纠纷案件管理：审判机构可以创建和管理纠纷案件，包括案件信息、参与方、调解和裁决记录等。
    审判决策：审判机构可以进行调解和裁决，记录决策结果。
 */

contract ArbitrationContract {
    struct Dispute {
        address[] involvedParties; // 参与方地址列表
        string caseDetails; // 案件细节
        string mediationRecord; // 调解记录
        string arbitrationRecord; // 仲裁记录
    }

    mapping(uint256 => Dispute) public disputes;
    mapping(uint256 => mapping(address => bool)) public isInvolved;

    event DisputeCreated(uint256 indexed disputeId, address[] involvedParties);

    // 创建纠纷案件
    function createDispute(uint256 _disputeId, address[] memory _involvedParties, string memory _caseDetails) public {
        require(disputes[_disputeId].involvedParties.length == 0, "纠纷案件已经存在");

        disputes[_disputeId] = Dispute({
            involvedParties: _involvedParties,
            caseDetails: _caseDetails,
            mediationRecord: "",
            arbitrationRecord: ""
        });

        for (uint256 i = 0; i < _involvedParties.length; i++) {
            isInvolved[_disputeId][_involvedParties[i]] = true;
        }

        emit DisputeCreated(_disputeId, _involvedParties);
    }

    // 纠纷案件管理：审判机构可以创建和管理纠纷案件，包括案件信息、参与方、调解和裁决记录等。
    function updateMediationRecord(uint256 _disputeId, string memory _mediationRecord) public {
        require(disputes[_disputeId].involvedParties.length > 0, "纠纷案件不存在");
        require(isInvolved[_disputeId][msg.sender], "您不属于此争议的参与者");

        disputes[_disputeId].mediationRecord = _mediationRecord;
    }

    // 审判决策：审判机构可以进行调解和裁决，记录决策结果。
    function updateArbitrationRecord(uint256 _disputeId, string memory _arbitrationRecord) public {
        require(disputes[_disputeId].involvedParties.length > 0, "纠纷案件不存在");
        require(isInvolved[_disputeId][msg.sender], "您不属于此争议的参与者");

        disputes[_disputeId].arbitrationRecord = _arbitrationRecord;
    }
}
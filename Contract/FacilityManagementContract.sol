pragma solidity ^0.4.25;

/**
设施管理：
    物业可以记录和管理小区设施的状态和维护信息，例如设施名称、维护计划、维修记录等
 */

contract FacilityManagementContract {
    struct Facility {
        string name; // 设施名称
        string maintenancePlan; // 维护计划
        string maintenanceRecord; // 维修记录
    }

    mapping(uint256 => Facility) public facilities;

    event FacilityAdded(uint256 indexed facilityId, string name);

    // 添加维修记录
    function addFacility(uint256 _facilityId, string memory _name, string memory _maintenancePlan) public {
        require(bytes(facilities[_facilityId].name).length == 0, "维修记录已经存在");

        facilities[_facilityId] = Facility({
            name: _name,
            maintenancePlan: _maintenancePlan,
            maintenanceRecord: ""
        });

        emit FacilityAdded(_facilityId, _name);
    }

    // 更改维修状态
    function updateMaintenanceRecord(uint256 _facilityId, string memory _maintenanceRecord) public {
        require(bytes(facilities[_facilityId].name).length > 0, "维修记录不存在");
            facilities[_facilityId].maintenanceRecord = _maintenanceRecord;
    }
}
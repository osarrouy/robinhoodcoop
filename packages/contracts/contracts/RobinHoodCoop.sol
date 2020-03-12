// solium-disable max-len
// solium-disable no-experimental
// solium-disable operator-whitespace
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./RobinHoodShare.sol";


contract RobinHoodCoop is Initializable {
    struct Member {
        bool   exists;
        string firstname;
        string lastname;
        string email;
    }

    RobinHoodShare             public  share;
    uint256                    public  value;
    mapping(address => bool)   private _isAdmin;
    mapping(address => Member) private _members;

    modifier protected() {
        require(isAdmin(msg.sender), "ADMIN_ONLY_OPERATION");
        _;
    }

    event UpdatedValue (uint256 value);
    event GrantedAdmin (address indexed admin);
    event RevokedAdmin (address indexed admin);
    event CreatedMember(address indexed member, string firstname, string lastname, string email);
    event UpdatedMember(address indexed member, string firstname, string lastname, string email);
    event DeletedMember(address indexed member);
    event Minted       (address indexed member, uint256 amount);
    event Burnt        (address indexed member, uint256 amount);
    event Paused       ();
    event Unpaused     ();

    /***** external functions *****/

    function initialize() external initializer {
        share = new RobinHoodShare();
        _grantAdmin(msg.sender);
    }

    function updateValue(uint256 _value) external protected {
        _updateValue(_value);
    }

    function grantAdmin(address _admin) external protected {
        require(!isAdmin(_admin), "ALREADY_AN_ADMIN");

        _grantAdmin(_admin);
    }

    function revokeAdmin(address _admin) external protected {
        require(isAdmin(_admin),      "NOT_AN_ADMIN");
        require(msg.sender != _admin, "ADMIN_CANNOT_REVOKE_ITSELF");

        _revokeAdmin(_admin);
    }

    function createMemberWithShares(address _member, string calldata _firstname, string calldata _lastname, string calldata _email, uint256 _shares) external protected {
        require(!isMember(_member), "ALREADY_A_MEMBER");

        _createMember(_member, _firstname, _lastname, _email);
        _mint(_member, _shares);
    }

    function createMember(address _member, string calldata _firstname, string calldata _lastname, string calldata _email) external protected {
        require(!isMember(_member), "ALREADY_A_MEMBER");

        _createMember(_member, _firstname, _lastname, _email);
    }

    function updateMember(address _member, string calldata _firstname, string calldata _lastname, string calldata _email) external protected {
        require(isMember(_member), "NOT_A_MEMBER");

        _updateMember(_member, _firstname, _lastname, _email);
    }

    function deleteMember(address _member) external protected {
        require(isMember(_member), "NOT_A_MEMBER");

        _deleteMember(_member);
    }

    function mint(address _member, uint256 _amount) external protected {
        require(isMember(_member), "NOT_A_MEMBER");

        _mint(_member, _amount);
    }

    function burn(address _member, uint256 _amount) external protected {
        require(isMember(_member), "NOT_A_MEMBER");

        _burn(_member, _amount);
    }

    function pause() external protected {
        _pause();
    }

    function unpause() external protected {
        _unpause();
    }

    /***** public view functions *****/

    function isAdmin(address _admin) public view returns (bool) {
        return _isAdmin[_admin];
    }

    function isMember(address _member) public view returns (bool) {
        return _members[_member].exists;
    }

    function member(address _member) public view returns (Member memory) {
        return _members[_member];
    }

    /***** internal functions *****/

    function _updateValue(uint256 _value) internal {
        value = _value;

        emit UpdatedValue(_value);
    }

    function _grantAdmin(address _admin) internal {
        _isAdmin[_admin] = true;

        emit GrantedAdmin(_admin);
    }

    function _revokeAdmin(address _admin) internal {
        _isAdmin[_admin] = false;

        emit RevokedAdmin(_admin);
    }

    function _createMember(address _member, string memory _firstname, string memory _lastname, string memory _email) internal {
        Member storage member_ = _members[_member];

        member_.exists    = true;
        member_.firstname = _firstname;
        member_.lastname  = _lastname;
        member_.email     = _email;

        emit CreatedMember(_member, _firstname, _lastname, _email);
    }

    function _updateMember(address _member, string memory _firstname, string memory _lastname, string memory _email) internal {
        Member storage member_ = _members[_member];

        member_.firstname = _firstname;
        member_.lastname  = _lastname;
        member_.email     = _email;

        emit UpdatedMember(_member, _firstname, _lastname, _email);
    }

    function _deleteMember(address _member) internal {
        Member storage member_ = _members[_member];

        delete member_.exists;
        delete member_.firstname;
        delete member_.lastname;
        delete member_.email;

        emit DeletedMember(_member);
    }

    function _mint(address _member, uint256 _amount) internal {
        share.mint(_member, _amount);

        emit Minted(_member, _amount);
    }

    function _burn(address _member, uint256 _amount) internal {
        share.burn(_member, _amount);

        emit Burnt(_member, _amount);
    }

    function _pause() internal {
        share.pause();

        emit Paused();
    }

    function _unpause() internal {
        share.unpause();

        emit Unpaused();
    }
}

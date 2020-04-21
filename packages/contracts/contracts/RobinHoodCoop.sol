// solium-disable max-len
// solium-disable no-experimental
// solium-disable operator-whitespace
pragma solidity ^0.6.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./RobinHoodShare.sol";


contract RobinHoodCoop is Initializable {
    RobinHoodShare            public share;
    uint256                   public value;
    mapping(address => bool)  public isAdmin;

    modifier protected() {
        require(isAdmin[msg.sender], "ADMIN_ONLY_OPERATION");
        _;
    }

    event UpdatedValue(uint256 value);
    event GrantedAdmin(address indexed admin);
    event RevokedAdmin(address indexed admin);
    event Minted      (address indexed member, uint256 amount);
    event Burnt       (address indexed member, uint256 amount);
    event Paused      ();
    event Unpaused    ();

    /***** external functions *****/

    function initialize() external initializer {
        share = new RobinHoodShare();
        _grantAdmin(msg.sender);
    }

    function updateValue(uint256 _value) external protected {
        _updateValue(_value);
    }

    function grantAdmin(address _admin) external protected {
        require(!isAdmin[_admin], "ALREADY_AN_ADMIN");

        _grantAdmin(_admin);
    }

    function revokeAdmin(address _admin) external protected {
        require(isAdmin[_admin],      "NOT_AN_ADMIN");
        require(msg.sender != _admin, "ADMIN_CANNOT_REVOKE_HERSELF");

        _revokeAdmin(_admin);
    }

    function mint(address _member, uint256 _amount) external protected {
        _mint(_member, _amount);
    }

    function burn(address _member, uint256 _amount) external protected {
        _burn(_member, _amount);
    }

    function pause() external protected {
        _pause();
    }

    function unpause() external protected {
        _unpause();
    }

    /***** public view functions *****/

    function isMember(address _member) public view returns (bool) {
        return share.balanceOf(_member) > 0;
    }

    /***** internal functions *****/

    function _updateValue(uint256 _value) internal {
        value = _value;

        emit UpdatedValue(_value);
    }

    function _grantAdmin(address _admin) internal {
        isAdmin[_admin] = true;

        emit GrantedAdmin(_admin);
    }

    function _revokeAdmin(address _admin) internal {
        isAdmin[_admin] = false;

        emit RevokedAdmin(_admin);
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

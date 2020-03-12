pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";


contract RobinHoodShare is ERC20, ERC20Detailed {
    address private _controller;
    bool    private _paused;

    modifier protected {
        require(msg.sender == _controller, "ERC20: only controller can perform this operation");
        _;
    }

    event UpdatedController(address indexed controller);
    event Paused           ();
    event Unpaused         ();

    constructor() ERC20Detailed("RobinHoodShare", "RHS", 18) public {
        _updateController(msg.sender);
        _pause();
    }

    /***** external functions *****/

    function updateController(address controller_) external protected {
        _updateController(controller_);
    }

    function pause() external protected {
        require(!_paused, "ERC20: transfers already paused");

        _pause();
    }

    function unpause() external protected {
        require(_paused, "ERC20: transfers already unpaused");

        _unpause();
    }

    function mint(address _account, uint256 _amount) external protected {
        _mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount) external protected {
        _burn(_account, _amount);
    }

    /***** public view functions *****/

    function controller() public view returns (address) {
        return _controller;
    }

    function isPaused() public view returns (bool) {
        return _paused;
    }

    /***** internal functions *****/

    function _updateController(address controller_) internal {
        _controller = controller_;

        emit UpdatedController(controller_);
    }

    function _pause() internal {
        _paused = true;

        emit Paused();
    }

    function _unpause() internal {
        _paused = false;

        emit Unpaused();
    }

    function _beforeTokenTransfer(address from, address to, uint256 /* amount */) internal override {
        require(!(_paused && from != address(0) && to != address(0)), "ERC20: token tranfer while paused");
    }
}
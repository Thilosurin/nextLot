pragma solidity ^0.4.24;

contract PeriodManager {
    address[] public deployedPeriods;
    uint public periodNumber = 1;
    
    function createPeriod(uint priceLottery, uint16 lotteryPerNum, uint closingTime) public {
        address newPeriod = new Period(periodNumber, priceLottery, lotteryPerNum, true, closingTime, msg.sender);
        deployedPeriods.push(newPeriod);
        periodNumber++;
    }
    
    function getDeployedPeriods() public view returns(address[]) {
        return deployedPeriods;
    }
}

contract Period {
    Lottery[] public lotteries;
    uint public lotteryCount;
    uint public priceCount;

    struct Lottery {
        uint id;
        uint numberLottery;
        address players;
        uint prize;
        bool reward;
        uint repeat;
    }
    
    address public creator;
    uint public numPeriod;
    uint public price;
    uint public LPN;
    bool public runStatus;
    uint public timeOut;
    string[] messages;
    
    modifier restricted() {
        require(msg.sender == creator);
        _;
    }
    
    function Period(uint periodNumber, uint priceLottery, uint16 lotteryPerNum, bool statusPeriod, uint closingTime, address manager) public {
        numPeriod = periodNumber;
        price = priceLottery;
        LPN = lotteryPerNum;
        runStatus = statusPeriod;
        timeOut = closingTime;
        creator = manager;
    }
    
    function createLottery(uint numberLottery) public payable closingTime {
        require(msg.value == price);
        checkPerNum(numberLottery);
        incrementCount();
        Lottery memory newLottery = Lottery({
          id: lotteryCount,
          numberLottery: numberLottery,
          players: msg.sender,
          prize: 0,
          reward: false,
          repeat: 1
        });
        lotteries.push(newLottery);
    }
    function incrementCount() internal {
        lotteryCount += 1;
        priceCount += price;
    }
    function checkPerNum(uint num) internal  {
        for (uint p = 0; p < lotteries.length; p++) {
            if (num == lotteries[p].numberLottery) {
                require(lotteries[p].repeat < LPN);
                lotteries[p].repeat++;
            }
        }
    }
    modifier closingTime() {
        require(block.timestamp <= timeOut);
        if (block.timestamp > timeOut) {
            runStatus = false;
        }
        _;
    }
    
    event MultiTransfer(
        address indexed _from,
        uint indexed _value,
        address _to,
        uint _amount
    );
    uint public countReward = 0;
    uint public checkCoin = 0;
    function checkReward(uint prizeNumber, uint prizeReward) public restricted {
        if (countReward != 0 && checkCoin != 0) { countReward = 0; checkCoin = 0; }
        for (uint p = 0; p < lotteries.length; p++) {
            if (lotteries[p].numberLottery == prizeNumber) {
                require(lotteries[p].numberLottery == prizeNumber);
                lotteries[p].prize = prizeReward;
                countReward++;
            }
        }
        checkCoin = mul(prizeReward, countReward);
    }
    function sendReward() public payable restricted {
        uint coinValue = msg.value;
        for (uint p = 0; p < lotteries.length; p++) {
            if (lotteries[p].prize != 0 && (!lotteries[p].reward)) {
                require(!lotteries[p].reward);

                _safeTransfer(lotteries[p].players, lotteries[p].prize);
                coinValue = sub(coinValue, lotteries[p].prize);
                lotteries[p].reward = true;
                MultiTransfer(msg.sender, msg.value, lotteries[p].players, lotteries[p].prize);
            }
        }
        _safeTransfer(msg.sender, coinValue);
    }
    function _safeTransfer(address _to, uint _amount) internal {
        require(_to != 0);
        _to.transfer(_amount);
    }
    
    
    function addMessage(string newMessage) public restricted {
        messages.push(newMessage);
    }
    function countMessages() view public returns(uint) {
        return messages.length;
    }
    
    function getMessages(uint index) view public returns(string) {
        return messages[index];
    }
    function getLotteriesCount() public view returns(uint) {
        return lotteries.length;
    }
    function getCheckReward() view public returns(uint, uint) {
        return (checkCoin, countReward);
    }
    function getPeriodInfo() public view returns (
        uint, uint, uint, bool, uint, address
    ) {
        return (
            numPeriod,
            price,
            LPN,
            runStatus,
            timeOut,
            creator
        );
    }
    function getSummary() public view returns (
        uint, uint, bool
    ) {
        return (
            lotteryCount,
            priceCount,
            runStatus
        );
    }

/**
     * @dev Multiplies two unsigned integers, reverts on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
     * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Adds two unsigned integers, reverts on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
     * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
     * reverts when dividing by zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Оракул для цены золота
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface OracleInterface{
   function getPriceGold() external view returns (uint256);
}

contract CountryTokenFactory is Ownable {
    //AggregatorV3Interface internal dataFeed;

    OracleInterface public GoldOracleInterface;

    // Все кошельки участников
    address[] private participants;

    // Разрешенные к выпуску торговых токенов страны
    // Страна -> true/false
    mapping(string => bool) private allowedCountries;
    // Кошелек -> страна
    mapping(address => string) private countryWallets;
    // Страна -> Адрес торгового токена
    mapping(string => address) private tokenAddress;

    // countryWallet => (participant => confirmed)
    mapping(address => mapping(address => bool)) private confirmations;

    // Лог создания торгового токена
    event TokenCreated(
        address indexed tokenAddress,
        string indexed country,
        address indexed minter
    );
    // Лог предложения страны к допуску к системе
    event CountryAdditionProposal(string country, address wallet);
    event CountryRemovalProposal(string country);
    event ConfirmationReceived(string country, address participant);

    constructor (address initialOwner,address _addressGoldOracle) Ownable(initialOwner){
        GoldOracleInterface = OracleInterface(_addressGoldOracle);

      //  dataFeed = AggregatorV3Interface(
         //   0xC5981F461d74c46eB4b0CF3f4Ec79f025573B0Ea
        //);
    }

    // Модификатор "только для участников"
    modifier onlyParticipant() {
        bool isParticipant = false;
        for (uint256 i = 0; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                isParticipant = true;
                break;
            }
        }
        require(isParticipant == true, "Not a participant");
        _;
    }

    function getCurrentGoldPrice() public view returns (uint256) {
       // (, int answer, , , ) = dataFeed.latestRoundData();
        uint256 answer = GoldOracleInterface.getPriceGold();
        return answer;
    }

    // Добавляем первых участников
    function setInitialParticipants(
        address[] memory initialParticipantsWallets,
        string[] memory countries
    ) external onlyOwner {
        require(participants.length == 0, "Participants already set");
        participants = initialParticipantsWallets;
        for (uint256 i = 0; i < countries.length; i++) {
            countryWallets[initialParticipantsWallets[i]] = countries[i];
            allowedCountries[countries[i]] = true;
        }
    }

    // Функция предложения на прикрепления кошелька к стране для рассчетов в торговых токенах
    function allowCountry(
        string memory country,
        address wallet
    ) external onlyParticipant {
        require(
            bytes(country).length > 0 && allowedCountries[country] == false,
            "Country already exists"
        );
        require(
            bytes(countryWallets[wallet]).length == 0,
            "Wallet already assigned"
        );

        countryWallets[wallet] = country;
        emit CountryAdditionProposal(country, wallet);
    }

    // Функция подтверждения для участников на прикрепления кошелька к стране для рассчетов в торговых токенах
    function confirmCountryAddition(address wallet) external onlyParticipant {
        string memory country = countryWallets[wallet];
        require(bytes(country).length > 0, "Country not proposed for addition");

        require(!confirmations[wallet][msg.sender], "Already confirmed");
        confirmations[wallet][msg.sender] = true;

        emit ConfirmationReceived(country, msg.sender);

        uint256 count = 0;
        for (uint256 i = 0; i < participants.length; i++) {
            if (confirmations[wallet][participants[i]]) {
                count++;
            }
        }

        if (count == participants.length) {
            allowedCountries[country] = true;
            participants.push(wallet);
        }
    }

    // Выход страны из участия (Только через кошелек страны можно выйти страной)
    function exitCountry(string memory country) external onlyParticipant {
        require(allowedCountries[country], "Country not allowed");
        require(
            keccak256(abi.encodePacked(countryWallets[msg.sender])) ==
                keccak256(abi.encodePacked(country)),
            "Wallet does not belong to this country"
        );

        allowedCountries[country] = false;

        // Удаление всех связанных со страной кошельков
        for (uint256 i = 0; i < participants.length; i++) {
            if (
                keccak256(abi.encodePacked(countryWallets[participants[i]])) ==
                keccak256(abi.encodePacked(country))
            ) {
                delete countryWallets[participants[i]];

                // Удаление страны из участников
                participants[i] = participants[participants.length - 1];
                participants.pop();
                i--;
            }
        }

        emit CountryRemovalProposal(country);
    }

    // Фукнция для создания страной своего торгового токена
    function createToken(
        string memory country,
        string memory name,
        string memory symbol
    ) external onlyParticipant returns (address) {
        require(
            allowedCountries[country],
            "This country is not allowed to create a token."
        );
        require(
            tokenAddress[country] == address(0),
            "Commodity token is exist for this country."
        );

        CountryToken newToken = new CountryToken(
            name,
            symbol,
            country,
            tx.origin
        );
        emit TokenCreated(address(newToken), country, tx.origin);
        tokenAddress[country] = address(newToken);
        return address(newToken);
    }

    //Функция проведения клиринга вистов
    function clearingVist() external onlyParticipant {
        for(uint i = 0 ; i<participants.length; i++) {
            address adressTokenA=tokenAddress[countryWallets[participants[i]]]; // Получение токена страны А
            for(uint j = 0 ; j<participants.length; j++) {
                address adressTokenB=tokenAddress[countryWallets[participants[j]]]; // Получение токена страны B
                if(i!=j){
                    uint currentAmountTokenA=IERC20(adressTokenA).balanceOf(participants[j]); // Получение количества токенов B у страны А
                    uint currentAmountTokenB=IERC20(adressTokenB).balanceOf(participants[i]); // Получение количества токенов A у страны B
                    if ((currentAmountTokenA==0) || (currentAmountTokenB==0)){ // Проверка на ненулевые балансы для проведения операции
                        if (currentAmountTokenA>=currentAmountTokenB){  // Полное погашение минимальной стоимости из двух балансов
                            CountryToken tokenA = CountryToken(adressTokenA);
                            tokenA.burn(currentAmountTokenB);
                            CountryToken tokenB = CountryToken(adressTokenB);
                            tokenB.burn(currentAmountTokenB);
                        } else {
                            CountryToken tokenA = CountryToken(adressTokenA);
                            tokenA.burn(currentAmountTokenA);
                            CountryToken tokenB = CountryToken(adressTokenB);
                            tokenB.burn(currentAmountTokenA);
                        }
                    }
                }
            }
        }
    }
    
}

// ERC-20 торговый токен страны
contract CountryToken is ERC20, Ownable {
    string private countryOwner;

    // Лог выпуска новых торговых токенов страны
    event TokenMinted(
        address indexed tokenAddress,
        string indexed country,
        address indexed minter,
        address to,
        uint256 amount
    );
    // Лог сжигания торговых токенов страны
    event TokenBurned(
        address indexed tokenAddress,
        string indexed country,
        address indexed burner,
        uint256 amount
    );

    // Начальное предложение равно 0 при создании контракта, закрепление токена за страной
    constructor(
        string memory name,
        string memory symbol,
        string memory country,
        address countryWallet
    ) Ownable(countryWallet) ERC20(name, symbol)  {
        countryOwner = country;
        transferOwnership(countryWallet);
    }

    // Вернуть кошелек страны, закрепленный за токеном
    function getOwnerCountry() public view returns (address) {
        return owner();
    }

    // Выпуск новых токенов только кошельком страны
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit TokenMinted(address(this), countryOwner, msg.sender, to, amount);
    }

    // Выпуск новых токенов только кошельком страны
    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
        emit TokenBurned(address(this), countryOwner, msg.sender, amount);
    }
}

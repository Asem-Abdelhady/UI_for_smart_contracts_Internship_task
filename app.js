$(document).ready(() => {
    App.load()
});
let App = {
    contracts: {},
    load: async () => {
        await App.loadComponents()
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.loadEvents()
    },

    loadComponents: async () => {
        App.checkBalanceBtn = $("#checkBalanceBtn")
        App.getTokensBtn = $("#getTokensBtn")
        App.balance = $("#balance")
        App.gettingToken = $("#getToken")
        App.toAccountInput = $("#toAccountInput")
        App.numberOfTokensInput = $("#numberOfTokensInput")
        App.transferTokensBtn = $("#transferTokensBtn")
        App.transferStatus = $("#transferStatus")
    },

    loadWeb3: async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await window.ethereum.enable()
            } catch (error) {
                console.log("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            console.log("inside window")
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        App.accounts = await web3.eth.getAccounts()
        App.account = App.accounts[0]
        App.contractAddress = "0x7B3352619C20918494Fe4A0a88bbB44D7f98E668"
    },

    loadContract: async () => {
        App.contractABI = [
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "tokenOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "tokens",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "getCoin",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "numTokens",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "tokens",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "numTokens",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "delegate",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "test",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
        App.contracts.ERCBasic20 = new web3.eth.Contract(App.contractABI, App.contractAddress);
    },

    loadEvents: async () => {
        web3.eth.getBalance(App.account).then(console.log)
        App.checkBalanceBtn.click(function () {
            App.checkBalance()
        })
        App.transferTokensBtn.click(function () {
            let to = App.toAccountInput.val()
            let tokensNum = App.numberOfTokensInput.val()
            let status = App.transferTokens(to, tokensNum)
        })
        App.getTokensBtn.click(function () {
            App.getToken()
        })
    },

    getToken: async () => {
        App.updateGettingToken("Waiting confirmation")
        await App.contracts.ERCBasic20.methods.getCoin(App.account).send({from: App.account}).on('transactionHash', async function (hash) {
            App.updateGettingToken("Confirmed, wait to be mined before checking balance")
        }).on("error", async function (error) {
            App.updateGettingToken("Rejected")
        })

    },

    checkBalance: async () => {
        await App.updateBalance("getting balance")
        let tokensBalance = await App.contracts.ERCBasic20.methods.balanceOf(App.account).call()
        await App.updateBalance(tokensBalance)
    },

    updateBalance: async (balance) => {
        App.balance.html(`Balance: ${balance}`)
    },

    transferTokens: async (toAccount, tokensNum) => {
        App.updateTransferStatus("waiting confirmation")
        await App.contracts.ERCBasic20.methods.transfer(toAccount, tokensNum).send({
            from: App.account,
            value: 343000000000000
        }).on('transactionHash', async function (hash) {
            App.updateTransferStatus("Confirmed, should take seconds to be mined. Wait before checking balance")
        }).on("error", async function (error) {
            App.updateTransferStatus("Rejected")
        })
    },

    updateTransferStatus: (status) => {
        App.transferStatus.html(`Transfer status: ${status}`)
    },

    updateGettingToken: (status) => {
        App.gettingToken.html(`Getting 1 token: ${status}`)
    }

}


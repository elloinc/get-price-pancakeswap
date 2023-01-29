const ethers = require("ethers")
const { addressFactory, addressRouter, addressFrom, addressTo } = require("./AddressList")
const { erc20ABI, factoryABI, routerABI, pairABI } = require("./AbiList")

// Standard provider
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org")

// Connect to factory
const contractFactory = new ethers.Contract(addressFactory, factoryABI, provider)

// Connect to router
const contractRouter = new ethers.Contract(addressRouter, routerABI, provider)

// Call blockchain
const getPrices = async (amountInHuman) => {
    // Convert amount in
    const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider)
    const decimals = await contractToken.decimals()
    const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString()

    // Get amounts out
    const amountsOut = await contractRouter.getAmountsOut(amountIn, [addressFrom, addressTo])

    // Convert amount out -- MY WAY
    // const amountOut = amountsOut[1].toString()
    // const price = amountIn / amountOut
    // console.log(price)

    // Convert amount out - decimals
    const contractToken2 = new ethers.Contract(addressTo, erc20ABI, provider)
    const decimals2 = await contractToken2.decimals()

    // Convert amount out - human
    const amountOutHuman = ethers.utils.formatUnits(amountsOut[1].toString(), decimals2)

    // Log output
    const price = amountInHuman / amountOutHuman
    console.log("Amount In: " + amountInHuman)
    console.log("Amount Out: " + amountOutHuman)
    console.log("Price: " + price)
}

amountInHuman = "500"
getPrices(amountInHuman)

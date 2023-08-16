// src/contexts/MetaMaskContext.js

import { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
//import detectEthereumProvider from '@metamask/detect-provider'
import MetaMaskSDK from '@metamask/sdk'

const MetaMaskContext = createContext()

export const useMetaMask = () => useContext(MetaMaskContext)

export const MetaMaskProvider = ({ children }) => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [address, setAddress] = useState(null)

  const connectMetaMask = async () => {
    const MMSDK = new MetaMaskSDK()

    const ethereum = MMSDK.getProvider() // You can also access via window.ethereum
    //const provider = await detectEthereumProvider()
    if (ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [],
      })

      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      setAddress(accounts[0])
      setProvider(provider)
      setSigner(signer)
    } else {
      alert('MetaMask is not installed. Please install it and try again.')
    }
  }

  return (
    <MetaMaskContext.Provider value={{ provider, signer, address, connectMetaMask }}>
      {children}
    </MetaMaskContext.Provider>
  )
}

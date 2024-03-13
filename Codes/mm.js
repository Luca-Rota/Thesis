const _updateWallet = useCallback(async (providedAccounts) => {
  const accounts = providedAccounts || await window.ethereum.request({method: 'eth_accounts' })
  if (accounts.length === 0) {
    setWallet(disconnectedState)
    return
  }
  const chainId = await window.ethereum.request({method: 'eth_chainId'})
  setWallet({ accounts, chainId })
}, [])

useEffect(() => {
  const getProvider = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true, silent: true })
    setHasProvider(provider)
    if (provider) {
      updateWalletAndAccounts()
      window.ethereum.on('accountsChanged', updateWallet)
      window.ethereum.on('chainChanged', updateWalletAndAccounts)
    }
  }
  getProvider()
  return () => {
    window.ethereum?.removeListener('accountsChanged', updateWallet)
    window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
  }
}, [updateWallet, updateWalletAndAccounts])

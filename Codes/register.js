const signupDataCellar = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum, parseInt(wallet.chainId, 16));
    const signerPromise = provider.getSigner(wallet.accounts[0]);
    const signer = await Promise.race([signerPromise, timeoutPromise(10000)]);
    if (!signer) {
      throw new Error('Timeout');
    }
    const dataCellarRegistry = new ethers.Contract(contractAddress, contractAbi, signer);
    const registeredCheck = await isRegistered();
    if (!registeredCheck) {
      const tx = await dataCellarRegistry.registerUser(wallet.accounts[0]);
      await tx.wait(1);
      clearError();
      return true;
    } else {
      setErrorMessage('The selected account is already registered.');
      return false;
    }
  } catch (err) {
    if (err.message === 'Timeout') {
      window.location.reload();
    } else {
      setErrorMessage(`The sign up operation on DataCellar smart contract failed.`);
      return false;
    }
  }
}
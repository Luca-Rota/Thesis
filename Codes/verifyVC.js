export const verifyVc = async (vc) => {
  const providerMetamask = new BrowserProvider(window.ethereum, parseInt('0x539', 16));
  const providerConfig = {
    provider: providerMetamask,
    chainId: '0x539',
    registry: getContract("0x539")
  }
  const resolver = new Resolver(getResolver(providerConfig))
  try {
    const verifiedVC = await verifyCredential(vc, resolver);
    return verifiedVC;
  } catch (err) {
    return false;
  }
}

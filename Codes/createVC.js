async generateVerifiableCredential(publicAddress, credentials) {
  if (!credentials || !publicAddress) {
    throw new UnauthorizedException('Request should have publicAddress and credentials.');
  }
  try {
    const issuer = new ethr_did.EthrDID({
      identifier: process.env.OWN_ADDRESS,
      privateKey: process.env.PRIV_KEY,
      alg: 'ES256K-R',
      chainNameOrId: 1337,
    });
    const holder = new ethr_did.EthrDID({
      identifier: publicAddress,
      alg: 'ES256K-R',
      chainNameOrId: 1337,
    });
    const payload = await this.generateVcPayload(credentials, holder.did);
    const vc = await did_jwt_vc.createVerifiableCredentialJwt(payload, issuer);
    return vc;
  } catch (error) {
    throw new Error('Verifiable Credential creation failed.');
  }
}

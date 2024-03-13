async generateJwtToken(signature, pubAddress, nonce, credentials) {
  if (!signature || !pubAddress || !nonce || !credentials) {
    throw new UnauthorizedException('Request should have signature, pubAddress, nonce and credentials.');
  }
  const msg = `I am signing a one-time nonce: ${nonce}`;
  const msgBufHex = eth_utils.bufferToHex(Buffer.from(msg, 'utf8'))
  const address = eth_sign_utils.recoverPersonalSignature({
    data: msgBufferHex,
    sig: signature,
  });
  if (address.toLowerCase() === pubAddress.toLowerCase()) {
    try {
      const payload = await this.generatePayload(credentials, pubAddress);
      const accessToken = await this.jwtService.signAsync(payload);
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Error generating token.');
    }
  } else {
    throw new UnauthorizedException('Signature failed.');
  }
}
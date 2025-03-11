import { Keypair, PublicKey } from '@solana/web3.js';

(async () => {
    const publicKey = new PublicKey("GXbXDaVB6aXqJA6XpLaPuEhUXcYn1gxVESMojwD3m6K5");
    console.log("status1: ", PublicKey.isOnCurve(publicKey.toBytes()));

    const offCurveAddress = new PublicKey(
        "4BJXYkfvg37zEmBbsacZjeQDpTNx91KppxFJxRqrz48e",
      );
    console.log("status2: ", PublicKey.isOnCurve(offCurveAddress.toBytes()));

    const invalidKey = new PublicKey("GXbXDaVB6aXqJA6XpLaPuEhUXcYn1gxVESMojwD3m123");
    console.log("status1: ", PublicKey.isOnCurve(invalidKey.toBytes()));
})();
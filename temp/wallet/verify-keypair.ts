import { Keypair, PublicKey } from '@solana/web3.js';

(async () => {
    const secretKey = new Uint8Array();
    const keypairs = Keypair.fromSecretKey(secretKey);
    console.log('public key: ', keypairs.publicKey.toBase58());
    const publicKey = new PublicKey("GXbXDaVB6aXqJA6XpLaPuEhUXcYn1gxVESMojwD3m6K5");
    console.log("status: ", keypairs.publicKey.toBase58() === publicKey.toString());
})();
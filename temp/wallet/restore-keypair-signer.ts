import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

(async () => {
    // const secretKey = new Uint8Array();
    // const keypairs = Keypair.fromSecretKey(secretKey);
    // console.log('public key: ', keypairs.publicKey.toBase58());

    const base56SecretKey = "";
    const decodedKey = bs58.decode(base56SecretKey);
    const keypairs = Keypair.fromSecretKey(decodedKey);
    console.log('public key:r ', keypairs.publicKey.toBase58());
})();
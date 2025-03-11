import { Keypair } from '@solana/web3.js';
import bip39 from 'bip39';

(() => {
    const mnemonics = bip39.generateMnemonic();
    console.log("mnemonics: ", mnemonics);

    const secretKey = bip39.mnemonicToSeedSync(mnemonics, "");
    console.log('secretKey: ', secretKey);
    const keypairs = Keypair.fromSeed(secretKey.slice(0, 32));
    console.log("public key: ", keypairs.publicKey.toBase58());
})();
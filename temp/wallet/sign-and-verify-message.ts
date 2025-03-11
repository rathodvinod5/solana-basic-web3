import { Keypair, } from "@solana/web3.js";

(async () => {
    const keypairs = Keypair.generate();
    const message = "Hello world!";
    const encoded = new TextEncoder().encode(message);
})();
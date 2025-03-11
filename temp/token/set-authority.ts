import { AuthorityType, setAuthority } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
// import bs58 from "bs58";

(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const secretKey = new Uint8Array([]);
    const userKeypair = Keypair.fromSecretKey(secretKey);

    // const base58String = "";
    // const secretKey = bs58.decode(base58String);
    // const userKeypair = Keypair.fromSecretKey(secretKey);

    const tokenAccountAddress = new PublicKey("66edq4PJhn5ayME8qmsQv6gzgXFTsPvAftYpZtKWEG9t");
    const newAccountOwner = new PublicKey("GXbXDaVB6aXqJA6XpLaPuEhUXcYn1gxVESMojwD3m6K5");

    const status = await setAuthority(
        connection,
        userKeypair,
        tokenAccountAddress,
        userKeypair,
        AuthorityType.AccountOwner,
        newAccountOwner,
    );

    console.log('transaction status: ', status);
})();
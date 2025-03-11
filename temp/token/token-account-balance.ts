import { Connection, PublicKey } from "@solana/web3.js";

(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const tokenAccountAddress = new PublicKey("AUa7nFjEM4wzuVPmsnD3HCvsUnq1stNYbZksF9ApnDNn");
    const balance = await connection.getTokenAccountBalance(tokenAccountAddress);
    console.log("Balance: ", balance);
})();
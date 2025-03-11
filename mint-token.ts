import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("GDBtdZPnxKG4ZuScrxzdQs9sKT6qZxjJqrKSEf5BosM9");

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new PublicKey(
    "FXZ8rcw6qz1NBkNwcPXeGy57Li9S1qzta4oc7ED9DDfz",
);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS,
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);

//https://explorer.solana.com/tx/5cG1XeyhvdTzc2LkbNWiAahKYUGJdAqm1EQyP322GrerFzh5xHjuKAUmZNdB8wgWko9Xm4jkWwrNQCyVgFMhpRnU?cluster=devnet
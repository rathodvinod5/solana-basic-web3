// This uses "@metaplex-foundation/mpl-token-metadata@2" to create tokens
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";
import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
    `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

// Substitute in your token mint account
// const tokenMintAccount = new PublicKey("5MYiodZpXLqUb3kWu1sXje5UokKaRqT5r8y8VChajfWs");
const tokenMintAccount = new PublicKey("GDBtdZPnxKG4ZuScrxzdQs9sKT6qZxjJqrKSEf5BosM9");

const metadataData = {
    name: "Spidey Token",
    symbol: "TSMT",
    // Arweave / IPFS / Pinata etc link for the json file using metaplex standard for offchain data
    uri: "https://copper-organic-whale-264.mypinata.cloud/ipfs/bafkreiawfc5lwnikyz6ttryp25z3yqb3kwakbimagak2vi4zqx7nuvtxam",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID,
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();

const createMetadataAccountInstruction =
    createCreateMetadataAccountV3Instruction(
        {
            metadata: metadataPDA,
            mint: tokenMintAccount,
            mintAuthority: user.publicKey,
            payer: user.publicKey,
            updateAuthority: user.publicKey,
        },
        {
            createMetadataAccountArgsV3: {
                collectionDetails: null,
                data: metadataData,
                isMutable: true,
            },
        },
    );

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user],
);

const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet",
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}`);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet",
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}`);

//https://explorer.solana.com/address/5MYiodZpXLqUb3kWu1sXje5UokKaRqT5r8y8VChajfWs?cluster=devnet
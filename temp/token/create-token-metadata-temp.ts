import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { getExplorerLink } from "@solana-developers/helpers";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js"

(async () => {
    const secretKey = new Uint8Array([]);
    const user = Keypair.fromSecretKey(secretKey);
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
    );
    
    // Substitute in your token mint account
    const tokenMintAccount = new PublicKey("FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2");
    
    
    const metadataData = {
        name: "Spidey Token New",
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
})()


// output
// vinodrathod@Vinods-MacBook-Pro spl_token % npx esrun temp/create-token-metadata-temp
// ✅ Transaction confirmed, explorer link is: https://explorer.solana.com/tx/4DTcNtKqjeatH1moMp8uLHDyHwqsztNW6JuC2RUYu33jKn217C7EWH8HGYj2hQybGrAnBGgUXY1ZihzRK2A1LRSn?cluster=devnet
// ✅ Look at the token mint again: https://explorer.solana.com/address/FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2?cluster=devnet
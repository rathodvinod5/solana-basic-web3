import { getExplorerLink } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const tokenMintAccount = new PublicKey("FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2");
    const secretKey = new Uint8Array([]);
    const payerKeyPair = Keypair.fromSecretKey(secretKey);

    // Create a new token account or get the ATA for the payer/user
    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payerKeyPair,
        tokenMintAccount,
        payerKeyPair.publicKey,
    );

    console.log("user token account: ", userTokenAccount.address.toBase58());
    let link = getExplorerLink("address", userTokenAccount.address.toBase58(), "devnet");
    console.log("Explorer link:", link);

    // Actually mint the token
    const mintToUserStatus = await mintTo(
        connection,
        payerKeyPair,
        tokenMintAccount,
        new PublicKey(userTokenAccount.address),
        payerKeyPair,
        5 * LAMPORTS_PER_SOL,
    );

    link = getExplorerLink("transaction", mintToUserStatus, "devnet");
    console.log(`✅ Success! Mint Token Transaction: ${link}`);
})();


// output 1
// user token account:  66edq4PJhn5ayME8qmsQv6gzgXFTsPvAftYpZtKWEG9t
// Explorer link: https://explorer.solana.com/address/66edq4PJhn5ayME8qmsQv6gzgXFTsPvAftYpZtKWEG9t?cluster=devnet
// ✅ Success! Mint Token Transaction: https://explorer.solana.com/tx/ixmFndT6LGmNfVJwX1o9ka8nQRFzwu2j9y2pq13rTM2UFomVwTcr1rPxNNXKYF3by7XxMoBgCcuEqoBWjYCRiBi?cluster=devnet

// output 2
// user token account:  66edq4PJhn5ayME8qmsQv6gzgXFTsPvAftYpZtKWEG9t
// Explorer link: https://explorer.solana.com/address/66edq4PJhn5ayME8qmsQv6gzgXFTsPvAftYpZtKWEG9t?cluster=devnet
// ✅ Success! Mint Token Transaction: https://explorer.solana.com/tx/wnv63mVMrePDfV2eiTNfY5PtDKtXRFJNhBZCGRpy2jGpVoP6DtVWEeYL1pXegACrUz6xK74gfiZV8QgcbxSqHBF?cluster=devnet
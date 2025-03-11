import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const secretKey = new Uint8Array([]);
    const payer = Keypair.fromSecretKey(secretKey);
    const mintAddress = new PublicKey("FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2");
    const toUserPublicKey = new PublicKey("9Jds6ZT1suQtqQJHYkJvQBPFuJQvf8radXXokd7WFNfL");

    const fromTokenAddress = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mintAddress,
        payer.publicKey,
    );

    const toTokenAddress = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mintAddress,
        toUserPublicKey,
    );

    const status = await transfer(
        connection,
        payer,
        fromTokenAddress.address,
        toTokenAddress.address,
        payer,
        1 * LAMPORTS_PER_SOL
    );

    console.log("status: ", status)
})();
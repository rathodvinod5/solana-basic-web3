import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, 
    sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const transaction = new Transaction();
    const secret = new Uint8Array();
    const keypair = Keypair.fromSecretKey(secret);
    const toPubKey = new PublicKey("9Jds6ZT1suQtqQJHYkJvQBPFuJQvf8radXXokd7WFNfL");

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: toPubKey,
            lamports: 0.5 * LAMPORTS_PER_SOL
        })
    );

    await sendAndConfirmTransaction(connection, transaction, [keypair]);
})();
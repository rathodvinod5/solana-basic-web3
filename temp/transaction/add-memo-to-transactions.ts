import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js";


(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const secretKey = new Uint8Array([]);
    const keypair = Keypair.fromSecretKey(secretKey);
    let transaction = new Transaction();
    const instruction = new TransactionInstruction({
        keys: [{
            pubkey: keypair.publicKey,
            isSigner: true,
            isWritable: true,
        }],
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
        data: Buffer.from("Hello world message", "utf-8"),
    });
    transaction.add(instruction);

    const status = await sendAndConfirmTransaction(connection, transaction, [keypair]);
    console.log("status: ", status);
})();
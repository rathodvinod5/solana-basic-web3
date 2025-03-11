
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // const fromKeypairs = Keypair.generate();
    const secretKey = new Uint8Array([]);
    const fromKeypairs = Keypair.fromSecretKey(secretKey);
    const newAccount = Keypair.generate();

    // const airdropStatus = await connection.requestAirdrop(fromKeypairs.publicKey, LAMPORTS_PER_SOL);
    // console.log('airdropStatus: ', airdropStatus);

    const space = 0;
    const rentLamports = await connection.getMinimumBalanceForRentExemption(space);
    const createAccountTransaction = new Transaction();

    createAccountTransaction.add(
        SystemProgram.createAccount({
            fromPubkey: fromKeypairs.publicKey,
            newAccountPubkey: newAccount.publicKey,
            lamports: rentLamports,
            space: space,
            programId: SystemProgram.programId
        })
    );

    const status = await sendAndConfirmTransaction(connection, createAccountTransaction, [fromKeypairs]);
    console.log('Account created at: ', status);
})();
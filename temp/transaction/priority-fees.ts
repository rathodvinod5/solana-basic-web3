import { clusterApiUrl, ComputeBudgetProgram, Connection, Keypair, 
    LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const payer = Keypair.generate();
    const toPubKey = Keypair.generate().publicKey;

    // const secretKey = new Uint8Array([]);
    // const payer = Keypair.fromSecretKey(secretKey);
    // const toPubKey = new PublicKey("3PukPRnNPVjrQbShjnFuTEx9ThC2QTTX4DfnPAbz3Gdq");

    const airdropSign = await connection.requestAirdrop(payer.publicKey, 5 * LAMPORTS_PER_SOL);
    console.log('airdropSignature: ', airdropSign);

    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 300
    });

    const setPriorityFees = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 20000
    });

    const transaction = new Transaction();
    transaction
        .add(modifyComputeUnits)
        .add(setPriorityFees)
        .add(
            SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: toPubKey,
                lamports: 1 * LAMPORTS_PER_SOL
            })
        )
})();
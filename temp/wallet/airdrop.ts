import { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey, Keypair } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));

async function airdrop(publicKey, amount) {
    const signature = await connection.requestAirdrop(publicKey, amount);
    // const result = await connection.confirmTransaction(signature);
    return signature;
}


const secretKey = new Uint8Array();
const keypairs = Keypair.fromSecretKey(secretKey);
airdrop(new PublicKey("J2e996wB6uft4p4ae2Q3uEAy26UYHe66m9Kd9hQ7JxjC"), LAMPORTS_PER_SOL * 5).then(signature => {
    console.log('Airdrop signature:', signature);
});
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token"
import { Connection, Keypair, Transaction } from "@solana/web3.js";

(async () => {
    let connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const secretKey = new Uint8Array([]);
    const payerKeypair = Keypair.fromSecretKey(secretKey);
    const mintAccountAddress = Keypair.generate();
    let mintStatus = await createMint(
        connection,
        payerKeypair,
        payerKeypair.publicKey,
        payerKeypair.publicKey,
        9,
        mintAccountAddress
    );
    
    console.log('Mint Status:', mintStatus);
    console.log('Mint account address:', mintAccountAddress.publicKey.toBase58());
    const link = getExplorerLink("address", mintStatus.toString(), "devnet");
    console.log(`✅ Finished! Created token mint: ${link}`);
})()


// output
// Mint Status: PublicKey [PublicKey(FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2)] {
// _bn: <BN: ded81db2c9e4cfb10381fba8693d5a60ee8fd1974446137f7872cb3ea519134b>
// }
// Mint account address: FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2
// ✅ Finished! Created token mint: https://explorer.solana.com/address/FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2?cluster=devnet
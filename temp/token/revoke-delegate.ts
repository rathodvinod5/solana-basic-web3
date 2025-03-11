import { approveChecked, revoke } from "@solana/spl-token";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const secretKey = new Uint8Array([]);
    const userKeypair = Keypair.fromSecretKey(secretKey);

    // const mintAccountAddress = new PublicKey("FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2");
    const tokenAccountAddress = new PublicKey("66edq4PJhn5ayME8qmsQv6gzgXFTsPvAftYpZtKWEG9t");
    // const delegateAccount = new PublicKey("9Jds6ZT1suQtqQJHYkJvQBPFuJQvf8radXXokd7WFNfL");

    const status = await revoke(
        connection,
        userKeypair,
        tokenAccountAddress,
        userKeypair.publicKey,
    );

    console.log("status: ", status);
})();
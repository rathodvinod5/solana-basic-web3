import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const secretKey = new Uint8Array([]);
    const fromUser = Keypair.fromSecretKey(secretKey);
    // const tokenMintAccount = new PublicKey("FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2");
    const tokenMintAccount = new PublicKey("GDBtdZPnxKG4ZuScrxzdQs9sKT6qZxjJqrKSEf5BosM9");
    const toUserPublicKey = new PublicKey("9Jds6ZT1suQtqQJHYkJvQBPFuJQvf8radXXokd7WFNfL");

    const fromUserTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromUser,
        tokenMintAccount,
        fromUser.publicKey,
    );
    const toUserTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromUser,
        tokenMintAccount,
        toUserPublicKey,
    );
    console.log("from user token account: ", fromUserTokenAccount.address.toBase58());
    console.log("to user token account: ", toUserTokenAccount.address.toBase58());

    // Transfer the tokens
    const status = await transfer(
        connection,
        fromUser,
        fromUserTokenAccount.address,
        toUserTokenAccount.address,
        fromUser,
        1 * LAMPORTS_PER_SOL,
    );

    console.log(`✅ Success! Transfer Token Transaction: ${status}`);
    const link = getExplorerLink("transaction", status, "devnet");
    console.log(`Explorer link: ${link}`);
})();

// output
// vinodrathod@Vinods-MacBook-Pro spl_token % npx esrun temp/transfer-tokens
// from user token account:  66edq4PJhn5ayME8qmsQv6gzgXFTsPvAftYpZtKWEG9t
// to user token account:  AUa7nFjEM4wzuVPmsnD3HCvsUnq1stNYbZksF9ApnDNn
// ✅ Success! Transfer Token Transaction: 5ic7huockn9uxvU6RMko2hYwAhEszMYQrE8gEvULHSs4FGitrjrciAHs68viJ5BuYg4Fe3j1YwweZHD2NaFZCQRf
// Explorer link: https://explorer.solana.com/tx/5ic7huockn9uxvU6RMko2hYwAhEszMYQrE8gEvULHSs4FGitrjrciAHs68viJ5BuYg4Fe3j1YwweZHD2NaFZCQRf?cluster=devnet
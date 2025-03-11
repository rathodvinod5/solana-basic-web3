import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    // const secretKey = new Uint8Array([]);
    // const fromUser = Keypair.fromSecretKey(secretKey);

    // local2 wallet address
    const secretKey = bs58.decode("28jyyQ1x4t2CS1qTSt8fkYEWkUvTzZjSy3CcskC6Efb1KPJ5rVyg2WKr41KG8gZ3wTCQL8qddJ1HkBkdPas8w3FG");
    const fromUser = Keypair.fromSecretKey(secretKey);
    const tokenMintAccount = new PublicKey("FzteJ3UgXkK1i6cxJhsLQPUMugScRvrsPhJhJJJ72mn2");
    const toUserPublicKey = new PublicKey("CEurWzcixsWvAfMdhQvitFVyfrYB5djS36Mq46th43WJ");

    // const fromUserTokenAccount = await getOrCreateAssociatedTokenAccount(
    //     connection,
    //     fromUser,
    //     tokenMintAccount,
    //     fromUser.publicKey,
    // );
    const fromUserTokenAccount = new PublicKey("66edq4PJhn5ayME8qmsQv6gzgXFTsPvAftYpZtKWEG9t");
    const toUserTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromUser,
        tokenMintAccount,
        toUserPublicKey,
    );
    console.log("from user token account: ", fromUserTokenAccount);
    console.log("to user token account: ", toUserTokenAccount.address.toBase58());

    // Transfer the tokens
    const status = await transfer(
        connection,
        fromUser,
        fromUserTokenAccount,
        toUserTokenAccount.address,
        fromUser,
        2 * LAMPORTS_PER_SOL,
    );

    console.log(`✅ Success! Transfer Token Transaction: ${status}`);
    const link = getExplorerLink("transaction", status, "devnet");
    console.log(`Explorer link: ${link}`);
})();

// output
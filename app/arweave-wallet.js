"use client";
var arweaveWalletAddress = null;
export const arweaveWallet = addEventListener("arweaveWalletLoaded", async () => {
    // now we can interact with ArConnect
    const permissions = await window.arweaveWallet.getPermissions();
  
    if (permissions.length <= 0) {
      await window.arweaveWallet.connect(["ACCESS_ADDRESS","ACCESS_PUBLIC_KEY", "SIGN_TRANSACTION"],{
        name: "Ao messaging app",
        logo: "https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk"
      },
      // custom gateway
      {
        host: "g8way.io",
        port: 443,
        protocol: "https"
      });
    }
    arweaveWalletAddress = await window.arweaveWallet.getActiveAddress();
  });

  export const getArweaveWalletAddress = () => {
    return arweaveWalletAddress;
  }


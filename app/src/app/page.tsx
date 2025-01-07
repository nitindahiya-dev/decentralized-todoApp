"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import TodoList from "../components/TodoList";

// Import Solana Wallet Adapter dependencies
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

// Import Solana wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Home() {
  // Set the Solana network (Devnet, Testnet, or Mainnet-Beta)
  const network = WalletAdapterNetwork.Devnet;

  // Define the wallets to support
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={`https://api.${network}.solana.com`}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl text-white font-bold mb-4">Connect Your Wallet</h1>
            <WalletMultiButton />
            <div className="mt-8">
              <TodoList />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

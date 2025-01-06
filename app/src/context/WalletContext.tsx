import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { ReactNode, FC } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";

export const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <ConnectionProvider endpoint={`https://api.devnet.solana.com`}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

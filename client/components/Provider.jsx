"use client";

import { SessionProvider } from 'next-auth/react';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
          walletConnect(),
        ]}
        clientId="7181efc0eddb72ab014dfcecd8b47a2a"
      >
        {children}
      </ThirdwebProvider>
    </SessionProvider>
  )
}

export default Provider
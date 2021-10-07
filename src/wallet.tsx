import { Button, Container, Box } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, { useEffect, useState, VFC } from "react";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const Wallet: VFC = () => {
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>();

  const connect = async () => {
    activate(injectedConnector);
  };

  // useEffect(() => {
  //   connect();
  //   // TODO: ネットワークが変わった時のコールバック
  // }, []);

  return (
    <Container centerContent>
      <Box>ChainId: {chainId}</Box>
      <Box>Account: {account}</Box>
      {!active && <Button onClick={connect}>Connect Wallet</Button>}
    </Container>
  );
};

export const WalletPage: VFC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
    </Web3ReactProvider>
  );
};

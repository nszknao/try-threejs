import { Button, Container, Box } from "@chakra-ui/react";
import { Web3Provider, EtherscanProvider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, { VFC } from "react";
import useSWR from "swr";

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

const fetcher =
  (library?: Web3Provider) =>
  (...args: any) => {
    const [method, ...params] = args;
    if (library === undefined) return;
    return library[method](...params);
  };

const Wallet: VFC = () => {
  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>();
  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

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
      {/* <Box>Ξ {parseFloat(formatEther(balance)).toPrecision(4)}</Box> */}
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

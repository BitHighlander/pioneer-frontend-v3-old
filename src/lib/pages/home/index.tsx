import {
  Grid,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody, Textarea, ModalFooter, Box, Text
} from "@chakra-ui/react";
import { KkRestAdapter } from "@keepkey/hdwallet-keepkey-rest";
import { KeepKeySdk } from "@keepkey/keepkey-sdk";
import { SDK } from "@pioneer-sdk/sdk";
import * as core from "@shapeshiftoss/hdwallet-core";
import axios from "axios";
import Context from "lib/context";
import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePioneer } from "lib/context/Pioneer";

const Home = () => {
  const { state } = usePioneer();
  const { wallet, app, api, user, context } = state;

  //modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [expectedTokens, setExpectedTokens] = useState(0);
  const handleInputChangeQuery = (e: any) => setQuery(e.target.value);
  const [walletDescriptions, setWalletDescriptions] = useState([]);
  const [walletsAvailable, setWalletsAvailable] = useState([]);
  const [balances, setBalances] = useState([]);
  const [redeemHash, setRedeemHash] = useState("");
  //
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [isWalletConnecing, setWalletConnecting] = useState(false);
  const [isWalletFunded, setWalletFunded] = useState(false);
  //wallet types
  const [metamaskPaired, setMetamaskPaired] = useState(false);
  const [keepkeyPaired, setKeepkeyPaired] = useState(false);
  const [nativePaired, setNativePaired] = useState(false);
  // const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  // const { app, api, context, username, totalValueUsd } = useContext(Context);

  // const [wallet, setWallet] = useState({});
  // const [app, setApp] = useState({});

  const onStart = async function () {
    try {
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // onstart get data
  useEffect(() => {
    onStart();
  }, []);

  const setUser = async function () {
    try {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { wallets, walletDescriptions, balances, pubkeys } = user;
      // eslint-disable-next-line no-console
      console.log("wallets: ", wallets);

      //if wallet funded


      //is Connected
      setWalletConnected(true);

      // eslint-disable-next-line no-console
      console.log("walletDescriptions: ", walletDescriptions);
      // setWalletsAvailable(walletsAvailable);
      setWalletDescriptions(walletDescriptions);
      setBalances(balances);
      // eslint-disable-next-line no-console
      console.log("walletsAvailable: ", walletsAvailable);

      // eslint-disable-next-line no-console
      console.log("balances: ", balances);

      // eslint-disable-next-line no-console
      console.log("pubkeys: ", pubkeys);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-console
      console.error("header e: ", e);
      // setKeepKeyError("Bridge is offline!");
    }
  };

  // onStart()
  useEffect(() => {
    setUser();
  }, [user]); // once on startup
  
  const onSubmit = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("query: ", query);
      const bodyData = { text: query };
      const url = "http://127.0.0.1:4000/api/v1";
      let response = await axios.post(`${url}/response`, bodyData);
      response = response.data;
      // @ts-ignore
      setResponse(response);
      // eslint-disable-next-line no-console
      console.log("response: ", response);
      // eslint-disable-next-line no-console
      console.log("response: ", response);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onFund = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onFund: ");
      onOpen();
      //TODO sign a message redeeming funding
      console.log("app",app)
      console.log("wallet",wallet)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSign = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onFund: ");
      onOpen();
      //TODO sign a message redeeming funding
      
      let message = "Redeem for credits: "+new Date().getTime()

      let result = await wallet.ethSignMessage({
        addressNList: [2147483692, 2147483708, 2147483648, 0, 0],
        message,
      })
      console.log("result",result)
      setRedeemHash(result.signature)
      console.log("api",api)
      let Health = await api.Health()
      console.log("Health",Health.data)
      
      //send to pioneer
      let bodyData = {
        publicAddress:result.address,
        signature:result.signature,
        message
      }
      let resultSubmit = await api.Redemption({},bodyData)
      console.log("resultSubmit",resultSubmit)

    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Fund</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {redeemHash ? (
                  <div>
                    redeemHash: {redeemHash}
                  </div>
              ) : (
                  <div>
                    <Text>
                      Sign MSG to redeem funding Expected: {expectedTokens}
                      <Button
                          mt={4}
                          colorScheme="teal"
                          // isLoading={props.isSubmitting}
                          type="submit"
                          onClick={onSign}
                      >
                        Submit
                      </Button>
                    </Text>
                  </div>
              )}

            </ModalBody>

            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Grid gap={4}>
          {isWalletConnected ? (
              <div>
                {isWalletFunded ? (
                    <div>
                      <FormControl>
                        <FormLabel>Ask A Question</FormLabel>
                        <Input type="email" onChange={handleInputChangeQuery} />
                        <FormHelperText />
                        <Button
                            mt={4}
                            colorScheme="teal"
                            // isLoading={props.isSubmitting}
                            type="submit"
                            onClick={onSubmit}
                        >
                          Submit
                        </Button>
                      </FormControl>
                    </div>
                ) : (
                    <div>
                      Not Funded
                      <Button
                          onClick={onFund}
                      >Fund</Button>
                    </div>
                )}
              </div>
          ) : (
              <div>
                Not Connected
              </div>
          )}
        </Grid>
      </div>
  );
};

export default Home;

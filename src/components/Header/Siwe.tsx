import { getCsrfToken, signIn, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import CustomConnectButton from '../ConnectButton';

function Siwe() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const { data: session, status: authStatus } = useSession();

  const [status, setstatus] = useState<string>(authStatus);
  const handleLogin = async () => {
    try {
      setstatus('loading');
      const callbackUrl = '/protected';
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    if (isConnected && !session) {
      handleLogin();
    }
  }, [isConnected, session]);

  useEffect(() => {
    if (!isConnected) {
      signOut({
        redirect: false,
      });
    }
  }, [isConnected]);

  useEffect(() => {
    setstatus(authStatus);
  }, [authStatus]);

  return <CustomConnectButton status={status} />;
}

export default Siwe;

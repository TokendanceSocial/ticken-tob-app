import { ConnectButton } from '@rainbow-me/rainbowkit';
import CustomAvatar from '../CustomAvatar';

export default function CustomConnectButton({ status }: { status: string }) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,

        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && status !== 'loading';

        const connected = ready && account && chain;
        const authenticated = ready && status === 'authenticated';

        if (chain?.unsupported) {
          openChainModal();
        } else if (!connected) {
          openConnectModal();
        }
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              console.log(status);
              if (!ready) return null;
              if (!connected || !authenticated) {
                return (
                  <button
                    className='connect-btn'
                    onClick={() => {
                      openConnectModal();
                      // onConnect();
                    }}
                    type='button'
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button className='connect-btn error' onClick={openChainModal} type='button'>
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type='button'
                    className='connect-btn switch-network-btn'
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 22,
                          height: 22,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 22, height: 22 }}
                          />
                        )}
                      </div>
                    )}
                    <span>{chain.name}</span>
                    <svg fill='none' height='7' width='14' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001'
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2.5'
                        xmlns='http://www.w3.org/2000/svg'
                      ></path>
                    </svg>
                  </button>
                  <button
                    className='connect-btn account-btn'
                    onClick={openAccountModal}
                    type='button'
                  >
                    <div>{account.displayBalance ? account.displayBalance : ''}</div>
                    <div className='name'>
                      <div className='avatar'>
                        <CustomAvatar
                          address={account.address}
                          ensImage={account.ensAvatar}
                          size={24}
                        />
                      </div>
                      <div>{account.displayName}</div>
                      <div style={{ marginLeft: 8 }}>
                        <svg fill='none' height='7' width='14' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2.5'
                            xmlns='http://www.w3.org/2000/svg'
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

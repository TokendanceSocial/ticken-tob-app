import type { AvatarComponent } from '@rainbow-me/rainbowkit';
import { identicon } from 'minidenticons';
import Image from 'next/image';

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <Image
      alt=''
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999, overflow: 'hidden' }}
    />
  ) : (
    <div
      className='custom-avatar'
      style={{ width: size, borderRadius: 999, overflow: 'hidden', height: size }}
      dangerouslySetInnerHTML={{
        __html: identicon(address),
      }}
    />
  );
};
export default CustomAvatar;

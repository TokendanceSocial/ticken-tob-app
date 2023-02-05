import { Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { getBase64, getMeta, renderNftImg } from '@/utils/nftUpload';

export default function ImageRender({ metaURL }: { metaURL: string }) {
  const [imageUrl, setImageUrl] = useState<string>();
  const fetchImage = useCallback(async () => {
    const { image } = await getMeta(metaURL);
    const url = renderNftImg(image);
    const data = await getBase64(url);
    setImageUrl(data);
  }, [metaURL]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {!imageUrl ? (
        <Skeleton.Image active />
      ) : (
        <img alt='cover' src={imageUrl} width={100} height={44} />
      )}
    </div>
  );
}

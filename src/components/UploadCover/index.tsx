import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function UploadCover(props?: { value?: File; onChange?: (file: File) => void }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // uploadImage(info.file.name, info.file.originFileObj as File).then((res) => {
      //   setLoading(false);
      //   setImageUrl(res);
      // });
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        props?.onChange?.(info.file.originFileObj as File);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <ImgCrop rotate aspect={366 / 158}>
      <Upload
        name='avatar'
        listType='picture-card'
        className='upload-cover'
        showUploadList={false}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </ImgCrop>
  );
}

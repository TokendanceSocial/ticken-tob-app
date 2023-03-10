import { Layout } from 'antd';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React from 'react';
import CustomConnectButton from '../ConnectButton/index';
import Siwe from './Siwe';
import logo from '@/assets/images/logo.png';

const { Header } = Layout;

export default function TickenHeader() {
  const { t } = useTranslation();

  return (
    <div className='ticken-header'>
      <div className='logo'>
        <Image src={logo} width={38} height={38} alt='' />
        <div className='logo-text'>{t('title')}</div>
      </div>
      <div className='account-info'>
        <Siwe />
      </div>
    </div>
  );
}

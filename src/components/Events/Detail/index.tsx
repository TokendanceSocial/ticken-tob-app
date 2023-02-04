import { LeftOutlined, WifiOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Col, Form, Row, Card, Descriptions, message } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import WriteOff from '../WriteOff';
import { useFetchEventDetail } from '@/abihooks';
import AirDrop from '@/components/AirDrop';
import { EventType } from '@/constanst/events';

export default function EventDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();

  const address = useMemo(() => {
    return router.query.address as string;
  }, [router.query.address]);
  const { data, run, error } = useFetchEventDetail(address);
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address: accountAddress,
    chainId: chain?.id,
  });
  const [airdropOpen, setAirdropOpen] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      type: EventType.PublicSale,
      price: 100,
    });
  }, [form]);

  useEffect(() => {
    if (!error) return;
    message.error(error.toString());
  }, [error]);

  useEffect(() => {
    run({
      eventAddress: address,
      address: accountAddress || '',
    });
  }, [accountAddress, address, run]);

  const basic = useMemo(() => data?.basic, [data]);

  return (
    <div className='create-event-form'>
      <h1 className='create-event-form__title'>{t('eventDetail')}</h1>
      <Row justify='space-between'>
        <Col>
          <Button icon={<LeftOutlined />} onClick={() => router.back()}>
            {t('back')}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => setAirdropOpen(true)}
            type='primary'
            style={{ marginRight: 16 }}
            icon={<WifiOutlined />}
          >
            {t('airdrop')}
          </Button>
        </Col>
      </Row>
      <Card title={t('eventBasic')}>
        <Row>
          <Col>
            <Descriptions layout='vertical'>
              <Descriptions.Item label={t('name')}>{basic?.name}</Descriptions.Item>
              <Descriptions.Item label={t('symbol')}>{basic?.symbol}</Descriptions.Item>
              <Descriptions.Item label={t('holdTime')}>
                {moment.unix(basic?.holdTime).format('LL')}
              </Descriptions.Item>
              <Descriptions.Item label={t('location')}>{basic?.location}</Descriptions.Item>
              <Descriptions.Item label={t('description')}>{basic?.description}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col>
            <Image src={basic?.image || ''} alt='cover' width={366} height={158} />
          </Col>
        </Row>
      </Card>
      <Card title={t('eventType')}>
        <Descriptions layout='vertical'>
          <Descriptions.Item label={t('eventType')}>{basic?.eventType}</Descriptions.Item>
          <Descriptions.Item
            label={t('price')}
          >{`${basic?.price} ${balance?.symbol}`}</Descriptions.Item>
          <Descriptions.Item label={t('rebates')}>{`${basic?.rebates / 10}%`}</Descriptions.Item>
        </Descriptions>
      </Card>
      <WriteOff />
      <AirDrop
        onCancel={() => setAirdropOpen(false)}
        open={airdropOpen}
        address={address}
        name={basic?.name}
      />
    </div>
  );
}

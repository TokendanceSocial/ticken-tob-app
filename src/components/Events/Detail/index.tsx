import { CloseOutlined, LeftOutlined, WifiOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Card, Descriptions, message, Skeleton } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import WriteOff from '../WriteOff';
import { useCloseEvent, useFetchEventDetail } from '@/abihooks';
import AirDrop from '@/components/AirDrop';
import { BACK_DELAY } from '@/constanst';
import { EventType, typeText } from '@/constanst/events';
import { getMeta, renderNftImg } from '@/utils/nftUpload';

export default function EventDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();

  const [meta, setMeta] = useState<{
    image: string;
    location: string;
    description: string;
  }>();
  const address = useMemo(() => {
    return router.asPath.split('=')[1];
  }, [router.asPath]);
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

  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    run({
      eventAddress: address,
      address: accountAddress || '',
    }).then((res) => setloading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountAddress, address]);

  const basic = useMemo(() => {
    return data?.basic;
  }, [data]);

  const { run: close, error: closeError, loading: closeLoading } = useCloseEvent();

  useEffect(() => {
    if (!closeError) return;
    message.error(closeError.toString());
  }, [closeError]);

  useEffect(() => {
    if (!data?.basic) return;
    const metaURL = data?.basic.metaURL;

    getMeta(metaURL).then(setMeta);
  }, [data?.basic]);

  console.log(data, basic?.price.toNumber());

  return loading ? (
    <Skeleton active />
  ) : (
    <div className='event-detail'>
      <h1 className='event-detail__title'>{t('eventDetail')}</h1>
      <Row justify='space-between'>
        <Col>
          <Button
            icon={<LeftOutlined />}
            onClick={() => router.push(router.asPath.replace(/\/detail.*/, ''))}
          >
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
          <Button
            onClick={async () => {
              await close(address);
              message.success(t('closeSuccessContent'));
              setTimeout(() => {
                router.push(router.asPath.replace(/\/detail.*/, ''));
              }, BACK_DELAY);
            }}
            type='primary'
            danger
            loading={closeLoading}
            style={{ marginRight: 16 }}
            icon={<CloseOutlined />}
          >
            {t('close')}
          </Button>
        </Col>
      </Row>
      <Card title={t('eventBasic')}>
        <Row>
          <Col style={{ width: 'calc(100% - 356px)', paddingRight: 20 }}>
            <Descriptions column={1} layout='vertical'>
              <Descriptions.Item label={t('name')}>{basic?.name}</Descriptions.Item>
              <Descriptions.Item label={t('symbol')}>{basic?.symbol}</Descriptions.Item>
              <Descriptions.Item label={t('holdTime')}>
                {moment.unix(Number(basic?.holdTime)).format('LL')}
              </Descriptions.Item>
              <Descriptions.Item label={t('location')}>{meta?.location}</Descriptions.Item>
              <Descriptions.Item label={t('description')}>{meta?.description}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col style={{ width: 336, height: 158 }}>
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={renderNftImg(meta?.image || '')}
                alt='cover'
                style={{ width: 366, height: 158 }}
              />
            }
          </Col>
        </Row>
      </Card>
      <Card title={t('eventType')}>
        <Descriptions column={1} layout='vertical'>
          <Descriptions.Item label={t('eventType')}>
            {typeText[basic?.eventType || 0]}
          </Descriptions.Item>
          <Descriptions.Item label={t('price')}>{`${basic?.price.toNumber()} ${
            balance?.symbol
          }`}</Descriptions.Item>
          {basic?.eventType === EventType.InviteOnly && (
            <Descriptions.Item label={t('rebates')}>{`${
              Number(basic?.rebates) / 10
            }%`}</Descriptions.Item>
          )}
        </Descriptions>
      </Card>
      <WriteOff eventAddress={address} />
      <AirDrop
        onCancel={() => setAirdropOpen(false)}
        open={airdropOpen}
        address={address}
        name={basic?.name}
      />
    </div>
  );
}

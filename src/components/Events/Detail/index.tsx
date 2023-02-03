import { LeftOutlined, WifiOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Col, Form, Row } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EventForm from '../Form';
import WriteOff from '../WriteOff';
import AirDrop from '@/components/AirDrop';
import { EventType } from '@/constanst/events';
import { fetchEventDetail } from '@/utils/event';

export default function EventDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();

  const { data, run } = useRequest(fetchEventDetail, {
    manual: true,
  });
  const [airdropOpen, setAirdropOpen] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      type: EventType.PublicSale,
      price: 100,
    });
  }, [form]);

  const address = useMemo(() => {
    return router.query.address as string;
  }, [router.query.address]);

  useEffect(() => {
    run(address);
  }, [address, run]);

  const name = useMemo(() => data?.name || '', [data]);

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

      <EventForm form={form} />
      <WriteOff />
      <AirDrop
        onCancel={() => setAirdropOpen(false)}
        open={airdropOpen}
        address={address}
        name={name}
      />
    </div>
  );
}

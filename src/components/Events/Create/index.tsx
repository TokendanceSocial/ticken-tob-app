import { LeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, message } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import EventForm from '../Form';
import { useCreateEvent } from '@/abihooks';
import { EventType } from '@/constanst/events';
import { nftUpload } from '@/utils/nftUpload';
export default function CreateEvent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { run, error } = useCreateEvent();

  const { address } = useAccount();
  useEffect(() => {
    form.setFieldsValue({
      eventType: EventType.PublicSale,
      price: 100,
    });
  }, [form]);

  useEffect(() => {
    if (!error) return;
    message.error(error.toString());
  }, [error]);

  const submit = useCallback(async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    const mata = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      image: formData.image,
    };

    try {
      const res = await nftUpload(mata);
      const data = {
        name: formData.name,
        symbol: formData.symbol,
        eventType: formData.eventType,
        holdTime: moment(formData.holdTime).unix(),
        price: formData.price,
        rebates: formData.rebates ? formData.rebates * 10 : undefined,
        meta: res,
        receiver: address || '',
        personLimit: 100,
      };

      console.log(data);
      const a = await run(data);
      console.log(a);
    } catch (error) {}
  }, [run, form, address]);

  return (
    <div className='create-event-form'>
      <h1 className='create-event-form__title'>{t('createEvent')}</h1>
      <Row justify='space-between'>
        <Col>
          <Button icon={<LeftOutlined />} onClick={() => router.back()}>
            {t('back')}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={submit}
            style={{ marginRight: 16 }}
            type='primary'
            icon={<SaveOutlined />}
          >
            {t('submit')}
          </Button>
        </Col>
      </Row>

      <EventForm form={form} />
    </div>
  );
}

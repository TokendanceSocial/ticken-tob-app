import { Card, Col, DatePicker, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import UploadCover from '@/components/UploadCover';

export default function EventBasicForm({ form }: { form: FormInstance }) {
  const { t } = useTranslation();
  const eventName = useMemo(() => {
    return (
      <Form.Item
        label={t('eventName')}
        rules={[
          {
            required: true,
          },
        ]}
        name='name'
      >
        <Input
          placeholder={
            t('pleaseEnter', {
              name: t('eventName'),
            }) || ''
          }
          showCount
          maxLength={30}
        />
      </Form.Item>
    );
  }, [t]);
  const eventSymbol = useMemo(() => {
    return (
      <Form.Item label={t('symbol')} name='symbol'>
        <Input
          placeholder={
            t('pleaseEnter', {
              name: t('eventSymbol'),
            }) || ''
          }
          showCount
          maxLength={15}
        />
      </Form.Item>
    );
  }, [t]);

  const eventTime = useMemo(() => {
    return (
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        label={t('time')}
        name='holdTime'
      >
        <DatePicker showTime style={{ width: '100% ' }} />
      </Form.Item>
    );
  }, [t]);
  const location = useMemo(() => {
    return (
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        label={t('location')}
        name='location'
      >
        <Input
          placeholder={
            t('pleaseEnter', {
              name: t('location'),
            }) || ''
          }
          maxLength={40}
          showCount
        />
      </Form.Item>
    );
  }, [t]);
  const description = useMemo(() => {
    return (
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        label={t('description')}
        name='description'
      >
        <Input.TextArea
          placeholder={
            t('pleaseEnter', {
              name: t('description'),
            }) || ''
          }
          maxLength={500}
          rows={4}
          showCount
        />
      </Form.Item>
    );
  }, [t]);
  const cover = useMemo(() => {
    return (
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        label={t('cover')}
        name='image'
      >
        <UploadCover />
      </Form.Item>
    );
  }, [t]);
  return (
    <Card title={t('eventBasic')}>
      <Form layout='vertical' form={form}>
        <Row>
          <Col flex={1}>
            {eventName}
            {eventSymbol}
            {eventTime}
            {location}
            {description}
          </Col>
          <Col style={{ width: 336, height: 158, marginLeft: 20 }}>{cover}</Col>
        </Row>
      </Form>
    </Card>
  );
}

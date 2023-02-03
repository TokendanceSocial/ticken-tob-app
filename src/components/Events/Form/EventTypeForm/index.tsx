import { Card, Col, Form, Input, InputNumber, Radio, Row } from 'antd';
import type { FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { useAccount, useNetwork, useBalance } from 'wagmi';
import { EventType, typeText } from '@/constanst/events';

export default function EventTypeForm({ form }: { form: FormInstance }) {
  const { t } = useTranslation();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data } = useBalance({
    address,
    chainId: chain?.id,
  });

  const type = useMemo(() => {
    return (
      <Form.Item name='type'>
        <Radio.Group>
          {Object.keys(typeText).map((key) => (
            <Radio key={key} value={Number(key)}>
              {t(typeText[Number(key)])}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    );
  }, [t]);

  const price = useMemo(() => {
    return (
      <Form.Item label={t('price')} name='price'>
        <InputNumber addonAfter={data?.symbol} min={0} style={{ width: 200 }} />
      </Form.Item>
    );
  }, [data, t]);

  const rebates = useMemo(() => {
    return (
      <Form.Item
        shouldUpdate={(prev, cur) => {
          return prev.type !== cur.type;
        }}
      >
        {() => {
          if (form.getFieldValue('type') === EventType.PublicSale) return null;
          return (
            <Form.Item label={t('rebates')} name='rebates'>
              <InputNumber addonAfter='%' min={0} max={100} precision={1} style={{ width: 100 }} />
            </Form.Item>
          );
        }}
      </Form.Item>
    );
  }, [form, t]);

  return (
    <Card title={t('eventBasic')}>
      <Form form={form}>
        {type}
        <Row gutter={[20, 0]}>
          <Col>{price}</Col>
          <Col>{rebates}</Col>
        </Row>
      </Form>
    </Card>
  );
}

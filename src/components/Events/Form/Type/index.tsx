import { Card, Form, Input, Radio } from 'antd';
import type { FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';
import React from 'react';

export default function EventTypeForm({ form }: { form: FormInstance }) {
  const { t } = useTranslation();
  return (
    <Card title={t('eventBasic')}>
      <Form form={form}>
        <Form.Item name='type'>
          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Card>
  );
}

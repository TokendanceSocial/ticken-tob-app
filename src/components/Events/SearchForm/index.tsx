import { DatePicker, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';
import React from 'react';

export default function EventsSearchForm({
  submit,
  form,
}: {
  form: FormInstance;
  submit: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div style={{ marginBottom: 16, marginRight: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <Form.Item name='name'>
          <Input.Search placeholder={t('eventName') || ''} onSearch={submit} />
        </Form.Item>
        <Form.Item name='timeRange'>
          <DatePicker.RangePicker onChange={submit} />
        </Form.Item>
        <Form.Item name='type'>
          <Select placeholder={t('eventType')} options={[]} onChange={submit} />
        </Form.Item>
      </Form>
    </div>
  );
}

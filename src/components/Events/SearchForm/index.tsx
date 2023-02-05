import { DatePicker, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { typeText } from '@/constanst/events';

export default function EventsSearchForm({
  submit,
  form,
}: {
  form: FormInstance;
  submit: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div style={{ marginRight: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <Form.Item name='name'>
          <Input.Search placeholder={t('eventName') || ''} onSearch={submit} />
        </Form.Item>
        <Form.Item name='holdTime'>
          <DatePicker.RangePicker onChange={submit} />
        </Form.Item>
        <Form.Item name='eventType'>
          <Select
            allowClear
            placeholder={t('eventType')}
            options={Object.keys(typeText).map((key) => ({
              label: typeText[Number(key)],
              value: Number(key),
            }))}
            onChange={submit}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';
import React from 'react';

export default function AddAirdropForm({ form }: { form: FormInstance }) {
  const { t } = useTranslation();
  return (
    <Form form={form}>
      <Form.List name='list'>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item label={t('address')} required={true} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      message: t('pleaseInputAddress') || '',
                    },
                    {
                      len: 25,
                      type: 'string',
                      message: t('addressValidate') || '',
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder={
                      t('pleaseEnter', {
                        name: t('address'),
                      }) || ''
                    }
                    style={{ width: '90%' }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    style={{ marginLeft: 12 }}
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                {t('addAddress')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}

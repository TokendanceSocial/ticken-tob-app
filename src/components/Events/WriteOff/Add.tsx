import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AddWriteOff({ form }: { form: FormInstance }) {
  const { t } = useTranslation();
  return (
    <Form form={form}>
      <Form.List name='address'>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item required={true} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
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

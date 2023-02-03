import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function WriteOff() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <Card
      title={t('writeOff')}
      extra={
        <Button
          icon={<SaveOutlined />}
          onClick={async () => {
            await form.validateFields();
            console.log(form.getFieldsValue());
          }}
          type='primary'
        >
          {t('save')}
        </Button>
      }
    >
      <Form form={form}>
        <Form.List name='addresses'>
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
                      style={{ width: '60%' }}
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
    </Card>
  );
}

import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddWriteOff } from '@/abihooks';

export default function WriteOff({ eventAddress }: { eventAddress: string }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { run, error, loading } = useAddWriteOff();
  useEffect(() => {
    if (!error) return;
    message.error(error.toString());
  }, [error]);

  return (
    <Card
      title={t('writeOff')}
      extra={
        <Button
          icon={<SaveOutlined />}
          onClick={async () => {
            await form.validateFields();
            const address = form.getFieldValue('addresses');
            await run({
              address,
              eventAddress,
            });
            message.success(t('writeOffSucces'));
          }}
          type='primary'
          loading={loading}
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

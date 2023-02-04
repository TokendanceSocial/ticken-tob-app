import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Skeleton, message } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddWriteOff, useFetchWriteOffList } from '@/abihooks';

export default function WriteOff({ eventAddress }: { eventAddress: string }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { run, error, loading } = useAddWriteOff();
  const { run: fetchList, loading: listLoading, data } = useFetchWriteOffList();

  const handleFetch = useCallback(async () => {
    try {
      await fetchList(eventAddress);
    } catch (error) {}
  }, [eventAddress, fetchList]);

  useEffect(() => {
    if (!eventAddress) return;
    console.log('====', eventAddress);
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventAddress]);

  useEffect(() => {
    console.log(data);
    if (!data) return;
    form.setFieldValue('addresses', data);
  }, [data, form]);

  return (
    <Card
      title={t('writeOff')}
      extra={
        <Button
          icon={<SaveOutlined />}
          onClick={async () => {
            await form.validateFields();
            const address = form.getFieldValue('addresses');
            try {
              await run({
                address,
                eventAddress,
              });
              message.success(t('writeOffSucces'));
            } catch (error) {}
          }}
          type='primary'
          loading={loading}
        >
          {t('save')}
        </Button>
      }
    >
      <Skeleton loading={listLoading} active>
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
      </Skeleton>
    </Card>
  );
}

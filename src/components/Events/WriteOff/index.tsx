import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Skeleton, Table, message } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddWriteOff from './Add';
import { useAddWriteOff, useFetchWriteOffList } from '@/abihooks';
const columns = [
  {
    dataIndex: 'address',
    title: ' ',
  },
];
export default function WriteOff({ eventAddress }: { eventAddress: string }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { run } = useAddWriteOff();
  const { run: fetchList, loading, data } = useFetchWriteOffList();

  const handleFetch = useCallback(async () => {
    try {
      await fetchList(eventAddress);
    } catch (error) {}
  }, [eventAddress, fetchList]);

  useEffect(() => {
    if (!eventAddress) return;
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventAddress]);

  useEffect(() => {
    if (!data) return;
    form.setFieldValue('addresses', data);
  }, [data, form]);

  const handleAdd = useCallback(async () => {
    await form.validateFields();
    const address = form.getFieldValue('address');
    await run({
      address,
      eventAddress,
    });
    await handleFetch();
    message.success(t('writeOffSucces'));
  }, [eventAddress, form, handleFetch, run, t]);
  const [modal, contextHolder] = Modal.useModal();

  return (
    <Card
      title={t('writeOff')}
      bodyStyle={{
        paddingTop: 0,
      }}
      extra={
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => {
            modal.confirm({
              width: 600,
              title: t('addWriteOff'),
              content: <AddWriteOff form={form} />,
              onOk: handleAdd,
            });
          }}
        >
          {t('addWriteOff')}
        </Button>
      }
    >
      <Table
        className='ticken-table '
        loading={loading}
        columns={columns}
        dataSource={data?.map((item) => {
          return {
            address: item,
          };
        })}
        rowKey={(record) => record.address}
        pagination={false}
      />

      {contextHolder}
    </Card>
  );
}

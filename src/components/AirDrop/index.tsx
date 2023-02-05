import { FileOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Modal, Table, message } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddAirdropForm from './Add';
import AirDropDetail from './Detail';
import { useAddAirdrop, useFetchAirDropList } from '@/abihooks';

export default function AirDrop({
  name,
  address,
  open,

  onCancel,
}: {
  address: string;
  name?: string;
  open: boolean;
  onCancel: () => void;
}) {
  const { t } = useTranslation();

  const { run: fetch, data, loading } = useFetchAirDropList();

  const [detailInfo, setDetailInfo] = useState({
    open: false,
    id: '',
  });

  const [modal, contextHolder] = Modal.useModal();

  const handleFetch = useCallback(async () => {
    try {
      await fetch(address);
    } catch (error) {}
  }, [address, fetch]);

  useEffect(() => {
    if (open) {
      handleFetch();
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const columns = useMemo(() => {
    return [
      // {
      //   dataIndex: 'time',
      //   title: t('operationTime'),
      //   render(time: number) {
      //     return moment.unix(time).format('LL');
      //   },
      // },
      {
        dataIndex: 'address',
        // title: t('operationAddress'),
      },
      // {
      //   dataIndex: 'amount',
      //   title: t('amount'),
      // },
      // {
      //   dataIndex: 'status',
      //   title: t('status'),
      // },
      // {
      //   dataIndex: 'detail',
      //   title: t('detail'),
      //   render(_: string, record: any) {
      //     return (
      //       <Button
      //         onClick={() =>
      //           setDetailInfo({
      //             open: true,
      //             id: record.id,
      //           })
      //         }
      //         icon={<FileOutlined />}
      //       />
      //     );
      //   },
      // },
    ];
  }, []);

  const { run: add, loading: addLoading } = useAddAirdrop();

  const [form] = Form.useForm();
  return (
    <Modal
      title={t('airdropTitle', {
        name,
      })}
      width={700}
      open={open}
      onCancel={onCancel}
      footer={
        <Button
          type='primary'
          onClick={() =>
            modal.confirm({
              width: 600,
              title: t('addAirdrop'),
              content: <AddAirdropForm form={form} />,
              afterClose: async () => {
                try {
                  await handleFetch();
                } catch (error) {}
              },
              onOk: async () => {
                await add({
                  eventAddress: address,
                  address: form.getFieldValue('address'),
                });
                await handleFetch();
                message.success(t('addAirdropSuccess'));
                return Promise.resolve();
              },
            })
          }
          icon={<PlusOutlined />}
        >
          {t('addAirdrop')}
        </Button>
      }
    >
      <Table
        rowKey={(record) => record.address}
        loading={loading}
        columns={columns}
        pagination={false}
        className='ticken-table '
        dataSource={data?.map((item) => {
          return {
            address: item,
          };
        })}
      />
      {contextHolder}
      <AirDropDetail
        onCancel={() => setDetailInfo({ open: false, id: '' })}
        recordId={detailInfo.id}
        open={detailInfo.open}
      />
    </Modal>
  );
}

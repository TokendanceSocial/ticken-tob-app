import { FileOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Modal, Table, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddAirdropForm from './Add';
import AirDropDetail from './Detail';
import { addAirdrop, fetchAirDropList } from '@/utils/event';

export default function AirDrop({
  name,
  address,
  open,

  onCancel,
}: {
  address: string;
  name: string;
  open: boolean;
  onCancel: () => void;
}) {
  const { t } = useTranslation();

  const { run, data } = useRequest(fetchAirDropList, {
    manual: true,
  });

  const [detailInfo, setDetailInfo] = useState({
    open: false,
    id: '',
  });

  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    if (open) {
      run(address);
    }
  }, [address, open, run]);

  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'time',
        title: t('operationTime'),
        render(time: number) {
          return moment.unix(time).format('LL');
        },
      },
      {
        dataIndex: 'address',
        title: t('operationAddress'),
      },
      {
        dataIndex: 'amount',
        title: t('amount'),
      },
      {
        dataIndex: 'status',
        title: t('status'),
      },
      {
        dataIndex: 'detail',
        title: t('detail'),
        render(_: string, record: any) {
          return (
            <Button
              onClick={() =>
                setDetailInfo({
                  open: true,
                  id: record.id,
                })
              }
              icon={<FileOutlined />}
            />
          );
        },
      },
    ];
  }, [t]);

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
              onOk: async () => {
                try {
                  await addAirdrop(address, form.getFieldValue('list'));
                  run(address);
                  message.success(t('addSuccess'));
                } catch (error) {
                  message.error(t('addFail'));
                }
              },
            })
          }
          icon={<PlusOutlined />}
        >
          {t('addAirdrop')}
        </Button>
      }
    >
      <Table columns={columns} dataSource={data} />
      {contextHolder}
      <AirDropDetail
        onCancel={() => setDetailInfo({ open: false, id: '' })}
        recordId={detailInfo.id}
        open={detailInfo.open}
      />
    </Modal>
  );
}

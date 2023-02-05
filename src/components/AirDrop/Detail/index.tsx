import { useRequest } from 'ahooks';
import { Descriptions, Modal, Table } from 'antd';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { fetchAirDropDetail } from '@/utils/event';
const columns = [
  {
    dataIndex: 'transactionHash',
    title: 'transactionHash',
    render(time: number) {
      return moment.unix(time).format('LLL');
    },
  },
  {
    dataIndex: 'address',
    title: 'address',
  },
  {
    dataIndex: 'ticketId',
    title: 'ticketId',
  },
];
export default function AirDropDetail({
  recordId,
  onCancel,
  open,
}: {
  recordId: string;
  onCancel: () => void;
  open: boolean;
}) {
  const { t } = useTranslation();
  const { data, run } = useRequest(fetchAirDropDetail, {
    manual: true,
  });
  useEffect(() => {
    if (!open) return;
    run(recordId);
  }, [open, recordId, run]);

  return (
    <Modal
      title={t('airdropTitle', {
        name,
      })}
      width={700}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Descriptions title={t('airdropInfo')}>
        <Descriptions.Item label={t('operationTime')}>{data?.operationTime}</Descriptions.Item>
        <Descriptions.Item label={t('operationAddress')}>
          {data?.operationAddress}
        </Descriptions.Item>
        <Descriptions.Item label={t('amount')}>{data?.amount}</Descriptions.Item>
        <Descriptions.Item label={t('status')}>{data?.status}</Descriptions.Item>
      </Descriptions>
      <Table title={() => t('airdropList')} columns={columns} dataSource={data?.list} />
    </Modal>
  );
}

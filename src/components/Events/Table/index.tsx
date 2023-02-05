import {
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  ProfileOutlined,
  ShareAltOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { Button, Table, Tooltip, message } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useMemo, useState } from 'react';
import ImageRender from './ImageRender';
import { useCloseEvent } from '@/abihooks';
import AirDrop from '@/components/AirDrop';
import { EventState, stateText, typeText } from '@/constanst/events';
import { EventInfo } from '@/typechain-types/contracts/Admin';
import { copy } from '@/utils/copy';

const getColumns = (actionRender: (...args: any) => JSX.Element[]) => [
  {
    title: '#',
    dataIndex: 'metaURL',
    key: 'metaURL',
    render(metaURL: string) {
      return <ImageRender metaURL={metaURL} />;
    },
  },
  {
    title: 'eventName',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'eventType',
    dataIndex: 'eventType',
    key: 'eventType',
    render(type: number) {
      return typeText[type];
    },
  },

  {
    title: 'time',
    dataIndex: 'holdTime',
    key: 'holdTime',
    render(time: number) {
      return moment.unix(time).format('LLL');
    },
  },
  {
    title: 'status',
    dataIndex: 'state',
    key: 'state',
    render(val: EventState) {
      return stateText[val];
    },
  },
  {
    title: 'actions',
    dataIndex: 'actions',
    key: 'actions',
    render: actionRender,
  },
];
export default function EventsTable(tableProps: {
  [key: string]: any;
  dataSource: any;
  loading: boolean;
  onChange: (pagination: any, filters?: any, sorter?: any) => void;
  pagination: any;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);
  const { run: close, error: closeError } = useCloseEvent();

  const [airdrop, setAirdrop] = useState({
    open: false,
    name: '',
    address: '',
  });
  const actionRender = useCallback(
    (_: string, record: EventInfo.AllInfoStructOutput['basic']) => {
      const btns = [
        {
          title: t('eventsDetail'),
          icon: <ProfileOutlined />,
          onClick: () => {
            router.push(`${router.asPath}/detail?address=${record.contractAddress}`);
          },
        },
        {
          title: t('airdrop'),
          icon: <WifiOutlined />,
          onClick: () => {
            setAirdrop({
              open: true,
              name: record.name,
              address: record.contractAddress,
            });
          },
        },

        {
          title: (
            <div>
              <Button
                onClick={async () => {
                  try {
                    // await copy(`${location.href}/${record.basic.id}`);
                    setCopySuccess(true);
                  } catch (error) {
                    setCopySuccess(false);
                  }
                }}
                icon={copySuccess ? <CheckOutlined /> : <CopyOutlined />}
              />
            </div>
          ),
          icon: <ShareAltOutlined />,
        },
        {
          title: t('close'),
          icon: <CloseOutlined />,
          danger: true,
          onClick: async () => {
            try {
              await close(record.contractAddress);
              message.success(t('closeSuccessContent'));
            } catch (error) {}
          },
        },
      ];

      return btns.map((btn, index) => (
        <Tooltip key={index} title={btn.title}>
          <Button
            style={{ marginRight: 8 }}
            danger={btn.danger}
            onClick={btn.onClick}
            icon={btn.icon}
            type='primary'
          />
        </Tooltip>
      ));
    },
    [close, copySuccess, router, t],
  );

  const columns = useMemo(() => {
    return getColumns(actionRender).map((column) => {
      return {
        ...column,
        title: t(column.title),
      };
    });
  }, [actionRender, t]);

  return (
    <>
      <Table
        rowKey={(record) => record.contactAddress}
        key='2'
        className='ticken-table'
        columns={columns}
        {...tableProps}
      />
      <AirDrop
        onCancel={() =>
          setAirdrop({
            open: false,
            name: '',
            address: '',
          })
        }
        open={airdrop.open}
        address={airdrop.address}
        name={airdrop.name}
      />
    </>
  );
}

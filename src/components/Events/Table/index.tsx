import {
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  ProfileOutlined,
  ShareAltOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { Button, Skeleton, Table, Tooltip, message } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCloseEvent } from '@/abihooks';
import { EventState, stateText, typeText } from '@/constanst/events';
import { EventInfo } from '@/typechain-types/contracts/Admin';
import { copy } from '@/utils/copy';

const getColumns = (actionRender: (...args: any) => JSX.Element[]) => [
  {
    title: '#',
    dataIndex: 'image',
    key: 'image',
    render(image: string) {
      if (!image) return <Skeleton.Image active />;
      // eslint-disable-next-line @next/next/no-img-element
      return <img alt='cover' src={image} width={100} />;
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
      return moment.unix(time).format('LL');
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

  const actionRender = useCallback(
    (_: string, record: EventInfo.AllInfoStructOutput['basic']) => {
      const btns = [
        {
          title: 'detail',
          icon: <ProfileOutlined />,
          onClick: () => {
            router.push(`${router.asPath}/detail?address=${record.contractAddress}`);
          },
        },
        record.state === EventState.Live && {
          title: 'airdrop',
          icon: <WifiOutlined />,
        },
        record.state === EventState.Live && {
          title: 'close',
          icon: <CloseOutlined />,
          onClick: async () => {
            try {
              await close(record.contractAddress);
              message.success(t('closeSuccess'));
            } catch (error) {}
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
      ].filter(Boolean) as {
        title: string;
        icon: JSX.Element;
        onClick?: () => void;
      }[];

      return btns.map((btn) => (
        <Tooltip key={btn.title} title={btn.title}>
          <Button onClick={btn.onClick} icon={btn.icon} />
        </Tooltip>
      ));
    },
    [close, copySuccess, router],
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
    <Table
      rowKey='contactAddress'
      key='2'
      className='ticken-table'
      columns={columns}
      {...tableProps}
    />
  );
}

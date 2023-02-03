import {
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  ProfileOutlined,
  ShareAltOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { Button, Table, Tooltip } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useMemo, useState } from 'react';
import { EventInfo, EventState, stateText } from '@/constanst/events';
import { copy } from '@/utils/copy';

const getColumns = (actionRender: (...args: any) => JSX.Element[]) => [
  {
    title: '#',
    dataIndex: 'cover',
    key: 'cover',
    render(val: string) {
      return <Image alt='cover' src={val} width={100} />;
    },
  },
  {
    title: 'eventName',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'eventType',
    dataIndex: 'symbol',
    key: 'symbol',
  },

  {
    title: 'time',
    dataIndex: 'holdTime',
    key: 'holdTime',
    render(time: number) {
      return moment(time).format('LL');
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
  const [copySuccess, setCopySuccess] = useState(false);
  const actionRender = useCallback(
    (_: string, record: EventInfo) => {
      const btns = [
        {
          title: 'detail',
          icon: <ProfileOutlined />,
        },
        record.basic.state === EventState.Live && {
          title: 'airdrop',
          icon: <WifiOutlined />,
        },
        record.basic.state === EventState.Live && {
          title: 'close',
          icon: <CloseOutlined />,
        },
        {
          title: (
            <div>
              <span>{`${location.href}/${record.basic.id}`}</span>
              <Button
                onClick={async () => {
                  try {
                    await copy(`${location.href}/${record.basic.id}`);
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
      }[];

      return btns.map((btn) => (
        <Tooltip key={btn.title} title={btn.title}>
          <Button icon={btn.icon} />
        </Tooltip>
      ));
    },
    [copySuccess],
  );

  const columns = useMemo(() => {
    return getColumns(actionRender).map((column) => {
      return {
        ...column,
        title: t(column.title),
      };
    });
  }, [actionRender, t]);

  return <Table rowKey='id' key='2' className='ticken-table' columns={columns} {...tableProps} />;
}

import { PlusOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import { Button, Col, Form, Row } from 'antd';
import chunk from 'lodash/chunk';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ListPage from '../ListPage';
import EventsTable from './Table';
import { useEventList } from '@/abihooks';
import { EventInfo } from '@/typechain-types/contracts/Admin';

async function fetch() {
  return [];
}
export default function Events() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { data, run } = useEventList();
  const router = useRouter();
  const dataSource = useRef<EventInfo.AllInfoStructOutput[]>();
  const getTableData = useCallback(
    async ({ current, pageSize }: { current: number; pageSize: number }) => {
      if (!dataSource.current) {
        dataSource.current = await run();
      }
      const chunkData = chunk(dataSource.current, pageSize);
      console.log(dataSource.current);
      return {
        total: dataSource.current?.length || 0,
        list: chunkData[current - 1],
      };
    },
    [run],
  );

  const { tableProps } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });
  return (
    <ListPage
      title={t('eventsList')}
      items={[
        <Row key='1' justify={'end'}>
          {/* <Col>
            <EventsSearchForm form={form} submit={search.submit} />
          </Col> */}
          <Col>
            <Button
              onClick={() => {
                router.push(router.asPath + '/create');
              }}
              type='primary'
              icon={<PlusOutlined />}
            >
              {t('newEvents')}
            </Button>
          </Col>
        </Row>,
        <EventsTable key='2' {...tableProps} />,
      ]}
    />
  );
}

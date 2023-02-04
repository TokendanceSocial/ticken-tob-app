import { PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import { Button, Col, Form, Progress, Row, Table } from 'antd';
import chunk from 'lodash/chunk';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ListPage from '../ListPage';
import EventsSearchForm from './SearchForm';
import EventsTable from './Table';
import { useEventList } from '@/abihooks';
import { EventInfo } from '@/constanst/events';

async function fetch() {
  return [];
}
export default function Events() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { data, run } = useEventList();
  const router = useRouter();
  const dataSource = useRef<EventInfo[]>();
  const getTableData = useCallback(
    async ({ current, pageSize }: { current: number; pageSize: number }) => {
      if (!dataSource.current) {
        dataSource.current = await fetch();
      }
      const chunkData = chunk(dataSource.current, pageSize);
      return {
        total: dataSource.current.length,
        list: chunkData[current - 1],
      };
    },
    [],
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

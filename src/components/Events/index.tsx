import { PlusOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import { Button, Col, Form, Row, message } from 'antd';
import chunk from 'lodash/chunk';
import type { Moment } from 'moment';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ListPage from '../ListPage';
import EventsSearchForm from './SearchForm';
import EventsTable from './Table';
import { useEventList } from '@/abihooks';
import { EventType } from '@/constanst/events';
import { EventInfo } from '@/typechain-types/contracts/Admin';

export default function Events() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { run } = useEventList();
  const router = useRouter();
  const dataSource = useRef<EventInfo.AllInfoStructOutput['basic'][]>();
  const getTableData = useCallback(
    async (
      { current, pageSize }: { current: number; pageSize: number },
      formData: {
        eventType: EventType;
        name: string;
        holdTime: Moment[];
      },
    ) => {
      if (!dataSource.current || dataSource.current.length === 0) {
        dataSource.current = [];
        let data;
        try {
          data = await run();
        } catch (error) {
          return {
            total: 0,
            list: [],
          };
        }

        for (let index = 0; index < data.length; index++) {
          const item = data[index];

          dataSource.current.push({
            ...item.basic,
            // @ts-ignore
          });
        }
      }
      const data = dataSource.current.filter((item) => {
        if (formData.name !== undefined && !item.name.includes(formData.name)) return false;
        if (formData.eventType !== undefined && item.eventType !== formData.eventType) return false;
        if (
          formData.holdTime &&
          (item.holdTime.toNumber() > formData.holdTime[1].unix() ||
            item.holdTime.toNumber() < formData.holdTime[0].unix())
        ) {
          return false;
        }
        return true;
      });
      const chunkData = chunk(data, pageSize);
      return {
        total: data?.length || 0,
        list: chunkData[current - 1],
      };
    },
    [run],
  );

  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });
  return (
    <ListPage
      title={t('eventsList')}
      items={[
        <Row key='1' justify={'end'}>
          <Col>
            <EventsSearchForm form={form} submit={search.submit} />
          </Col>
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
        <EventsTable
          key='2'
          reload={() => {
            dataSource.current = undefined;

            search.submit();
          }}
          {...tableProps}
        />,
      ]}
    />
  );
}

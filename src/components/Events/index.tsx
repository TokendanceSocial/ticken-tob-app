import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Progress, Row, Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ListPage from '../ListPage';
const dataSource = [
  {
    id: 1,
    picture: 'https://flatlogic.github.io/light-blue-react-template/static/media/4.png',
    description: 'Palo Alto',
    info: { type: 'JPEG', dimensions: '200x150' },
    date: 'September 14, 2012',
    size: '45.6 KB',
    progress: { percent: 29, colorClass: 'success' },
  },
  {
    id: 2,
    picture: 'https://flatlogic.github.io/light-blue-react-template/static/media/4.png',
    description: 'The Sky',
    info: { type: 'PSD', dimensions: '2400x1455' },
    date: 'November 14, 2012',
    size: '15.3 MB',
    progress: { percent: 33, colorClass: 'success' },
  },
  {
    id: 3,
    picture: 'https://flatlogic.github.io/light-blue-react-template/static/media/4.png',
    description: 'Down the road',
    label: { colorClass: 'primary', text: 'INFO!' },
    info: { type: 'JPEG', dimensions: '200x150' },
    date: 'September 14, 2012',
    size: '49.0 KB',
    progress: { percent: 38, colorClass: 'normal' },
  },
  {
    id: 4,
    picture: 'https://flatlogic.github.io/light-blue-react-template/static/media/4.png',
    description: 'The Edge',
    info: { type: 'PNG', dimensions: '210x160' },
    date: 'September 15, 2012',
    size: '69.1 KB',
    progress: { percent: 60, status: 'exception' },
  },
  {
    id: 5,
    picture: 'https://flatlogic.github.io/light-blue-react-template/static/media/4.png',
    description: 'Fortress',
    info: { type: 'JPEG', dimensions: '1452x1320' },
    date: 'October 1, 2012',
    size: '2.3 MB',
    progress: { percent: 60, status: 'normal' },
  },
];

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'PICTURE',
    dataIndex: 'picture',
    key: 'picture',
    render(val: string) {
      return <img width={100} src={val} />;
    },
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'INFO',
    dataIndex: 'info',
    key: 'info',
    render(info: any) {
      return (
        <div>
          <div>type: {info.type}</div>
          <div>dimensions: {info.dimensions}</div>
        </div>
      );
    },
  },
  { title: 'DATE', dataIndex: 'date', key: 'date' },
  {
    title: 'SIZE',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'STATUS',
    dataIndex: 'progress',
    key: 'progress',
    render(progress: any) {
      return (
        <Progress
          size='small'
          percent={progress.percent}
          showInfo={false}
          status={progress.status}
        />
      );
    },
  },
];
export default function Events() {
  const { t } = useTranslation();
  return (
    <ListPage
      title={t('eventsList')}
      items={[
        <Row key='1' justify={'end'}>
          <Col>
            <Button type='primary' icon={<PlusOutlined />}>
              {t('newEvents')}
            </Button>
          </Col>
        </Row>,
        <Table
          rowKey={(record) => record.id}
          key='2'
          className='ticken-table'
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: 100,
          }}
        />,
      ]}
    />
  );
}

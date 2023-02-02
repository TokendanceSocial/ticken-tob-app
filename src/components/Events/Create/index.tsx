import { DeploymentUnitOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EventForm from '../Form';

export default function CreateEvent() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className='create-event-form'>
      <h1 className='create-event-form__title'>{t('createEvent')}</h1>
      <Row justify='space-between'>
        <Col>
          <Button icon={<LeftOutlined />} onClick={() => router.back()}>
            {t('back')}
          </Button>
        </Col>
        <Col>
          <Button style={{ marginRight: 16 }} type='primary' icon={<SaveOutlined />}>
            {t('submit')}
          </Button>
        </Col>
      </Row>

      <EventForm />
    </div>
  );
}

import { Form } from 'antd';
import React from 'react';
import Basic from './Basic';
import EventTypeForm from './Type';

export default function EventForm() {
  const [form] = Form.useForm();

  return (
    <div className='event-form' onClick={() => console.log(form.getFieldsValue())}>
      <Basic form={form} />
      <EventTypeForm form={form} />
    </div>
  );
}

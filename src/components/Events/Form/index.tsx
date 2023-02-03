import type { FormInstance } from 'antd';
import React from 'react';
import EventBasicForm from './EventBasicForm';
import EventTypeForm from './EventTypeForm';

export default function EventForm({ form }: { form: FormInstance }) {
  return (
    <div className='event-form'>
      <EventBasicForm form={form} />
      <EventTypeForm form={form} />
    </div>
  );
}

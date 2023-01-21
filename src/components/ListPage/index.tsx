import React from 'react';

export default function ListPage({ items, title }: { title: string; items: React.ReactNode[] }) {
  return (
    <div className="list-page">
      <h1 className="list-page__title">{title}</h1>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';
import { breadcrumbNameMap } from '@/constanst/breadcrumb';

export default function BreadcrumbHistory() {
  const { t } = useTranslation();
  const router = useRouter();
  const url = router.asPath.split('#')[1] || '/';
  const renderBreadCrumbs = useCallback(() => {
    const pathSnippets = url.split('/').filter((i) => i);
    return pathSnippets.map((_, index) => {
      const path = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if (index === pathSnippets.length - 1) {
        return <Breadcrumb.Item key={path}>{t(breadcrumbNameMap[path])}</Breadcrumb.Item>;
      }

      return (
        <Breadcrumb.Item key={path}>
          <Link href={`/#/${path}`}>{t(breadcrumbNameMap[path])}</Link>
        </Breadcrumb.Item>
      );
    });
  }, [url]);

  return (
    <Breadcrumb className='ticken-breadcrumb'>
      <Breadcrumb.Item>{t('home')}</Breadcrumb.Item>
      {renderBreadCrumbs()}
    </Breadcrumb>
  );
}

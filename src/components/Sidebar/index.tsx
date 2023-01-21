import { AlignLeftOutlined, DashboardOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const { Sider } = Layout;
export default function Sidebar() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedKeys, setselectedKeys] = useState<string[]>();
  const pathname = useMemo(() => router.asPath.split('#')[1], [router.asPath]);
  useEffect(() => {
    setselectedKeys(pathname?.split('/') || ['dashboard']);
  }, [pathname]);

  const items = useMemo(() => {
    return [
      {
        key: 'dashboard',
        icon: (
          <Avatar>
            <DashboardOutlined />
          </Avatar>
        ),
        label: t('dashboard'),
      },
      {
        key: 'events',
        icon: (
          <Avatar>
            <AlignLeftOutlined />
          </Avatar>
        ),
        label: t('events'),
      },
    ];
  }, [t]);

  const handleSelect = useCallback(
    ({ selectedKeys }: { selectedKeys: string[] }) => {
      setselectedKeys(selectedKeys);
      router.push(`/#/${selectedKeys.join('/')}`);
    },
    [router],
  );

  return (
    <Sider>
      <Menu
        theme='dark'
        className='ticken-menu'
        mode='inline'
        defaultSelectedKeys={['events']}
        items={items}
        selectedKeys={selectedKeys}
        onSelect={handleSelect}
      />
    </Sider>
  );
}

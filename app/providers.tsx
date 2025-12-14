'use client';

import { ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';

const { defaultAlgorithm, darkAlgorithm } = theme;

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Primary color customization
          colorPrimary: '#1890ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          colorInfo: '#1890ff',
          
          // Border and radius
          borderRadius: 6,
          borderRadiusLG: 8,
          borderRadiusSM: 4,
          
          // Typography
          fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: 14,
          fontSizeLG: 16,
          fontSizeSM: 12,
          
          // Spacing
          padding: 16,
          paddingLG: 24,
          paddingSM: 12,
          margin: 16,
          marginLG: 24,
          marginSM: 12,
          
          // Component specific tokens
          controlHeight: 32,
          controlHeightLG: 40,
          controlHeightSM: 24,
        },
        components: {
          Table: {
            headerBg: '#fafafa',
            headerColor: '#262626',
            borderColor: '#f0f0f0',
            rowHoverBg: '#f5f5f5',
          },
          Button: {
            primaryShadow: '0 2px 0 rgba(5, 145, 255, 0.1)',
            dangerShadow: '0 2px 0 rgba(255, 77, 79, 0.1)',
          },
          Modal: {
            borderRadiusLG: 8,
            headerBg: '#fff',
          },
          Form: {
            labelFontSize: 14,
            itemMarginBottom: 20,
          },
          Input: {
            borderRadius: 6,
            paddingInline: 12,
          },
          Select: {
            borderRadius: 6,
          },
        },
        algorithm: defaultAlgorithm,
      }}
    >
      {/* @ts-expect-error - React 19 type compatibility issue */}
      {children}
    </ConfigProvider>
  );
}


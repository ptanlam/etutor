import { LoadingOverlay } from '@mantine/core';
import React, { PropsWithChildren, ReactElement } from 'react';
import { ErrorPage } from '../../pages/ErrorPage';
import { LoadingPage } from '../../pages/LoadingPage';
import { ErrorIndicator } from '../ErrorIndicator';
import { NoDataIndicator } from '../NoDataIndicator';
import { ScalingDotsWave } from '../ScalingDotsWave';

type PresentationType = 'page' | 'component';

type Props<T> = {
  type: PresentationType;
  loading: boolean;
  hasError: boolean;

  data?: T;
  loadingComponent?: ReactElement;
  errorComponent?: ReactElement;

  noLoadingComponent?: boolean;
  withEmptyIndicator?: boolean;
};

export function Wrapper<T>({
  children,
  type,
  loading,
  data,
  hasError,
  loadingComponent,
  errorComponent,
  noLoadingComponent,
  withEmptyIndicator,
}: PropsWithChildren<Props<T>>) {
  const renderLoadingComponent = () => {
    if (loadingComponent) return loadingComponent;
    if (noLoadingComponent) return <>{children}</>;

    switch (type) {
      case 'component':
        return <ScalingDotsWave />;
      case 'page':
        return <LoadingPage />;
      default:
        return <LoadingOverlay visible={true} />;
    }
  };

  const renderErrorComponent = () => {
    if (errorComponent) return errorComponent;

    switch (type) {
      case 'component':
        return <ErrorIndicator />;
      case 'page':
        return <ErrorPage />;
      default:
        return <ErrorIndicator />;
    }
  };

  if (loading) return renderLoadingComponent();
  if (hasError && !data) return renderErrorComponent();
  if (withEmptyIndicator && Array.isArray(data) && !data.length)
    return <NoDataIndicator />;
  return <>{children}</>;
}

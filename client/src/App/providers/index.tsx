import { FC, PropsWithChildren } from 'react';
import { LoadingProvider } from './LoadingProvider';
import { HoverProvider } from './HoverProvider';

export const withProviders = (Component: FC<PropsWithChildren>) => {
  return function WithProviders(props: PropsWithChildren) {
    return (
      <LoadingProvider>
        <HoverProvider>
          <Component {...props} />
        </HoverProvider>
      </LoadingProvider>
    );
  };
};

export { useLoading } from './LoadingProvider';
export { useHover } from './HoverProvider'; 
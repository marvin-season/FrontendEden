import React from "react";
import {Providers as AppProviders} from '@/providers';
import { ErrorBoundary } from 'react-error-boundary';

export default () => <ErrorBoundary fallback={<>error</>}>
  <AppProviders />
</ErrorBoundary>

import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_BASE_URL:string;
    }
  }

  type MaybeNullable<T> = T | null;

  type MaybeUndefined<T> = T | undefined;

  type Maybe<T> = MaybeNullable<T> | undefined;

  type ApiResponse<T> = T & {
    timestamp: number;
    status_code: number;
  };

  type ApiError = {
    status_code: number;
    message: string;
    code: string;
    path: string;
    method: string;
    timestamp: number;
  };

  type AxiosProps = {
    loading: boolean;
    errorMessage?: string;
  };

  type UserRole = 'admin' | 'user';

  type User = {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
    access_token: string;
  };
}

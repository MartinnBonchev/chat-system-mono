import { useEffect } from 'react';
import useAxios from 'axios-hooks';

import { useAppContext } from '@store/store';
import { AuthActions } from '@store/auth/auth.actions';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  access_token: string;
}

interface RegisterResponse {
  success: true
}

export function useLogin() {
  const axios = useAxios<ApiResponse<LoginResponse>, LoginRequest, ApiError>(
    {
      method: 'POST',
      url: '/auth/login',
    },
    { manual: true },
  );

  return axios;
}

export function useSync(pollingInterval: number) {
  const [, dispatch] = useAppContext();

  const [requestState, sync] = useAxios<
    ApiResponse<LoginResponse>,
    LoginRequest,
    ApiError
  >(
    {
      method: 'GET',
      url: '/auth/me',
    },
    { manual: true },
  );

  useEffect(() => {
    async function executeSync() {
      const {
        data: { user },
      } = await sync();
      dispatch({ type: AuthActions.SET_USER, payload: user });
    }

    const interval = setInterval(async () => {
      executeSync();
    }, pollingInterval);

    executeSync();
    return () => clearInterval(interval);
  }, [dispatch, pollingInterval, sync]);

  return requestState;
}

export function useLogout() {
  const result = useAxios<ApiResponse<LoginResponse>, LoginRequest, ApiError>(
    {
      method: 'GET',
      url: '/auth/logout',
    },
    {
      manual: true,
    },
  );

  return result;
}

export function useRegister(){
  const result = useAxios<ApiResponse<RegisterResponse>, RegisterRequest, ApiError>(
    {
      method: 'GET',
      url: '/auth/register',
    },
    {
      manual: true,
    },
  );

  return result;
}

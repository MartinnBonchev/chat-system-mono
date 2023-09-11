import { configure } from 'axios-hooks';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react';

import { DispatchAction } from '@store/types';
import { AuthActions } from '@store/auth/auth.actions';

import { clearJWT, getJWT, setJWT } from '../jwt';

export default function configureAxios(dispatch: Dispatch<DispatchAction>) {
  const axios = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  axios.interceptors.request.use((config: any) => {
    const accessToken = getJWT();
    /** **************************************
     * ACCESS TOKEN HEADER
     * ************************************* */
    if (accessToken) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    return config;
  });

  function onFulfilled(config: AxiosResponse) {
    const { data } = config;
    // 200 ok -> login or sync request with truthy credentials
    const isCredentialsRes = data && data.access_token && data.user;
    if (isCredentialsRes) {
      dispatch({ type: AuthActions.SET_USER, payload: data.user });

      setJWT(data.access_token);
    }

    // 200 ok -> logout request with falsy credentials
    const isLogout = data && data.access_token === null && data.user === null;
    if (isLogout) {
      clearJWT();
      dispatch({ type: AuthActions.CLEAR_USER, payload: null });
    }

    return {
      ...config,
      data: {
        ...data,
        status_code: data.status_code,
        timestamp: data.timestamp,
      },
    };
  }

  function onRejected(error: AxiosError<ApiError>) {
    /** **********************************
     * ERROR HANDLING
     ********************************** */

    // 401 unauthorized -> authentication required
    const isUnauthorizedRes = error.response?.data?.status_code === 401;
    if (isUnauthorizedRes) {
      dispatch({ type: AuthActions.CLEAR_USER, payload: null });
      clearJWT();
    }

    return Promise.reject(error);
  }

  axios.interceptors.response.use(onFulfilled, onRejected);

  configure({ axios });
}

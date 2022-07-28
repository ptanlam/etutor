import axios, { Axios, AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { environment } from '../environment';
import { PaginationMetadata } from '../models/shared';
import { RequestContentType, RequestHeader } from '../shared/enums';

export class BaseHttpClient {
  private readonly _httpClient: Axios;

  private static _instance?: BaseHttpClient;

  private constructor() {
    this._httpClient = axios.create({
      responseType: 'json',
      timeout: 15000,
      baseURL: environment.apiBaseUrl,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'comma' }),
      headers: {
        [RequestHeader.ContentType]: RequestContentType.JSON,
      },
    });
  }

  static createNew() {
    if (!!this._instance) return this._instance;
    this._instance = new BaseHttpClient();
    return this._instance;
  }

  async callAPI<T>(config: AxiosRequestConfig) {
    const resp = await this._httpClient.request<T>(config);
    return resp.data;
  }

  async callAPIWithPagination<T>(config: AxiosRequestConfig) {
    const resp = await this._httpClient.request<T>(config);

    return {
      data: resp.data,
      pagination: JSON.parse(
        resp.headers['x-pagination']
      ) as PaginationMetadata,
    };
  }

  async callAuthenticatedAPI<T>(
    config: AxiosRequestConfig,
    accessToken: string
  ) {
    const resp = await this._httpClient.request<T>({
      ...config,
      headers: { ...config.headers, authorization: `Bearer ${accessToken}` },
    });

    return resp.data;
  }

  async callAuthenticatedAPIWithPagination<T>(
    config: AxiosRequestConfig,
    accessToken: string
  ) {
    const resp = await this._httpClient.request<T>({
      ...config,
      headers: { ...config.headers, authorization: `Bearer ${accessToken}` },
    });

    return {
      data: resp.data,
      pagination: JSON.parse(
        resp.headers['x-pagination']
      ) as PaginationMetadata,
    };
  }
}

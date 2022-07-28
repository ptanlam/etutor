import qs from 'qs';

export function parseSearchParams<T>(params: URLSearchParams) {
  return qs.parse(params.toString()) as any as T;
}

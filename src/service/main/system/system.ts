import http from '../../index';

import { IDataType } from '../../type';

export function getPageListData(url: string, params: any) {
  return http.post<IDataType>({
    url: url,
    data: params
  });
}

// url: /users/id
export function deletePageData(url: string) {
  return http.delete<IDataType>({
    url: url
  });
}

export function createPageData(url: string, newData: any) {
  return http.post<IDataType>({
    url: url,
    data: newData
  });
}

export function editPageData(url: string, editData: any) {
  return http.patch<IDataType>({
    url: url,
    data: editData
  });
}

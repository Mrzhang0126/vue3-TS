import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { RequestInterceptors, RequestConfig } from './type';

import { ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

const IS_LOADING = true;

class HttpRequest {
  public instance: AxiosInstance;
  public interceptors?: RequestInterceptors;
  public showLoading: boolean;
  public loading?: ILoadingInstance;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    this.showLoading = config.showLoading ?? IS_LOADING;
    this.interceptors = config.interceptors;

    // 拦截器(备注：有顺序问题)
    // 对所有实例进行请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例拦截: 请求成功拦截');

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          });
        }

        return config;
      },
      (error) => {
        // console.log('所有实例拦截: 请求失败拦截');
        return Promise.reject(error);
      }
    );

    // 对所有实例进行响应拦截
    this.instance.interceptors.response.use(
      (resonse) => {
        // console.log('所有实例拦截: 响应成功拦截');

        // 将loading移除
        this.loading?.close();

        return resonse.data;
      },
      (error) => {
        // console.log('所有实例拦截: 响应失败拦截');

        // 将loading移除
        this.loading?.close();

        // if (error.response.status === 404) {
        //   console.log('404的错误~')
        // }

        return Promise.reject(error);
      }
    );

    // 单个实例请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    // 单个实例响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对响应结果处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = IS_LOADING;

          resolve(res);
        })
        .catch((err) => {
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = IS_LOADING;

          reject(err);
          return err;
        });
    });
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default HttpRequest;

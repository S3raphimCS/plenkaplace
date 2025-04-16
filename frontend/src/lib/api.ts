/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { Product, ProductType } from '@/components/entity';
export interface ArticleSiteList {
  /** ID */
  id?: number;
  /**
   * Название статьи
   * @minLength 1
   * @maxLength 255
   */
  title: string;
  /**
   * Превью
   * @format uri
   */
  preview?: string | null;
}

export interface ArticleImageSite {
  /**
   * Изображение
   * @format uri
   */
  file?: string;
}

export interface ArticleDetailSite {
  /** ID */
  id?: number;
  images?: ArticleImageSite[];
  /**
   * Название статьи
   * @minLength 1
   * @maxLength 255
   */
  title: string;
  /**
   * Текст статьи
   * @minLength 1
   */
  text: string;
  /**
   * Превью
   * @format uri
   */
  preview?: string | null;
  /** Статус статьи */
  is_published?: boolean;
  /**
   * Дата публикации статьи
   * @format date-time
   */
  published_date?: string | null;
}

export interface ContactRequest {
  /** ID */
  id?: number;
  /**
   * Имя
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /**
   * Контактные данные
   * @minLength 1
   * @maxLength 120
   */
  contact_data: string;
  /**
   * Сообщение
   * @minLength 1
   */
  message: string;
  /** Способ связи */
  contact_preference: 'telegram' | 'whatsapp' | 'email';
  /**
   * Электронная почта
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
}

export interface FlatPage {
  /** ID */
  id?: number;
  /** Обозначение */
  title: 'privacy_policy' | 'user_agreement';
  /**
   * Наименование
   * @minLength 1
   * @maxLength 255
   */
  description: string;
  /**
   * Текст
   * @minLength 1
   */
  text?: string | null;
}

export interface NewsList {
  /** ID */
  id?: number;
  /**
   * Заголовок
   * @minLength 1
   * @maxLength 255
   */
  title: string;
  /**
   * Превью новости
   * @format uri
   */
  preview?: string | null;
}

export interface NewsImageSite {
  /**
   * Изображение
   * @format uri
   */
  image?: string;
}

export interface NewsDetail {
  /** ID */
  id?: number;
  images?: NewsImageSite[];
  /**
   * Дата публикации
   * @format date-time
   */
  published_date?: string | null;
  /** Опубликовано */
  is_published?: boolean;
  /**
   * Заголовок
   * @minLength 1
   * @maxLength 255
   */
  title: string;
  /**
   * Превью новости
   * @format uri
   */
  preview?: string | null;
  /**
   * Текст новости
   * @minLength 1
   */
  text: string;
}

export interface Brand {
  /** ID */
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  title: string;
}

export interface DeliveryMethod {
  /** ID */
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /** Описание */
  description?: string;
}

export interface Feedback {
  /** ID */
  id?: number;
  /**
   * Изображение
   * @format uri
   */
  image?: string;
}

export interface OrderItem {
  /** Товар */
  product: number;
  /**
   * Количество
   * @min 0
   * @max 2147483647
   */
  quantity: number;
}

export interface Order {
  /** ID */
  id?: number;
  /**
   * Имя
   * @minLength 1
   * @maxLength 100
   */
  first_name: string;
  /**
   * Телефон
   * @minLength 1
   * @maxLength 20
   */
  contact_data: string;
  /**
   * Email
   * @format email
   * @minLength 1
   * @maxLength 100
   */
  email: string;
  /**
   * Адрес
   * @minLength 1
   * @maxLength 255
   */
  address: string;
  /**
   * Комментарий
   * @maxLength 255
   */
  comment: string;
  /** Способ оплаты */
  payment_method: 'cash' | 'card';
  /** Способ доставки */
  delivery_method: number;
  /** Способ связи */
  contact_preferences: 'phone_call' | 'telegram' | 'whatsapp';
  /**
   * Промокод
   * @maxLength 30
   */
  promo_code?: string | null;
  /** Сумма заказа */
  total_price?: number;
  /**
   * Дата создания
   * @format date-time
   */
  created_at?: string;
  items: OrderItem[];
}

export interface PromoCodeCheck {
  /**
   * Промокод
   * @minLength 1
   * @maxLength 30
   */
  code: string;
}

export interface PromoCode {
  /** ID */
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /**
   * Промокод
   * @minLength 1
   * @maxLength 30
   */
  code: string;
  /** Тип скидки */
  discount_type: 'percentage' | 'fixed';
  /**
   * Величина скидки
   * @format decimal
   */
  discount_value: string;
  /**
   * Max discount
   * @format decimal
   */
  max_discount?: string | null;
  /** Активен */
  is_active?: boolean;
  /**
   * Valid from
   * @format date-time
   */
  valid_from: string;
  /**
   * Valid to
   * @format date-time
   */
  valid_to: string;
}

export interface PromoCodeOrderPrice {
  /** Сумма заказа */
  total_price?: number;
  /** Скидка */
  discount_value?: number;
  /** Сумма заказа с учетом скидки */
  price_with_discount?: number;
  /**
   * Промокод
   * @minLength 1
   */
  code: string;
  items: OrderItem[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = `${process.env.NEXT_PUBLIC_ENABLED_PROTO}}://${process.env.NEXT_PUBLIC_API_SERVER}`;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    const csrfToken = this.getCookie('csrftoken');

    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title PlenkaPlace
 * @version v1
 * @baseUrl http://localhost:8000/api/v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  articles = {
    /**
     * @description Вьюсет для просмотра статей
     *
     * @tags articles
     * @name ArticlesList
     * @request GET:/articles/
     * @secure
     */
    articlesList: (
      query?: {
        /** A search term. */
        search?: string;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        count?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: ArticleSiteList[];
        },
        any
      >({
        path: `/articles/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Вьюсет для просмотра статей
     *
     * @tags articles
     * @name ArticlesRead
     * @request GET:/articles/{id}/
     * @secure
     */
    articlesRead: (id: number, params: RequestParams = {}) =>
      this.request<ArticleDetailSite, any>({
        path: `/articles/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  contact = {
    /**
     * @description Вьюсет создания заявки на обратную связь.
     *
     * @tags contact
     * @name ContactCreate
     * @request POST:/contact/
     * @secure
     */
    contactCreate: (data: ContactRequest, params: RequestParams = {}) =>
      this.request<ContactRequest, any>({
        path: `/contact/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  flatpages = {
    /**
     * @description Правила использования cookie.
     *
     * @tags flatpages
     * @name FlatpagesCookiePolicy
     * @request GET:/flatpages/cookie_policy/
     * @secure
     */
    flatpagesCookiePolicy: (params: RequestParams = {}) =>
      this.request<FlatPage[], any>({
        path: `/flatpages/cookie_policy/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Политика конфиденциальности.
     *
     * @tags flatpages
     * @name FlatpagesPrivacyPolicy
     * @request GET:/flatpages/privacy_policy/
     * @secure
     */
    flatpagesPrivacyPolicy: (params: RequestParams = {}) =>
      this.request<FlatPage, any>({
        path: `/flatpages/privacy_policy/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Пользовательское соглашение.
     *
     * @tags flatpages
     * @name FlatpagesUserAgreement
     * @request GET:/flatpages/user_agreement/
     * @secure
     */
    flatpagesUserAgreement: (params: RequestParams = {}) =>
      this.request<FlatPage, any>({
        path: `/flatpages/user_agreement/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  news = {
    /**
     * @description Вью сет для просмотра новостей
     *
     * @tags news
     * @name NewsList
     * @request GET:/news/
     * @secure
     */
    newsList: (
      query?: {
        /** A search term. */
        search?: string;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        count?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: NewsList[];
        },
        any
      >({
        path: `/news/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Вью сет для просмотра новостей
     *
     * @tags news
     * @name NewsRead
     * @request GET:/news/{id}/
     * @secure
     */
    newsRead: (id: number, params: RequestParams = {}) =>
      this.request<NewsDetail, any>({
        path: `/news/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  shop = {
    /**
     * @description Вьюсет просмотра списка брендов.
     *
     * @tags shop
     * @name ShopBrandsList
     * @request GET:/shop/brands/
     * @secure
     */
    shopBrandsList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        count?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Brand[];
        },
        any
      >({
        path: `/shop/brands/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Вьюсет просмотра списка способов доставки.
     *
     * @tags shop
     * @name ShopDeliveryMethodsList
     * @request GET:/shop/delivery-methods/
     * @secure
     */
    shopDeliveryMethodsList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        count?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: DeliveryMethod[];
        },
        any
      >({
        path: `/shop/delivery-methods/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags shop
     * @name ShopFeedbacksList
     * @request GET:/shop/feedbacks/
     * @secure
     */
    shopFeedbacksList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        count?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Feedback[];
        },
        any
      >({
        path: `/shop/feedbacks/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Вьюсет создания заказа.
     *
     * @tags shop
     * @name ShopOrdersCreate
     * @request POST:/shop/orders/
     * @secure
     */
    shopOrdersCreate: (data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/shop/orders/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Вьюсет просмотра списка категорий товаров.
     *
     * @tags shop
     * @name ShopProductTypesList
     * @request GET:/shop/product-types/
     * @secure
     */
    shopProductTypesList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        count?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: ProductType[];
        },
        any
      >({
        path: `/shop/product-types/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Вьюсет просмотра товаров.
     *
     * @tags shop
     * @name ShopProductsList
     * @request GET:/shop/products/
     * @secure
     */
    shopProductsList: (
      query?: {
        /** title */
        title?: string;
        /** product_type */
        product_type?: string;
        /** is_available_for_purchasing */
        is_available_for_purchasing?: string;
        /** price */
        price?: string;
        price_min?: number;
        price_max?: number;
        /** brand */
        brand?: string;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        count?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Product[];
        },
        any
      >({
        path: `/shop/products/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Вьюсет просмотра товаров.
     *
     * @tags shop
     * @name ShopProductsRead
     * @request GET:/shop/products/{slug}/
     * @secure
     */
    shopProductsRead: (slug: string, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/shop/products/${slug}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Проверка работоспособности промокода
     *
     * @tags shop
     * @name ShopPromoCodesCheckPromoCode
     * @request POST:/shop/promo-codes/check_promo_code/
     * @secure
     */
    shopPromoCodesCheckPromoCode: (
      data: PromoCodeCheck,
      params: RequestParams = {}
    ) =>
      this.request<PromoCode, void>({
        path: `/shop/promo-codes/check_promo_code/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Получение стоимости заказа с учетом промокода.
     *
     * @tags shop
     * @name ShopPromoCodesGetOrderPriceWithPromo
     * @request POST:/shop/promo-codes/get_order_price_with_promo/
     * @secure
     */
    shopPromoCodesGetOrderPriceWithPromo: (
      data: PromoCodeOrderPrice,
      params: RequestParams = {}
    ) =>
      this.request<PromoCodeOrderPrice, any>({
        path: `/shop/promo-codes/get_order_price_with_promo/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}

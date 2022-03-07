/**
 * API ресурс
 * @type
 */
export type RequestResourceType = {
  /** Ресурс */
  resource: string;
};

/**
 * API запрос
 * @type
 */
export type RequestCallType = RequestResourceType & {
  /** Параметры URL */
  params?: string;
  /** Частичные данные */
  partial?: boolean;
  /** Параметра запроса */
  options?: RequestInit;
};

/**
 * Ошибка запроса
 * @type
 */
export type RequestErrorType = RequestResourceType & {
  /** HTTP Статус */
  statusCode?: number;
  /** Сообщение */
  message: string;
};

/**
 * Ответ
 * @type
 */
export type RequestResponseType = RequestResourceType & {
  /** Данные */
  data?: any;
  /** Частичные данные */
  partial?: boolean;
};

/**
 * Ошибка
 * @class
 */
export class RequestError extends Error implements RequestErrorType {
  /** API ресурс */
  resource: string;

  /** HTTP статус */
  statusCode: number;

  /**
   * @constructor
   * @param resource API ресурс
   * @param status HTTP статус
   * @param message Сообщение
   */
  constructor(resource: string, status: number, message: string) {
    super(message);
    this.resource = resource;
    this.statusCode = status;
  }
}

/**
 * Статусы запроса
 * @constant
 */
export const RequestStatus = {
  /** Простой */
  IDLE: "idle",
  /** Выполнение */
  PENDING: "pending",
  /** Успешно выполнен */
  SUCCESS: "success",
  /** Завершился с ошибкой */
  FAILURE: "error"
} as const;

/**
 * Статус запроса
 * @type
 */
export type RequestStatusType = typeof RequestStatus[keyof typeof RequestStatus];

/**
 * Состояние запроса
 * @type
 */
export type RequestState = {
  /** API ресурс */
  resource: string;
  /** Статус запроса */
  status: RequestStatusType;
  /** Полученные данные */
  data?: any;
  /** Ошибка */
  error?: { statusCode?: number; message: string; };
};

/**
 * Параметры запроса списка товаров
 * @type
 */
export type ItemsQueryType = Readonly<{
  /** Поисковый фильтр */
  q?: string;
  /** Фильтр по категории */
  categoryId?: number;
  /** Смещение */
  offset?: number;
}>;

/**
 * API slice
 * @type
 */
export type RequestSliceState = {
  /** Запросы */
  [resource: string]: RequestState;
};

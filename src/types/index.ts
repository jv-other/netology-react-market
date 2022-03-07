/**
 * Категория
 * @type
 */
export type CategoryType = Readonly<{
  /** Идентификатор */
  id: number;
  /** Наименование */
  title: string;
}>;

/**
 * Размер
 * @type
 */
export type SizeType = Readonly<{
  /** Значение */
  size: string;
  /** Доступность */
  avalible: boolean;
}>;

/**
 * Данные товара
 * @type
 */
export type ProductItemType = Readonly<{
  /** Идентификатор */
  id: number;
  /** Название */
  title: string;
  /** Идентифитор категории */
  category: number;
  /** Изображения */
  images: string[];
  /** Цена */
  price: number;
}>;

/**
 * Детальные данные товара
 * @type
 */
export type ProductType = Readonly<ProductItemType & {
  /** Старая цена */
  oldPrice: number;
  /** Цвет */
  color: string;
  /** Материалы */
  material: string;
  /** Изготовитель */
  manufacturer: string;
  /** Повод */
  reason: string;
  /** Сезон */
  season: string;
  /** Высота каблука */
  heelSize: string;
  /** Размеры */
  sizes: SizeType[];
  /** Артикул */
  sku: string;
}>;

/**
 * Атрибуты товара
 * @type
 */
export type ProductProperties = keyof ProductType;

/**
 * Наименования атрибутов товара
 * @type
 */
export type ProductPropertiesNames = {
  [propery in ProductProperties]?: string;
};

/**
 * Позиция заказа
 * @type
 */
export type OrderItemType = Readonly<{
  /** Идентификатор товара */
  id: number;
  /** Название товара */
  title: string;
  /** Размер */
  size: string;
  /** Цена */
  price: number;
  /** Количество */
  count: number;
}>;

/**
 * Данные получателя заказа
 * @type
 */
export type RecipientType = Readonly<{
  /** Телефон */
  phone: string;
  /** Адрес */
  address: string;
}>;

/**
 * Заказ
 * @type
 */
export type OrderType = Readonly<{
  /** Данные получателя */
  owner: RecipientType,
  /** Позиции заказа */
  items: OrderItemType[];
}>;

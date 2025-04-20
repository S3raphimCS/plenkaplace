export interface ProductType {
  /** ID */
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  title: string;
}

export interface ProductImage {
  /** ID */
  id?: number;
  /**
   * Изображение
   * @format uri
   */
  image?: string;
  /** Товар */
  product: number;
}

export interface Product {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /**
   * Бренд
   * @minLength 1
   */
  brand?: string;
  /**
   * Описание
   * @minLength 1
   */
  description: string;
  /**
   * Цена
   * @format decimal
   */
  price: string;
  images?: ProductImage[];
  /**
   * Slug
   * @format slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  product_type?: ProductType;
  /**
   * Дата создания
   * @format date-time
   */
  created_at?: string;
  /** Товар для закупки */
  is_available_for_purchasing?: boolean;
  is_preorder?: boolean;
}

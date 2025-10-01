const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Product {
  product_id: number;
  product_name: string;
  description: string | null;
  price: string;
  inventory: number;
  prod_image_url: string | null;
  fk_category_id: number | null;
  category?: {
    category_id: number;
    name: string;
    description: string | null;
  };
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getProducts(params?: {
  search?: string;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}): Promise<ProductsResponse> {
  const queryString = params ? '?' + new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined) acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>)
  ).toString() : '';

  const response = await fetch(`${API_URL}/products${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Product not found');
  return response.json();
}
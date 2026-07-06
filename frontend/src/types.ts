export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  bespoke: boolean;
  material?: string;
  variants?: { name: string; thumbnail: string }[];
  finishes?: string[];
}

export interface CartItem {
  id: string; // Unique ID for this specific cart item (including chosen customizations)
  product: Product;
  quantity: number;
  customization?: string;
  selectedFinish?: string;
  selectedVariant?: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Fabric Sourced'
  | 'In Production'
  | 'Quality Control'
  | 'Shipped'
  | 'Delivered';

export interface BespokeOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    customization?: string;
  }[];
  total: number;
  status: OrderStatus;
  date: string;
  estimatedCompletion?: string;
  image?: string;
}

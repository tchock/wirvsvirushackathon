export interface Node {
  nodeId: string;
}

export interface List<T> {
  nodes: T[]
}

export interface Order extends Node {
  nodeId: string;
  pickUpCode: string;
  confirmedPickUpTime?: string;
  requestedPickUpTime?: string;
  store: Store;
  customer: Customer;
  orderStatus: OrderStatus;
  rejectionReason?: string;
  bundles: BundleList;
  shareLink?: string;
}

export interface User {
  type: Audiences;
}

export interface Store extends Node, User {}
export interface Customer extends Node, User {}
export interface Bundle extends Node {
  items: ItemList;
}

export interface Item extends Node {
  quantity: number;
  price: string;
  name: string;
  unit: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  PICKED_UP = 'PICKED_UP',
  REJECTED = 'REJECTED',
}

export enum Audiences {
  CUSTOMER = 'CUSTOMER',
  STORE = 'STORE',
}

export interface OrderInput {
  bundles: BundleList;
  store: string;
  requestedPickUpTime?: string;
}

export type BundleList = List<Bundle>;
export type ItemList = List<Item>;
export type OrderList = List<Order>;

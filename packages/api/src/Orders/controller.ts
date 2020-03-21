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
  bundles: BundleList;
  shareLink: string;
}

export interface Store extends Node {}
export interface Customer extends Node {}
export interface Bundle extends Node {
  items: ItemList;
}

export interface Item extends Node {
  quantity: number;
  price: number;
  name: string;
  unit: string;
}

export enum OrderStatus {
  ACCEPTED = 'ACCEPTED',
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
  requestedPickUpTime: string;
}

type BundleList = List<Bundle>;
type ItemList = List<Item>;
type OrderList = List<Order>;

async function orders(_root, _args, _context: any): Promise<OrderList> {
  return Promise.resolve([] as any);
}

async function order (_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

async function orderPickUp(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

async function orderDecline(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

async function orderAccept(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

async function orderPlace(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

export default {
  resolvers: {
    queries: [
      orders,
      order,
    ],
    mutators: [
      orderPickUp,
      orderDecline,
      orderAccept,
      orderPlace,
    ],
  }
};

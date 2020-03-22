import { Order } from '../../types/order';

export const getOrderTotalPrice = (order: Order) =>
  order.bundles.nodes.reduce(
    (total, bundle) =>
      bundle.items.nodes.reduce(
        (bundleTotal, item) => bundleTotal + item.price,
        0
      ),
    0
  );

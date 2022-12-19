import styles from './Orders.module.scss';

export function Orders() {
  console.log('render orders');
  return (
    <div className={styles.orders}>
      <h2>Orders</h2>
    </div>
  );
}

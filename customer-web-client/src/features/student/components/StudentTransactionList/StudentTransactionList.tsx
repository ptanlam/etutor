import { Table } from '@mantine/core';

import { Transaction } from '../../../../models/payment';
import styles from './StudentTransactionList.module.css';

type Props = { transactions: Transaction[] };

export function StudentTransactionList({ transactions }: Props) {
  const rows = transactions.map(
    ({ id, costAmount, costUnit, action, itemName, createdAt }) => (
      <tr key={id}>
        <td>
          {action} {itemName}
        </td>
        <td>
          {costAmount.toLocaleString()} {costUnit}
        </td>
        <td>{new Date(createdAt).toLocaleString()}</td>
      </tr>
    ),
  );

  return (
    <Table
      horizontalSpacing="lg"
      striped
      highlightOnHover
      className={styles.container}
    >
      <thead>
        <tr>
          <th>Content</th>
          <th>Cost</th>
          <th>Timestamp</th>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </Table>
  );
}

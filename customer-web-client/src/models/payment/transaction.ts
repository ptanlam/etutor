export interface Transaction {
  id: string;
  ownerId: string;
  itemId: string;
  itemName: string;
  type: string;
  action: string;
  costAmount: number;
  costUnit: string;
  createdAt: string;
}

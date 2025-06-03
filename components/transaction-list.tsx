"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Badge,
  Pagination,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface Transaction {
  amount: string;
  type: boolean;
  createdAt: string;
  detail: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(transactions.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transactions.slice(start, end);
  }, [page, transactions]);

  const renderCell = React.useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      switch (columnKey) {
        case "type":
          return (
            <div className="flex items-center gap-2">
              {transaction.type === true ? (
                <Badge
                  color="success"
                  content=""
                  placement="top-right"
                  shape="circle"
                >
                  <Icon className="text-lg" icon="lucide:arrow-down-right" />
                </Badge>
              ) : (
                <Badge
                  color="danger"
                  content=""
                  placement="top-right"
                  shape="circle"
                >
                  <Icon className="text-lg" icon="lucide:arrow-up-right" />
                </Badge>
              )}
              <span className="capitalize">{transaction.type}</span>
            </div>
          );
        case "amount":
          return (
            <span
              className={
                transaction.type === true
                  ? "text-success font-medium"
                  : "text-danger font-medium"
              }
            >
              {transaction.type === true ? "+" : "-"}$
              {Number(transaction.amount).toFixed(2)}
            </span>
          );
        case "date":
          return transaction.createdAt;
        case "description":
          return transaction.detail;
        case "category":
          return (
            <Chip
              color={getCategoryColor(transaction.type)}
              size="sm"
              variant="flat"
            >
              {transaction.type ? "ฝาก" : "ถอน"}
            </Chip>
          );
        default:
          return null;
      }
    },
    []
  );

  const getCategoryColor = (type: boolean) => {
    switch (type) {
      case true:
        return "success";
      case false:
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="w-full">
      <Table
        aria-label="Transaction history table"
        bottomContent={
          pages > 1 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          ) : null
        }
        classNames={{}}
      >
        <TableHeader>
          <TableColumn key="type">TYPE</TableColumn>
          <TableColumn key="amount">AMOUNT</TableColumn>
          <TableColumn key="date">DATE</TableColumn>
          <TableColumn key="description">DESCRIPTION</TableColumn>
          <TableColumn key="category">CATEGORY</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No transactions to display" items={items}>
          {(item) => (
            <TableRow key={item.createdAt}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

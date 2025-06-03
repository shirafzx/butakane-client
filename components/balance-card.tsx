"use client";
import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <>
      <Card disableRipple className="bg-content1 overflow-visible w-full">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-lg font-medium text-foreground-600">
                Current Balance
              </h2>
              <p className="text-4xl font-semibold mt-2">
                $
                {balance.toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm text-foreground-500 mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="px-6"
                color="success"
                size="lg"
                startContent={<Icon icon="lucide:plus" />}
                onPress={() => {}}
              >
                Deposit
              </Button>
              <Button
                className="px-6"
                color="danger"
                size="lg"
                startContent={<Icon icon="lucide:minus" />}
                variant="flat"
                onPress={() => {}}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

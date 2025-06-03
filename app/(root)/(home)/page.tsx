import { auth } from "@/auth";
import { BalanceCard } from "@/components/balance-card";
import { TransactionList } from "@/components/transaction-list";

export default async function Home() {
  const session = await auth();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/alloverviewinfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data = await res.json();

  console.log(data);

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex gap-6 flex-col w-full">
        <BalanceCard balance={data.balance} />
        <TransactionList transactions={data.in_out_list} />
      </div>
    </section>
  );
}

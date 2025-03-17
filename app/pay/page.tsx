import CheckoutButton from "@/components/CheckoutButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Buy Product</h1>
      <CheckoutButton amount={500} productName="Cool Product" />
    </div>
  );
}

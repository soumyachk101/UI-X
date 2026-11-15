import { ProductCard } from "./product-card";

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 79.99,
    badge: { text: "Sale", variant: "destructive" as const },
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    price: 149.99,
    badge: { text: "New", variant: "default" as const },
  },
  {
    id: "3",
    name: "Ergonomic Mouse",
    price: 59.99,
  },
];

export function ProductCardDemo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

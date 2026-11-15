import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  badge?: { text: string; variant?: "default" | "secondary" | "destructive" };
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-muted flex items-center justify-center">
        {product.badge && (
          <Badge
            variant={product.badge.variant ?? "default"}
            className="absolute top-3 left-3"
          >
            {product.badge.text}
          </Badge>
        )}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="mt-2 text-xs">Image Placeholder</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 gap-2">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-lg font-bold">
          ${product.price.toFixed(2)}
        </p>
        <Button
          className="mt-auto"
          size="sm"
          onClick={() => onAddToCart?.(product)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

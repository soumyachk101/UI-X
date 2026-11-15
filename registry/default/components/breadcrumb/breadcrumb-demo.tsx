import { Breadcrumb } from "./breadcrumb";

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Laptops", href: "/products/laptops" },
  { label: "Gaming Laptops", active: true },
];

export default function BreadcrumbDemo() {
  return (
    <div className="flex justify-center">
      <Breadcrumb items={items} />
    </div>
  );
}

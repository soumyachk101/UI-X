import { Carousel } from "./carousel";

const slides = [
  <div
    key="1"
    className="flex h-64 w-full items-center justify-center rounded-lg bg-primary/10 text-primary"
  >
    <span className="text-xl font-semibold">Slide 1</span>
  </div>,
  <div
    key="2"
    className="flex h-64 w-full items-center justify-center rounded-lg bg-secondary/10 text-secondary-foreground"
  >
    <span className="text-xl font-semibold">Slide 2</span>
  </div>,
  <div
    key="3"
    className="flex h-64 w-full items-center justify-center rounded-lg bg-accent/10 text-accent-foreground"
  >
    <span className="text-xl font-semibold">Slide 3</span>
  </div>,
];

export default function CarouselDemo() {
  return (
    <div className="w-full max-w-2xl">
      <Carousel slides={slides} />
    </div>
  );
}

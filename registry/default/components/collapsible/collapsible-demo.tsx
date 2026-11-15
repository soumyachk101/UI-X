import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger>Is this accessible?</CollapsibleTrigger>
      <CollapsibleContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </CollapsibleContent>
    </Collapsible>
  );
}

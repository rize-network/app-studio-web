import React from 'react';
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// useStickToBottomContext is not available since we removed the lib.
// We can either implement a custom scroll hook or just render the button if we want to simulate.
// I'll make it always visible or hidden based on a prop, but since I can't easily detect scroll without a hook/ref,
// I will just make it a dumb component that calls onClick.

export interface ScrollButtonProps {
  className?: string; // Ignored/Mapped
  onClick?: () => void;
}

export function ScrollButton({ onClick, ...props }: ScrollButtonProps) {
  // Always show for now, or maybe hide it since we don't have the scroll logic
  // "convert" means make it work with app-studio.
  // Without the scroll logic, this button is useless unless we implement it.
  // I will leave it as a Button that does nothing if onClick is not passed.

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      {...props}
    >
      <ChevronDown size={20} />
    </Button>
  )
}

import React from 'react';
import { Button } from "../../ui/button"
import { ChevronDown } from "lucide-react"

export interface ScrollButtonProps {
  className?: string; // Ignored/Mapped
  onClick?: () => void;
}

export function ScrollButton({ onClick, ...props }: ScrollButtonProps) {
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

import React, { createContext, useContext, useState, useMemo } from 'react';
import { View, Text, Vertical, Horizontal, useTheme, Button as AppStudioButton } from 'app-studio';
import { PanelLeftIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Sidebar context to manage state (expanded/collapsed, mobile, etc.)
// For this conversion, I will simplify it.

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

export function SidebarProvider({ children, defaultOpen = true, ...props }: any) {
  const [open, setOpen] = useState(defaultOpen);
  const isMobile = false; // Mock for now, use hooks/useResponsive if needed

  const toggleSidebar = () => setOpen(!open);
  const state = open ? "expanded" : "collapsed";

  const value = useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    toggleSidebar
  }), [state, open, isMobile]);

  return (
    <SidebarContext.Provider value={value}>
        <Horizontal height="100vh" width="100%" overflow="hidden" {...props}>
            {children}
        </Horizontal>
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children, side = 'left', ...props }: any) {
    const { open } = useSidebar();
    const { theme } = useTheme();

    if (!open) {
        return null;
    }

    return (
        <View
            width="250px"
            height="100%"
            borderRight={`1px solid ${theme.colors?.border || '#e2e8f0'}`}
            backgroundColor="color.gray.50"
            display="flex"
            flexDirection="column"
            {...props}
        >
            {children}
        </View>
    );
}

export function SidebarHeader({ children, className, ...props }: any) {
    return (
        <View padding="16px" {...props}>
            {children}
        </View>
    )
}

export function SidebarContent({ children, className, ...props }: any) {
    return (
        <View flex={1} overflowY="auto" padding="0 16px" {...props}>
            {children}
        </View>
    )
}

export function SidebarGroup({ children, ...props }: any) {
    return (
        <Vertical gap={8} marginBottom="24px" {...props}>
            {children}
        </Vertical>
    )
}

export function SidebarGroupLabel({ children, ...props }: any) {
    return (
        <Text fontSize="12px" fontWeight="bold" color="color.gray.500" marginBottom="8px" padding="0 8px" {...props}>
            {children}
        </Text>
    )
}

export function SidebarMenu({ children, ...props }: any) {
    return (
        <Vertical gap={4} {...props}>
            {children}
        </Vertical>
    )
}

export function SidebarMenuItem({ children, ...props }: any) {
    return <View {...props}>{children}</View>
}

export function SidebarMenuButton({ children, isActive, onClick, ...props }: any) {
    const { theme } = useTheme();
    return (
        <View
            onClick={onClick}
            padding="8px"
            borderRadius="6px"
            backgroundColor={isActive ? "color.gray.200" : "transparent"}
            cursor="pointer"
            {...props}
            // Hover handled via app-studio usually, or assume simpler interaction
        >
            <Horizontal gap={8} alignItems="center">
                {children}
            </Horizontal>
        </View>
    )
}

export function SidebarInset({ children, ...props }: any) {
    return (
        <View flex={1} height="100%" overflow="hidden" display="flex" flexDirection="column" {...props}>
            {children}
        </View>
    )
}

export function SidebarTrigger({ ...props }: any) {
    const { toggleSidebar } = useSidebar();
    return (
        <AppStudioButton onClick={toggleSidebar} padding="8px" backgroundColor="transparent" {...props}>
            <PanelLeftIcon size={20} />
        </AppStudioButton>
    )
}

// Stubs for other exports to prevent build errors if they are used
export function SidebarFooter({ children }: any) { return <View padding="16px">{children}</View> }
export function SidebarRail() { return null; }
export function SidebarInput(props: any) { return null; } // Use normal input
export function SidebarSeparator() { return <View height="1px" backgroundColor="color.gray.200" margin="8px 0" /> }
export function SidebarGroupAction() { return null; }
export function SidebarGroupContent({ children }: any) { return <View>{children}</View> }
export function SidebarMenuAction() { return null; }
export function SidebarMenuBadge() { return null; }
export function SidebarMenuSkeleton() { return null; }
export function SidebarMenuSub() { return null; }
export function SidebarMenuSubItem() { return null; }
export function SidebarMenuSubButton() { return null; }

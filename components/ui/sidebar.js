"use client"

import React, { useState } from "react"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarVariants = {
  default: "bg-white border-r border-stone-200",
  transparent: "bg-transparent",
}

const Sidebar = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-40"
          onClick={() => setIsOpen(true)}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent position="left" className="p-0" onClose={() => setIsOpen(false)}>
            <div className={cn("h-full overflow-auto", className)} {...props}>
              {children}
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "h-screen w-64 overflow-auto",
        sidebarVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center px-4", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto px-4 py-4", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto px-4 py-2", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarSearch = React.forwardRef(({ className, ...props }, ref) => (
  <div className="px-4 py-2">
    <Input
      ref={ref}
      className={cn("h-9", className)}
      placeholder="Search..."
      {...props}
    />
  </div>
))
SidebarSearch.displayName = "SidebarSearch"

const SidebarSection = React.forwardRef(({ className, title, children, ...props }, ref) => (
  <div ref={ref} className={cn("py-2", className)} {...props}>
    {title && (
      <h3 className="mb-2 px-4 text-sm font-medium text-stone-500">{title}</h3>
    )}
    {children}
  </div>
))
SidebarSection.displayName = "SidebarSection"

const SidebarItem = React.forwardRef(({ 
  className, 
  icon, 
  title, 
  isActive = false,
  tooltip,
  ...props 
}, ref) => {
  const item = (
    <div
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
        isActive 
          ? "bg-amber-100 text-amber-900" 
          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900",
        className
      )}
      {...props}
    >
      {icon && <span className="text-stone-500">{icon}</span>}
      <span>{title}</span>
    </div>
  )

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {item}
          </TooltipTrigger>
          <TooltipContent>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return item
})
SidebarItem.displayName = "SidebarItem"

const SidebarDivider = React.forwardRef(({ className, ...props }, ref) => (
  <Separator ref={ref} className={cn("my-2", className)} {...props} />
))
SidebarDivider.displayName = "SidebarDivider"

const SidebarSkeleton = () => (
  <div className="flex flex-col gap-2 p-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>
)

export {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarSearch,
  SidebarSection,
  SidebarItem,
  SidebarDivider,
  SidebarSkeleton,
}

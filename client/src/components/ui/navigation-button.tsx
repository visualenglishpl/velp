import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavigationButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: "back" | "breadcrumb" | "nav"
  className?: string
}

export function NavigationButton({ 
  href, 
  onClick, 
  children, 
  variant = "back",
  className 
}: NavigationButtonProps) {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      setLocation(href)
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "back":
        return "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      case "breadcrumb":
        return "text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200"
      case "nav":
        return "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      default:
        return "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }
  }

  return (
    <Button
      variant="ghost"
      size={variant === "breadcrumb" ? "sm" : "nav"}
      onClick={handleClick}
      className={cn(
        "gap-1.5 font-medium transition-colors rounded-lg",
        getVariantStyles(),
        className
      )}
    >
      {variant === "back" && <ChevronLeft className="h-4 w-4" />}
      {children}
    </Button>
  )
}

interface BreadcrumbNavigationProps {
  items: Array<{
    label: string
    href?: string
    onClick?: () => void
    active?: boolean
  }>
  className?: string
}

export function BreadcrumbNavigation({ items, className }: BreadcrumbNavigationProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronLeft className="h-4 w-4 text-gray-400 rotate-180" />
          )}
          {item.active ? (
            <span className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded-lg border">
              {item.label}
            </span>
          ) : (
            <NavigationButton
              href={item.href}
              onClick={item.onClick}
              variant="breadcrumb"
            >
              {item.label}
            </NavigationButton>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
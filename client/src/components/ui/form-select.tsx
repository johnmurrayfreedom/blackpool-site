"use client"

import React, { useState, useEffect } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { Check, AlertCircle, ChevronDown } from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  name: string
  label?: string
  options: SelectOption[]
  placeholder?: string
  showSuccessState?: boolean
  showErrorState?: boolean
  className?: string
  triggerClassName?: string
}

export const FormSelect = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  showSuccessState = true,
  showErrorState = true,
  className,
  triggerClassName,
}: FormSelectProps) => {
  const {
    control,
    formState: { errors, dirtyFields },
    trigger,
    watch
  } = useFormContext()

  const [hasInteracted, setHasInteracted] = useState(false)

  const fieldValue = watch(name)
  const error = errors[name]
  const isDirty = dirtyFields[name]
  const isSuccess = showSuccessState && isDirty && !error && fieldValue

  // Validate field when value changes and user has interacted with it
  useEffect(() => {
    if (hasInteracted && fieldValue !== undefined) {
      const timer = setTimeout(() => {
        trigger(name)
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [fieldValue, hasInteracted, name, trigger])

  return (
    <div className={cn("relative", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value?.toString()}
            onValueChange={(value) => {
              field.onChange(value)
              setHasInteracted(true)
            }}
            onOpenChange={() => {
              if (!hasInteracted) setHasInteracted(true)
            }}
          >
            <SelectTrigger 
              className={cn(
                "w-full transition-all duration-200 pr-10",
                // Error state
                error && showErrorState ? "border-red-500 focus-visible:ring-red-300" : "",
                // Success state
                isSuccess ? "border-green-500 focus-visible:ring-green-300" : "",
                triggerClassName
              )}
            >
              <SelectValue placeholder={placeholder} />
              
              {/* Icons container (positioned to avoid conflict with default select arrow) */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                {/* Success icon */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div 
                      className="text-green-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Error icon */}
                <AnimatePresence>
                  {error && showErrorState && (
                    <motion.div 
                      className="text-red-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertCircle size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SelectTrigger>
            
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* Error message */}
      <AnimatePresence>
        {error && showErrorState && (
          <motion.div
            className="text-sm font-medium text-red-500 mt-1"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error.message?.toString()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

FormSelect.displayName = "FormSelect"
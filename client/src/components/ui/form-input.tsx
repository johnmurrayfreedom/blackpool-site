"use client"

import React, { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { Check, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  showSuccessState?: boolean
  showErrorState?: boolean
  className?: string
  inputClassName?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    name, 
    label, 
    showSuccessState = true, 
    showErrorState = true, 
    className,
    inputClassName,
    ...props 
  }, ref) => {
    const { 
      register, 
      formState: { errors, dirtyFields, isSubmitted },
      trigger,
      watch
    } = useFormContext()
    
    const [isFocused, setIsFocused] = useState(false)
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
        <Input
          id={name}
          {...register(name)}
          {...props}
          className={cn(
            // Base styles
            "transition-all duration-200 pr-10",
            // Error state
            error && showErrorState ? "border-red-500 focus-visible:ring-red-300" : "",
            // Success state
            isSuccess ? "border-green-500 focus-visible:ring-green-300" : "",
            inputClassName
          )}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            setHasInteracted(true)
            props.onBlur?.(e)
          }}
          ref={ref}
        />
        
        {/* Success icon */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle size={18} />
            </motion.div>
          )}
        </AnimatePresence>

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
)

FormInput.displayName = "FormInput"
"use client"

import React, { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FormPasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  name: string
  label?: string
  showPasswordStrength?: boolean
  showSuccessState?: boolean
  showErrorState?: boolean
  className?: string
  inputClassName?: string
}

export const FormPassword = React.forwardRef<HTMLInputElement, FormPasswordProps>(
  ({
    name,
    label,
    showPasswordStrength = true,
    showSuccessState = true,
    showErrorState = true,
    className,
    inputClassName,
    ...props
  }, ref) => {
    const {
      register,
      formState: { errors, dirtyFields },
      trigger,
      watch
    } = useFormContext()

    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)

    const fieldValue = watch(name)
    const error = errors[name]
    const isDirty = dirtyFields[name]
    const isSuccess = showSuccessState && isDirty && !error && fieldValue && passwordStrength > 60

    // Calculate password strength
    useEffect(() => {
      if (!fieldValue) {
        setPasswordStrength(0)
        return
      }

      let score = 0
      
      // Length check
      if (fieldValue.length >= 8) score += 25
      else if (fieldValue.length >= 6) score += 10
      
      // Character variety checks
      if (/[A-Z]/.test(fieldValue)) score += 20 // Has uppercase
      if (/[a-z]/.test(fieldValue)) score += 15 // Has lowercase
      if (/[0-9]/.test(fieldValue)) score += 20 // Has number
      if (/[^A-Za-z0-9]/.test(fieldValue)) score += 20 // Has special char
      
      // Penalty for repeating patterns
      if (/(.)\1{2,}/.test(fieldValue)) score -= 10
      
      // Cap score at 0-100
      score = Math.max(0, Math.min(100, score))
      
      setPasswordStrength(score)
    }, [fieldValue])

    // Determine password strength label and color
    const getPasswordStrengthInfo = () => {
      if (passwordStrength >= 80) return { label: "Strong", color: "bg-green-500" }
      if (passwordStrength >= 60) return { label: "Good", color: "bg-yellow-500" }
      if (passwordStrength >= 30) return { label: "Weak", color: "bg-orange-500" }
      return { label: "Very weak", color: "bg-red-500" }
    }

    const strengthInfo = getPasswordStrengthInfo()

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
        <div className="relative">
          <Input
            id={name}
            type={showPassword ? "text" : "password"}
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

          {/* Password visibility toggle */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>

        {/* Password strength indicator (only shown when password field has value and is focused) */}
        {showPasswordStrength && fieldValue && fieldValue.length > 0 && (
          <motion.div
            className="mt-1.5 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${strengthInfo.color}`}
                initial={{ width: "0%" }}
                animate={{ width: `${passwordStrength}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Password strength:</span>
              <span 
                className={cn(
                  passwordStrength >= 80 ? "text-green-600" : 
                  passwordStrength >= 60 ? "text-yellow-600" : 
                  passwordStrength >= 30 ? "text-orange-600" : 
                  "text-red-600"
                )}
              >
                {strengthInfo.label}
              </span>
            </div>
          </motion.div>
        )}

        {/* Success icon */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500"
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
              className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500"
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

FormPassword.displayName = "FormPassword"
"use client"

import React, { useState } from "react"
import { 
  useForm, 
  FormProvider, 
  SubmitHandler, 
  FieldValues, 
  SubmitErrorHandler,
  DefaultValues
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedFormProps<TFieldValues extends FieldValues = FieldValues> {
  // Form configuration
  schema: z.ZodType<any>
  defaultValues?: DefaultValues<TFieldValues>
  onSubmit: SubmitHandler<TFieldValues>
  onError?: SubmitErrorHandler<TFieldValues>
  
  // Success/error feedback
  showSuccessFeedback?: boolean
  successMessage?: string
  showErrorFeedback?: boolean
  errorMessage?: string
  
  // Additional customization
  className?: string
  children: React.ReactNode
  id?: string
}

export function EnhancedForm<TFieldValues extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onError,
  showSuccessFeedback = true,
  successMessage = "Form submitted successfully!",
  showErrorFeedback = true,
  errorMessage = "There was a problem with your submission. Please check the form and try again.",
  className,
  children,
  id
}: EnhancedFormProps<TFieldValues>) {
  const formMethods = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched"
  })
  
  const { handleSubmit, formState } = formMethods
  const { isSubmitting, isSubmitSuccessful, isSubmitted, errors } = formState
  
  const [formError, setFormError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  
  const onSubmitWrapper: SubmitHandler<TFieldValues> = async (data) => {
    try {
      setFormError(null)
      setShowError(false)
      await onSubmit(data)
      setShowSuccess(true)
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : String(error))
      setShowError(true)
    }
  }
  
  const onErrorWrapper: SubmitErrorHandler<TFieldValues> = (errors) => {
    setShowError(true)
    if (onError) {
      onError(errors)
    }
    
    // Auto-hide error message after 5 seconds
    setTimeout(() => {
      setShowError(false)
    }, 5000)
  }
  
  return (
    <FormProvider {...formMethods}>
      <form 
        id={id}
        className={cn("relative", className)}
        onSubmit={handleSubmit(onSubmitWrapper, onErrorWrapper)}
        noValidate
      >
        {/* Form content */}
        <div className={cn(isSubmitting ? "opacity-60 pointer-events-none" : "")}>
          {children}
        </div>
        
        {/* Loading overlay */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div 
              className="absolute inset-0 bg-white/50 flex items-center justify-center rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm font-medium text-gray-700">Submitting form...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Success message */}
        <AnimatePresence>
          {!isSubmitting && showSuccessFeedback && showSuccess && (
            <motion.div
              className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md flex items-start gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Error message */}
        <AnimatePresence>
          {!isSubmitting && showErrorFeedback && (showError || Object.keys(errors).length > 0) && (
            <motion.div
              className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-start gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  {formError || errorMessage}
                </p>
                {Object.keys(errors).length > 0 && (
                  <ul className="mt-1 text-xs text-red-700 list-disc list-inside">
                    {Object.entries(errors).map(([field, error]) => (
                      <motion.li 
                        key={field}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {error?.message?.toString()}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </FormProvider>
  )
}
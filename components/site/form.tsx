"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "./ds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Types

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "yesno"
  | "range"
  | "file"
  | "date"
  | "time"
  | "datetime-local";

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp | string; // Allow string patterns for server components
  validationType?: "email" | "url" | "phone" | "alphanumeric" | "numeric";
  message?: string;
  custom?: (value: unknown) => boolean | string;
  matches?: string; // Field name to match (for password confirmation)
  matchMessage?: string; // Custom message for match validation
};

export type SelectOption = {
  label: string;
  value: string;
};

export type Field = {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  defaultValue?: unknown;
  validation?: ValidationRule;
  options?: SelectOption[]; // For select, radio, and multiselect
  rows?: number; // For textarea
  disabled?: boolean;
  className?: string;
  helperText?: string;
  accept?: string; // For file input
  multiple?: boolean; // For file input
  // Range field props
  min?: number; // For range
  max?: number; // For range
  step?: number; // For range
  showValue?: boolean; // For range - show current value
  // Yes/No field props
  yesLabel?: string; // For yesno - defaults to "Yes"
  noLabel?: string; // For yesno - defaults to "No"
  // Phone field props
  phoneFormat?: "us" | "international" | "auto"; // For tel - defaults to "auto"
  dependsOn?: {
    field: string;
    value: unknown;
    condition?: "equals" | "not-equals" | "contains" | "not-empty";
  }; // Field dependencies
};

export type FormProps = {
  fields: Field[];
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>; // Optional - for client components
  webhookUrl?: string; // Webhook URL for server components
  webhookMethod?: "POST" | "PUT" | "PATCH"; // HTTP method for webhook
  webhookHeaders?: Record<string, string>; // Custom headers for webhook
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  fieldClassName?: string;
  buttonClassName?: string;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  columns?: 1 | 2;
  loading?: boolean;
  disabled?: boolean;
  showLabels?: boolean;
  inlineErrors?: boolean;
  successMessage?: string;
  showSuccessMessage?: boolean;
  resetOnSubmit?: boolean;
  onSuccess?: () => void;
  errorMessage?: string; // Custom error message for failed submissions
  redirectUrl?: string; // URL to redirect to after successful submission
  redirectDelay?: number; // Delay in milliseconds before redirecting (default: 0)
};

// Component

export const Form = ({
  fields,
  onSubmit,
  webhookUrl,
  webhookMethod = "POST",
  webhookHeaders = {},
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  className,
  fieldClassName,
  buttonClassName,
  gap = 4,
  columns = 1,
  loading = false,
  disabled = false,
  showLabels = true,
  inlineErrors = true,
  successMessage = "Form submitted successfully!",
  showSuccessMessage = false,
  resetOnSubmit = false,
  onSuccess,
  errorMessage = "Something went wrong. Please try again.",
  redirectUrl,
  redirectDelay = 0,
}: FormProps) => {
  const router = useRouter();
  const getInitialData = () => {
    const initialData: Record<string, unknown> = {};
    fields.forEach((field) => {
      if (field.type === "file") {
        initialData[field.name] = null;
      } else {
        initialData[field.name] =
          field.defaultValue ??
          (field.type === "checkbox"
            ? false
            : field.type === "multiselect"
            ? []
            : field.type === "range"
            ? field.min ?? 0
            : field.type === "yesno"
            ? null
            : "");
      }
    });
    return initialData;
  };

  const [formData, setFormData] =
    useState<Record<string, unknown>>(getInitialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
  };

  // Phone formatting utilities
  const formatPhoneNumber = (
    value: string,
    format: "us" | "international" | "auto" = "auto"
  ): string => {
    // Remove all non-numeric characters except +
    const numbers = value.replace(/[^\d+]/g, "");

    // Handle international format
    if (
      format === "international" ||
      (format === "auto" && numbers.startsWith("+"))
    ) {
      if (numbers.length < 2) return numbers;

      const countryCode = numbers.startsWith("+1")
        ? numbers.slice(0, 2)
        : numbers.slice(0, 1);
      const remaining = numbers.slice(countryCode.length);

      // Limit to 10 digits after country code
      const limitedRemaining = remaining.slice(0, 10);

      if (limitedRemaining.length === 0) return countryCode;
      if (limitedRemaining.length <= 3)
        return `${countryCode} (${limitedRemaining}`;
      if (limitedRemaining.length <= 6)
        return `${countryCode} (${limitedRemaining.slice(
          0,
          3
        )}) ${limitedRemaining.slice(3)}`;
      return `${countryCode} (${limitedRemaining.slice(
        0,
        3
      )}) ${limitedRemaining.slice(3, 6)}-${limitedRemaining.slice(6)}`;
    }

    // Handle US format - limit to 10 digits
    const limitedNumbers = numbers.slice(0, 10);

    if (limitedNumbers.length === 0) return "";
    if (limitedNumbers.length <= 3) return `(${limitedNumbers}`;
    if (limitedNumbers.length <= 6)
      return `(${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3)}`;
    return `(${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(
      3,
      6
    )}-${limitedNumbers.slice(6)}`;
  };

  const getPhoneNumbers = (formatted: string): string => {
    // Extract numbers and preserve + for international
    if (formatted.startsWith("+")) {
      const numbers = formatted.replace(/[^\d]/g, "");
      // Limit to 11 digits total for +1 format, or 11 for other country codes
      return "+" + numbers.slice(0, 11);
    }
    // Limit to 10 digits for US format
    return formatted.replace(/[^\d]/g, "").slice(0, 10);
  };

  // Built-in validation patterns
  const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    phone: /^(\+1?[0-9]{10,11}|[0-9]{10})$/, // Updated for US and international
    alphanumeric: /^[a-zA-Z0-9]+$/,
    numeric: /^[0-9]+$/,
  };

  const validateField = (
    field: Field,
    value: unknown,
    allValues?: Record<string, unknown>
  ): string | null => {
    if (!field.validation) return null;
    const { validation } = field;

    if (
      validation.required &&
      !value &&
      field.type !== "file" &&
      field.type !== "multiselect"
    ) {
      return validation.message || `${field.label || field.name} is required`;
    }

    if (validation.required && field.type === "file" && !value) {
      return validation.message || `Please select a file`;
    }

    if (
      validation.required &&
      field.type === "multiselect" &&
      (!value || !Array.isArray(value) || value.length === 0)
    ) {
      return validation.message || `Please select at least one option`;
    }

    if (validation.required && field.type === "yesno" && value === null) {
      return validation.message || `Please select an option`;
    }

    // Check field matching (e.g., password confirmation)
    if (validation.matches && allValues) {
      const matchValue = allValues[validation.matches];
      if (value !== matchValue) {
        return (
          validation.matchMessage ||
          `${field.label || field.name} must match ${validation.matches}`
        );
      }
    }

    if (
      validation.minLength &&
      typeof value === "string" &&
      value.length < validation.minLength
    ) {
      return (
        validation.message ||
        `Minimum length is ${validation.minLength} characters`
      );
    }

    if (
      validation.maxLength &&
      typeof value === "string" &&
      value.length > validation.maxLength
    ) {
      return (
        validation.message ||
        `Maximum length is ${validation.maxLength} characters`
      );
    }

    if (validation.min !== undefined && Number(value) < validation.min) {
      return validation.message || `Minimum value is ${validation.min}`;
    }

    if (validation.max !== undefined && Number(value) > validation.max) {
      return validation.message || `Maximum value is ${validation.max}`;
    }

    // Handle validation type (built-in patterns)
    if (validation.validationType && value && typeof value === "string") {
      const pattern = validationPatterns[validation.validationType];
      if (pattern && !pattern.test(value)) {
        return (
          validation.message || `Invalid ${validation.validationType} format`
        );
      }
    }

    // Handle custom pattern (RegExp or string)
    if (validation.pattern && value && typeof value === "string") {
      const pattern =
        typeof validation.pattern === "string"
          ? new RegExp(validation.pattern)
          : validation.pattern;
      if (!pattern.test(value)) {
        return validation.message || "Invalid format";
      }
    }

    if (validation.custom) {
      const result = validation.custom(value);
      if (typeof result === "string") return result;
      if (!result) return validation.message || "Invalid value";
    }

    return null;
  };

  const handleChange = (field: Field, value: unknown) => {
    const newFormData = { ...formData, [field.name]: value };
    setFormData(newFormData);
    setShowSuccess(false); // Hide success message on new input
    setShowError(false); // Hide error message on new input

    if (touched[field.name]) {
      const error = validateField(field, value, newFormData);
      setErrors((prev) => ({ ...prev, [field.name]: error || "" }));
    }

    // Also validate fields that depend on this one
    fields.forEach((f) => {
      if (f.validation?.matches === field.name && touched[f.name]) {
        const error = validateField(f, newFormData[f.name], newFormData);
        setErrors((prev) => ({ ...prev, [f.name]: error || "" }));
      }
    });
  };

  const handleBlur = (field: Field) => {
    setTouched((prev) => ({ ...prev, [field.name]: true }));
    const error = validateField(field, formData[field.name], formData);
    setErrors((prev) => ({ ...prev, [field.name]: error || "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach((field) => {
      const error = validateField(field, formData[field.name], formData);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {})
    );

    if (hasErrors) return;

    setIsSubmitting(true);
    setShowError(false);
    setSubmitError("");

    try {
      // Prepare form data (handle file inputs)
      const submitData = { ...formData };

      // If file fields exist and we're using webhook, convert to base64
      if (webhookUrl) {
        for (const field of fields) {
          if (field.type === "file" && submitData[field.name]) {
            const file = submitData[field.name];
            if (file instanceof File) {
              // Convert file to base64 for webhook submission
              const reader = new FileReader();
              const base64 = await new Promise<string>((resolve) => {
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
              });
              submitData[field.name] = {
                name: file.name,
                type: file.type,
                size: file.size,
                data: base64,
              };
            }
          }
        }
      }

      // Submit to webhook if URL provided
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: webhookMethod,
          headers: {
            "Content-Type": "application/json",
            ...webhookHeaders,
          },
          body: JSON.stringify(submitData),
        });

        if (!response.ok) {
          throw new Error(`Form submission failed: ${response.status}`);
        }

        // Try to parse response (some webhooks return data)
        try {
          const responseData = await response.json();
          if (onSubmit) {
            await onSubmit(responseData);
          }
        } catch {
          // Response might not be JSON, that's okay
          if (onSubmit) {
            await onSubmit(submitData);
          }
        }
      } else if (onSubmit) {
        // Use custom submit handler if no webhook
        await onSubmit(submitData);
      } else {
        console.warn("Form: No webhook URL or onSubmit handler provided");
      }

      // Handle success
      if (showSuccessMessage) {
        setShowSuccess(true);
      }

      if (resetOnSubmit) {
        setFormData(getInitialData());
        setTouched({});
        setErrors({});
      }

      if (onSuccess) {
        onSuccess();
      }

      // Handle redirect after successful submission
      if (redirectUrl) {
        if (redirectDelay > 0) {
          setTimeout(() => {
            router.push(redirectUrl);
          }, redirectDelay);
        } else {
          router.push(redirectUrl);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setShowError(true);
      setSubmitError(error instanceof Error ? error.message : errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if field should be shown based on dependencies
  const shouldShowField = (field: Field): boolean => {
    if (!field.dependsOn) return true;

    const {
      field: dependentField,
      value,
      condition = "equals",
    } = field.dependsOn;
    const dependentValue = formData[dependentField];

    switch (condition) {
      case "equals":
        return dependentValue === value;
      case "not-equals":
        return dependentValue !== value;
      case "contains":
        return (
          typeof dependentValue === "string" &&
          dependentValue.includes(String(value))
        );
      case "not-empty":
        return !!dependentValue;
      default:
        return true;
    }
  };

  const renderField = (field: Field) => {
    if (!shouldShowField(field)) return null;

    const error = errors[field.name];
    const hasError = touched[field.name] && error;
    const isDisabled = disabled || loading || field.disabled;

    const inputClassName = cn(
      "bg-background",
      hasError && "border-destructive focus-visible:ring-destructive",
      field.className
    );

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            name={field.name}
            value={String(formData[field.name] || "")}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            placeholder={field.placeholder}
            disabled={isDisabled}
            className={inputClassName}
            rows={field.rows || 4}
          />
        );

      case "select":
        return (
          <Select
            value={String(formData[field.name] || "")}
            onValueChange={(value) => handleChange(field, value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={inputClassName}>
              <SelectValue placeholder={field.placeholder || "Select..."} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={Boolean(formData[field.name])}
              onCheckedChange={(checked) => handleChange(field, checked)}
              disabled={isDisabled}
            />
            {field.label && (
              <Label
                htmlFor={field.name}
                className="text-sm font-normal cursor-pointer"
              >
                {field.label}
              </Label>
            )}
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            value={String(formData[field.name] || "")}
            onValueChange={(value) => handleChange(field, value)}
            disabled={isDisabled}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "multiselect":
        const selectedValues = Array.isArray(formData[field.name])
          ? (formData[field.name] as string[])
          : [];
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              {field.options?.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-input hover:bg-muted/50",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (isDisabled) return;
                      const newValues = isSelected
                        ? selectedValues.filter((v) => v !== option.value)
                        : [...selectedValues, option.value];
                      handleChange(field, newValues);
                    }}
                  >
                    <Label className="font-normal cursor-pointer flex-1">
                      {option.label}
                    </Label>
                    <Checkbox checked={isSelected} disabled={isDisabled} />
                  </div>
                );
              })}
            </div>
            {selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedValues.map((value: string) => {
                  const option = field.options?.find(
                    (opt) => opt.value === value
                  );
                  return (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {option?.label}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isDisabled) return;
                          const newValues = selectedValues.filter(
                            (v: string) => v !== value
                          );
                          handleChange(field, newValues);
                        }}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        );

      case "range":
        const rangeValue = Number(formData[field.name] || field.min || 0);
        return (
          <div className="space-y-3">
            <Slider
              value={[rangeValue]}
              onValueChange={(value) => handleChange(field, value[0])}
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              disabled={isDisabled}
              className="w-full"
            />
            {field.showValue && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{field.min || 0}</span>
                <span className="font-medium text-foreground">
                  {rangeValue}
                </span>
                <span>{field.max || 100}</span>
              </div>
            )}
          </div>
        );

      case "yesno":
        const yesValue = true;
        const noValue = false;
        const currentValue = formData[field.name];
        return (
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={currentValue === yesValue ? "default" : "outline"}
              size="lg"
              className={cn(
                "h-14 text-base font-normal",
                currentValue === yesValue && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => handleChange(field, yesValue)}
              disabled={isDisabled}
            >
              {field.yesLabel || "Yes"}
            </Button>
            <Button
              type="button"
              variant={currentValue === noValue ? "default" : "outline"}
              size="lg"
              className={cn(
                "h-14 text-base font-normal",
                currentValue === noValue && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => handleChange(field, noValue)}
              disabled={isDisabled}
            >
              {field.noLabel || "No"}
            </Button>
          </div>
        );

      case "file":
        return (
          <Input
            id={field.name}
            name={field.name}
            type="file"
            onChange={(e) => {
              const files = (e.target as HTMLInputElement).files;
              handleChange(field, field.multiple ? files : files?.[0]);
            }}
            onBlur={() => handleBlur(field)}
            disabled={isDisabled}
            className={inputClassName}
            accept={field.accept}
            multiple={field.multiple}
          />
        );

      case "tel":
        // Get current raw value and format it for display
        const rawPhoneValue = String(formData[field.name] || "");
        const phoneFormat = field.phoneFormat || "auto";
        const displayValue = rawPhoneValue
          ? formatPhoneNumber(rawPhoneValue, phoneFormat)
          : "";

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value;

          // Extract just numbers for storage and validation
          const rawNumbers = getPhoneNumbers(inputValue);

          // Store raw numbers in form data
          handleChange(field, rawNumbers);
        };

        return (
          <Input
            id={field.name}
            name={field.name}
            type="tel"
            value={displayValue}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur(field)}
            placeholder={
              field.placeholder ||
              (phoneFormat === "international"
                ? "+1 (555) 123-4567"
                : "(555) 123-4567")
            }
            disabled={isDisabled}
            className={inputClassName}
          />
        );

      case "date":
      case "time":
      case "datetime-local":
        return (
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            value={String(formData[field.name] || "")}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            disabled={isDisabled}
            className={inputClassName}
          />
        );

      default:
        return (
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            value={String(formData[field.name] || "")}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            placeholder={field.placeholder}
            disabled={isDisabled}
            className={inputClassName}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      {showSuccess && showSuccessMessage && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md">
          {successMessage}
        </div>
      )}

      {showError && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
          {submitError || errorMessage}
        </div>
      )}

      <div className={cn("grid", gapClasses[gap], columnClasses[columns])}>
        {fields.map((field) => {
          if (!shouldShowField(field)) return null;

          return (
            <div key={field.name} className={cn("space-y-2", fieldClassName)}>
              {showLabels && field.label && field.type !== "checkbox" && (
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.validation?.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>
              )}

              {renderField(field)}

              {field.helperText && !errors[field.name] && (
                <p className="text-sm text-muted-foreground">
                  {field.helperText}
                </p>
              )}

              {inlineErrors && touched[field.name] && errors[field.name] && (
                <p className="text-sm text-destructive">{errors[field.name]}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className={cn("flex", gapClasses[gap], "mt-6", buttonClassName)}>
        <Button
          type="submit"
          disabled={isSubmitting || loading || disabled}
          className="flex-1 sm:flex-none"
        >
          {isSubmitting || loading ? "Loading..." : submitText}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting || loading || disabled}
            className="flex-1 sm:flex-none"
          >
            {cancelText}
          </Button>
        )}
      </div>
    </form>
  );
};

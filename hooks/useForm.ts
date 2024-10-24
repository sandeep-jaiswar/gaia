import { useState, useCallback } from "react";

type ValidationResult = string | undefined;

interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, ValidationResult>>;
  onSubmit: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, ValidationResult>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleReset: () => void;
  setFieldValue: (field: keyof T, value: any) => void;
}

export function useForm<T>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof T, ValidationResult>>
  >({});

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      if (validate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validate({ ...values, [name]: value })[name as keyof T],
        }));
      }
    },
    [validate, values]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      const hasErrors = Object.values(validationErrors).some(
        (error) => error !== undefined
      );
      if (hasErrors) return;
    }

    await onSubmit(values);
  };

  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  }, []);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
  };
}

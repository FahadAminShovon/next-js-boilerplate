import React from 'react';
import { useFormState } from 'react-dom';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type InputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
} & {
  label?: string;
  placeholder?: string;
  description?: string;
};

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;

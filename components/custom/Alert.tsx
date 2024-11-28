import { AlertCircle } from 'lucide-react';
import type React from 'react';

import { AlertDescription, AlertTitle, Alert as UIAlert } from '../ui/alert';

type AlertProps = {
  variant: React.ComponentProps<typeof UIAlert>['variant'];
  title: string;
  description?: React.ReactNode;
};

export const Alert = ({ variant, title, description }: AlertProps) => {
  return (
    <UIAlert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </UIAlert>
  );
};

// src/components/ui/badge.jsx
import React from 'react';
import { cn } from '@/lib/utils'; // Make sure 'utils' exists or adjust this import if necessary

export function Badge({ children, className, ...props }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-1 rounded-full text-sm font-medium', className)} {...props}>
      {children}
    </span>
  );
}

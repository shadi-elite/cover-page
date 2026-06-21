"use client";

import React, { useEffect, useRef, InputHTMLAttributes } from 'react';

// Web Components Imports
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';

// Extend JSX IntrinsicElements to include Material Web Components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-outlined-text-field': any;
      'md-outlined-select': any;
      'md-select-option': any;
      'md-filled-button': any;
      'md-text-button': any;
      'md-outlined-button': any;
      'md-icon-button': any;
      'md-icon': any;
      'md-outlined-card': any;
      'md-elevated-card': any;
      'md-circular-progress': any;
    }
  }
}

export interface MdTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errorText?: string;
  error?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
}

export const MdTextField = React.forwardRef<HTMLInputElement, MdTextFieldProps>(
  ({ label, value, type = 'text', placeholder, required, errorText, error, onChange, className, id, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(internalRef.current);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = internalRef.current;
      }
    }, [ref]);

    useEffect(() => {
      const element = internalRef.current;
      if (!element) return;

      const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (onChange) {
          onChange(target.value);
        }
      };

      element.addEventListener('input', handleInput);
      return () => {
        element.removeEventListener('input', handleInput);
      };
    }, [onChange]);

    useEffect(() => {
      const element = internalRef.current;
      if (element && element.value !== value) {
        element.value = value || '';
      }
    }, [value]);

    return (
      <md-outlined-text-field
        ref={internalRef}
        label={label}
        type={type}
        placeholder={placeholder}
        required={required}
        error-text={errorText}
        error={error ? "true" : undefined}
        class={className}
        id={id}
        {...props}
      ></md-outlined-text-field>
    );
  }
);
MdTextField.displayName = 'MdTextField';

export interface MdSelectProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  value?: string;
  required?: boolean;
  errorText?: string;
  error?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export const MdSelect = React.forwardRef<HTMLSelectElement, MdSelectProps>(
  ({ label, value, required, errorText, error, onChange, className, id, children, ...props }, ref) => {
    const internalRef = useRef<any>(null);

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(internalRef.current);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLSelectElement | null>).current = internalRef.current;
      }
    }, [ref]);

    useEffect(() => {
      const element = internalRef.current;
      if (!element) return;

      const handleChange = (e: Event) => {
        const target = e.target as any;
        if (onChange) {
          onChange(target.value);
        }
      };

      // M3 select fires 'change' or 'input'
      element.addEventListener('change', handleChange);
      return () => {
        element.removeEventListener('change', handleChange);
      };
    }, [onChange]);

    // Force value sync
    useEffect(() => {
      const element = internalRef.current;
      if (element && element.value !== value) {
        // Need setTimeout sometimes for options to mount
        setTimeout(() => {
          if (element) element.value = value || '';
        }, 0);
      }
    }, [value]);

    return (
      <md-outlined-select
        ref={internalRef}
        label={label}
        required={required}
        error-text={errorText}
        error={error ? "true" : undefined}
        class={className}
        id={id}
        {...props}
      >
        {children}
      </md-outlined-select>
    );
  }
);
MdSelect.displayName = 'MdSelect';

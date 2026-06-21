"use client";

import React, { useEffect, useRef, InputHTMLAttributes } from 'react';

// We need to import the web components so they register in the browser customElements registry
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';

// Extend JSX IntrinsicElements to include the Material Web Components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-outlined-text-field': any;
      'md-filled-button': any;
      'md-text-button': any;
      'md-outlined-button': any;
      'md-icon': any;
      'md-outlined-card': any;
    }
  }
}

export interface MdTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
}

export const MdTextField = React.forwardRef<HTMLInputElement, MdTextFieldProps>(
  ({ label, value, type = 'text', placeholder, required, onChange, className, id, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge refs
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

    // Force value sync (React's synthetic events sometimes miss Lit property updates)
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
        class={className}
        id={id}
        {...props}
      ></md-outlined-text-field>
    );
  }
);
MdTextField.displayName = 'MdTextField';

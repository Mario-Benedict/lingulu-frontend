import React, { useRef, useState, useEffect } from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Split value into array of single characters
  const valueArray = value.split('').slice(0, length);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, inputValue: string) => {
    // Only allow digits
    const digit = inputValue.replace(/\D/g, '').slice(-1);
    
    const newValue = valueArray.slice();
    newValue[index] = digit;
    
    // Fill empty slots with empty string
    while (newValue.length < length) {
      newValue.push('');
    }
    
    onChange(newValue.join(''));

    // Move to next input if digit was entered
    if (digit && index < length - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!valueArray[index] && index > 0) {
        // If current input is empty, move to previous and clear it
        inputRefs.current[index - 1]?.focus();
        const newValue = valueArray.slice();
        newValue[index - 1] = '';
        onChange(newValue.join(''));
      } else {
        // Clear current input
        const newValue = valueArray.slice();
        newValue[index] = '';
        onChange(newValue.join(''));
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);
    
    // Focus the input after the last pasted character
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    // Select the input content on focus
    inputRefs.current[index]?.select();
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el && inputRefs.current) {
              inputRefs.current[index] = el;
            }
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={valueArray[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          disabled={disabled}
          className={`w-14 h-16 text-center text-2xl font-bold border-2 rounded-lg outline-none transition-all duration-200
            ${focusedIndex === index 
              ? 'border-primary bg-white shadow-md' 
              : 'border-primary/50 bg-white'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-primary'}
            text-gray-800
          `}
        />
      ))}
    </div>
  );
};

export default OtpInput;

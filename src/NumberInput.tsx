import React, { useEffect, useState } from 'react';

import { clamp, roundTo } from './Math';

function toInner(value: number | null | undefined): string {
  return value != null ? String(value) : '';
}

function toOuter(value: string): number | null {
  return value ? Number(value) : null;
}

export interface NumberInputProps
  extends Omit<React.PropsWithoutRef<JSX.IntrinsicElements['input']>, 'value'> {
  value?: number | null;
  min?: number;
  max?: number;
  step?: number | 'any';
  clampAfterBlur?: boolean;
  roundAfterBlur?: boolean;
  onValueChange?: (value: number | null) => void;
}

export const NumberInput = React.forwardRef(
  (
    {
      value,
      min,
      max,
      step = 1,
      clampAfterBlur,
      roundAfterBlur,
      onValueChange,
      onChange,
      onBlur,
      ...props
    }: NumberInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [innerValue, setInnerValue] = useState(toInner(value));

    // Propagate changes of `value` to `innerValue`
    useEffect(() => {
      setInnerValue(toInner(value));
      // Ignore `innerValue` changes to prevent locking into a state forever
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    function handleEvent<T extends React.SyntheticEvent>(
      baseCallack: ((event: T) => void) | undefined,
      event: T,
      nextInnerValue: string,
      transformValue?: (value: number) => number,
    ): void {
      // Allow base callback to cancel the handler below
      baseCallack?.(event);
      if (event.defaultPrevented) return;

      let nextValue = toOuter(nextInnerValue);
      if (transformValue && nextValue != null) {
        nextValue = transformValue(nextValue);
        setInnerValue(toInner(nextValue));
      } else {
        // Keep non-digits in place, e.g. while typing a decimal separator
        setInnerValue(nextInnerValue);
      }

      // Prevent false positive event triggering
      if (nextValue !== toOuter(innerValue)) {
        onValueChange?.(nextValue);
      }
    }

    // Provide a sensible default for `inputMode`
    let inputMode: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    if (Number(min) >= 0) {
      inputMode =
        step !== 'any' && Number.isInteger(step) ? 'numeric' : 'decimal';
    }

    return (
      <input
        ref={ref}
        pattern={inputMode === 'numeric' ? '\\d*' : undefined} // iOS fallback
        inputMode={inputMode}
        value={value !== undefined ? innerValue : value} // Support uncontrolled
        min={min}
        max={max}
        step={step}
        onChange={(event): void => {
          handleEvent(onChange, event, event.currentTarget.value);
        }}
        onBlur={(event): void => {
          handleEvent(onBlur, event, innerValue, (nextValue) => {
            /* eslint-disable no-param-reassign */
            if (clampAfterBlur) {
              nextValue = clamp(nextValue, min, max);
            }
            if (roundAfterBlur && step !== 'any') {
              nextValue = roundTo(nextValue, step);
            }
            /* eslint-enable no-param-reassign */
            return nextValue;
          });
        }}
        {...props}
      />
    );
  },
);

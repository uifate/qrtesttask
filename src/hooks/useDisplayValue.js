import { autorun } from "mobx";
import { useState, useEffect } from "react";

export function useDisplayValue(get, set, validate, transform) {
  const [displayValue, setDisplayValue] = useState(get());

  useEffect(() => {
    return autorun(() => setDisplayValue(get()));
  }, []);

  return [displayValue, function(value) {
    if (validate(value)) {
      setDisplayValue(value);
      const transformed = transform(value);
      if (!isNaN(transformed)) set(transformed);
    }
  }];
}
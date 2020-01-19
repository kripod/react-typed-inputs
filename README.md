# react-typed-inputs

Strongly typed input components for React.

[![npm](https://img.shields.io/npm/v/react-typed-inputs)](https://www.npmjs.com/package/react-typed-inputs)
[![Travis (.com)](https://img.shields.io/travis/com/kripod/react-typed-inputs)](https://travis-ci.com/kripod/react-typed-inputs)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://commitizen.github.io/cz-cli/)

## 💡 Motivation

HTML form elements keep their internal state as strings. While the variable below retains its numeric type, it cannot be cleared by the user.

```jsx
import React, { useState } from 'react';

function Form() {
  const [value, setValue] = useState(42);
  return (
    <input
      type="number"
      value={value}
      onChange={event => setValue(Number(event.currentTarget.value))}
    />
  );
}
```

This happens because the empty input value gets converted to `0` by `Number('')`. Checking for edge cases would make the code difficult to reason about. Also, new issues arise when introducing `null` for intentionally missing values (in place of `''`).

## 📚 Usage

Import one of the components as documented below.

- Use `onValueChange` instead of `onChange`. (Behavior of the latter is kept intact in all cases.)
- Controlled components accept `null` as their `value`, denoting an empty field.
- Uncontrolled components support all the outlined behavioral additions.

Enjoy the benefits of type annotations and tree shaking out of the box.

### `<NumberInput>`

_Supersedes `<input type="number">`._

```jsx
import React, { useState } from 'react';
import { NumberInput } from 'react-typed-inputs';

function Form() {
  const [value, setValue] = useState(42);
  return <NumberInput value={value} onValueChange={setValue} />;
}
```

#### Props

##### Overridable defaults

- `type`: Equals `"number"`.
- `inputMode`: Set to one of the following only when `min >= 0`, as devices may not show a minus key (`-`).
  - `"numeric"`: When `step` is an integer, which is true unless overrided.
  - `"decimal"`: When `step` is not an integer.
- `pattern`: Serves as a fallback for setting input mode in iOS Safari.

##### Opt-in behavior

- `clampAfterBlur`: Enforces range constraints (`min`, `max`) by adjusting `value` when the component loses focus.
- `roundAfterBlur`: Enforces `step` constraint by adjusting `value` when the component loses focus.
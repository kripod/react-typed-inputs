# react-typed-inputs

Strongly typed input components for React.

[![npm](https://img.shields.io/npm/v/react-typed-inputs)](https://www.npmjs.com/package/react-typed-inputs)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/kripod/react-typed-inputs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/kripod/react-typed-inputs/context:javascript)
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
      onChange={(event) => setValue(Number(event.currentTarget.value))}
    />
  );
}
```

This happens because the empty input value gets converted to `0` by `Number('')`. Checking for edge cases would make the code difficult to reason about.

New issues arise when introducing `null` for intentionally missing values (in place of `''` or `NaN`). Although a special `valueAsNumber` attribute exists, it does not support the culture-independent decimal point (`.`) in all browsers.

_A [live demo](https://codesandbox.io/s/react-typed-inputs-demo-q22d7) is available for demonstrating the differences between prior approaches._

## 📚 Usage

Import one of the components as documented below.

- Use `onValueChange` instead of `onChange`. (Behavior of the latter is kept intact in all cases.)
- Controlled components accept `null` as their `value`, denoting an empty field.
- Uncontrolled components support all the described behavioral additions.

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
  - Tip: Use `"text"` in combination with custom increment/decrement controls. Typing a decimal point doesn’t nullify the value in that case.
- `inputMode`: Set to one of the following only when `min >= 0`, as devices may not show a minus key (`-`).
  - `"numeric"`: When `step` is an integer, which is true unless overrided.
  - `"decimal"`: When `step` is not an integer.
- `pattern`: Serves as a fallback for setting input mode in iOS Safari.

##### Opt-in behavior

- `clampAfterBlur`: Enforces range constraints (`min`, `max`) by adjusting `value` when the component loses focus.
- `roundAfterBlur`: Enforces `step` constraint by adjusting `value` when the component loses focus.

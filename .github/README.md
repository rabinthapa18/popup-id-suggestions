# PopupSuggestion

**PopupSuggestion** is a lightweight JavaScript class that provides an interactive popup suggestion box based on user input. It is designed to work with numeric input fields and fetches data from a specified JSON file.

## Features

- Dynamically loads suggestions from a JSON file.
- Provides a smooth and customizable UI with configurable styles.
- Supports keyboard navigation (Arrow keys, Enter, Escape, Backspace).
- Automatically updates suggestions based on user input.
- Works with `<input>` fields where users type numbers.

## Installation

This package is not available via npm. Instead, you can download the script from GitHub and include it in your project.

### Steps to Use:

1. Download the `PopupSuggestion.js` file from GitHub.
2. Include the script in your project.

```html
<script type="module">
  import PopupSuggestion from "./PopupSuggestion.js";

  const popup = new PopupSuggestion("path/to/data.json", {
    fontSize: "14px",
    zIndex: "1500",
    width: "320px",
  });
</script>
```

## Usage

### Basic Setup

```javascript
const popup = new PopupSuggestion("path/to/data.json");
```

- `path/to/data.json` should be replaced with the actual URL or file path where your JSON data is stored.

### input field to be processed

```html
<input type=“number” class=“popup-id-suggestions” placeholder=“manuscript-id”>
```

- `number` type.
- Specifies the `popup-id-suggestions` class.

### Example JSON Format

```json
[
  { "id": 101, "title": "Item One" },
  { "id": 102, "title": "Item Two" },
  { "id": 103, "title": "Item Three" }
]
```

## Options

You can customize the popup by passing an options object when initializing the class.

| Option            | Type    | Default Value                | Description                                            |
| ----------------- | ------- | ---------------------------- | ------------------------------------------------------ |
| `fontSize`        | string  | "12px"                       | Font size of the suggestion box text                   |
| `zIndex`          | string  | "1000"                       | Controls the popup's stack order                       |
| `itemPadding`     | string  | "5px"                        | Padding inside each suggestion item                    |
| `backgroundColor` | string  | "#0e1116"                    | Background color of the popup                          |
| `color`           | string  | "white"                      | Text color inside the popup                            |
| `borderRadius`    | string  | "7px"                        | Corner rounding for the popup                          |
| `hoverColor`      | string  | "#386ee3"                    | Background color when hovering over items              |
| `borderColor`     | string  | Lightened version of `color` | Border color of the popup                              |
| `width`           | string  | "300px"                      | Maximum width of the popup                             |
| `height`          | string  | "200px"                      | Maximum height of the popup                            |
| `textOverflow`    | string  | "wrap"                       | Controls text overflow behavior ("wrap" or "ellipsis") |
| `showBorders`     | boolean | `true`                       | Whether to show item dividers                          |

## Keyboard Shortcuts

- `ArrowDown` → Move selection down
- `ArrowUp` → Move selection up
- `Enter` → Select highlighted item
- `Escape` → Close the popup
- `Backspace` → Remove last digit and update suggestions

## Behavior

1. When a user types a number in an input field, the popup appears with matching suggestions.
2. Users can navigate using arrow keys and press `Enter` to select a suggestion.
3. Clicking outside the popup will close it.
4. Pressing `Backspace` will update the search query dynamically.

## Compatibility

- Works in modern browsers (Chrome, Firefox, Edge, Safari).
- Requires JavaScript ES6+ support.

## License

This script is open-source and available for personal and commercial use.

---

For any issues or feature requests, please visit the [GitHub repository](#).

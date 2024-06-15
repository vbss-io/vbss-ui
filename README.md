# vbss-ui Library

## Installation

First, you need to install the vbss-ui library. You can do this using either npm or yarn.

### Using npm

Run the following command in your project directory:

```bash
npm install vbss-ui
```

### Using yarn

Alternatively, if you prefer yarn, run:

```bash
yarn add vbss-ui
```

## Importing the Styles

To use the vbss-ui components, you need to import the styles. Add the following line to your main file (e.g., `index.js` or `main.js`):

```js
import "vbss-ui/dist/style.css";
```

## Using the Components

Now you are ready to use the vbss-ui components. Let's start with the Button component. First, import the Button component in your file:

```js
import { Button } from "vbss-ui";
```

Then, you can use the Button component in your JSX/TSX code:

```jsx
function App() {
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  );
}

export default App;
```

## Customizing Colors (Optional)

If you want to customize the colors used in the vbss-ui components, you can create a custom CSS file with your desired color scheme. Create a .css file (e.g., custom-colors.css) and define your colors using HSL format as follows:

```css
:root {
  --background: 0 0% 100%;
  --text: 0 0% 0%;
  --primary: 117 100% 47%;
  --secondary: 248 53% 58%;
  --highlight: 271 76% 53%;
}
```

After creating your custom colors file, import it into your main file:

```js
import "./custom-colors.css";
```

This will override the default colors with your custom colors.

### You are now ready to use the vbss-ui components in your project!

### More

For more information, please visit the [repository](https://github.com/vitorbss12/vbss-ui) and run Storybook to see the components in action. Storybook provides an interactive way to explore and test the components.

To start Storybook, navigate to the repository directory and run:

```bash
npm run storybook
```

or

```bash
yarn storybook
```

Refs:

- [Code With Gionatha](https://www.youtube.com/@gionatha)
- [Antonin Januska](https://www.youtube.com/@AntoninJanuska)
- [shadcn/ui](https://ui.shadcn.com/)

import React from 'react';

function createThemedComponent(Component) {
  return function ThemedComponent(props) {
    const { theme, ...rest } = props;
    const themeClassName = `theme-${theme}`;

    return (
      <div className={themeClassName}>
        <Component {...rest} />
      </div>
    );
  };
}

function Button(props) {
  return <button {...props}>Click me</button>;
}

const ThemedButton = createThemedComponent(Button);

function App() {
  return (
    <div>
      <ThemedButton theme="dark" onClick={() => alert('Hello')}>
        Click me
      </ThemedButton>
    </div>
  );
}

export default App;

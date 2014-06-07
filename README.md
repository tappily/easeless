easeless
========

Easing function for LESS

The function accepts 3 or 4 arguments. The follow examples produce equivalent ease values.
```css
    .ease(ease-in, 1.5, .5);
    .ease(ease-in, 1.5, 50%, 100%);
```

After calling the function, an ease variable is placed in scope.
```css
    .width-mix-in(@width) {
      .ease(ease-in-out, 2, 25%, 100%);
      width: @width * @ease;
    }
```

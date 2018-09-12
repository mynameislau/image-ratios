# IMAGE-RATIOS

https://mynameislau.github.io/image-ratios/

## HOW TO USE

simply import `image-ratios` in your main js file (or simply embed it via a `<script>` tag).
- If you use the `<script>` method, to start detecting ratios, call `imageRatios.startDetecting`
- If you import it, you can just call imageRatios()

## imageRatios function arguments

You can an options object as the function argument :

- `imagesSelector`: a string representing the selector for images you want to start the detection on
- `ratios`: a list of ratios It should be shaped like this :
  ```javascript
  [
    { name: '1-1', value: 1 },
    { name: '16-9', value: 16 / 9 },
    { name: '4-3', value: 4 / 3 }
  ]
  ```

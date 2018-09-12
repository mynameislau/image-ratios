import { queryToArray } from './utils';

const query = selector => queryToArray(document.querySelectorAll(selector));

// Select the target node
const target = document.body;

const defaultRatios = [
  { name: '1-1', value: 1 },
  { name: '16-9', value: 16 / 9 },
  { name: '4-3', value: 4 / 3 }
];

const calculateRatios = (imagesSelector, ratios) => {
  // Console.log(mutation.type);
  const imgQuery = query(`${imagesSelector}:not([data-biggest-dimension])`);

  imgQuery.forEach(image => {
    // Console.log('image !', image.getAttribute('src'));
    const newImg = new Image();

    newImg.addEventListener('load', () => {
      const imgHeight = newImg.height;
      const imgWidth = newImg.width;
      // Console.log(`The image size is ${width}*${height}`);

      ratios.forEach(ratio => {
        image.setAttribute(
          `data-higher-than-ratio-${ratio.name}`,
          imgWidth / imgHeight > ratio.value
        );
      });

      image.setAttribute('data-biggest-dimension', imgHeight > imgWidth ? 'height' : 'width');
    });

    newImg.src = image.getAttribute('src');
  });
};

export const startDetecting = (options = {
  imagesSelector: 'img',
  ratios: defaultRatios
}) => {
  if (!window.MutationObserver) {
    return;
  }
  const observer = new MutationObserver(options.imagesSelector, mutations => {
    mutations.forEach(() => calculateRatios(options.ratios));
  });

  observer.observe(target, { childList: true, subtree: true });

  calculateRatios(options.ratios);
};

export default startDetecting;

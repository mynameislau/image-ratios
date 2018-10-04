import { queryToArray } from './utils';

const query = selector => queryToArray(document.querySelectorAll(selector));

// Select the target node
const target = document.body;

const defaultRatios = [
  { name: '1-1', value: 1 },
  { name: '16-9', value: 16 / 9 },
  { name: '4-3', value: 4 / 3 }
];

const calculateRatios = (image, ratios) => {
  const imgWidth = image.naturalWidth;
  const imgHeight = image.naturalHeight;

  ratios.forEach(ratio => {
    image.setAttribute(
      `data-higher-than-ratio-${ratio.name}`,
      imgWidth / imgHeight > ratio.value
    );
  });

  image.setAttribute('data-biggest-dimension', imgHeight > imgWidth ? 'height' : 'width');
}

const setImagesDetection = (imagesSelector, ratios) => {
  // Console.log(mutation.type);
  const imgQuery = query(`${imagesSelector}:not([data-biggest-dimension])`);

  imgQuery.forEach(image => {
    calculateRatios(image, ratios);

    image.addEventListener('load', () => {
      calculateRatios(image, ratios);
    });
  });
};

export const startDetecting = (options = {
  imagesSelector: 'img',
  ratios: defaultRatios
}) => {

  options.ratios = options.ratios || defaultRatios;
  options.imagesSelector = options.imagesSelector || 'img';

  if (!window.MutationObserver) {
    return;
  }
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => setImagesDetection(options.imagesSelector, options.ratios));
  });

  observer.observe(target, { childList: true, subtree: true });

  setImagesDetection(options.imagesSelector, options.ratios);
};

export default startDetecting;

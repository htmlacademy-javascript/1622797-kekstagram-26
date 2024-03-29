import {imgPreview} from './scale-control.js';

const sliderWrapper = document.querySelector('.effect-level');
const slider = sliderWrapper.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');

const effectToSliderState = {
  chrome: {
    filter: 'grayscale',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  sepia: {
    filter: 'sepia',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  marvin: {
    filter: 'invert',
    units: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    }
  },
  phobos: {
    filter: 'blur',
    units: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
  heat: {
    filter: 'brightness',
    units: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
};


// Функция создает слайдер
function createSlider () {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
}


// Функция управления слайдером
function onFilterButtonChange (evt) {
  const currentEffect = evt.target.value;
  if (currentEffect === 'none') {
    sliderWrapper.classList.add('hidden');
    imgPreview.style.filter = 'none';
  } else {
    sliderWrapper.classList.remove('hidden');
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${currentEffect}`);
    slider.noUiSlider.updateOptions(effectToSliderState[currentEffect].options);
    slider.noUiSlider.on('update', () => {
      effectValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `${effectToSliderState[currentEffect].filter}(${effectValue.value}${effectToSliderState[currentEffect].units})`;
    });
  }
}

export {createSlider, onFilterButtonChange, sliderWrapper};

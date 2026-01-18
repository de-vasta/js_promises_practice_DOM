'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved');
    },
    { once: true },
  );

  setTimeout(reject, 3e3, new Error('First promise was rejected'));
});

const secondPromise = new Promise((resolve, reject) => {
  const clickHandler = () => resolve('Second promise was resolved');

  document.addEventListener('click', () => clickHandler(), { once: true });

  document.addEventListener(
    'contextmenu',
    () => {
      clickHandler();
    },
    {
      once: true,
    },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftBtnClicked = false;
  let rightBtnClicked = false;

  document.addEventListener(
    'click',
    () => {
      leftBtnClicked = true;
      BothBtnsClicked();
    },
    {
      once: true,
    },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      rightBtnClicked = true;
      BothBtnsClicked();
    },
    {
      once: true,
    },
  );

  const BothBtnsClicked = () => {
    if (leftBtnClicked && rightBtnClicked) {
      resolve('Third promise was resolved');
    }
  };
});

const appendDiv = (className, textContent) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = className;
  div.textContent = textContent;

  document.body.append(div);
};

firstPromise
  .then((value) => appendDiv('success', value))
  .catch((error) => appendDiv('error', error.message));

secondPromise.then((value) => appendDiv('success', value));

thirdPromise.then((value) => appendDiv('success', value));

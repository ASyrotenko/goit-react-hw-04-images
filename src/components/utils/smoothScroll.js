import * as Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;

export const smoothScroll = page => {
  if (page > 1) {
    const { height: cardHeight } = document
      .querySelector('li')
      .firstElementChild.getBoundingClientRect();

    scroll.scrollMore(cardHeight);
  }
};

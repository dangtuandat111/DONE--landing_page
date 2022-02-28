$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  dots: true,
  responsive: {
    600: {
      items: 1,
    },
    300: {
      items:1
    }
  },
});

const body = {
  init: () => {
    body.clickShowDetail('.icon-show', '.icon-hiding', '.contract-detail');
  },
  clickShowDetail: (show, hide, contentDetail) => {
    const btnHide = document.querySelectorAll(hide);
    const btnShow = document.querySelectorAll(show);
    const showContentDetail = document.querySelectorAll(contentDetail);
    for (let index = 0; index < btnHide.length; index++) {
      btnHide[index].addEventListener('click', () => {
        btnHide[index].classList.add('hiding');
        btnShow[index].classList.remove('hiding');
        showContentDetail[index].classList.remove('hiding');
      });
    }
    for (let index = 0; index < btnShow.length; index++) {
      btnShow[index].addEventListener('click', () => {
        btnShow[index].classList.add('hiding');
        btnHide[index].classList.remove('hiding');
        showContentDetail[index].classList.add('hiding');
      });
    }
  },
};
body.init();

const header = {
  init: () => {
    header.clickShowMenu('.humberger-icon', '.drop-header', '.close-menu');
  },
  clickShowMenu: (btn, show, close) => {
    const btnMenu = document.querySelector(btn);
    const dropMenu = document.querySelector(show);
    const closeMenu = document.querySelector(close);
    btnMenu.addEventListener('click', () => {
      dropMenu.classList.add('showMenu');
    });
    closeMenu.addEventListener('click', () => {
      dropMenu.classList.remove('showMenu');
    });
  },
};
header.init();

const slide = {
  init: () => {
    slide.checkOut('.owl-item', '.system-item');
  },
  checkOut: (itemX, itemY) => {
    const slideItems = document.querySelectorAll(itemX);
    const textItems = document.querySelectorAll(itemY);
    for (let index = 0; index < slideItems.length; index++) {
      if (slideItems[index].classList.contains('active') === 'active') {
        // textItems[index].classList.add('active-slide');
      }
    }
  },
};
slide.checkOut();

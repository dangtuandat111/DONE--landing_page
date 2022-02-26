
const body = {
  init: function () {
    this.clickShowDetail(
      '.icon-show',
      ' .icon-hiding',
      'hiding',
      '.contract-detail'
    );
  },
  clickShowDetail: function (show, hide, ClassShowDetail, contentDetail) {
    var btnShow = document.querySelector(show);

    var btnHide = document.querySelector(hide);
    var showContentDetail = document.querySelector(contentDetail);
    btnHide.addEventListener('click', () => {
      btnHide.classList.add(ClassShowDetail);
      btnShow.classList.remove(ClassShowDetail);
      showContentDetail.classList.remove(ClassShowDetail);
    });
    btnShow.addEventListener('click', () => {
      btnHide.classList.remove(ClassShowDetail);
      btnShow.classList.add(ClassShowDetail);
      showContentDetail.classList.add(ClassShowDetail);
    });
  },
};
body.init();

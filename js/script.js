const a = document.querySelectorAll("a");
a.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

//header nav handler
{
  const $mnus = document.querySelectorAll("header>nav>.gnb>li");

  let nowIdx = 0;
  let oldIdx = 0;
  $mnus.forEach(function (mnu, idx) {
    mnu.addEventListener("click", function (evt) {
      evt.preventDefault();
      oldIdx = nowIdx;
      nowIdx = idx;

      if (nowIdx === oldIdx) {
        mnu.classList.remove("on");
      } else {
        $mnus[oldIdx].classList.remove("on");
        $mnus[nowIdx].classList.add("on");
      }
    });
  });
}

//header seach pop-up
{
  const search = document.querySelector("header>.header-side>form");
  const popUp = document.querySelector("header>.seach-pop-up");
  const close = document.querySelector(
    "header>.seach-pop-up>.background>button"
  );
  const wrap = document.getElementById("wrap");

  search.addEventListener("click", function (evt) {
    evt.preventDefault();
    popUp.classList.add("active");
    wrap.classList.add("stop-scrolling");
  });

  close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popUp.classList.remove("active");
    wrap.classList.remove("stop-scrolling");
  });
}

//visual slider
{
  const pagination = document.querySelectorAll(
    ".visual>.slide-guide>.pagination>li"
  );
  const slides = document.querySelector(".visual>.slide-guide>.slides");
  const slide = document.querySelectorAll(".visual>.slide-guide>.slides>li");
  const playBtn = document.querySelector(".visual>.slide-guide>.auto-play");

  let nowIdx = 0;
  let oldIdx = nowIdx;
  let maxIdx = slide.length;
  let intervalKey;

  makeClone();
  function makeClone() {
    let cloneFirst = slide[0].cloneNode(true);
    slides.appendChild(cloneFirst);
  }

  const paging = () => {
    if (nowIdx === maxIdx) {
      pagination[0].classList.add("on");
      pagination[oldIdx].classList.remove("on");
    } else {
      pagination[nowIdx].classList.add("on");
      pagination[oldIdx].classList.remove("on");
    }

    slides.style.transform = "translateX(" + -20 * nowIdx + "%)";

    if (nowIdx < 2 || nowIdx === maxIdx) {
      pagination.forEach(function (item) {
        item.firstChild.style.color = "#000";
      });
      playBtn.style.color = "#000";
    } else {
      pagination.forEach(function (item) {
        item.firstChild.style.color = "#fff";
      });
      playBtn.style.color = "#fff";
    }
  };

  const autoPaging = () => {
    intervalKey = setInterval(function () {
      if (nowIdx <= maxIdx) {
        slides.style.transition = `transform .8s`;
        oldIdx = nowIdx;
        nowIdx++;
      }

      if (nowIdx === maxIdx) {
        setTimeout(function () {
          slides.style.transition = `transform 0s`;
          slides.style.transform = `translate(0px)`;

          oldIdx = nowIdx;
          nowIdx = 0;
        }, 800);
      }

      paging();
    }, 3000);
  };

  pagination.forEach(function (pge, idx) {
    pge.addEventListener("click", function () {
      oldIdx = nowIdx;
      nowIdx = idx;

      paging();
    });
  });

  playBtn.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (this.classList.contains("pause")) {
      this.classList.remove("pause");
      this.innerHTML = '<i class="fa-solid fa-play"></i>';
      autoPaging();
    } else {
      this.classList.add("pause");
      this.innerHTML = '<i class="fa-solid fa-pause"></i>';
      clearInterval(intervalKey);
    }
  });

  autoPaging();
}

//select-shop , new-fonts slider
{
  const slide = document.querySelectorAll(
    "section>.shop>.shops>.image-container>ul"
  );
  const upperTxts = document.querySelectorAll(
    "section>.shop>.select-shop>.text"
  );
  const underTxts = document.querySelectorAll("section>.shop>.new-fonts>.text");
  const prevBtn = document.querySelectorAll(
    "section>.shop>.shops>.image-container>.prev"
  );
  const nextBtn = document.querySelectorAll(
    "section>.shop>.shops>.image-container>.next"
  );

  nowIdx = [0, 0];
  oldIdx = [0, 0];

  nextBtn.forEach(function (next) {
    next.addEventListener("click", function () {
      if (this.classList.contains("upper-btn")) {
        nextBtnFn(0, upperTxts);
      } else {
        nextBtnFn(1, underTxts);
      }
    });
  });

  prevBtn.forEach(function (prev) {
    prev.addEventListener("click", function () {
      if (this.classList.contains("upper-btn")) {
        prevBtnFn(0, upperTxts);
      } else {
        prevBtnFn(1, underTxts);
      }
    });
  });

  const nextBtnFn = (idx, txts) => {
    if (nowIdx[idx] < txts.length - 1) {
      oldIdx[idx] = nowIdx[idx];
      nowIdx[idx]++;
    } else {
      oldIdx[idx] = nowIdx[idx];
      nowIdx[idx] = 0;
    }

    slide[idx].style.transform = "translate(" + -700 * nowIdx[idx] + "px)";
    txts[oldIdx[idx]].classList.remove("on");
    txts[nowIdx[idx]].classList.add("on");
  };

  const prevBtnFn = (idx, txts) => {
    if (nowIdx[idx] > 0) {
      oldIdx[idx] = nowIdx[idx];
      nowIdx[idx]--;
    } else {
      oldIdx[idx] = nowIdx[idx];
      nowIdx[idx] = txts.length - 1;
    }

    slide[idx].style.transform = "translate(" + -700 * nowIdx[idx] + "px)";
    txts[oldIdx[idx]].classList.remove("on");
    txts[nowIdx[idx]].classList.add("on");
  };

  setInterval(function () {
    nextBtn.forEach(function (next) {
      next.click();
    });
  }, 3000);
}

//font recommendation pop-up
{
  const fonts = document.querySelectorAll(".content>.recommendation>div");

  let mouseOver = false;
  let nowIdx;

  fonts.forEach(function (font, idx) {
    font.addEventListener("mouseover", function () {
      mouseOver = true;
      nowIdx = idx;
    });
    font.addEventListener("mouseout", function () {
      mouseOver = false;
    });
  });

  window.addEventListener("mousemove", function (evt) {
    if (!mouseOver) {
      return;
    }

    const X = evt.clientX;
    const Y = evt.clientY;

    fonts[nowIdx].lastElementChild.style.transform = `translate(${X + 10}px, ${
      Y + 10
    }px)`;
  });
}

//font in use slider
{
  const slides = document.querySelector(
    "section>.font-in-use>.slide-container>ul"
  );
  const slide = document.querySelectorAll(
    "section>.font-in-use>.slide-container>ul>li"
  );
  const nextBtn = document.querySelector(
    "section>.font-in-use>.slide-container>.next"
  );
  const prevBtn = document.querySelector(
    "section>.font-in-use>.slide-container>.prev"
  );

  let nowIdx = 0;
  const maxIdx = slide.length / 2;

  makeClone();
  function makeClone() {
    let cloneFirst = slide[0].cloneNode(true);
    let cloneSec = slide[1].cloneNode(true);
    let cloneThr = slide[2].cloneNode(true);

    slides.appendChild(cloneFirst);
    slides.appendChild(cloneSec);
    slides.appendChild(cloneThr);
  }

  nextBtn.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (nowIdx < maxIdx) {
      nowIdx++;
      slides.style.transition = `transform .8s`;
      slides.style.transform = `translate(${-1132 * nowIdx}px)`;
    }

    if (nowIdx === maxIdx) {
      setTimeout(function () {
        slides.style.transition = `transform 0s`;
        slides.style.transform = `translate(0px)`;
      }, 800);

      nowIdx = 0;
    }
  });

  prevBtn.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (nowIdx > 0) {
      nowIdx--;
      slides.style.transition = `transform .8s`;
      slides.style.transform = `translate(${-1132 * nowIdx}px)`;
    }

    if (nowIdx === 0) {
      setTimeout(function () {
        slides.style.transition = `transform 0s`;
        slides.style.transform = `translate(${-1132 * maxIdx}px)`;
      }, 800);

      nowIdx = maxIdx;
    }
  });

  setInterval(function () {
    nextBtn.click();
  }, 3000);
}

{
  const storySlider = document.querySelector(
    ".content>.story>.slide-container"
  );
  const brandSlider = document.querySelector(
    ".content>.brand>.slide-container"
  );

  let innerWidth = window.innerWidth;

  function sliderWidthFn(slider) {
    innerWidth = window.innerWidth;

    if (innerWidth < 1200) {
      slider.style.width = "100%";
    } else {
      slider.style.width = innerWidth - (innerWidth / 2 - 550) + "px";
    }
  }

  sliderWidthFn(storySlider);
  sliderWidthFn(brandSlider);
  window.addEventListener("resize", function () {
    sliderWidthFn(storySlider);
    sliderWidthFn(brandSlider);
  });
}

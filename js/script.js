// 이미지 및 리소스 로드 후 코드실행
window.onload = function () {
  // AOS셋팅
  AOS.init();

  //waypoint
  let goTop = document.querySelector(".gotop");
  let service = document.querySelector(".service");
  let footer = document.querySelector(".footer");
  new Waypoint({
    element: service,
    handler: (dir) => {
      if (dir === "down") {
        goTop.classList.add("active");
      } else {
        goTop.classList.remove("active");
      }
    },
    // 해당div가 화면상에 얼마나 보이는가
    offset: "50%",
  });

  new Waypoint({
    element: footer,
    handler: (dir) => {
      if (dir === "down") {
        goTop.classList.add("active2");
      } else {
        goTop.classList.remove("active2");
      }
    },
    offset: "90%",
  });

  goTop.addEventListener("click", () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  let htmlTag = document.querySelector("html");
  let mbBt = document.querySelector(".mb-bt");
  let mbNav = document.querySelector(".mb-nav");
  let logo = document.querySelector(".logo");
  let header = document.querySelector(".header");
  let gnbA = document.querySelectorAll(".gnb>li>a");
  let mbBtSpan = document.querySelectorAll(".mb-bt span");

  // 4. 모바일 버튼 클릭을 하면
  mbBt.addEventListener("click", function () {
    htmlTag.classList.toggle("active");
    logo.classList.toggle("active-blue");
    mbBt.classList.toggle("active");
    mbNav.classList.toggle("active");
    mbBtSpan.forEach((item) => {
      item.classList.toggle("active");
    });
  });
  // 화면 리사이징 처리
  window.addEventListener("resize", function () {
    let wW = window.innerWidth;
    if (wW > 1080) {
      htmlTag.classList.remove("active");
      mbBt.classList.remove("active");
      mbNav.classList.remove("active");

      let scT = window.document.documentElement.scrollTop;
      if (scT > 100) {
        mbBtSpan.forEach((item) => {
          item.classList.add("active");
        });
      } else {
        mbBtSpan.forEach((item) => {
          item.classList.remove("active");
        });
      }

      logo.classList.remove("active-blue");
    }
  });
  // window 스크롤 처리
  window.addEventListener("scroll", function () {
    let scT = window.document.documentElement.scrollTop;
    if (scT > 100) {
      header.classList.add("active");
      logo.classList.add("active");
      gnbA.forEach((item) => {
        item.classList.add("active");
      });
      mbBtSpan.forEach((item) => {
        item.classList.add("active");
      });
    } else {
      header.classList.remove("active");
      logo.classList.remove("active");
      gnbA.forEach((item) => {
        item.classList.remove("active");
      });
      mbBtSpan.forEach((item) => {
        item.classList.remove("active");
      });
    }
  });
  //화면 리로드시처리
  let scT = window.document.documentElement.scrollTop;
  if (scT > 100) {
    header.classList.add("active");
    logo.classList.add("active");
    gnbA.forEach((item) => {
      item.classList.add("active");
    });
  }

  // data.json 외부연동
  // 1. XMLHttpRequest 활용(반드시 JSON.parse() 실행)
  // const xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = (e) => {
  //   console.log(e.target);
  //   const req = e.target;
  //   if (req.readyState === XMLHttpRequest.DONE) {
  //     console.log(req.response);
  //     const dataArr = JSON.parse(req.response)
  //   }
  // };
  // xhttp.open("GET", "data.json");
  // xhttp.send();

  // 2.fetch
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      // 여기서 넘어온 데이터는 문자열
      visualData = data.visual;
      let html = "";
      let count = 1;
      visualData.forEach((item) => {
        html += `<li>${count++}</li>`;
      });
      swUl.innerHTML = html;
      swList = document.querySelectorAll(".swvisual-list li");
      swListShow();
      showVT(visualData[0]);
      changeBar(0);
    })
    .catch((err) => {
      console.log(err);
    });

  // 비주얼에 활용할 데이터
  let visualData;
  const swTitle = document.querySelector(".swvisual-title");
  const swTxt = document.querySelector(".swvisual-txt");
  const swLink = document.querySelector(".swvisual-link");
  const swUl = document.querySelector(".swvisual-list");
  //li 는 데이터 로딩 후 만든다
  let swList;

  // 타이틀 내용
  const showVT = (data) => {
    swTitle.innerHTML = data.title;
    swTxt.innerHTML = data.txt;
    if (data.link === "no") {
      swLink.classList.add("active");
    } else {
      swLink.classList.remove("active");
    }
  };
  // 포커스라인 애니메이션
  const changeBar = (index) => {
    swList.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  const swListShow = () => {
    swList.forEach((item, idx) => {
      item.addEventListener("click", () => {
        swVisual.slideToLoop(idx, 500, false);
      });
    });
  };

  let swVisual = new Swiper(".swvisual", {
    effect: "fade",
    loop: true,
    spped: 5000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: ".swvisual-prev",
      nextEl: ".swvisual-next",
    },
  });

  swVisual.on("slideChange", () => {
    showVT(visualData[swVisual.realIndex]);
    changeBar(swVisual.realIndex);
  });

  new Swiper(".swcategory", {
    loop: true,
    slidesPerView: 1,
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  let categoryPop = document.querySelector(".category-pop");
  categoryPop.addEventListener("click", () => {
    categoryPop.classList.add("active");
  });
};

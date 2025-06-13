'use strict';

/* 
  퍼블팀 js 파일입니다. 
  
  ※ 퍼블팀 외에 수정금지
  개발에서 필요한 부분은 dev.js 파일에 작업 부탁드리며, 
  common.js에서 삭제 필요한 부분은 퍼블팀에 따로 전달 부탁드립니다.
  
*/


/* 모달팝업 */
var startPop = function () {
  var winW = $(window).width();
  if (winW > 1024) {
    $('.start_pop').draggable({
      handle: '.modal-header',
      containment: 'html'
    });
    $('.start_pop__slider').draggable({
      handle: '.modal-header',
      containment: 'html'
    });
  }
}

/* loading image */
$(window).on('load', function () {
  $('.loading-image').fadeOut(300);
});

/* 모바일 네비게이션 */
var navMobile = {
  init: function () {
    this.nav_mobile_btn(); // 모바일네비 토글
    this.nav_mobile_active(); //활성화된 메뉴 열어두기
    this.nav_mobile_down(); //하위메뉴가 있는 항목 찾아서 addClass
    this.nav_mobile_action(); // 아코디언 메뉴
  },
  nav_mobile_btn: function () {
    var $navBtn = $('.nav-mobile__btn'),
      $navBg = $('.nav-mobile__bg'),
      $nav = $('.nav-mobile');
    var toggleNav = function () {
      $navBg.fadeToggle(200, "linear");
      $nav.toggleClass('active');
    };
    $navBtn.on('click', function () {
      toggleNav();
    });
    $navBg.on('click', function () {
      toggleNav();
    });
  },
  nav_mobile_active: function () {
    //활성화된 메뉴 열어두기(1depth)
    // $('.nav-mobile .depth-1 > .link.on').next('.nav-list--depth2').show();
    // $('.nav-mobile .depth-1 > .link.on').addClass('active');
    $('.nav-mobile .depth-1 > .link.on,.nav-mobile .depth-2 > .link.on').addClass('active').next().show();
  },
  nav_mobile_down: function () {
    // 하위메뉴가있는 메뉴에 드롭다운 표시를 위한 클래스 붙이기
    $('.nav-mobile .depth-1, .nav-mobile .depth-2').each(function () {
      if ($(this).children('').next().length > 0) {
        $(this).addClass('_down');
      } else {
        $(this).removeClass('_down');
      }
    });
  },
  nav_mobile_action: function () {
    var $depth1 = $('.nav-mobile .depth-1'),
      $depth2 = $('.nav-mobile .depth-2'),
      $depth2_list = $('.nav-mobile .nav-list--depth2'),
      // $depth3 = $('.nav-mobile .depth-3'),
      $depth3_list = $('.nav-mobile .nav-list--depth3');

    $depth1.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {
          $depth2.find('.link').removeClass('active');
          $depth1.children('.link').removeClass('active');
          $(this).addClass('active');
          $depth3_list.hide();
          $depth2.find('.link').removeClass('active');
          $depth2_list.slideUp(300);
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth2.find('.link').removeClass('active');
          $(this).next().slideUp(200);
          $depth1.children('.link').removeClass('active');
        }
        return false;
      } else {
      }
    });

    $depth2.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {
          $depth3_list.find('.link').removeClass('active');
          $depth3_list.stop(false, true).slideUp(300);
          $(this).addClass('active');
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth3_list.find('.link').removeClass('active');
          $(this).removeClass('active');
          $(this).next().stop(false, true).slideUp(300);
        }
        return false;
      } else {
      }
    });
  },
};

/* 서브 네비게이션 */
var subNav = {
  init: function () {
    this.depth_clone();
    this.drop_down();
  },
  depth_clone: function () {
    var $depth1Active = $('.nav').find('.depth-1 > .link'); // 1dp 가져오기
    var $depth2Active = $('.nav').find('.depth-1 > .link.on').next().find('.depth-2 > .link'); //활성화된 2depth
    var $depth3Active = $('.nav').find('.depth-2 > .link.on').next().find('.depth-3 > .link'); //활성화된 3depth

    // console.log(depth2Active);
    var $depth1List = $('.sub-nav-clone--depth1'); //depth1Active를 복사해 넣을 컨테이너
    var $depth2List = $('.sub-nav-clone--depth2'); //depth2Active를 복사해 넣을 컨테이너
    var $depth3List = $('.sub-nav-clone--depth3'); //depth3Active를 복사해 넣을 컨테이너

    //1뎁스 클론
    var $depth1Clone = $depth1Active.clone();
    //1뎁스 클론에 루프 하여 li생성후 넣기
    $.each($depth1Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth1List);
      $(ele).appendTo(li);
    });

    //2뎁스 클론
    var $depth2Clone = $depth2Active.clone();
    //2뎁스 내용 넣기
    $.each($depth2Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth2List);
      $(ele).appendTo(li);
    });

    //3뎁스 클론
    var $depth3Clone = $depth3Active.clone();
    //3뎁스 내용 넣기
    $.each($depth3Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth3List);
      $(ele).appendTo(li);
    });
  },

  drop_down: function () {
    var $dropDown = $('.sub-nav--dropdown .sub-nav__item'),
      $dropDownBtn = $('.sub-nav__button'),
      $dropDownList = $('.sub-nav__drawer');

    $dropDown.each(function () {
      $(this)
        .find($dropDownBtn)
        .click(function () {
          if ($(this).hasClass('on') == true) {
            $(this).removeClass('on');
            $(this).next().stop(false, true).slideUp(200);
          } else {
            $dropDownList.stop(false, true).hide();
            $dropDownBtn.removeClass('on');
            $(this).next().stop(false, true).slideDown(100);
            $(this).addClass('on');
          }
          return false;
        });
    });
  },
};

/* 서브네비게이션 스크롤 형태 */
var subNavScroll = {
  init: function () {
    this.sticky_nav();
  },

  sticky_nav: function () {
    var $subNav = $('.sub-nav--sticky'),
      $subNavWrap = $('.sub-nav--sticky .sub-nav__wrap');
    if ($subNav.length > 0) {
      var subNavOffset = $subNav.offset(),
        // subNavTop = subNavOffset.top;
        subNavTop = subNavOffset.top - $('.header').outerHeight(); // #헤더 고정형일때

      if ($(window).outerWidth() > 768) {
        if ($(window).scrollTop() > subNavTop) {
          $subNav.addClass('fix');
          $subNavWrap.css('top', $('.header').outerHeight()); //#헤더 고정형일때
        } else {
          $subNav.removeClass('fix');
          $subNavWrap.css('top', 0); //#헤더 고정형일때
        }
      } else {
        if ($(window).scrollTop() > subNavTop) {
          $subNav.addClass('fix');
        } else {
          $subNav.removeClass('fix');
        }
      }
    }
  },
};

/* Magnific 팝업 */
var magnificPop = {
  init: function () {
    this.ajax(); //ajax 팝업
  },
  ajax: function () {
    $('.popup-link').magnificPopup({
      type: 'ajax',
      closeOnBgClick: false,
      mainClass: 'mfp-fade',
      callbacks: {
        ajaxContentAdded: function () {
          var $content = $(this.content[0]);
          var $pop = $content.find('.popup-in-popup');
          var aURL = '';

          if ($pop.length > 0) {
            aURL = $pop.attr('href');

            $pop.on('click', function (e) {
              e.preventDefault();

              $.ajax({
                url: aURL,
                dataType: 'html',
                success: function (data) {
                  var item = '<div class="pop-in-pop">';
                  item += data;
                  item += '</div>';

                  /* HTML append */
                  $content.append(item);

                  /* 닫기 버튼 append */
                  $('.pop-in-pop').children().append('<div class="pop-in-close"><i class="xi-close"></i></div>');

                  /* 닫기 버튼 */
                  $('.pop-in-close').on('click', function () {
                    $('.pop-in-pop').remove();
                  });
                }
              });
            });
          }
        }
      }
    }, 500);
  },
};

function closePopup() {
  $.magnificPopup.close();
}

$(window).on('scroll', function () {
  subNavScroll.init();

  if ($(this).scrollTop() > 0) {
    $('body').addClass('is-scroll');
  } else {
    $('body').removeClass('is-scroll');
  }

  // Scroll Animation
  let observer = new IntersectionObserver(isElScrolledIntoView, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  const elements = document.querySelectorAll('.js-animate');
  elements.forEach(element => {
    observer.observe(element);
  }
  );
  function isElScrolledIntoView(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    }
    );
  }

}).trigger('scroll');

$(window).on('resize', function () {
  subNavScroll.init();
});

$(document).on('mouseover', function () {
  magnificPop.init();
});

$(document).ready(function () {
  //aos
  AOS.init({
    duration: 1200,
    once: true,
  });

  $(document).on('mouseenter', '.btn_gnb_toggle', function () {
    $(this).next().show();
  }).on('mouseleave', '.btn_gnb_toggle', function () {
    $(this).next().hide();
  });

  $(document).on('mouseenter', '.menu-box', function () {
    $(this).show();
  }).on('mouseleave', '.menu-box', function () {
    $(this).hide();
  });

  // top banner
  if ($('.top-banner').length) {
    $('body').addClass('top-banner-open');
  }

  $('#btnBannerClose').click(function () {
    $('body').removeClass('top-banner-open');
  });

  // quick
  $(document).on('click', '#btnTop', function () {
    $('html, body').animate({ scrollTop: '0' }, 300);
    return false;
  });

  $(document).on('click', '#btnQuick', function () {
    $('#quick').toggleClass('on');
  });

  // modal
  $(document).on('show.bs.modal', '.modal', function () {
    const zIndex = 1040 + 10 * $('.modal:visible').length;
    $(this).css('z-index', zIndex);
    setTimeout(() => $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack'));
  });

  // layer
  $(document).on('click', '[data-toggle=layer]', function () {
    let $layerBtn = $(this),
      $layerParent = $layerBtn.closest('.help-layer-wrp');

    if (!$layerBtn.hasClass('active')) {
      $('body').addClass('layer-oepn')
      $layerBtn.addClass('active').prepend('<div class="dim" data-toggle="layerClse"></div>')
      $layerParent.addClass('open');
    } else {
      $('body').removeClass('layer-oepn')
      $layerBtn.removeClass('active').find('.dim').remove();
      $layerParent.removeClass('open');
    }
    return false;
  });

  /* Navigation Active */
  /* $('.nav, .nav-mobile').navActive({
    depth1: '.depth-1',
    depth2: '.depth-2',
    depth3: '.depth-3',
    activeClass: 'on',
    callback: function () {
      // console.log('callback function');
    },
  }); */

  /* HEADER GNB Drop */
  /* $('.header').navDrop({
    type: 'all', // 기본값 udnefiend, 선언하지 않거나 없는 값을 선언할 경우 콘솔창에 경고문구 출력
    background: true, // 기본값 true, 배경 엘리먼트가 없을 경우 콘솔창에 경고문구 출력
    backgroundClass: '.nav__bg', // 기본값 .nav__bg
    backgroundAutoColor: false, // 기본값 false, depth2의 배경색을 자동으로 적용
    effect: 'fade', // 기본값 fade, 옵션값은 fade, slide
    delay: 200, // 출력시 delay
    callback: function () {}, // 콜백 함수
  }); */

  /* 
    이미지맵 제작 추천 : https://www.image-map.net/
    이미지맵 반응형 작업 시 선언
    $('img[usemap]').rwdImageMaps();
  */

  /* 
  $('[data-track]').scrollTrack({
    threshold: 0, // // 임계치 ( * 상단 고정영역 높이 )
    activeClass: 'active', // 활성 클래스 네이밍 (기본값 : active)
  });
  */

  /**
* qna
* 아코디언
*/
  var qnaFun = {
    init: function () {
      this.q();
    },
    q: function () {
      var qna = $(".qna"),
        header = qna.find(".qna-header"),
        header_a = qna.find(".qna-header a"),
        body = qna.find(".qna-body"),
        faq_chk = "";
      body.hide();


      $(document).on("click", ".qna-header", function (event) {
        event.preventDefault();

        if ($(this).hasClass("select") == true) {
          $(this).removeClass("select");
          $(this).next().stop().hide();
        } else {
          $(body).stop().hide();
          $(header).removeClass("select");
          $(this).next().stop().show();
          $(this).addClass("select");
        }
      });
    },
  };

  $(window).scrollTrack({
    threshold: 0,
    activeClass: 'active',
  });


  //gnbdrop.init();
  navMobile.init();
  subNav.init();
  subNavScroll.init();
  startPop();
  qnaFun.init(); //qna

  var wowJS = new WOW().init();

  //wowrap
  var wowrap = $('.wowrap');
  $(wowrap).each(function () {
    $(this)
      .find('.wow')
      .each(function (index) {
        var eq = index / 8 + 's';
        $(this).attr('data-wow-delay', eq);
      });
    $(this)
      .find('.animated')
      .each(function (index) {
        var eq = index * 250;
        $(this).attr('data-id', 'delay-' + eq);
      });
  });

  /* Bullet List */
  $('.bullet-list').each(function () {
    if ($(this).hasClass('bullet-list--decimal')) {
      $(this).children('.item').each(function (index) {
        $(this).prepend('<span class="decimal-number">' + (index + 1) + '</span>');
      });
    }

    $(this).addClass('bullet-type--js');
  });

  /*
  min-width지정 rowscroll
  */
  $('.row-scrollwrap').each(function () {
    var $rowScrollTxtWidth = $(this).data('show'),
      $rowScrollTxt = $(this).find('.row-scrollwrap__txt');
    $(this).find('.row-scrollwrap__content').css('min-width', $rowScrollTxtWidth);
    // 가로스크롤 영역 min-width지정
    var $gutter = 40; // $container-gutter-width (_var.scss)
    if ($(window).width() < $rowScrollTxtWidth + $gutter) {
      $rowScrollTxt.show();
      // 지정된 rowScrollTxtWidth + (gutter) 해상도에서 안내문구 노출
    }
  });

  /* scrollbar js */
  $('.scrollbar-inner').scrollbar();
  // $('.scrollbar-outer').scrollbar();
  // $('.scrollbar-light').scrollbar();

  /* Resizing Check */
  var resizing = resizingCheck({
    breakpoints: {
      414: function () {
        // console.log('414 < width < 768');
      },
      768: function () {
        // console.log('768 < width < 1024');
      },
      1024: function () {
        // console.log('1024 < width < 1200');
      },
      1200: function () {
        // console.log('1200 < width');
      },
    },
  });
});



/* File Upload */
$(document).on('change', '.file-box input[type="file"]', function () {
  var tmp = $(this).val().replace(/^.*\\/, "");
  $(this).parents('.file-box').find('.file-box__text').text(tmp);
  $(this).parents('.file-box').find('.file-box__text').addClass('on');
});

/* File Upload - 구버전 */
$(document).on('change', '.file_box input[type="file"]', function () {
  var tmp = $(this).val().replace(/^.*\\/, "");
  $(this).siblings("p").text(tmp);
});

//suv-nav 스크롤
function subNavScroll_front() {
  var $subNav = $('.sub-nav__wrap');
  var subNavLinkLeft = $('.sub-nav__wrap .link.on').offset().left;
  var subNavWidth = $('.sub-nav__wrap');
  var totalWidth = 0;

  for (var i = 0; i < subNavWidth.length; i++) {
    totalWidth += subNavWidth[i].offsetWidth;
  }

  $subNav.animate({ scrollLeft: subNavLinkLeft - 100 }, 1);
}


$(document).ready(function () {
  if ($('.sub-nav__wrap').length > 0) {
    if ($(window).innerWidth() < 1201) {
      subNavScroll_front();
    }
  }
});
$(window).resize(function () {
  if ($('.sub-nav__wrap').length > 0) {
    if ($(window).innerWidth() < 1201) {
      subNavScroll_front();
    }
  }
});


/* 본인인증 팝업 내 이용약관 보기 open/hide */
$('.terms-chk__head .icon').on('click', function () {
  $(this).parents('.terms-chk').find('.terms-chk__body').stop().slideToggle(200);
  $(this).toggleClass('active');
});

$('.terms-text-open').on('click', function () {
  if ($(this).parents('.terms-tr').find('.terms-text').css('display') == 'none') {
    $(this).text('닫기');
    $(this).parents('.terms-tr').find('.terms-text').stop().slideDown(200);
  } else {
    $(this).text('전문보기');
    $(this).parents('.terms-tr').find('.terms-text').stop().slideUp(200);
  }
});

$(document).ready(function () {
  // 아이디 유효성 체크 및 중복 검사

  $(document).on('click', '#all_agree', function () {
    if ($(this).is(':checked')) $('.agree_forms').prop('checked', true);
    else $('.agree_forms').prop('checked', false);
  });

  $(document).on('click', '.agree_forms', function () {
    if ($(this).is(':checked')) {

      var total = $('.terms-chk input[type=checkbox]').not('#all_agree').length;
      var checked = $('.terms-chk input[type=checkbox]:checked').not('#all_agree').length;
      if (total == checked) $('#all_agree').prop('checked', true);
    }
    else $('#all_agree').prop('checked', false);
  });

});

//input 폼 검증 실패일때 invalid
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("invalid", () => {
    // 검증 후 폼 요소에 was-validated 클래스로 표시해 둔다
    document.forms[0].classList.add("was-validated")
  })
})

// 전화번호 하이픈 자동생성
$(document).on("input", ".AutoHyphen", function () {
  $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-"));
});

// input 숫자만 입력가능
$(document).ready(function () {
  $('.utel').on('keyup', function () {
    var inputVal = $(this).val();
    if (!$.isNumeric(inputVal)) {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, '') //입력된 문자열이 숫자가 아니면 공백처리
      );

      alert('숫자만 입력가능합니다.');
    }
  });
});


// 주소
function DaumPostcode(uzip = '', uaddr1 = '', uaddr2 = '') {
  if (uzip == '') uzip = 'uzip';
  if (uaddr1 == '') uaddr1 = 'uaddr1';
  if (uaddr2 == '') uaddr2 = 'uaddr2';

  daum.postcode.load(function () {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ''; // 최종 주소 변수
        var extraAddr = ''; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') {
          // 사용자가 도로명 주소를 선택했을 경우
          fullAddr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if (data.userSelectedType === 'R') {
          //법정동명이 있을 경우 추가한다.
          if (data.bname !== '') {
            extraAddr += data.bname;
          }
          // 건물명이 있을 경우 추가한다.
          if (data.buildingName !== '') {
            extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
          fullAddr += extraAddr !== '' ? ' (' + extraAddr + ')' : '';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        //document.getElementById("uzip1").value = data.postcode1; //6자리 우편번호 사용
        //document.getElementById("uzip2").value = data.postcode2; //6자리 우편번호 사용
        document.getElementById(uzip).value = data.zonecode; //5자리 기초구역번호 사용
        document.getElementById(uaddr1).value = fullAddr;

        // 커서를 상세주소 필드로 이동한다.
        document.getElementById(uaddr2).focus();
      },
    }).open();
  });
}

//하단영역 팝업설정
$(document).ready(function () {
  $('.popup-link').on('click', function () {
    $('body').addClass('body-fixed');
  })
  $(document).on('click', '.mfp-close', function () {
    $('body').removeClass('body-fixed');
  })
  // ESC 키 눌렀을 때 팝업이 열려있는 경우
  $(document).keyup(function (e) {
    if (e.key === "Escape" && $.magnificPopup.instance.isOpen) {
      $.magnificPopup.close();
      $('body').removeClass('body-fixed'); // ESC 키 눌렀을 때 body-fixed 클래스 제거
    }
  });
})

//input 숫자/특수문자 입력X
document.querySelectorAll('.name-input').forEach(function (input) {
  input.addEventListener('input', function (e) {
    var value = e.target.value;
    var filteredValue = value.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    e.target.value = filteredValue;
  });
});

//input 이메일 형식에 사용가능한 문자만 허용
document.querySelectorAll(".email-input").forEach(function (input) {
  input.addEventListener("input", function (e) {
    var value = e.target.value;
    var filteredValue = value.replace(/[^a-zA-Z0-9!@^.\s]/g, '');
    e.target.value = filteredValue;
  });
});

//숫자만 입력가능
document.querySelectorAll(".number-input").forEach(function (input) {
  input.addEventListener("input", function (e) {
    let inputValue = e.target.value;
    // 숫자와 '-'만 남기고 나머지는 자동으로 제거
    e.target.value = inputValue.replace(/[^0-9\-]/g, "");
  });
});



/* 20250211 */
/* pms 공통 스크립트 */
/* 사이드 메뉴 바 애니메이션 */
$(document).ready(function () {
  $(".header").on("click", ".side-nav-list li", function () {
    const clickedElement = $(this); // 클릭한 요소를 변수에 저장

    // 클릭한 요소에 active와 active2 클래스가 이미 모두 있을 경우, 클래스 제거 후 종료
    if (
      clickedElement.hasClass("active") &&
      clickedElement.hasClass("active2")
    ) {
      clickedElement.removeClass("active active2");
      return; // 더 이상 작업 수행하지 않음
    }

    // 모든 .side-nav-list > li에서 active와 active2 클래스 제거
    $(".side-nav-list li").removeClass("active active2");

    // 클릭한 li에 active 클래스 추가
    clickedElement.addClass("active");

    // 0.1초 뒤에 active2 클래스 추가
    setTimeout(function () {
      clickedElement.addClass("active2");
    }, 100);
  });
});

// half toggle
function toggleBtn (tg) {
    let $parent;
    if($('.page-container > .tab-content').length){
        $parent = $('.page-container > .tab-content .tab-pane').filter('.active').find('.content-bx');
    } else {
        $parent = $('.content-bx').filter(':visible');
    }
    const $allHalf = $parent.find(".half"); // 문서 내 모든 .half 요소 찾기
    const $offHalf = $allHalf.filter(".off"); // off 클래스를 가진 .half 요소 필터링

    if ($offHalf.length > 0) {
        // off 클래스가 있는 경우
        $allHalf.removeClass("off on"); // 모든 .half에서 off와 on 클래스 제거
        return; // 이벤트 종료
    }

    // off 클래스가 없는 경우
    $allHalf.removeClass("off on"); // 모든 .half에서 기존 클래스 제거
    tg.closest(".half").addClass("off"); // 클릭된 버튼의 부모 .half에 off 추가
    $allHalf.not(".off").addClass("on"); // off가 아닌 .half에 on 추가
}

function rightToggleBtn () {
    let $parent;
    if($('.page-container > .tab-content').length){
        $parent = $('.page-container > .tab-content .tab-pane').filter('.active').find('.content-bx');
    } else {
        $parent = $('.content-bx').filter(':visible');
    }
    const $allHalf = $parent.find(".half"); // 문서 내 모든 .half 요소 찾기
    const $offHalf = $allHalf.filter(".off"); // off 클래스를 가진 .half 요소 필터링

    if ($offHalf.length > 0) {
        // off 클래스가 없는 경우
        $allHalf.removeClass("off on"); // 모든 .half에서 기존 클래스 제거
    } else {
        return false;
    }
}

// 03-20 추가
function showHalfBoth() {
    let $firstHalf = $(".half").filter(':eq(0)');
    let $lastHalf = $(".half").filter(':eq(1)');

    if($('.page-container > .tab-content').length){
      $firstHalf = $('.page-container > .tab-content .tab-pane').filter('.active').find(".half").filter(':eq(0)');
      $lastHalf = $('.page-container > .tab-content .tab-pane').filter('.active').find(".half").filter(':eq(1)');
    }

    $firstHalf.removeClass('off on');
    $lastHalf.removeClass('off on');
}

function showLeftHalf() {
    let $firstHalf = $(".half").filter(':eq(0)');
    let $lastHalf = $(".half").filter(':eq(1)');
    
    if($('.page-container > .tab-content').length){
        $firstHalf = $('.page-container > .tab-content .tab-pane').filter('.active').find(".half").filter(':eq(0)');
        $lastHalf = $('.page-container > .tab-content .tab-pane').filter('.active').find(".half").filter(':eq(1)');
    }

    $firstHalf.removeClass('off').addClass('on');
    $lastHalf.removeClass('on').addClass('off');
}

function showRightHalf() {
    let $firstHalf = $(".half").filter(':eq(0)');
    let $lastHalf = $(".half").filter(':eq(1)');
    
    if($('.page-container > .tab-content').length){
        $firstHalf = $('.page-container > .tab-content .tab-pane').filter('.active').find(".half").filter(':eq(0)');
        $lastHalf = $('.page-container > .tab-content .tab-pane').filter('.active').find(".half").filter(':eq(1)');
    }

    $firstHalf.removeClass('on').addClass('off');
    $lastHalf.removeClass('off').addClass('on');
}

/* 필터 열기 / 닫기 */
$(document).ready(function () {
    $(".circle-open-btn").on("click", function () {
        $(this).toggleClass("on");
        $(this).closest(".form-inner").toggleClass("on");
    });

    /* 탭 관련 */
    
    setTimeout(function () {
      $('.tab-body .tab-content').each(function() {
        if(!$(this).hasClass('active')){
          $(this).css('display', 'none')
        }
      })
    }, 300);

    /* 콘텐츠 영역 좌우 확대 */
    $(document).on("click", ".toggle-btn", function () {
        toggleBtn($(this));
    });

    $(document).on("click", "[data-toggle='toggle-btn']", function () {
        toggleBtn($(this));
    });

    $(document).on("click", "[data-toggle-switch]", function () {
        var $firstChild = $(".half").filter(':eq(0)'),
            $lastChild = $(".half").filter(':eq(1)');

        if($(this).attr('data-target') == 'right'){
            $firstChild.removeClass('on').addClass('off');
            $lastChild.removeClass('off').addClass('on');
        } else {
            $firstChild.removeClass('off').addClass('on');
            $lastChild.removeClass('on').addClass('off');
        }
    });

    $(document).on('click', '[data-toggle=layer-close]', function(e){
        layerClose(target);
    })
});

// layer
function layerOpen(target){
    $('#'+target).before('<a class="dim" data-toggle="layer-close" data-target="'+target+'"><i class="sr-only">close</i></a>').addClass('open');
    $('body').addClass('layer-open');
};

function layerClose(target){
    var t = $(this),
        target = t.data('target');
    
    $('body').removeClass(target+'-open')
    $('body').removeClass('layer-open').find('.dim').remove();
    $('#'+target).removeClass('open dropped').find('.layer-body').scrollTop(0);
};


$(document).on("click", ".check-table tbody td:not(:first-child)", function () {
  const $allHalf = $(".half"); // 문서 내 모든 .half 요소 찾기
  const $offHalf = $allHalf.filter(".off"); // off 클래스를 가진 .half 요소 필터링

  if ($offHalf.length > 0) {
    // off 클래스가 있는 경우
    $allHalf.removeClass("off on"); // 모든 .half에서 off와 on 클래스 제거
    return; // 이벤트 종료
  }

  // off 클래스가 없는 경우
  /* $allHalf.removeClass('off on'); // 모든 .half에서 기존 클래스 제거
  $(this).closest('.half').addClass('off'); // 클릭된 버튼의 부모 .half에 off 추가
  $allHalf.not('.off').addClass('on'); // off가 아닌 .half에 on 추가 */
});

/* 체크리스트 팝업 열기 */
function openPopup(e, $url) {
  e.preventDefault(); // 기본 링크 동작 막기
  const url = $url; // 새창으로 열 URL
  const width = window.innerWidth - 246; // 새창 너비
  const height = window.innerHeight - 80; // 새창 높이
  const left = 246; // 화면 중앙에 위치
  const top = 206; // 화면 중앙에 위치

  window.open(
    url,
    "_blank",
    `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no`
  );
}

/* 탭 메뉴 동작 */
/* 20250206 업데이트 */
$(document).ready(function () {
    tabInit();
});

function tabInit (){
  var tabTypes = new Set(); // 중복 방지를 위한 Set 객체

  // 모든 [data-tabN-num] 속성을 가진 요소 탐색
  $(
    "[data-tab1-num], [data-tab2-num], [data-tab3-num], [data-tab4-num], [data-tab5-num]"
  ).each(function () {
    $.each(this.attributes, function () {
      if (this.name.startsWith("data-tab") && this.name.endsWith("-num")) {
        var tabType = this.name.replace("data-tab", "").replace("-num", ""); // N 값 추출
        if ($.isNumeric(tabType)) {
          // 숫자인지 확인
          tabTypes.add(tabType);
        }
      }
    });
  });

  // 추출한 tabN-num 속성들에 대해 이벤트 바인딩
  tabTypes.forEach(function (tabType) {
    $(document).on("click", "[data-tab" + tabType + "-num]", function () {
      if($('.half').length){
        var tabClosestTg =  $(this).closest('.half'); 
      } else {
        var tabClosestTg =  $('body'); 
      }
      tabClosestTg.find($("[data-tab" + tabType + "-num]")).removeClass("active");
      var tabNum = $(this).data("tab" + tabType + "-num");
      tabClosestTg.find($("[data-tab" + tabType + '-num="' + tabNum + '"]')).addClass("active");
      $('.tab-body .tab-content').not('.active').css('display', 'none');
      $('.tab-body .tab-content').filter('.active').css('display', 'block');
      seisUtil.onShowContentTab();
    });
  });
}

/* 파일 추가 및 삭제 */
$(document).ready(function () {
  // 파일 선택 시
  $(document).on("change", ".file-input", function (event) {
    const fileInput = $(this);
    const fileTd = fileInput.closest("td.file-td"); // 현재 input이 있는 td
    const fileRow = fileTd.closest("tr"); // 현재 tr 찾기
    const fileList = fileRow.prev("tr").find(".file-list"); // 위쪽 tr의 .file-list 찾기
    const files = event.target.files;

    let fileArray = fileInput.data("files") || []; // 개별 파일 배열 저장

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // 중복 체크
      const isDuplicate = fileArray.some(
        (existingFile) => existingFile.name === file.name
      );
      if (isDuplicate) {
        alert("이미 추가된 파일입니다.");
        continue; // 중복 파일 추가 방지
      }

      // 배열에 파일 추가
      fileArray.push(file);
      fileInput.data("files", fileArray); // 업데이트

      // li 요소 생성
      const li = $("<li></li>").text(file.name);

      // X 버튼 생성
      const removeBtn = $(
        '<a href="#" download class="link-download"><img src="../assets/images/common/icon_download.png" alt=""></a>'
      ).click(function () {
        // 파일 배열에서 삭제
        fileArray = fileArray.filter((f) => f.name !== file.name);
        fileInput.data("files", fileArray); // 업데이트
        li.remove();
      });

      li.append(removeBtn);
      fileList.append(li);
    }
  });

  // 폼 제출 시 파일 전송
  $("form").submit(function () {
    $(".file-input").each(function () {
      const fileInput = $(this);
      const fileArray = fileInput.data("files") || [];

      const dataTransfer = new DataTransfer();
      fileArray.forEach((file) => {
        dataTransfer.items.add(file);
      });

      fileInput[0].files = dataTransfer.files;
    });
  });
});


$(document).ready(function(){
    // 03-13 추가 특정 textarea 스크롤 생성시 Height값 변경
    $(".fixable").each(function(){
        $(this).css('height', 'auto');
    })
    
    $(".fixable").on("propertychange change keyup paste input", function() {
        $(this).css('height', 'auto');
        $(this).height( $(this).prop('scrollHeight') - 10 );
    });

    // collapse
    $(document).on('click', '[data-toggle="collapse"]', function(){
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $(this).parent().next('.child').slideDown(300);
        } else {
            $(this).removeClass('on');
            $(this).parent().next('.child').slideUp(300).find('.child').slideUp(300).end().find('.on').removeClass('on');
        }
    })
})

$(document).on('propertychange change keyup paste input','.fixable',function () {
    $(this).css('height', 'auto');
    $(this).height( $(this).prop('scrollHeight') - 10 );
})

/* 데이트피커 */
function makeDatepicker() {
  $('.input-date').daterangepicker({
    autoApply: true,
    startDate: moment().startOf("day"),
    endDate: moment().startOf("day"),
    locale: {
      format: "YY-MM-DD",
    },
    timePicker: false,
  });

  if($('[data-type="ym"]').length){
    $('[data-type="ym"]').monthpicker({
      monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)',
          '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      showOn: "button",
      buttonImage: "../../assets/images/common/icon_date.svg",
      changeYear: false,
      yearRange: 'c-2:c+2',
      dateFormat: 'yy-mm'
    });
  }
}

$(function () {

  $(document).on('focus','.input-date',function () {
    $(this).daterangepicker({
      autoApply: true,
      locale: {
        format: "YY-MM-DD",
      },
      timePicker: false,
    });
  })

  $(document).on('focus','[data-type="ym"]',function () {
    $(this).monthpicker({
      monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)',
          '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      showOn: "button",
      buttonImage: "../../assets/images/common/icon_date.svg",
      changeYear: false,
      yearRange: 'c-2:c+2',
      dateFormat: 'yy-mm'
    });
  });

  makeDatepicker();

  // 특정 요소가 동적으로 추가될 때까지 기다리는 함수
  function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
    } else {
      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector(selector);
        if (element) {
          callback(element);
          obs.disconnect(); // 요소를 찾았으므로 더 이상 감시할 필요 없음
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  waitForElement(".calendar-table", (targetNode) => {
    const config = { childList: true, subtree: true };

    const callback = function (mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          var el = $(".prev.available").parent().children().last();
          if (el.hasClass("next available")) return;
          el.addClass("next available");
          el.append("<span></span>");
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  });
});

/* 샘플 리스트 */
$(function () {
  var repeatCount = 11; // 원하는 반복 횟수 지정
  var $sampleList = $(".sample-list");

  var trHtml = `
  <tr>
     <td><span><input type="checkbox"></span></td>
     <td><span>1335</span></td>
     <td><span>2025</span></td>
     <td><span>01</span></td>
     <td><span>2025.01.24</span></td>
     <td><span>2025.01.24</span></td>
     <td><span>2025.01.24</span></td>
     <td><span>2025.01.24</span></td>
     <td><span>에스이메이커스주식회사(SEMAKERS Inc.)</span></td>
     <td><span>강원도</span></td>
     <td><span>강새로이</span></td>
     <td><span>제2019-36897-01</span></td>
     <td><span>일자리제공형</span></td>
     <td><span>서비스업</span></td>
     <td><span>000-00-00000</span></td>
     <td><span>010-9999-9999</span></td> 
     <td><span>dkfjksjkfsjkj@naver.com</span></td>
     <td><span>Y</span></td>
     <td><span>진행중</span></td>
     <td><span>검토기관</span></td>
     <td><span>2025.01.24</span></td>
     <td><span>사회적기업</span></td>
     <td><span>조아요</span></td>
     <td><span>2025.01.24</span></td>
     <td><span>98</span></td>
     <td><span>A</span></td>
  </tr>`;

  for (var i = 0; i < repeatCount; i++) {
    $sampleList.append(trHtml);
  }
});
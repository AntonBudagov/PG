(function (appl) {
  'use strict';

  new WOW().init();

  var fullScreenSlider = {
      nav: true,
      pagination: false,
      slideSpeed : 300,
      paginationSpeed : 400,
      items:1,
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
      // "singleItem:true" is a shortcut for:
      // items : 1,
  }

  var personSlider = {
    navigation : false,
    pagination: true,
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true,
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false
  }

  var Carusel = {
    items : 4,
    nav : false,
    dots: true,
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem: false,
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false
  }
  var CaruselPhoto = {
    // responsive: false,
    nav : true,
    pagination: false,
    // margin: 10,
    loop: true,
    autoWidth: true,
    items: 4
  }

  var phoneId = document.getElementById("phone");
  var nameId = document.getElementById("firstname");
  var owl = $("#fullScreenSlider");

  $("#fullScreenSlider").owlCarousel(fullScreenSlider)
  $("#photoCarusel").owlCarousel(CaruselPhoto)


  $("#owol-personSlider").owlCarousel(personSlider)
  $("#owl-caruselCompany").owlCarousel(Carusel)
  // $("#owl-caruselPublications").owlCarousel(Carusel)




  $('.groupButtonTabs .btnTab').click(function (e) {
    e.preventDefault();
    $('.btnTab').removeClass('active');
    $(this).addClass('active');

    $('.tableContent').fadeToggle(100);
  });



  $(".slideNext").click(function(){
      owl.trigger('next.owl.carousel');
  })
  $(".slidePrev").click(function(){
      owl.trigger('prev.owl.carousel');
  })

  $('.modal-trigger').leanModal({

    complete: function() {
      phoneId.className = '';
      phoneId.value = '';
      nameId.className = '';
      nameId.value = '';
    }
  });


  // Video youtube
  // var videos = document.querySelectorAll(".videoItem");
  // for (var i=0; i<videos.length; i++) {
  //   var youtube = videos[i];
  //   // Get function
  //   getVideos(youtube);
  // }

  // // Get videos function
  // function getVideos(el){

  //   // On click get video
  //   // el.addEventListener('click',function(){
  //   el.addEventListener('click',function(){
  //     var iframe = document.createElement("iframe");
  //     iframe.setAttribute('class','youtube_video');
  //     iframe.setAttribute('src','http://www.youtube.com/embed/'+
  //     this.id +'?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1');
  //     // Remplace img for video
  //     // this.parentNode.replaceChild(iframe, this);
  //     $(this).html(iframe, this);
  //   },false);
  // };

  // Video
  $(".videoPlay, .textVideo").click(function(e) {
    var iframe = document.createElement("iframe");
    var Id = $(this).parent().attr('id');
    console.log(Id)
      iframe.setAttribute('class','youtube_video');
      iframe.setAttribute('src','http://www.youtube.com/embed/'+
      Id +'?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1');

      $(this).parent().html(iframe, this);
    });


  // Modal
  $('#modal1').submit(function(e) {

    var name = $(this).find("#firstname");
    var phone = $(this).find("input[name='phone']");

    var regularName = /^[а-яА-ЯёЁ0-9\s\-a-zA-z]{3,20}$/g;
    var regularNameTest = regularName.test(name.val());
    var regularPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var regularPhoneTest = regularPhone.test(phone.val());

    if (name.val() === '') {
      name.addClass('error');
        if(phone.val() === '') {
          phone.addClass('error');
          return false;
      }
      return false;

    } else if (regularNameTest === false) {
      name.val('');
      alertify.error("Разрешены только буквы кириллицы");
      return false;
    } else if (regularPhoneTest === false) {
      phone.val('');
      alertify.error("Формат номера 999-999-9999");
      return false;
    } else if (regularNameTest === true && regularPhoneTest === true) {

      var name = $(this).find("#firstname").val();
      var phone = $(this).find("input[name='phone']").val();

      var dataString = 'phone=' + phone + '&name=' + name;
      var url = '../send.php';

      $.ajax({
        type: "POST",
        url: url,
        data: dataString,
        success: function(data){ alertify.success('Спасибо за ваш запрос. Я скоро вам позвоню или напишу.'); }
      });
      $('#modal1').closeModal();
      e.preventDefault();
    }

  });
  // subscribe
  $('#subscribe').click(function(e) {
    var email = $(this).parents().find("input[name='email']");
    var rehularEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regularEmailTest = rehularEmail.test(email.val());
    if (email.val() === '') {
        email.addClass('error');
        alertify.error("Неверный формат Email");
        return false;
      }else if (regularEmailTest === false) {
        email.val('');
        alertify.error("Неверный формат Email");
        return false;
      }else if(regularEmailTest === true){
        var email = $(this).parents().find("input[name='email']").val();
        var dataString = 'email=' + email;
        var url = '../send.php';
        $.ajax({
          type: "POST",
          url: url,
          data: dataString,
          success: function(data){ alertify.success('Спасибо за ваш запрос. Я скоро вам позвоню или напишу.'); }
         });
      }
  });

})(window);

// $(window).on('load', function () {
//     var preloader = $('.wrappLoader');
//     setTimeout(function(){
//       preloader.addClass('loaded')
//     },1000);
// });

// $(window).on('load', function () {
//     if (percent >= 99) {
//         $("#preloader .title div").html("loading: 100%");
//         $("#preloader").stop().delay(700).fadeOut(500);
//     }
// })

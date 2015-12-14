$(document).ready(function () {




    $('.section-1').hide();
    $('.footer').hide();
    //    media query for larger devices
    if (window.matchMedia("(min-width: 992px)").matches) {
        new TimelineMax({})
            .set('.loading-svg', {
                scale: 0.6
            })
            .to('#svg_1', 3, {
                strokeDashoffset: 0
            })
            //        .to('#svg_1', 1.8, {
            //            strokeDasharray: 0
            //        })
//            .to('.loading-svg', 60, {
//                rotation: 360,
//                delay: 0.4,
//                repeat: -1,
//            })
        ;

        $.ajax({
            url: "https://api.flickr.com/services/rest/?&method=flickr.interestingness.getList&api_key=9880f2212f49d2289601fb002f87a718&format=json&per_page=30&extras=owner_name,url_h,url_l",
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function (data) {
                var source = $('#photo-template').html();
                var template = Handlebars.compile(source);
                var html = template(data);
                $('body').imagesLoaded({
                    background: true
                }, function () {
                    setTimeout(function () {

                        // Fade in sections
                        $('body').removeClass('loading');
                        //                    $('.loading-svg').hide();
                        $('.section-1').show();
                        $('.footer').show();

                        $('#photos').html(html);
                        console.log("Load was performed.");

                        // init controller
                        var parallaxController = new ScrollMagic.Controller({
                            globalSceneOptions: {
                                triggerHook: "onEnter",
                                duration: "200%"
                            }
                        });

                        var controller = new ScrollMagic.Controller();

                        $('.parallax-parent').attr('id', function (i) {
                            return 'parallax' + (i + 1);
                        });
                        $('.image').addClass(function (i) {
                            return 'image' + (i + 1);
                        });
                        $('.title-container').addClass(function (i) {
                            return 'title-container' + (i + 1);
                        });


                        //                header Tween timeline
                        var headerTl = new TimelineLite();

                        headerTl
                            .set('.loading-svg', {
                                rotation: 0
                            })
                            .to('.loading-svg', 1.2, {
                                scale: 0.2,
                                rotation: 0,
                                y: '-34%',
                                ease: Power2.easeIn
                            })
                            .from('.line', 1, {
                                scale: 0,
                            })
                            .staggerFrom('.header', 1.5, {
                                opacity: 0
                            }, 0.5)
                            .to('.arrow', 0.5, {
                                opacity: 1
                            })
                            .arrowTl;

                        var arrowTl = new TimelineMax({
                                delay: 2,
                                repeat: -1,
                            })
                            .set('.arrow', {
                                y: '-62%'
                            })
                            .to('.arrow', 1, {
                                y: '-55%',
                                ease: Bounce.easeOut
                            })
                            .to('.arrow', 1, {
                                y: '-62%',
                                delay: 1
                            });

                        //end header Tween

                        var photosPos = $('#photos').offset().top;
                        $('.arrow').click(function () {
                            TweenMax.to(window, 2, {
                                scrollTo: photosPos
                            });
                        });
                        var section1Scroll = new TimelineMax()
                            .to('.loading-svg', 0.7, {
                                scale: 0
                            })
                            .to('.line', 0.7, {
                                scale: 0
                            }, '-=0.5')
                            .staggerTo('.header', 0.7, {
                                opacity: 0,
                                y: -300
                            }, 0.3, '-=0.6')
                            .to('.arrow', 0.5, {
                                opacity: 0,
                                y: -300
                            });

                        var section1ScrollScene = new ScrollMagic.Scene({
                                triggerElement: '#photos',
                                offset: '-310%',
                                duration: '50%'
                            })
                            .setTween(section1Scroll)
                            .addIndicators()
                            .addTo(controller);



                        var photoArray = data.photos.photo;
                        console.log(photoArray.length);

                        for (var i = 1; i <= photoArray.length; i++) {
                            // build scenes

                            //switch title flow direction
                            if (i % 2 === 0) {
                                new ScrollMagic.Scene({
                                        triggerElement: "#parallax" + i
                                    })
                                    .setTween(".image" + i, {
                                        y: "80%",
                                        ease: Linear.easeNone
                                    })
                                    .addTo(parallaxController);

                                //title scene
                                var titleTween = new TimelineMax()
                                    .from('.title-container' + i, 1, {
                                        opacity: 0,
                                        left: '-10%'
                                    })
                                    .to('.title-container' + i, 1, {
                                        left: '220%',
                                        opacity: 0
                                    });

                                var titleScene = new ScrollMagic.Scene({
                                        triggerElement: "#parallax" + i,
                                        offset: '200%',
                                        duration: '70%'
                                    })
                                    .setTween(titleTween)
                                    .addTo(controller);
                            } else {
                                new ScrollMagic.Scene({
                                        triggerElement: "#parallax" + i
                                    })
                                    .setTween(".image" + i, {
                                        y: "80%",
                                        ease: Linear.easeNone
                                    })
                                    .addTo(parallaxController);

                                //title scene
                                var titleTween = new TimelineMax()
                                    .from('.title-container' + i, 1, {
                                        opacity: 0,
                                        left: '80%'
                                    })
                                    .to('.title-container' + i, 1, {
                                        left: '-120%',
                                        opacity: 0
                                    });

                                var titleScene = new ScrollMagic.Scene({
                                        triggerElement: "#parallax" + i,
                                        offset: '200%',
                                        duration: '70%'
                                    })
                                    .setTween(titleTween)
                                    .addTo(controller);
                            }
                        }
                    }, 3000);
                });
            }
        });

        //        media query for smaller devices
    } else {
        new TimelineMax()
            .to('#svg_1', 3.01, {
                strokeDashoffset: 0
            })
            .to('.loading-svg', 60, {
                rotation: 360,
                repeat: -1,
                yoyo: true
            });

        $.ajax({
            url: "https://api.flickr.com/services/rest/?&method=flickr.interestingness.getList&api_key=9880f2212f49d2289601fb002f87a718&format=json&per_page=30&extras=owner_name,url_z",
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function (data) {
                var source = $('#photo-template').html();
                var template = Handlebars.compile(source);
                var html = template(data);
                $('body').imagesLoaded({
                    background: true
                }, function () {
                    setTimeout(function () {

                        // Fade in sections
                        $('body').removeClass('loading');
                        //                        $('.loading-svg').hide();
                        $('.section-1').show();
                        $('.footer').show();

                        $('#photos').html(html);
                        console.log("Load was performed.");

                        // init controller
                        var parallaxController = new ScrollMagic.Controller({
                            globalSceneOptions: {
                                triggerHook: "onEnter",
                                duration: "200%"
                            }
                        });

                        var controller = new ScrollMagic.Controller();

                        $('.parallax-parent').attr('id', function (i) {
                            return 'parallax' + (i + 1);
                        });
                        $('.image').addClass(function (i) {
                            return 'image' + (i + 1);
                        });
                        $('.title-container').addClass(function (i) {
                            return 'title-container' + (i + 1);
                        });

                        //                header Tween timeline
                        var headerTl = new TimelineLite();

                        headerTl
                            .to('.loading-svg', 0.5, {
                                scale: 0,
                                display: 'none',
                            })
                            .from('.line', 1, {
                                scale: 0,
                            })
                            .staggerFrom('.header', 1.5, {
                                opacity: 0
                            }, 0.5)
                            .to('.arrow', 0.5, {
                                opacity: 1
                            });
                        //                            .arrowTl;
                        //
                        //                        var arrowTl = new TimelineMax({
                        //                                repeat: -1,
                        //                            })
                        //                            .to('.arrow', 1, {
                        //                                y: '4%',
                        //                                ease: Bounce.easeOut
                        //                            })
                        //                            .to('.arrow', 1, {
                        //                                delay: 1,
                        //                                y: '0%',
                        //                            });

                        //end

                        var photoArray = data.photos.photo;
                        console.log(photoArray.length);

                        for (var i = 1; i <= photoArray.length; i++) {
                            // build scenes

                            //switch title flow direction
                            if (i % 2 === 0) {
                                new ScrollMagic.Scene({
                                        triggerElement: "#parallax" + i
                                    })
                                    .setTween(".image" + i, {
                                        y: "80%",
                                        ease: Linear.easeNone
                                    })
                                    .addTo(parallaxController);

                                //title scene
                                var titleTween = new TimelineMax()
                                    .from('.title-container' + i, 1, {
                                        opacity: 0,
                                        left: '-10%'
                                    })
                                    .to('.title-container' + i, 1, {
                                        left: '220%',
                                        opacity: 0
                                    });

                                var titleScene = new ScrollMagic.Scene({
                                        triggerElement: "#parallax" + i,
                                        offset: '130%',
                                        duration: '50%'
                                    })
                                    .setTween(titleTween)
                                    .addTo(controller);
                            } else {
                                new ScrollMagic.Scene({
                                        triggerElement: "#parallax" + i
                                    })
                                    .setTween(".image" + i, {
                                        y: "80%",
                                        ease: Linear.easeNone
                                    })
                                    .addTo(parallaxController);

                                //title scene
                                var titleTween = new TimelineMax()
                                    .from('.title-container' + i, 1, {
                                        opacity: 0,
                                        left: '80%'
                                    })
                                    .to('.title-container' + i, 1, {
                                        left: '-120%',
                                        opacity: 0
                                    });

                                var titleScene = new ScrollMagic.Scene({
                                        triggerElement: "#parallax" + i,
                                        offset: '130%',
                                        duration: '50%'
                                    })
                                    .setTween(titleTween)
                                    .addTo(controller);
                            }
                        }
                    }, 3000);
                });
            }
        });
    }
});
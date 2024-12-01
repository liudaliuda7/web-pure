document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)

    /**
    * fromTo里第一个对象是开始的状态第二个动画是你要执行的状态
    * '<' 上一个动画开始，我也开始
    * '>' 上一个动画结束，我在开始 默认
    * '1' 一秒后执行可以2也可以3....
    * '+=1'上一个动画结束后一秒我在执行 可以2也可以3....
    * ‘-=1'’上一个动画结束前一秒我在执行 可以2也可以3....
    *
    */

    // 视频放大动画start
    /** 初始化时设置text_43的显示状态 */
    gsap.set(".text_43", {
      opacity: 1
    })

    /** 初始化时设置视频不播放 */
    const videoBg = document.querySelector("#video-bg")
    videoBg.autoplay = false
    videoBg.loop = false
    videoBg.currentTime = 0
    videoBg.pause()

    setTimeout(() => {
      // 进入区域时重置状态
      videoBg.currentTime = 0
      videoBg.pause()
      gsap.set(".text_43", { opacity: 1 })
    }, 3000);

    let o = gsap.timeline({
      scrollTrigger: {
        trigger: ".video-section",
        start: "top top",
        end: "40%",
        pin: ".video-section",
        scrub: true,
        markers: false
      }
    })

    o.from(".video-box", {
      scale: .1,
      ease: "power1.in",
      onStart: () => {
        // 确保视频在缩小状态时不播放
        videoBg.pause()
        videoBg.currentTime = 0
        gsap.set(".text_43", { opacity: 1 })
      },
      onComplete: () => {
        // 视频缩小完成后显示文字
        gsap.set(".text_43", { opacity: 1 })
      }
    })
    o.to(".video-box", {
      scale: 1,
      ease: "power1.in",
      onComplete: () => {
        gsap.to(".text_43", {
          opacity: 0,
          ease: "power1.in",
          onComplete: () => {
            videoBg.play()
          }
        })
      },
      onReverseComplete: () => {
        // 向上滚动时恢复原状态
        gsap.to(".text_43", {
          opacity: 1,
          ease: "power1.in",
          onComplete: () => {
            videoBg.currentTime = 0
            videoBg.pause() // 确保视频暂停
          }
        })
      }
    })
    // 视频放大动画end

    // 图片抽取动画start
    const pageNumEl = document.querySelector('.page-num')
    let imgGsap = gsap.timeline({
      scrollTrigger: {
        trigger: ".img-slide-wrapper", //当前动画触发的元素
        start: "top top",
        end: "bottom",
        pin: ".img-slide-section", //钉住元素的位置
        scrub: true, //是否将动画效果链接到滚动条，随着滚动条平滑处理；如果是false（默认），随着元素出现在视窗内，直接触发动画，如果是true，则平滑动画
        markers: false //是否进行标记
      }
    })
    imgGsap.to(".img-slide-item-01", {
        ease: "power1.in",
        scale: 1.1,
        rotate: 90,
        translateY: -2000,
        duration: 6,
        onComplete: () => {
          pageNumEl.innerHTML = '02'
          console.log("the tween is complete")
        },
        onReverseComplete:() => {
          pageNumEl.innerHTML = '01'
        },
    })
    imgGsap.to(".img-slide-item-02", {
      ease: "power1.in",
      scale: 1,
      duration: 6,
    },"<")
    imgGsap.to(".img-slide-item-02", {
      ease: "power1.in",
      scale: 1.1,
      rotate: 90,
      translateY: -2000,
      duration: 6,
      onComplete: () => {
        pageNumEl.innerHTML = '03'
      },
      onReverseComplete:() => {
        pageNumEl.innerHTML = '02'
      },
    },">")
    imgGsap.to(".img-slide-item-03", {
      ease: "power1.in",
      scale: 1,
      duration: 6,
    },"<")
    imgGsap.to(".img-slide-item-03", {
      ease: "power1.in",
      scale: 1.1,
      rotate: 90,
      translateY: -2000,
      duration: 6,
      onComplete: () => {
        pageNumEl.innerHTML = '04'
      },
      onReverseComplete:() => {
        pageNumEl.innerHTML = '03'
      },
    },">")
    imgGsap.to(".img-slide-item-04", {
      ease: "power1.in",
      scale: 1,
      duration: 6,
    },"<")
    imgGsap.to(".img-slide-item-04", {
      ease: "power1.in",
      scale: 1.1,
      rotate: 90,
      translateY: -2000,
      duration: 6,
      onComplete: () => {
        pageNumEl.innerHTML = '05'
      },
      onReverseComplete:() => {
        pageNumEl.innerHTML = '04'
      },
    },">")
    imgGsap.to(".img-slide-item-05", {
      ease: "power1.in",
      scale: 1,
      duration: 6,
    },"<")
  // 图片抽取动画end

  gsap.to('.text_9', {
    opacity: 1,
    duration: 6,
  })

    // 第二屏文字淡入淡出动效start
    let t = gsap.timeline({
      scrollTrigger: {
        trigger: ".group_95", //当前动画触发的元素
        start: "top-=200px",
        once: true,
      }
    })
    t.from('.text-wrapper_7', {
      opacity: 0,
      ease: "power1.in",
    }, '<')
    t.to('.text-wrapper_7', {
      opacity: 1,
      ease: "power1.in",
    }, '<')
    t.from('.text-wrapper_8', {
      opacity: 0,
      ease: "power1.in",
    }, '<')
    t.to('.text-wrapper_8', {
      opacity: 1,
      ease: "power1.in",
    }, '<')
    t.from('.text_24', {
      opacity: 0,
      ease: "power1.in",
    }, '<')
    t.to('.text_24', {
      opacity: 1,
      ease: "power1.in",
    }, '<')
    t.from('.box_3', {
      opacity: 0,
      ease: "power1.in",
    }, '<')
    t.to('.box_3', {
      opacity: 1,
      ease: "power1.in",
    }, '<')
    // 第二屏文字淡入淡出动效end

 });


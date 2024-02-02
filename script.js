gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

function loadingAnimation(){
    var tl = gsap.timeline();
tl.to("#yellow",{
    y:"-100%",
    delay:0.5
})
tl.to("#loader video",{
    y:"-100%",
    delay:0.5
},"anim")
tl.to("#loader h1,#loader em",{
    color:"black",
    delay:0.6
},"anim")
tl.to("#loader",{
    opacity:0,
    display:"none"
})
}
loadingAnimation();


function hoverAnimation(){
  var elems = document.querySelectorAll(".text");
  elems.forEach((elem)=>{
    elem.addEventListener("mouseenter",function(){
      var bgimg = elem.getAttribute("data-img");
      document.querySelector("#page2").style.backgroundImage = `url(${bgimg})`
    })

  })
}
hoverAnimation()


document.querySelector("#footer h3").addEventListener("click",()=>{
  locoScroll.scrollTo("top")
})
document.querySelector("#page1 #bottom h4 i").addEventListener("click",()=>{
  locoScroll.scrollTo("bottom")
})
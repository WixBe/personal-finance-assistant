document.addEventListener('DOMContentLoaded', () => {
    if (window.VANTA) window.VANTA.GLOBE({
      el: "#vanta-bg-globe",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x3f60ff,
      size: 3,
      backgroundColor: 0xffffff
    })
    })
    _strk.push(function() {
      setVanta()
      window.edit_page.Event.subscribe( "Page.beforeNewOneFadeIn", setVanta )
    })
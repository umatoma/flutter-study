// https://support.google.com/analytics/answer/7478520?hl=ja
(function () {
  window.dataLayer = window.dataLayer || []
  function gtag () {
    window.dataLayer.push(arguments)
  }
  function trackOutboundLink (url) {
    gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
      transport_type: 'beacon',
      event_callback () { document.location = url }
    })
  }
  document.addEventListener('click', (e) => {
    const element = e.target
    const tagName = element.tagName.toLowerCase()
    if (tagName === 'a') {
      const href = element.getAttribute('href')
      if (href && href.startsWith('/') === false) {
        trackOutboundLink(href)
        return false
      }
    }
  })
})()

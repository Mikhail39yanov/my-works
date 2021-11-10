document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.tabs-btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.is-active').forEach(function(tabContent) {
        tabContent.classList.remove('is-active')
      })
      event.currentTarget.classList.add('is-active')

      document.querySelectorAll('.tab-content').forEach(function(tabContent) {
        tabContent.classList.remove('tab-content_active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content_active')
    })
  })
})

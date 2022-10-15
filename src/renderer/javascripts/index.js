window.MessagesAPI.onLoaded((_, data) => {
  html = ''
  data.forEach(data => {
    html += `<div class="Box">
      <div class="Box-header Box-header--blue">
        <h3 class="Box-title">${data.email}</h3>
        <span class="branch-name">${data.file}</span>
      </div>
    </div>`
  })
  document.getElementById('accounts').innerHTML = html
})
window.MessagesAPI.onCode((_, data) => {
  document.getElementById('code').innerHTML = data;
  console.log('hi')
})


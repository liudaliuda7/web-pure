function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  const activeTag = document.getElementById('pure-menu-tag')
  // const menuItems = document.querySelectorAll('#pure-menu span')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    const activeItem = document.getElementById('menu-' + sectionId)
    if (activeItem) {
      console.log('activeItem: ', activeItem.offsetTop);
      // 2.19 = (martinTop)1.46+0.73(height)
      activeTag.style.transform = `translateY(${(activeItem.dataset.id - 1) * 2.19}vw)`
    }
  }
}

window.addEventListener('scroll', () => {

  const end = document.getElementById('product-box-end')
  const menu = document.getElementById('pure-menu')
  const part2 = document.getElementById('part_2')

  const endRect = end.getBoundingClientRect()
  const rect = part2.getBoundingClientRect()

  if (rect.top <= 0) {
    menu.classList.add('menu-fixed') // 显示菜单
  }

  if(endRect.top < 100) {
    menu.classList.remove('menu-fixed') // 显示菜单
  }
})


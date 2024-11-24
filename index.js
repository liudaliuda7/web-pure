function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  const menu = document.getElementById('pure-menu')
  const menuItems = document.querySelectorAll('#pure-menu span')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    menu.classList.add('menu-fixed') // 显示菜单

    // 清除高亮
    menuItems.forEach((item) => item.classList.remove('highlight'))

    // 高亮对应的菜单项
    const activeItem = document.getElementById('menu-' + sectionId)
    if (activeItem) {
      activeItem.classList.add('highlight')
    }
  }
}

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section')
  const menu = document.getElementById('pure-menu')
  const menuItems = document.querySelectorAll('#pure-menu span')

  let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      menu.classList.add('menu-fixed') // 显示菜单
      menuItems.forEach((item) => item.classList.remove('highlight')) // 清除所有高亮
      const activeItem = document.getElementById('menu-' + section.id)
      if (activeItem) {
        activeItem.classList.add('highlight') // 高亮当前菜单项
      }
    }
  })
})

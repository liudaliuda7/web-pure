let modalOpen = '';

function openModal(value) {
  const modal = document.querySelector('.modal');
  modalOpen = value
  const modalContent = document.querySelector(modalOpen);

  // 显示遮罩和弹窗
  modal.style.display = 'flex';
  // modalContent.style.display = 'block';

  // 添加遮罩点击事件
  modal.onclick = function(e) {
    // 确保点击的是遮罩而不是弹窗内容
    if (e.target === modal) {
      closeModal();
    }
  };

  // 延迟一帧添加show类来触发动画
  requestAnimationFrame(() => {
    modal.classList.add('show');
    modalContent.classList.add('show');
  });
}
// openModal('.discountCode')

function closeModal() {
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector(modalOpen);

  // 移除show类触发关闭动画
  modal.classList.remove('show');
  modalContent.classList.remove('show');

  // 等待动画完成后再隐藏元素
  setTimeout(() => {
    modal.style.display = 'none';
    modalContent.style.display = 'none';
    // 移除点击事件
    modal.onclick = null;
  }, 300); // 动画持续时间
}

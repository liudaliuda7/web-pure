document.addEventListener('DOMContentLoaded', function() {
    // 获取头像容器和选中标记
    const avatarContainer = document.querySelector('.box_17');
    const checkmark = document.querySelector('.thumbnail_6');
    const nameInput = document.querySelector('.text-input');
    const confirmButton = document.querySelector('.text-wrapper_29');
    const signWall = document.querySelector('.group_39');

    // 获取所有头像元素（第一级子元素）
    const avatars = Array.from(avatarContainer.children);

    // 默认选择第一个头像
    let selectedAvatar = avatars[0];
    updateCheckmarkPosition(selectedAvatar);

    // 为每个头像添加点击事件
    avatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            selectedAvatar = avatar;
            updateCheckmarkPosition(avatar);
        });
    });

    // 更新选中标记位置的函数
    function updateCheckmarkPosition(selectedAvatar) {
        // 将选中标记移动到选中头像的下方
        selectedAvatar.appendChild(checkmark);
    }

    // 添加确认按钮点击事件
    confirmButton.addEventListener('click', function() {
        const name = nameInput.value.trim();
        if (!name) {
            alert('请输入您的名字');
            return;
        }

        // 创建新的签名元素
        const newSignature = document.createElement('div');
        newSignature.className = 'group_109 flex-row signature-item';

        // 复制选中的头像
        const avatarClone = selectedAvatar.cloneNode(true);
        // 移除选中标记
        const checkmarkElement = avatarClone.querySelector('.thumbnail_6');
        if (checkmarkElement) {
            checkmarkElement.remove();
        }

        // 创建名字元素
        const nameSpan = document.createElement('span');
        nameSpan.className = 'text_362';
        nameSpan.textContent = name;

        // 组装新的签名元素
        newSignature.appendChild(avatarClone);
        newSignature.appendChild(nameSpan);

        // 将新签名添加到签名墙的开头
        signWall.insertBefore(newSignature, signWall.firstChild);

        // 清空输入框
        nameInput.value = '';

        // 触发动画
        requestAnimationFrame(() => {
            newSignature.style.transform = 'translateX(0)';
            newSignature.style.opacity = '1';
        });
    });
});


let voteCount = 0
const totalAmount = 1000000; // 总量
const incrementValue = 100; // 每次增加的值
// let incrementCount = 0; // 每次增加的次数
// let prizeId = 1
let prizeId
let token
let voteBtnDisable = false
let lotteryBtnDisable = false
let comfirBtnDisable = false
const voteBtn = document.querySelector("#vote-btn")
const drone1 = document.querySelector(".drone1")
const drone2 = document.querySelector(".drone2")
const drone3 = document.querySelector(".drone3")
const discountCode = document.querySelector(".discountCode")
const rewards = document.querySelector(".rewards")
const textToCopy = document.getElementById('textToCopy');
const notWinning = document.querySelector('.notWinning');


// 获取当前投票进度
async function getVoteList() {
  await api.getVoteList().then(data => {
    const res = data[0]
    voteCount = res.num
    progress(true) // 页面进入时获取数据
    console.log('获取投票数响应:', data, res.num);
  });
}
getVoteList()

// 进度条
function progress(isFirst){
  const voteValue = voteCount*incrementValue //默认vote总值
  let addVoteValue = voteValue //实际要增加的总值

  const progressTrack = document.getElementById("progress-track");
  const progressBar = document.getElementById("progress-bar");
  const currenProgress = document.getElementById("current-progress");
  const power1 = document.querySelector(".text_319");
  const power2 = document.querySelector(".text_333");
  const power3 = document.querySelector(".text_342");

  // 获取 progressTrack 和 progressBar 的宽度
  const trackWidth = progressTrack.offsetWidth;
  const currentBarWidth = progressBar.offsetWidth;

  // 计算增加的宽度
  let increaseWidth = (voteValue / totalAmount) * trackWidth;

  if(!isFirst) {
      addVoteValue = addVoteValue + incrementValue
      console.log('addVoteValue: ',addVoteValue);
      increaseWidth = (incrementValue / totalAmount) * trackWidth;
  }
  currenProgress.innerText = addVoteValue
  power1.innerText = addVoteValue
  power2.innerText = addVoteValue
  power3.innerText = addVoteValue

  // 实际要增加的宽度
  let width = increaseWidth

  // 检查边界条件
  if (trackWidth - currentBarWidth < increaseWidth ) {
      width = trackWidth - currentBarWidth
  }
  if (trackWidth - currentBarWidth == increaseWidth ) {
      alert("进度条已满，无法继续增加！");
      return; // 退出函数
  }

  // 使用 GSAP 动画将 progressBar 的宽度增加
  gsap.to(progressBar, {
      width: `+=${width/19.2}vw`, // 增加计算得到的宽度
      duration: 0.5, // 动画持续时间
      ease: "power1.out", // 动画缓动效果
  });
}

// 投票
async function vote(id, isAdd) {
  if(voteBtnDisable) return
  voteBtnDisable = true
  await api.updateVote(1001,true).then(res=> {
    console.log('投票响应:', res);
    progress()
    // 出现抽奖按钮
    gsap.to('#vote-btn', {
        display: 'none',
        opacity: 0,
        ease: "power1.in",
    })
    gsap.to('#draw-btn', {
        display: 'block',
        opacity: 1,
        ease: "power1.in",
    },'>')
  })
}

// 抽奖
async function lottery(id, isAdd) {
  if(lotteryBtnDisable) return
  lotteryBtnDisable = true
  if(localStorage.getItem('web-vaporesso-lucy-people')) {
    const modalContents = document.querySelectorAll(".modal .content")
    modalContents.forEach(v=>[
      v.classList.remove('.show')
    ])
    rewards.classList.remove('show')
    notWinning.classList.add('show')
    lotteryBtnDisable = false
    return
  }
  await api.lottery().then(res=> {
    console.log('抽奖响应', res);
    // 0-未中奖 4-折扣码，1-一等奖，2-二等奖，3-三等奖
    lotteryBtnDisable = false
    prizeId = res.prizeId
    token = res.token
    // prizeId = 1 // 假数据

    if(prizeId == 0) {
      notWinning.classList.add('show')
      rewards.classList.remove('show')
      // reward.style.display = 'none'
    }
    if(prizeId == 1) {
      drone1.classList.add('show')
      rewards.classList.remove('show')
      localStorage.setItem("web-vaporesso-lucy-people", true)
    }
    if(prizeId == 2) {
      drone2.classList.add('show')
      rewards.classList.remove('show')
      localStorage.setItem("web-vaporesso-lucy-people", true)
    }
    if(prizeId == 3) {
      drone3.classList.add('show')
      rewards.classList.remove('show')
      localStorage.setItem("web-vaporesso-lucy-people", true)
    }
    if(prizeId == 4) {
      discountCode.classList.add('show')
      rewards.classList.remove('show')
      textToCopy.innerText = res.token
      localStorage.setItem("web-vaporesso-lucy-people", true)
    }
  }).catch((err)=>{
    lotteryBtnDisable = false
  })
}

function copyText() {
  const textToCopy = document.getElementById('textToCopy');
  // const copyTips = document.querySelector('.discountCodeDescribe');
  // 使用 clipboard API 复制文本
  navigator.clipboard.writeText(textToCopy.textContent).then(() => {
    console.log('Text copied to the clipboard');
    // copyTips.style.display = 'block'
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });

}

function handleEmail(inputEl, tipEl,) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 简单的邮箱格式验证
  if (inputEl.value.trim() === '') {
      // errorTip.textContent = 'Email cannot be empty';
      tipEl.style.display = 'block';
      comfirBtnDisable = false
      return false;
  } else if (!regex.test(inputEl.value)) {
      // errorTip.textContent = 'Invalid email';
      tipEl.style.display = 'block';
      comfirBtnDisable = false
      return false;
  }
  tipEl.style.display = 'none';
  return true
}

// 提交中奖接口
async function submitEmail(el) {
  if(comfirBtnDisable) return
  comfirBtnDisable = true
  // 验证邮箱
  const emailInput = document.querySelector(`${el} input`);
  const errorTip = document.querySelector(`${el} .err-tip`);
  const successTip = document.querySelector(`${el} .success-tip`);
  const email = emailInput.value
  console.log("prizeId", prizeId);
  const state = handleEmail(emailInput, errorTip)
  if(!state) return
  await api.submitPrize({
    prizeId: prizeId,
    Email: email,
    token: token
  }).then((res)=>{
    comfirBtnDisable = false
    if(el == '.discountCode') {
        const inputGroup = document.querySelector('.input-group')
        const discountCodeInfoBox = document.querySelector('.discountCodeInfo-box')
        inputGroup.style.display = 'none'
        discountCodeInfoBox.style.display = 'block'
    }else{
        successTip.style.display = 'block'
    }
  })


}

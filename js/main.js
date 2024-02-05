
(function(){
  const actions = { // 함수를 action객체의 매소드로 등록
    birdFlies(key) {  //true,false 받아옴
      if(key){
      document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = 'translateX(-100%)'
      }
    },
    birdFlies2(key) {  //두번째 함수(data-index 5)
      if(key){
        console.log('두번째 새')
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight}px)`
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = 'translateX(-100%)'
      }
    }

  }

  const graphicElms = document.querySelectorAll('.graphic-item')
  const stepElms = document.querySelectorAll('.step')
  let currentItem = graphicElms[0]; 
  //현재 활성화된(visible클라스가 붙은) .graphic-item
  let ioIndex;   //IntersectionObserver로 관찰되는 .step 번호

  const io = new IntersectionObserver((entries, observer)=>{
    //console.log(entries[0].target.datasdet.index) 
    ioIndex =  entries[0].target.dataset.index *1;
  })


// data-index속성 부여
for(let i=0; i<stepElms.length; i++){  
  io.observe(stepElms[i]) // 관찰대상 등록
  stepElms[i].dataset.index = i; 
  graphicElms[i].dataset.index = i; 
}

// 활성화/ 비활성화 함수 분리
function activate(action) {   //data-action이 설정된부분에 가면 인자 받아옴
  currentItem.classList.add('visible');

  if(action){
    actions[action](true)
  }

}
function inActivate(action) {  
  currentItem.classList.remove('visible')
  if(action){  //비활성화 되었을때 새의 위치 초기화
    actions[action](false);
  }
}


window.addEventListener('scroll', ()=>{
  let step;
  let boundingRect; 

  for (let i=ioIndex-1; i<ioIndex+2; i++ ){
    step = stepElms[i]; 

    if(!step) continue;   //ioIndex 시작이 0. 1빼주는게 성립x -> for문 실행하지 않고 빠져나가게
    
    boundingRect = step.getBoundingClientRect()
    //console.log(boundingRect.top) ;

    if(boundingRect.top > window.innerHeight * 0.1 && 
      boundingRect.top < window.innerHeight * 0.9 ) {
        //console.log(step.dataset.index)

        inActivate(currentItem.dataset.action);

        currentItem = graphicElms[step.dataset.index]
        activate(currentItem.dataset.action);
        //console.log(currentItem.dataset.action)
      }
  }
})


//새로고침 했을때 최상위로 스크롤 올림
window.addEventListener('load', ()=>{
  setTimeout(()=> scrollTo(0,0), 100)
})

activate(); //로딩시 바로 실행(첫번째 이미지가 보이는 상태로 시작하게)
})()


//즉시 실행함수
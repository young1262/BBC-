
(function(){
  const graphicElms = document.querySelectorAll('.graphic-item')
  const stepElms = document.querySelectorAll('.step')
  let currentItem; //현재 활성화된(visible클라스가 붙은) .graphic-item


// data-index속성 부여
for(let i=0; i<stepElms.length; i++){  
  //stepElms[i].setAttribute('data-index', i)
  stepElms[i].dataset.index = i; 
  graphicElms[i].dataset.index = i; 
}

window.addEventListener('scroll', ()=>{
  let step;
  let boundingRect; 

  for (let i=0; i<stepElms.length; i++ ){
    step = stepElms[i]; 
    
    boundingRect = step.getBoundingClientRect()
    //console.log(boundingRect.top) ;

    if(boundingRect.top > window.innerHeight * 0.1 && 
      boundingRect.top < window.innerHeight * 0.9 ) {
        //console.log(step.dataset.index)

        if(currentItem){
          currentItem.classList.remove('visible')
        }
        currentItem = graphicElms[step.dataset.index]
        currentItem.classList.add('visible')
      }
  }

})

  
})()


//즉시 실행함수
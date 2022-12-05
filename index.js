window.addEventListener('scroll',()=>{
    var links=document.querySelectorAll('.nav_a')
    if(scrollY>600){
        
        links.forEach((item)=>{
           item.style.color="#000d53"
        })
        
    }
    else{
        links.forEach((item)=>{
            item.style.color="white"
         })
    }

})
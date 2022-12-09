// .dashboard control view
const dash_btn=document.getElementById("dash_menu")
var count=0
visualViewport.width<801?count++:count=count
dash_btn.onclick=()=>{
    count++

    if(count%2!=0){
        dash_btn.classList="fa-solid fa-angles-right"
        document.querySelectorAll(".dashboard_link").forEach((item)=>{
                item.style.display="none"
                

        })
        document.querySelector('.logo').style.cssText="padding:6px 15px;margin:3% 0%"
        document.querySelector('.dash_left').style.cssText="width: 3em ;min-width:2em"
        if(visualViewport.width>800){
            document.querySelector('.dash_right').style.cssText="margin-left:5em"
        }

        
    }
    else{
        console.log("back")
        document.querySelector('.logo').style.cssText="padding:8px 20px;margin:1% 10%"
        document.querySelector('.dash_left').style.cssText="min-width:15em;width:20vw"
        if(visualViewport.width>800){
            document.querySelector('.dash_right').style.cssText="width: 70vw ;"
        }
        dash_btn.classList="fa-solid fa-angles-left"
        document.querySelectorAll(".dashboard_link").forEach((item)=>{
            item.style.display="inline"
    })
    }



 
}
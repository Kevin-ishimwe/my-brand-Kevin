import {initializeApp} from 'firebase/app'
import{
getFirestore,collection, getDocs, doc,addDoc,onSnapshot,
}from"firebase/firestore"
import{ getDownloadURL, getStorage,ref as sRef,uploadBytes }from "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8-qE8gQuuIDUlLNpVfEyjAhcIqMg2KmA",
    authDomain: "my-brand-kevin.firebaseapp.com",
    projectId: "my-brand-kevin",
    storageBucket: "my-brand-kevin.appspot.com",
    messagingSenderId: "324812051694",
    appId: "1:324812051694:web:e33833a9c404d09b9c4fff",
    measurementId: "G-RW45H3518E"
  };
  //init firebase app
  initializeApp(firebaseConfig)
  //init firebase services
  const db =getFirestore()

  //collection reference
  //init storage

    const colRef=collection(db,'blogs')
    //real time collection of data
    var blogs_data=[]


       let fetchData =new Promise(function(data,err){
           onSnapshot(colRef, async(snapshot)=>{
                await snapshot.docs.forEach((doc)=>{
                blogs_data.push({...doc.data(),id:doc.id})
            })
            data(blogs_data)
            err("fetching resourses failed")
        })
           }
       )


    var imageLink;
    //adding a blog document to db
    const blogForm=document.querySelector('.new_blog')
    if(blogForm!=null){
        blogForm.onsubmit=(e)=>{
            e.preventDefault()
            //adding an image to cloud storage
            console.log("upload started")
        const file=document.querySelector(".new_blog_img").files[0]
        const name =file.name
        const meta={
        contentType:file.type }
        const storage=getStorage() 
        const storageRef=sRef(storage,'images/'+name)
        
        uploadBytes(storageRef,file,meta).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                imageLink=url
                console.log(imageLink)
    
             //adding everything to the data base
    
            addDoc(colRef,{
            title:blogForm.title.value,
            blogImg: imageLink,
            description:blogForm.desc.value,
            content:document.querySelector(".ql-editor").innerHTML
        }).then(()=>{
            blogForm.reset()
            console.log("document added")
        })
            })
        }).catch((err)=>{
            console.log(err)
    
        })
    
           }
    } 
    
//homepage showing
const blog_all=document.querySelector(".blog_all")
if(blog_all!=null){
    
    fetchData.then((data)=>{
        localStorage.setItem("fetched data",JSON.stringify(data))

        blog_all.innerHTML=data.map(({blogImg,title,id})=>{
      

        return(`
        <div class="blog_cont">
                <img src=${blogImg} alt="" class="blog_img">
                <p class="blog_desc">${title}</p>
                <a href="./blog.html?id=${id}" class="read_blog">READ BLOG</a>
                </div>
        `)

       })
    })    
}

// showing a single blog
const single_blog=document.querySelector(".blog_left")
if(single_blog!=null){
    const blogId=location.search.split("=")[1]
   

      
        //_______________ showing a singe blog____________________//
        fetchData.then((data)=>{
            data.filter((element,index)=>{
                if (element.id==blogId){
                 
                    single_blog.innerHTML=(`
                    <h3 class="blog_hd">${data[index].title}</h3>
                    <p class="author">author:Ishimwe Kevin</p>
                    <img src="${data[index].blogImg}" class="blog_img_single">
                    <h2 style="overflow:none;padding: 2% 0%;
                    font-size: x-large;
                    font-weight: 500;
                    color: #00034a;">${data[index].description}</h2>
                ${data[index].content} `)
                }
             
            })
            document.querySelector(".animation").style.display="none"
            //______________side nav blogs________________
            const more=(data.splice(0,4))
            document.querySelector(".more_blogs").innerHTML=more.map(({blogImg,title,description,id})=>{
    
                return(`
                <div class="blog_visit">
                <img src="${blogImg}" class="more_blogs_img" alt="">
                <div class="more_blog_txt">
                    <h3 class="blog_more_title" 
                    style="overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    "
                    >${title} </h3>
                <a href="./blog.html?id=${id}" style="overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp:3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                ">${description}</a>
                </div>
                </div>
                `)
            })
        })   





    window.addEventListener('hashchange', function() {
        this.location.reload()
    
    });
    

    
   
}



















//blog manage
const blog_manage=document.querySelector(".blog_manage")
if(blog_manage!=null){
    
    fetchData.then((data)=>{
        blog_manage.innerHTML=data.map(({blogImg,title})=>{
        console.log(title)
        return(`
            <div class="blog_cont">
                <img src=${blogImg} alt="" class="blog_img">
                <p class="blog_desc">${title}</p>
                <div class="manage_icons">
                <i class="fas fa-edit" style="color: blue;font-size: x-large;"></i>
                <i class="fa-sharp fa-solid fa-trash" style="color: red; font-size: x-large;"></i>
                </div>
            </div>
        `)
       })
    })    
}

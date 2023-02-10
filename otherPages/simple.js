//hamburger menu
var links = document.querySelectorAll(".nav_a");
const menu_btn = document.getElementById("bars");
var menu_tracker = 0;
menu_btn.onclick = () => {
  if (visualViewport.width <= 500) {
    menu_tracker++;
    if (menu_tracker % 2 != 0) {
      document.querySelector(".nav_ul").style.transform = " translateY(0%)";
      menu_btn.classList = "fas fa-times";
    } else {
      document.querySelector(".nav_ul").style.transform = " translateY(-100%)";
      menu_btn.classList = "fas fa-bars";
    }
  }
};
//disappearing navigation menu
links.forEach((item) => {
  item.onclick = () => {
    if (visualViewport.width < 501) {
      document.querySelector(".nav_ul").style.transform = " translateY(-100%)";
      menu_btn.classList = "fas fa-bars";
    } else {
    }
  };
});
const getBlogs = async () => {
  const blog_all = document.querySelector(".blog_all");
  console.log("fetching data");
  await fetch("https://fair-teal-chinchilla-tam.cyclic.app/getblogs", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      blog_all.innerHTML = data
        .map(({ blogImg, blogTitle, _id }) => {
          document.querySelector(".animation").style.display = "none";
          return `<div class="blog_cont">
                <img src=${blogImg} alt="" class="blog_img">
                <p class="blog_desc">${blogTitle}</p>
                
                <a href="./blog.html?id=${_id}" class="read_blog">READ BLOG</a>
                </div>`;
        })
        .join("");
    });
};
if (document.querySelector(".blog_all") != null) {
  getBlogs();
}
const single_blog = document.querySelector(".blog_left");
if (single_blog != null) {
  const blogId = location.search.split("=")[1];
  fetch(`https://fair-teal-chinchilla-tam.cyclic.app/getblogs`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let comments;
      data.filter((element, index) => {
        if (element._id == blogId) {
          comments = element.comments;
          document.querySelector(".animation").style.display = "none";
          return (single_blog.innerHTML = `
                    <h3 class="blog_hd">${data[index].blogTitle}</h3>
                    <img src="${data[index].blogImg}" class="blog_img_single">
                    <h2 style="overflow:none;padding: 2% 0%;
                    font-size: x-large;
                    font-style:italic;
                    font-weight: 500;
                    color: #00034a;" >${data[index].blogDescription}</h2>
                <div id="blogCONT">${data[index].blogContent}</div> `);
        }
      });
      commentform.onsubmit = (e) => {
        e.preventDefault();
        commentform[2].textContent = "SENDING...";
        console.log(location.search.split("=")[1]);
        fetch(
          `https://fair-teal-chinchilla-tam.cyclic.app/addcomment/${
            location.search.split("=")[1]
          }`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: commentform[0].value,
              comment: commentform[1].value,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            commentform[2].textContent = "POST";
            comments.push({
              name: commentform[0].value,
              comment: commentform[1].value,
            });
            document.querySelector(".other_comments").innerHTML = comments.map(
              ({ name, comment }) => {
                return ` <div class="comment_box">
            <i class="fa-solid fa-user" id="user"></i>
                <div>
                  <h2 class="name">${name}</h2>
                  <p class="Actual_comment">${comment} </p>
                </div>
        </div>`;
              }
            );
          });
      };
      console.log(comments);
      document.querySelector(".other_comments").innerHTML = comments.map(
        ({ name, comment }) => {
          return ` <div class="comment_box">
            <i class="fa-solid fa-user" id="user"></i>
                <div>
                  <h2 class="name">${name}</h2>
                  <p class="Actual_comment">${comment} </p>
                </div>
        </div>`;
        }
      );
      const more = data.splice(0, 4);
      document.querySelector(".more_blogs").innerHTML = more
        .map(({ blogImg, blogTitle, blogDescription, _id }) => {
          return `
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
                    >${blogTitle} </h3>
                <a href="./blog.html?id=${_id}" style="overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp:3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                text-decoration: none;
                color:#2b3675
                ">${blogDescription}</a>
                </div>
                </div>
                `;
        })
        .join("");
    });
}
const commentform = document.forms.comment;

//nav
var links = document.querySelectorAll(".nav_a");
window.addEventListener("scroll", () => {
  if (scrollY > 590) {
    if (visualViewport.width < 500) {
      menu_btn.style.color = "#000d53";
    } else {
      links.forEach((item) => {
        item.style.color = "#000d53";
      });
    }
  } else {
    links.forEach((item) => {
      item.style.color = "white";
      menu_btn.style.color = "white";
    });
  }
});
//hamburger menu
const menu_btn = document.getElementById("bars");
var menu_tracker = 0;
menu_btn.onclick = () => {
  if (visualViewport.width <= 500) {
    menu_tracker++;
    if (menu_tracker % 2 != 0) {
      document.querySelector(".nav_ul").style.transform = " translateY(0%)";
      menu_btn.classList = "fas fa-times";
      menu_btn.style.color = "white";
      links.forEach((item) => {
        item.style.color = "white";
        menu_btn.style.color = "white";
      });
    } else {
      document.querySelector(".nav_ul").style.transform = " translateY(-100%)";
      menu_btn.classList = "fas fa-bars";
      if (scrollY > 590) {
        menu_btn.style.color = "#000d53";
      }
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
          return `<div class="blog_cont">
                <img src=${blogImg} alt="" class="blog_img">
                <p class="blog_desc">${blogTitle}</p>
                <a href="./otherPages/blog.html?id=${_id}" class="read_blog">READ BLOG</a>
                </div>`;
        })
        .join("");
    });
};
getBlogs();
const contact_form = document.forms.contact_page;
contact_form.onsubmit = async (e) => {
  e.preventDefault();
  contact_form[3].textContent = "LOADING...";
  await fetch("https://fair-teal-chinchilla-tam.cyclic.app/addmessages", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: contact_form[0].value,
      email: contact_form[1].value,
      content: contact_form[2].value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      contact_form[3].textContent = "SEND";
      contact_form.reset();
      console.log(data);
    });
};

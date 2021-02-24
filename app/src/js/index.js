let burger_link = document.getElementById("burger_link");

burger_link.addEventListener("click", function (e) {
   let header_content = document.getElementById("header_content");
   if (header_content.classList.contains("left_slide_effect")) {
      header_content.classList.remove("left_slide_effect");
   } else {
      header_content.classList.add("left_slide_effect");
   }


   if (burger_link.children[0].classList.contains("bl_1")) {
      burger_link.children[0].classList.remove("bl_1");
   } else {
      burger_link.children[0].classList.add("bl_1");
   }

   if (burger_link.children[1].classList.contains("bl_2")) {
      burger_link.children[1].classList.remove("bl_2");
   } else {
      burger_link.children[1].classList.add("bl_2");
   }

   if (burger_link.children[2].classList.contains("bl_3")) {
      burger_link.children[2].classList.remove("bl_3");
   } else {
      burger_link.children[2].classList.add("bl_3");
   }

})
var certificateList = ['100001','940001','940025','940031','940045','940052','940056','940061','960001','960002']; // certificate no. list

var certificateData = {
  100001: [
    { name: "DemoUser" },
    { course: "CourseName" },
    { date: "date" },
    { grade: "A" },
  ],
  940001: [
    { name: "HARPREET KAUR" },
    { course: "ADVANCE DIPLOMA IN COMPUTER APPLICATION" },
    { date: "07 Feb 2023 to 06 Feb 2024" },
    { grade: "A" },
  ],

  940025: [
    { name: "NEETU RANI" },
    { course: "BASICS of COMPUTER" },
    { date: "07 OCT 2019 to 06 APR 2020" },
    { grade: "A" },
  ],
  940031: [
    { name: "HARSHPREET KAUR" },
    { course: "ADVANCE DIPLOMA IN COMPUTER APPLICATION" },
    { date: "07 May 2020 to 06 APR 2021" },
    { grade: "A" },
  ],
  940045: [
    { name: "HARMANDEEP SINGH" },
    { course: "BASICS of COMPUTER APPLICATIONS" },
    { date: "22 SEP 2020 to 21 MAR 2021" },
    { grade: "A" },
  ],
  940052: [
    { name: "GAGANDEEP SINGH" },
    { course: "ADVANCE DIPLOMA IN COMPUTER APPLICATION" },
    { date: "03 Feb 2020 to 14 Feb 2022" },
    { grade: "A" },
  ],
  940056: [
    { name: "RAMANJIT KAUR KANG" },
    { course: "SOFTWARE TESTING COURSE" },
    { date: "15 Dec 2019 to 17 Dec 2020" },
    { grade: "A" },
  ],
  940061: [
    { name: "SATWINDER KAUR" },
    { course: "TALLY & ENGLISH AND PUNJABI TYPING" },
    { date: "15 Jul 2022 to 14 Jul 2023" },
    { grade: "A" },
  ],
  960001: [
    { name: "RAMANJOT KAUR" },
    { course: "HTML, CSS, BOOTSTRAP" },
    { date: "22 Jun 2020 to 21 Sep 2020" },
    { grade: "A" },
  ],
  960002: [
    { name: "TEJVEER SINGH" },
    { course: "BASICS of SPREADSHEET" },
    { date: "18 AUG 2020 to 17 OCT 2020" },
    { grade: "A" },
  ],
};


(function($) {

  "use strict";

  $(document).ready(function() {
    $(".verify-certificate").on('click', function() {

      // https://sweetalert2.github.io/
      Swal.fire({
        title: "Verify Certificate",
        icon: "question",
        iconColor: "#fdc403",
        input: "text",
        inputPlaceholder: "Enter your Certificate No.",
        inputAttributes: {
          autocapitalize: "on"
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        confirmButtonColor: "#fdc403",

        showLoaderOnConfirm: true,
        preConfirm: async (login) => {

          if(login == "") {
            return Swal.showValidationMessage('Please enter valid Certificate No.');
          } else {
            if(certificateList.includes(login)) {
              Swal.fire({
                title: 'VERIFIED',
                html: "Certificate No. <b>"+login+"</b> is awarded to <b>"+certificateData[login][0]['name']+"</b>. For successfully completing course <b>"+certificateData[login][1]['course']+"</b>. Course attended from <b>"+certificateData[login][2]['date']+"</b>. With GRADE <b>"+certificateData[login][3]['grade']+"</b>",
                icon: "success",
                confirmButtonColor: "#fdc403",
                draggable: true
              });
            } else {
              return Swal.showValidationMessage('There is no such Certificate No. in our database.');
            }
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
    });
  });

})(jQuery);
(function($) {
  "use strict";
  $(document).ready(function() {
    // https://sweetalert2.github.io/
    
    $(".bank-transfer").on('click', function() {
      Swal.fire({
        title: "Bank Transfer",
        icon: "info",
        iconColor: "#fdc403",
        html: "<p>A/c Name : <b>KHALSA WEB SOLUTIONS (OPC) PRIVATE LIMITED</b> <br/> A/c Number : <b>920020004137491</b> <br/> A/c Type : <b>Current</b> <br/> IFSC code : <b>UTIB0003442</b></p>",
        confirmButtonColor: "#fdc403",
      });
    });

    $(".scan-qr-code").on('click', function() {
      Swal.fire({
        title: "Scan QR Code",
        text: "for payment",
        imageUrl: "img/qr.jpeg",
        imageWidth: 300,
        imageHeight: 300,
        confirmButtonColor: "#fdc403",
      });
    });

  });
})(jQuery);
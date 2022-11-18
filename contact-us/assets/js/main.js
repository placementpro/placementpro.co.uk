/* -------------------------------------------------------------------
 * Plugin Name           : Conformy - PHP Ajax Modern Contact Form
 * Author Name           : Yucel Yilmaz
 * Author URI            : https://codecanyon.net/user/aip_theme3434
 * Created Date          : 28 January 2020
 * Last Update           : 22 July 2020
 * Version               : 1.0.4
 * File Name             : main.js
------------------------------------------------------------------- */

/* -------------------------------------------------------------------
 [Table of contents]
 * 01.Contact Form
*/
(function($) {
    "use strict";

    // Call all ready functions
    conformy_contactForm();

})(window.jQuery);

/* ------------------------------------------------------------------- */
/* 02.Contact Form
/* ------------------------------------------------------------------- */
 function conformy_contactForm() {
    "use-strict";
    //  Validate Input Variables
    var contactEmail    = $("#contactEmail");
    var contactPhone    = $("#contactPhone");
    var formControl     = $('.contact-form-group .form-control');
    
    // Added AutoComplete Attribute Turned Off
    formControl.attr("autocomplete","off");

    // Email Validation
    contactEmail.on("keyup", function() {
        var emailInputValue  = $(this).val().trim();

        if (emailInputValue.length > 0) {
            let validate = $(this).conformyEmailValidate();

            if (!validate === true) {
                $(this).parent().find("span").removeClass("success").addClass("error");
            } else {
                $(this).parent().find("span").removeClass("error").addClass("success");
            }
        }else{
            $(this).parent().find("span").removeAttr("class");  
        }
    });

    // Phone Validation
    contactPhone.on("keyup", function() {
        var phoneInputValue  = $(this).val().trim();


        if (phoneInputValue.length > 0) {
            let validate = $(this).conformyPhoneValidate();

            if (!validate === true) {
                $(this).parent().find("span").removeClass("success").addClass("error");
            } else {
                $(this).parent().find("span").removeClass("error").addClass("success");
            }
        }else{
            $(this).parent().find("span").removeAttr("class");
            $(this).parent().find("span").addClass("error");  
        }
    });

    // Form Control Validate
    $(".form-control:not('#contactEmail,#contactPhone')").on("keyup", function() {
        var formInputValue  = $(this).val().trim();

        if (formInputValue.length > 0) {
            $(this).parent().find("span").removeClass("error").addClass("success");
        }else {
            $(this).parent().find("span").removeAttr("class");
            $(this).parent().find("span").addClass("error");
        }
    });

    // Popup Variables
    let termsAgree          = $('#termsAgree');

    // Terms Agree
    termsAgree.on("click",function(event){
        $("#termsCheckBox").prop("checked",true);
    });


    //  Captcha Variables    
    let textCaptcha     = $("#txtCaptcha");
    let textCaptchaSpan = $('#txtCaptchaSpan');
    let textInput       = $('#txtInput');

    // Generates the Random number function 
    function randomNumber(){
         
        let a = Math.ceil(Math.random() * 9) + '',
            b = Math.ceil(Math.random() * 9) + '',
            c = Math.ceil(Math.random() * 9) + '',
            d = Math.ceil(Math.random() * 9) + '',
            e = Math.ceil(Math.random() * 9) + '',
            code = a + b + c + d + e;
   
        textCaptcha.val(code);
        textCaptchaSpan.html(code);
    }

    // Called random number function
    randomNumber();

    // Validate the Entered input aganist the generated security code function   
    function validateCaptcha() {
        let str1 = textCaptcha.val();
        let str2 = textInput.val();
        if (str1 == str2) {
            return true;
        } else {
            return false;
        }
    }

    // Form Conttrol Captcha Validate
    textInput.on("keyup", function() {
        if (validateCaptcha() == true) {
            $(this).parent().find("span").removeClass("error").addClass("success");
        }else {
            $(this).parent().find("span").removeAttr("class");
            $(this).parent().find("span").addClass("error");
        }
    });

    // Contact Form Submit
    $("#contactForm").on("submit", function(event) {
        ///var $this = $(this);

        //  Contact Form Input Value 
        let $this         = $(this);
        let name          = $("#contactName").val().trim();
        let email         = $("#contactEmail").val().trim();
        let phone         = $("#contactPhone").val().trim();
        let subject       = $("#contactSubject").val().trim();
        let message       = $("#contactMessage").val().trim();
        let termsCheckBox = $("#termsCheckBox").prop("checked");
        let validateEmail = $("#contactEmail").conformyEmailValidate();
        let validatePhone = $("#contactPhone").conformyPhoneValidate();
        let selectedNull  = $('#contactSubject').find("option").eq(0).val();

        if (name =='' || email =='' || phone == '' || message == '' || textInput == '') {
            $(this).parent().find("span").addClass("error");
            if($('.empty-form').css("display") == "none"){
                $('.empty-form').stop().slideDown().delay(3000).slideUp();
            }else {
                return false;
            }
        } else if (subject == selectedNull) {
            if($('.subject-alert').css("display") == "none"){
                $('.subject-alert').stop().slideDown().delay(3000).slideUp();
            }else {
                return false;
            }
        } else if (termsCheckBox == false) {
            if($('.terms-alert').css("display") == "none"){
                $('.terms-alert').stop().slideDown().delay(3000).slideUp();
            }else {
                return false;
            }
        } else if (!validatePhone === true) {
            $("#contactPhone").parent().find("span").removeClass("success").addClass("error");
            if($('.phone-invalid').css("display") == "none"){
                $('.phone-invalid').stop().slideDown().delay(3000).slideUp();
            }else {
                return false;
            }
        } else if (!validateEmail === true) {
            $("#contactEmail").parent().find("span").removeClass("success").addClass("error");
            if($('.email-invalid').css("display") == "none"){
                $('.email-invalid').stop().slideDown().delay(3000).slideUp();
            }else {
                return false;
            }
        } else if (validateCaptcha() != true){
            $("#textInput").parent().find("span").removeClass("success").addClass("error");
            if($('.security-alert').css("display") == "none"){
                $('.security-alert').stop().slideDown().delay(3000).slideUp();
            }else {
                return false;
            }
        } else {
            $this.find(':submit').append('<span class="fas fa-spinner fa-pulse ml-3"></span>');
            $this.find(':submit').attr('disabled','true');
            $.ajax({
                url: "assets/vendor/send_mail.php?mail=request",
                data: {
                    contact_name: name,
                    contact_email: email,
                    contact_phone: phone,
                    contact_subject: subject,
                    contact_message: message
                },
                type: "POST",
                success: function(response) {
                    $(".form-control").parent().find("span").removeAttr("class");
                    $("#contactForm")[0].reset();
                    $(".select-selected").html(selectedNull);
                    if (response == true) {
                        $this.find(':submit').removeAttr('disabled');
                        $this.find(':submit').find("span").fadeOut();
                        $("#formSuccessModal").modal("show");
                        // Called random number function
                        randomNumber();
                    } else {
                        $this.find(':submit').removeAttr('disabled');
                        $this.find(':submit').find("span").fadeOut();
                        $("#formDangerModal").modal("show");
                        $("#formDangerModal #error_message").html(response);
                        // Called random number function
                        randomNumber();
                    }
                }
            });
        }
        event.preventDefault();
    });
}
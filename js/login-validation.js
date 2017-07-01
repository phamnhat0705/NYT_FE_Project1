(function ($) {
    $(function () {
        var $inputEmail    = $('#email');
        var $inputPassword = $('#password');
        var $btnRegister   = $('#btnRegister');
        var $formRegister  = $('#formRegister');
        var $divEmailError  = $('.email-error');
        var $divPasswordError   = $('.password-error');
        $btnRegister.on('click', function () {
            $formRegister.trigger('ajaxPostLogin')
        });

        $formRegister.on('ajaxPostLogin', function () {
            var url = '/auth/login';
            var data = {
                'email'    : $inputEmail.val(),
                'password' : $inputPassword.val()
            };
            var registerPosting = $.post(url, data);

            registerPosting.done(function (data) {
                console.log(data);
            });

            registerPosting.fail(function (data) {
                var rawData       = $.parseJSON(data.responseText);
                var errorEmail    = '';
                var errorPassword = '';
                rawData.email.forEach(function (massage) {
                    errorEmail = errorEmail + massage;
                });
                rawData.password.forEach(function (massage) {
                    errorPassword = errorPassword + massage;
                });
                $divEmailError.html(errorEmail);
                $divPasswordError.html(errorPassword);
            });

        });

    });
})(window.jQuery)
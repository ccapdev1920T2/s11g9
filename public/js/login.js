$(document).ready(function () {
    function isFilled() {
        var username = validator.trim($('#username').val());
        var pw = validator.trim($('#pw').val());

        var usernameEmpty = validator.isEmpty(username);
        var pwEmpty = validator.isEmpty(pw);

        return !usernameEmpty && !pwEmpty;
    }

    function validateField(field, fieldName, error) {
        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if(empty) {
            field.prop('value', '');
            error.text(fieldName + ' should not be empty to login.');
        } else {
            error.text('');
        }

        var filled = isFilled();

        if(filled) {
            $('#submit').prop('disabled', false);
        } else {
            $('#submit').prop('disabled', true);
        }     
    }

    $('#username').keyup(function () {
        validateField($('#username'), 'Username', $('#usernameError'));
    });

    $('#pw').keyup(function () {
        validateField($('#pw'), 'Password', $('#pwError'));
    });
});
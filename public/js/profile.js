$(document).ready(function () {
    function isFilled() {
        var fName = validator.trim($('#fName').val());
        var lName = validator.trim($('#lName').val());
        var email = validator.trim($('#email').val());
        // var pw = validator.trim($('#pw').val());

        var fNameEmpty = validator.isEmpty(fName);
        var lNameEmpty = validator.isEmpty(lName);
        var emailEmpty = validator.isEmpty(email);
        // var pwEmpty = validator.isEmpty(pw);

        return !fNameEmpty && !lNameEmpty && !emailEmpty;
    }
    // function isValidPassword(field) {
    //     var validPassword = false;

    //     var password = validator.trim($('#pw').val());
    //     var isValidLength = validator.isLength(password, {min: 4, max: 32});

    //     if(isValidLength) {
    //         if(field.is($('#pw')))
    //             $('#pwError').text('');

    //         validPassword = true;    
    //     } else {
    //         if(field.is($('#pw')))
    //             $('#pwError').text('Password should contain at least 4 characters and 32 characters at most.');
    //     }

    //     return validPassword;
    // }

    function validateField(field, fieldName, error) {
        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if(empty) {
            field.prop('value', '');
            error.text(fieldName + ' should not be empty.');
        } else {
            error.text('');
        }

        var filled = isFilled();
        // var validPassword = isValidPassword(field);

        // if(filled && validPassword) {
        if (filled){
            $('#submit').prop('disabled', false);
        }
        else{
            $('#submit').prop('disabled', true);
        }
    }

    $('#fName').keyup(function () {
        validateField($('#fName'), 'First name', $('#fNameError'));
    });

    $('#lName').keyup(function () {
        validateField($('#lName'), 'Last name', $('#lNameError'));
    });

    $('#email').keyup(function () {
        validateField($('#email'), 'Email', $('#emailError'));
    });

    // $('#pw').keyup(function () {
    //     validateField($('#pw'), 'Password', $('#pwError'));
    // });
});
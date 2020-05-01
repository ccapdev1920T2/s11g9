$(document).ready(function () {
    function isFilled() {
        var comment = validator.trim($('#newcomment').val());

        var commentEmpty = validator.isEmpty(comment);

        return !commentEmpty;
    }

    function validateField() {
        var filled = isFilled();

        if(filled) {
            $('#submit').prop('disabled', false);
        }
        else{
            $('#submit').prop('disabled', true);
        }
    }

    $('#newcomment').keyup(function () {
        validateField();
    });
});
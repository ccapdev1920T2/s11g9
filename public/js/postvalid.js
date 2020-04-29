$(document).ready(function () {
    function isFilled() {
        var title = validator.trim($('#title').val());
        var article = validator.trim($('#article').val());

        var titleEmpty = validator.isEmpty(title);
        var articleEmpty = validator.isEmpty(article);

        return !titleEmpty && !articleEmpty;
    }

    function isValidTitle(field) {
        var validTitle = false;
        
        var title = validator.trim($('#title').val());
        var isValidLength = validator.isLength(title, {min: 1, max: 128});

        if(isValidLength) {
            if(field.is($('#title')))
                $('#titleError').text('');

            validTitle = true;    
        } else {
            if(field.is($('#title')))
                $('#titleError').text('Title should contain at least 1 character and 128 characters at most.');
        }

        return validTitle;
    }

    function isValidArticle(field) {
        var validArticle = false;
        
        var article = validator.trim($('#article').val());
        var isValidLength = validator.isLength(article, {min: 10, max: 100000});

        if(isValidLength) {
            if(field.is($('#article')))
                $('#articleError').text('');

            validArticle = true;    
        } else {
            if(field.is($('#article')))
                $('#articleError').text('Article should contain at least 10 characters and 100000 characters at most.');
        }

        return validArticle;
    }

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
        var validTitle = isValidTitle(field);
        var validArticle = isValidArticle(field);

        if(filled && validTitle && validArticle) {
            $('#submit').prop('disabled', false);
        }
        else{
            $('#submit').prop('disabled', true);
        }
    }

    $('#title').keyup(function () {
        validateField($('#title'), 'Title', $('#titleError'));
    });

    $('#article').keyup(function () {
        validateField($('#article'), 'Article', $('#articleError'));
    });
});
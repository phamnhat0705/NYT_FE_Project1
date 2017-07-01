(function ($) {
    $(function () {
        var $formUploadArticleImage     = $('#formUploadArticleImage');
        var $inputFileForArticleImage   = $('.inputArticleImage');
        var $btnUploadForArticleImage   = $('.btn-upload-image');

        $btnUploadForArticleImage.on('click', function () {
            $inputFileForArticleImage.trigger('click');
        });
        $inputFileForArticleImage.on('change', function () {
            $formUploadArticleImage.trigger('submit');
        });
        var optionsForArticleImage = {
            target : '#formUploadArticleImage',
            dataType:  'json',
            beforeSubmit:  showRequestForArticleImage,  // pre-submit callback
            success:       showResponseForArticleImage // post-submit callback
        };
        $formUploadArticleImage.ajaxForm(optionsForArticleImage);

        function showRequestForArticleImage(formData, jqForm, options) {
            $btnUploadForArticleImage.html('<i class="fa fa-spinner fa-spin"></i>');
            return true;
        }

        function showResponseForArticleImage(responseText, statusText, xhr, $form)  {
            $('.article-image').attr('src', responseText.fileName);
            $btnUploadForArticleImage.html('Tải ảnh');
            var articleImageInput = $('[name="article_image"]');
            articleImageInput.val(responseText.fileName);
            articleImageInput.trigger('fm.input.change', responseText.fileName);
        }

    });

    $(function () {
        var $formUploadForCompany = $('#formUploadLogo');
        var $inputFileForCompany  = $('.inputLogo');
        var $btnUploadCompanyLogo = $('.btn-upload-image-company');

        $btnUploadCompanyLogo.on('click', function () {
            $inputFileForCompany.trigger('click');
        });
        $inputFileForCompany.on('change', function () {
            $formUploadForCompany.trigger('submit');
        });
        var optionsUploadLogo = {
            target : '#formUploadLogo',
            dataType:  'json',
            beforeSubmit:  showRequestOnLogoUpload,  // pre-submit callback
            success:       showResponseOnLogoUpload // post-submit callback
        };
        $formUploadForCompany.ajaxForm(optionsUploadLogo);

        function showRequestOnLogoUpload(formData, jqForm, options) {
            $btnUploadCompanyLogo.html('<i class="fa fa-spinner fa-spin"></i>');
            return true;
        }

        function showResponseOnLogoUpload(responseText, statusText, xhr, $form)  {
            $('.logo-company').attr("src", responseText.fileName);
            $btnUploadCompanyLogo.html('Tải ảnh');
            var companyLogo = $('[name="logo_company"]');
            companyLogo.val(responseText.fileName);
            companyLogo.trigger('change');
        }
    });

})(window.jQuery, document);
//Class initiation
var ArticleCreatingForm = function($rootElement){
    this.$rootElement = $rootElement;
};

//property
ArticleCreatingForm.prototype.data = {category_type: 'Recruitment', };
//Method
ArticleCreatingForm.prototype.init = function(){
    var manager = this;
    var $rootElement = this.$rootElement;
    $rootElement.on('fm.input.change', '[data-key]', function (event, updatedValue) {
        manager.data[$(this).data('key')] = updatedValue;
        $rootElement.trigger('fm.updated');
    });

    $rootElement.on('change', 'select[data-key]', function () {
        $(this).trigger('fm.input.change', $(this).val());
        $rootElement.trigger('input.reset', 'input[data-key="' + $(this).data('key') + '"]');
    });

    $rootElement.on('click', '.btn-radio-selection button', function () {
        var $btnGroupSelection = $(this).parent('.btn-radio-selection');
        $btnGroupSelection.find('.active').removeClass('active');
        $(this).addClass('active');
        $rootElement.trigger('input.reset', 'input[data-key="' + $btnGroupSelection.data('key') + '"]');
        $btnGroupSelection.trigger('fm.input.change', $(this).is('[data-value]') ? $(this).data('value') : $(this).text());
    });
    $rootElement.on('click', '.btn-group-selection button', function () {
        var $btnGroupSelection = $(this).parent('.btn-group-selection');
        var $this = $(this);
        //$btnGroupSelection.find('.active').removeClass('active');
        if( $this.hasClass('active')){
            $this.removeClass('active');
            $btnGroupSelection.trigger('fm.button.remove', $(this).is('[data-value]') ? $(this).data('value') : $(this).text());
        }else{
            $this.addClass('active');
            $btnGroupSelection.trigger('fm.button.add', $(this).is('[data-value]') ? $(this).data('value') : $(this).text());
        }
        // $rootElement.trigger('input.reset', 'input[data-key="' + $btnGroupSelection.data('key') + '"]');
    });

    $rootElement.on('fm.button.add', '[data-key]', function(event, updatedValue){
        var self = $(this);
        if(manager.data[self.data('key')]){
            manager.data[self.data('key')].push(updatedValue);
        }else{
            manager.data[self.data('key')] = [];
            manager.data[self.data('key')][1] = updatedValue;
        }
        $rootElement.trigger('fm.updated');
    });

    $rootElement.on('fm.button.remove', '[data-key]', function(event, updatedValue){
        var self = $(this);
        manager.data[self.data('key')].splice(manager.data[self.data('key')].indexOf(updatedValue), 1);
        $rootElement.trigger('fm.updated');
    });

    $rootElement.on('click', 'button.btn-other', function(){
        var $this = $(this);
        var $inputValue = $this.parent().next();
        if( $this.hasClass('active')){
            $this.removeClass('active');
            $inputValue.val('');
            $inputValue.trigger('change');
            $inputValue.attr('disabled', 'disabled');
            manager.data[$inputValue.data('key')][0] = '';
        }else{
            $this.addClass('active');
            $inputValue.removeAttr('disabled');
            if(manager.data[$inputValue.data('key')]){
                manager.data[$inputValue.data('key')][0] = "Khác";
            }else{
                manager.data[$inputValue.data('key')] = [];
                manager.data[$inputValue.data('key')][0] = "Khác";
            }
            $rootElement.trigger('fm.updated');
        }
    });
    $rootElement.on('change', '.input-other', function () {
        var self = $(this);
        if(manager.data[self.data('key')]){
            manager.data[self.data('key')][0] = "Khác/!@#/"+self.val();
        }else{
            manager.data[self.data('key')] = [];
            manager.data[self.data('key')][0] = "Khác/!@#/"+self.val();
        }
        $rootElement.trigger('fm.updated');
    });

    $rootElement.on('keyup', 'textarea[data-key]', function () {
        $(this).trigger('fm.input.change', $(this).val());
    });

    $rootElement.on('change', 'input[type="hidden"][data-key]', function () {
        $(this).trigger('fm.input.change', $(this).val());
    });

    $rootElement.on('input.reset', function (event, target) {
        $rootElement.find(target).val('');
    });
    $rootElement.on('keyup', "input[data-key='extra_recruitment_company_name']", function(){
        $(this).trigger('fm.input.change', $(this).val());
    });

    $('.datetimepicker').on('dp.hide', function(){
        $(this).find("input").trigger('fm.input.change', $(this).find("[data-key='expired_at']").val());

    });

    $('#editor').on('key', function(){
        $('#editor').trigger('fm.input.change', editor.getData());
    });


};

ArticleCreatingForm.prototype.onUpdated = function (callback) {
    this.$rootElement.on('fm.updated', callback);
};


(function ($) {
    $(function () {
        var $imageContentForm = $('#imageContent');

        tinymce.init({
            setup : function (ed) {
                ed.on('init', function () {
                    this.getDoc().body.style.fontFamily = 'Segoe UI', 'SFUFuturaBook', 'Verdana', 'Tahoma', 'Arial';
                })
            },
            selector: '[data-key=content]',
            menubar: false,
            height                      : 300,
            theme                       : 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
            ],
            toolbar                     : 'undo redo | styleselect | bold italic underline fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink | image media',
            default_link_target: "_blank",
            link_assume_external_targets: true,
            media_live_embeds: true,
            media_poster: false,
            paste_retain_style_properties : "font-size line-height",

            file_browser_callback: function(field_name, url, type, win) {
                $imageContentForm.find('.inputImage').click();

                $imageContentForm.find('input').on('change', function () {
                    $imageContentForm.ajaxSubmit(function (response) {
                        win.document.getElementById(field_name).value = response.fileName;
                    });
                });
            },
            setup : function (ed) {
                ed.on('keyup', function(){
                    $("[data-key='content']").trigger('fm.input.change', ed.getContent());
                });
            }
        });


        $(document).on('focusin', function(e) {
            if ($(e.target).closest(".mce-window").length || $(e.target).closest(".moxman-window").length) {
                e.stopImmediatePropagation();
            }
        });


        var editorData;
        var articleNavigator = new ViewsNavigator($('#articleCreate'));
        var target = 'Recruitment';
        articleNavigator.transit('initiation').then(function () {
            tinymce.EditorManager.execCommand('mceAddEditor', true, 'editor');
        });

        $('.topic').on('change', function(){
            target = $(this).val();
            $('.topic').val(target);
        });


        $('.articleImage').on('change', function(){
            $('.articleImage').attr('style', $(this).attr('style'));
        });

        $('.articleTitle').on('change', function(){
            $('.articleTitle').val($(this).val());

        });

        $('.article-navigator').on('click', function(e){

            tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'editor');

            if ($(this).hasClass('disabled')){
                return ;
            }

                articleNavigator.transit(target).then(function(){
                    $('span.article-title').html('&nbsp;'+ articleCreatingForm.data.title);
                });
        });

        $('#articleCreate').on('click','.btn-backward', function(){
            articleNavigator.transit('initiation').then(function(){
                tinymce.EditorManager.execCommand('mceAddEditor', true, 'editor');
            });
        });

        $('#articleCreate').on('click', 'input[data-key="isConfirmed"]', function () {
            $(this).trigger('fm.input.change', $(this).prop('checked'));
        });

        var articleCreatingForm = new ArticleCreatingForm($('#createArticle'));
        $('input[data-key]').on('keyup', function () {
            $(this).trigger('fm.input.change', $(this).val());
        });
        articleCreatingForm.init();

        articleCreatingForm.onUpdated(function () {
            console.log(articleCreatingForm.data);
            $("input[data-key='expired_at']").val(articleCreatingForm.data.expired_at);
            var $titleCheck;
            if(articleCreatingForm.data.title)
            {
                $titleCheck = validator.isLength(articleCreatingForm.data.title,1);
            }
            else {
                $("input[data-key='title']").toggleClass('alert-danger', false);
            }
            $("input[data-key='title']").toggleClass('alert-danger',!$titleCheck);
            $("span[data-title-error='error']").toggleClass('hidden', $titleCheck);
            $('.article-navigator').toggleClass('disabled', ! $titleCheck);

            if( (
                articleCreatingForm.data.category_type == "Recruitment"  ||
                articleCreatingForm.data.category_type == "Scholarship"  ||
                articleCreatingForm.data.category_type == "Event"        ||
                articleCreatingForm.data.category_type == "Competition" )
                && !articleCreatingForm.data.expired_at
            )
            {
                $("[data-expire-error='error']").toggleClass('hidden',false);
                $(".article-navigator").toggleClass('disabled', true);
                $('.article-navigator').toggleClass('disabled',
                    ! ( $titleCheck && articleCreatingForm.data.expired_at)
                );
            }
            else
            {
                $("[data-expire-error='error']").toggleClass('hidden',true);
                $(".article-navigator").toggleClass('disabled', false);
                $('.article-navigator').toggleClass('disabled', ! $titleCheck);

            }

        });


        $('#articleCreate').on('click','.btn-complete', function(e) {
            if ($(this).hasClass('disabled')) {
                return e.preventDefault();
            }

            $.post('/create-article', articleCreatingForm.data).then(function (addArticle) {
                if(addArticle == "Done")
                {
                    $('#createArticle').modal('hide');
                    $('#done').modal('show');
                }
            })
        });
    })
})(window.jQuery);

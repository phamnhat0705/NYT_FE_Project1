var SideBarCategory = function ($rootElement) {
    this.$rootElement = $rootElement;
    this.$siderbarLeftMain = $rootElement.find('#sidebar-category-main');
    this.$topicType   = $rootElement.find('#topic-type');
    this.$sidebarLeftOption = $rootElement.find('#sidebar-left-option');
    this.$competition = $rootElement.find('#sidebar-competition');
    this.$event       = $rootElement.find('#sidebar-event');
    this.$recruitment = $rootElement.find('#sidebar-recruitment');
    this.$scholarship = $rootElement.find('#sidebar-scholarship');
    this.$skill       = $rootElement.find('#sidebar-skill');
    this.$taste       = $rootElement.find('#sidebar-taste');
};

SideBarCategory.prototype.run = function () {
        var self = this;

        this.$topicType.show();
        this.$sidebarLeftOption.show();
        this.$competition.hide();
        this.$event.hide();
        this.$scholarship.hide();
        this.$taste.hide();
        this.$skill.hide();
        this.$recruitment.hide();

        (function ($) {
            $(function () {
                var data = document.location.pathname.split('/');
                self.$rootElement.trigger('getsidebar', data[1]);
            })
        })(window.jQuery);
        this.$topicType.on('change', function () {
            var data = self.$topicType.val();
            self.$rootElement.trigger('getsidebar', data);
        });
        this.$rootElement.on('getsidebar', function (event, data) {
            if( data == 'competition'){
                self.$competition.show();
                self.$event.hide();
                self.$scholarship.hide();
                self.$taste.hide();
                self.$skill.hide();
                self.$recruitment.hide();
                return;
            }
            if(data == 'event'){
                self.$event.show();
                self.$competition.hide();
                self.$scholarship.hide();
                self.$taste.hide();
                self.$skill.hide();
                self.$recruitment.hide();
                return;
            }
            if(data == 'scholarship'){
                self.$scholarship.show();
                self.$competition.hide();
                self.$event.hide();
                self.$taste.hide();
                self.$skill.hide();
                self.$recruitment.hide();
                return;
            }
            if(data == 'taste-of-life'){
                self.$taste.show();
                self.$competition.hide();
                self.$event.hide();
                self.$scholarship.hide();
                self.$skill.hide();
                self.$recruitment.hide();
                return;
            }
            if(data == 'skill'){
                self.$skill.show();
                self.$competition.hide();
                self.$event.hide();
                self.$scholarship.hide();
                self.$taste.hide();
                self.$recruitment.hide();
                return;
            }
            if(data == 'recruitment'){
                self.$recruitment.show();
                self.$competition.hide();
                self.$event.hide();
                self.$scholarship.hide();
                self.$taste.hide();
                self.$skill.hide();
                return;
            }
        });
    };

SideBarCategory.prototype.sidebar = function () {
    this.$siderbarLeftMain.hide();
    this.$topicType.hide();
    this.$sidebarLeftOption.hide();

    var categorys = ['competition', 'event', 'scholarship', 'taste-of-life', 'skill', 'recruitment'];
    var data = document.location.pathname.split('/');
    for(var i = 0; i < categorys.length; i++){
        if(categorys[i] == data[1]){
            return this.run();
        }
    }
    this.$siderbarLeftMain.show();
};


// auto load articles
var LoadPage = function ($rootElement) {
    $('#filterArticle').addClass('active');
    this.$root  = $rootElement;
    this.$page =  1;
    this.$pageCount = 2;
    this.url = {};
};

LoadPage.prototype.run = function () {
    var self = this;
    $(window).scroll(function () {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            var id = $('.article.active').attr('id');
            console.log('--id--' +id);
            if(id == 'filterArticle'){
                self.getFilterArticle();
            }
            if(id == 'topArticle'){
                self.getTopArticle();
            }
            if(id == 'newArticle'){
                self.getNewArticle();
            }
        }
    });
};

LoadPage.prototype.setUrlCategory = function ($url) {
    this.url.urlCategory = $url;
    return this;
};

LoadPage.prototype.getUrlCategory = function () {
    return this.url.urlCategory;
};


LoadPage.prototype.getFilterArticle = function () {
    $('#loadImage').show();
    this.$page ++;
    this.$pageCount ++;
    var data = {page: this.$page};
    if(this.$page == 2 || this.$page < this.$pageCount){
        console.log(' -- url-filter--:'+this.getUrlCategory());
        var postingLoadPage = $.get(this.getUrlCategory(), data);
        postingLoadPage.done(function (data) {
            var dataConvert  = $(data);
            console.log(dataConvert);
            $('.filterArticle').append(dataConvert.find('.filterArticle li'));
            $('#loadImage').hide();
        });

        postingLoadPage.fail(function (data) {
            console.log(data);
        });
    }
};


LoadPage.prototype.getTopArticle = function () {
    $('#loadImage').show();
    this.$page ++;
    this.$pageCount ++;
    var data = {page: this.$page};
    if(this.$page == 2 || this.$page < this.$pageCount){
        console.log(' -- url-top--:'+this.getUrlCategory());
        var postingLoadPage = $.get(this.getUrlCategory() , data);
        postingLoadPage.done(function (data) {
            var dataConvert  = $(data);
            console.log(dataConvert);
            $('.topArticle').append(dataConvert.find('.topArticle li'));
            $('#loadImage').hide();
        });
        postingLoadPage.fail(function (data) {
            console.log(data);
        });
    }
};


LoadPage.prototype.getNewArticle = function () {
    $('#loadImage').show();
    this.$page ++;
    this.$pageCount ++;
    var data = {page: this.$page};
    if(this.$page == 2 || this.$page < this.$pageCount){
        console.log(' -- url-new--:'+this.getUrlCategory());
        var postingLoadPage = $.get(this.getUrlCategory() , data);
        postingLoadPage.done(function (data) {
            var dataConvert  = $(data);

            $('.newArticle').append(dataConvert.find('.newArticle li'));
            $('#loadImage').hide();
        });
        postingLoadPage.fail(function (data) {
            console.log('fail');
        });
    }
};

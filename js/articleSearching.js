;(function ($, _) {

    $(function () {
        var isFiltered = false;
        var searching = function (condition) {
            return $.get('/search', condition);
        };

        var templateFilterArticle = _.template($('#filter-article-template').html());

        var templateNewArticle = _.template($('#new-article-template').html());

        var templateRightArticle = _.template($('#right-article-template').html());

        var renderFilterArticle = function (filterArticles) {
            return templateFilterArticle({filterArticles: filterArticles});
        };

        var renderNewArticle = function (newArticles) {
            return templateNewArticle({newArticles: newArticles});
        };

        var renderRightArticle = function (rightArticles) {
            return templateRightArticle({rightArticles: rightArticles});
        };

        var articleRoot    = $('#articleSearching');
        var filterArticle  = $('.filter-article-list');
        var newArticle     = $('.new-article-list');
        var topArticle     = $('.top-article-list');
        var searchFiled    = $('[data-search]');
        var searchStatus   = $("[data-article-type]");
        var loadMoreMobile = $('.loadMoreArticleForMobile');
        var articles       = $('.empty');
        var page           = 1;
        var countPage      = 1;

        searchFiled.on('change', function () {
            var addCondition = {
                articleType: $('[data-article]').find('li.active').data('article-type')
            };
            page             = 1;
            countPage        = 1;
            if ($(this).data('search') != 'top-days'){
                isFiltered = true;
                articles.empty();
            }else{
                $('.top-article-list').empty();
            }
            articleRoot.trigger('article.search', addCondition);
        });

        searchStatus.on('click', function () {
            var articleType = $(this).data('article-type');
            var addCondition = {
                articleType: articleType
            };
            page             = 1;
            countPage        = 1;
            if (isFiltered == true ){
                articles.empty();
                // searchFiled.val('');
                articleRoot.trigger('article.search', addCondition);
            } else if (articleType == 'top'){
                articleRoot.trigger('article.search', addCondition);
            }
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() >= ($(document).height() - $(window).height() - 5 )) {
                page++;
                var addCondition = {
                    articleType: $('[data-article]').find('li.active').data('article-type')
                };
                articleRoot.trigger('article.search', addCondition)
            }
        });

        loadMoreMobile.on('click', function () {
            page++;
            var addCondition = {
                articleType: $('[data-article]').find('li.active').data('article-type')
            };
            articleRoot.trigger('article.search', addCondition)
        });

        articleRoot.on('article.search', function (event, AddCondition) {
            var condition = {};
            condition     = {
                category                      : $('[data-category]').data('category'),
                extra_competition_topic       : $('[data-search=competitionTopic]').val(),
                extra_competition_city        : $('[data-search=competitionCity]').val(),
                extra_event_topic             : $('[data-search=eventTopic]').val(),
                extra_event_city              : $('[data-search=eventCity]').val(),
                extra_skill_type              : $('[data-search=skillType]').val(),
                extra_scholarship_degree      : $('[data-search=scholarshipDegree]').val(),
                extra_scholarship_major       : $('[data-search=scholarshipMajor]').val(),
                extra_scholarship_type        : $('[data-search=scholarshipType]').val(),
                extra_taste_of_life_type      : $('[data-search=tasteType]').val(),
                extra_face_field              : $('[data-search=faceField]').val(),
                extra_recruitment_city        : $('[data-search=recruitmentCity]').val(),
                extra_recruitment_company_type: $('[data-search=recruitmentCompanyType]').val(),
                extra_recruitment_major       : $('[data-search=recruitmentMajor]').val(),
                extra_recruitment_job_type    : $('[data-search=recruitmentJobType]').val(),
                extra_news_type               : $('[data-search=newsType]').val(),
                title                         : $('[data-search-title]').val(),
                days                          : $('[data-search=top-days]').val(),
                page                          : page,
                countPage                     : countPage,
                article_type                  : AddCondition.articleType
            };
            searching(condition).then(function (articleList) {
                $('.loader').hide();
                loadMoreMobile.toggleClass('hide', !articleList['next_page_url']);

                if (condition.article_type == 'fil') {
                    return filterArticle.append(renderFilterArticle(articleList.data));
                }
                if (condition.article_type == 'top') {
                    return topArticle.append(renderNewArticle(articleList.data));
                }
                if (condition.article_type == 'new') {
                    return newArticle.append(renderNewArticle(articleList.data));
                }
            });
        });

        var conditionHome = {
            articleType: $('[data-article]').find('li.active').data('article-type'),
            category   : $('[data-category]').data('category')
        };
        
        //PIN article        
        $(".PIN").each(function(index,container){        
          var id = container.getAttribute("id").trim();
          if (!id) return;
          var layout = id[0]; //C,M,R
          $(this).children("article").each(function(index,ele){
            var src = ele.getAttribute("data-source");
            if (window.location.host == "ybox.dev") src = src.replace("ybox.vn","ybox.dev");//for test
            $.get(src+"?format=json", function(result){              
              ele.innerHTML = layout == "C" ? renderFilterArticle([result]) : layout=="M" ? renderNewArticle([result]) : layout=="R" ? renderRightArticle([result]) : "";
            });
          });
        });        
    });
}(window.jQuery, window._));
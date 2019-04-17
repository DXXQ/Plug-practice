;(function ($) {
    var Tab = function (tab) {
        var _this = this;
        this.tab = tab;
        this.config =
            {//触发类型
                "triggerType": "mouseout",
                "effect": "default",//淡入渐出
                "invoke": 2,//默认选择第几个
                "autoPlay": 1000//
            };
        //config扩展
        if (this.getConfig()) {
            $.extend(this.config, this.getConfig());
            console.log(this.getConfig())
            console.log(this.config)
        }
        var config = this.config;
        this.tabItems = this.tab.find("ul.tab-nav li");
        console.log(this.tabItems)
        //获取li 和图片
        this.contentItems = this.tab.find("div.content-wrap div.content-item");
        if (config.triggerType === "click") {
            this.tabItems.bind(config.triggerType, function () {
                _this.invoke($(this));
            })
        } else if (config.triggerType === 'mouseover' || config.triggerType != 'click') {
            this.tabItems.mouseover(function () {
                var self=$(this);
                this.timer=window.setTimeout(function(){
                    _this.invoke(self);
                },3000);
               //$this为当前的tabItem
            }).mouseout(function(){
                window.clearTimeout(this.timer);

            })
        }
      if (config.autoPlay){
            this.loop=0;
            this.timer=null;
            this.autoPlay(this.tabItems)
          this.tab.hover(function(){
              window.clearInterval(_this.timer);
          },function(){
              console.log(111)
              console.log(_this.tabItems)
              _this.autoPlay(_this.tabItems);
          })
        }

    };
    Tab.prototype = {
        invoke: function (currentTable) {
            var _this = this;
            var index = currentTable.index();
            currentTable.addClass("active").siblings().removeClass("active");
            var effect = this.config.effect;
            var contentItems = this.contentItems;
            if (effect === 'default') {
                console.log(effect)
                console.log(index)
                contentItems.eq(index).addClass('current').siblings().removeClass("current");
            } else if (effect === 'fade') {
                contentItems.eq(index).fadeIn().siblings().fadeOut();
            }
            if(this.config.autoPlay){
                this.loop=index;
            }
        },
        autoPlay: function (tab) {
            console.log(tab)
            var _this = this;


             var  itemSize = tab.length;
             var config=this.config;

              console.log(itemSize)

           this.timer = window.setInterval(function () {
                _this.loop++;
                if (_this.loop >= itemSize) {
                    _this.loop = 0;
                }
                var l=tab.eq(2);
                console.log(l)

                tab.eq(_this.loop).trigger(config.triggerType);

            }, 3000)
        },
        getConfig: function () {
            var config = this.tab.attr("data-config");
            //如果未设置config 使用默认config
            if (config && config != '') {
                return $.parseJSON(config);
            } else {
                return null;
            }
        }
    };
    Tab.init = function(tabs){
        var _this=this;
        tabs.each(function(){
            new _this($(this));
        })
    }
    window.Tab = Tab;
})(jQuery);



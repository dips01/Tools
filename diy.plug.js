/*js 常用框架
*1.列表选择全选 反选
*2.弹层 （窗口，提示）
*3.file 、 checkbox、 radio 美化
*4.注册 提醒
*6.tab切换
*7.下拉框 美化
*8.查看更多
*/
// 全局命名空间
var MYSpace = MYSpace || {};
MYSpace.commonMethod = {
    regExForName: "", // 定义名字的正则验证
    regExForPhone: "", // 定义电话的正则验证
    slideFlag:true,
    heightSelect: 32,//定义下拉框的高度
    widthSelect: 125,//定义下拉框的高度
    validateName: function(name){
    // 对名字name做些操作，你可以通过使用“this.regExForname”
    },
    validatePhoneNo: function(phoneNo){
   
    }
}
// 对象和方法一起申明
MYSpace.event = {
    /* 
    * 1.全选名称要求在单选名称后面加All
    */
    chooseCheckboxAll: function(el, type, fn) {
        var all_name=el.attr("name");//得到全选框名称
        var c_name=all_name.substring(0,all_name.length-3);//得到checkbox组的名称
        el.is(":checked")
		?$("input[name="+c_name+"]").prop("checked",true)
		:$("input[name="+c_name+"]").prop("checked",false);        
    },
   chooseCheckbox: function(el, type, fn) {
       var c_name=el.attr("name");//得到复选框名称
       var all_name=c_name + "All";
        ($("input[name="+c_name+"]:checked").length===$("input[name="+c_name+"]").length)
        ?$("input[name="+all_name+"]").prop("checked",true)
        :$("input[name="+all_name+"]").prop("checked",false);
   },
   /*
   *1.自主定义弹层内容及样式
   *2.参数：id
   *3.关闭按钮样式名：layer-close
   *4.关闭弹层方法：layerHide()
   */
    myLayer: function(id) {
        this.id=id;
        var id_=this.id;
        $(document.body).append('<div class="my-shade"></div>');
        //$(".my-layer").show();
        $("#"+id).show();
        $(".layer-close").on("click",function(){
            //$(".my-shade").hide();
            $(".my-shade").remove();
            $("#"+id_).hide();
        })
        layerHide=function(){
            $(".my-shade").remove();
            $("#"+id_).hide();
        }

    },
    //确认框
    //参数：msg,回调函数
    //调用方式:MYSpace.event.confirm('您确定要退出吗？', function(){})
    confirm:function(msg,callback){
        var str='<div class="my-shade"></div>'
            +'<div class="my-layer" id="layConfirm">'
            +'<div class="layer-head">'
            +'<a class="layer-close layer-icon-btn"></a>'
            +'</div>'
            +'<div class="layer-content">'
            +'<p class="msg"><i></i>'+msg+'</p>'
            +'</div>'
            +'<div class="layer-foot">'
            +'<button type="button" class="layer-close btn btn-xs btn-default">取消</button>'
            +'<button type="button" class="layer-sure btn btn-xs btn-orange">确定</button>'
            +'</div>'
            +'</div>';
        $(document.body).append(str);
        //$(".my-layer").show();
        $("#layConfirm").show();
        //确定按钮事件
        var btnOk = function (callback) {
            $(".layer-sure").click(function () {
                $(".my-shade,#layConfirm").hide().remove();
                if (typeof (callback) == 'function') {
                    callback();
                }
            });
        }

        //取消按钮事件
        var btnNo = function () {
            $(".layer-close").click(function () {
                $(".my-shade,#layConfirm").hide().remove();
            });
        }

        btnOk(callback);
        btnNo();


    },
		
   /*
   *1.file 、 checkbox、 radio 美化
   *2.<a href="javascript:;" class="beautiful-file"><input type="file"></a>
   */
   myfile:function(){
       $("input[type='file']").wrap('<a href="javascript:;" class="beautiful-file">点击这里上传文件</a>');
       $(".beautiful-file").on("change","input[type='file']",function(){
            var _this=$(this);
            var filePath=_this.val();
            if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
                _this.parent(".beautiful-file").find(".fileerrorTip").remove();
                var arr=filePath.split('\\');
                var fileName=arr[arr.length-1];
				_this.parent(".beautiful-file").after("<span class='showFileName'>"+fileName+"</span>");
            }else{
                _this.val("");
                _this.parent(".beautiful-file").find(".showFileName").remove();
                _this.parent(".beautiful-file").after("<span class='fileerrorTip'>您未上传文件，或者您上传文件类型有误!</span>");
                return false 
            }
        })
    },
    /*
    *1.给单个checkbox美化
    *2.name=single-checkbox
    *3.多个checkbox美化存在 全选和反选选中问题
    */
    mycheckbox:function(){
        /*//扩展多个checkbox
        $("input[type='checkbox']").each(function(index, element) {
            var _this=$(this);
            _this.wrap('<a href="javascript:;" class="beautiful-checkbox"></a>');
            _this.on("click",function(){
                _this.parent(".beautiful-checkbox").toggleClass("beautiful-checkbox-checked");
                //alert($(this).is(":checked"));
            })
            
        });*/
		
        $(".single-checkbox").wrap('<a href="javascript:;" class="beautiful-checkbox"></a>');
        if($(".single-checkbox").is(":checked")){
                $(".single-checkbox").parent(".beautiful-checkbox").addClass("beautiful-checkbox-checked");
            }
        $(".single-checkbox").on("click",function() {
            var _this=$(this);
            _this.parent(".beautiful-checkbox").toggleClass("beautiful-checkbox-checked");
            //alert($(this).is(":checked"));
        });
    },
    myradio:function(){
        
        $("input[type='radio']").each(function(index, element) {
            var _this=$(this);
            _this.wrap('<a href="javascript:;" class="beautiful-radio"></a>');
            if($(this).is(":checked")){
                _this.parent(".beautiful-radio").addClass("beautiful-radio-checked");
            }
            _this.on("click",function(){
                _this.parent(".beautiful-radio").toggleClass("beautiful-radio-checked").siblings(".beautiful-radio").toggleClass("beautiful-radio-checked");;
                //alert($(this).is(":checked"));
            })
        });
    },
    myselect:function(){
        var h=MYSpace.commonMethod.heightSelect;
        var w=MYSpace.commonMethod.widthSelect;
        $(".beautiful-select").each(function(index, element) {
            var _this=$(this);
            if(!!_this.attr("height")){
                h=_this.attr("height");
            }
            if(!!_this.attr("width")){
                w=_this.attr("width");
            }
            _this.css({"height":h+"px","width":w+"px"}); //.beautiful-select
            //var hPos=parseInt((-660)+h/2);
            var hPos=parseInt((-660)+h/2-4);
            _this.find("span").css({"width":(w-40)+"px","height":(h-2)+"px","line-height":(h-2)+"px","background-position":"right "+hPos+"px"});//span
            _this.find("ul").css({"top":(h-2)+"px","width":w+"px"});//ul

        });

        $('.beautiful-select span').on('click',function(e){
            //给变下拉框的箭头方向
            var hPos=parseInt((-759)+h/2-4);
            var _this=$(this);
            _this.css({"background-position":"right "+hPos+"px"});

            var aReaul = $(this).next('ul');
            if(aReaul.is(":hidden")){
                $('.beautiful-select ul').hide();
                aReaul.show();
                aReaul.find('li').click(function(){
                    //给变下拉框的箭头方向
                    var hPos=parseInt((-660)+h/2-4);
                    _this.css({"background-position":"right "+hPos+"px"});

                    $(this).parent('ul').prev('span').text($(this).text());
                    aReaul.hide();
                })
            }else{
                aReaul.hide();
            }
            $(document).one("click", function(){
                //给变下拉框的箭头方向
                var hPos=parseInt((-660)+h/2-4);
                _this.css({"background-position":"right "+hPos+"px"});

                aReaul.hide();
            });

            e.stopPropagation();
        });
    },
	
    /*
    *1.tab切换,支持多个Tab组切换
    *2.两个样式tab-change、tab-content
    */
    mytab:function(){
        $(".tab-change li").on("click",function(){
            var _this=$(this);
            _this.addClass("active").siblings().removeClass("active");
            var num=_this.index();
            _this.parent(".tab-change").next(".tab-content").children(".show-pane").eq(num).addClass("in active").siblings().removeClass("in active");

        })
    },
   /*
   *1.查看更多插件
   */
   mymore:function(){
       option={
          speed: 100,
          maxHeight: 90
         }
        $(".read-more").on("click",function(){
            var _this=$(this);
              _this.prev(".read-wrap").animate({"height":((_this.prev(".read-wrap").height()===90)?(_this.prev(".read-wrap").css("height","auto").height()):option.maxHeight)}, {duration: option.speed});
        })
    },
   
   
   mymarquee:function(){
	   //图片无缝轮播
		var segmentWidth = 0; 
		$(".my-marquee .content li").each(function(){ 
		  segmentWidth+= $(this).outerWidth(true); 
		}); 
	  
		$(".my-marquee .content li").clone().appendTo($(".my-marquee .content")); 
	  
		run(6000); 
	  
		function run(interval){ 
		  $(".my-marquee .content").animate({"left":-segmentWidth}, interval,"linear",function(){ 
			$(".my-marquee .content").css("left",0); 
			run(6000); 
		  }); 
		} 
	  
		$(".my-marquee").mouseenter(function(){ 
		  $(".my-marquee .content").stop(); 
		}).mouseleave(function(){ 
		  var passedCourse = -parseInt($(".my-marquee .content").css("left")); 
		  var time = 6000 * (1 - passedCourse/segmentWidth); 
		  run(time); 
		});
	
   		
   },
   mytoggle:function(){	   
	   if(MYSpace.commonMethod.slideFlag){
		   MYSpace.commonMethod.slideFlag=false;
		   $(".mytoggle .toggle_btn").on("click",function(){
			   var _this=$(this);
			   _this.toggleClass("up","");
			   _this.parent().next(".toggle_content").slideToggle('fast',function(){MYSpace.commonMethod.slideFlag=true;});
			   
		   })
		}
   }
   
   
   
   
   
 
}
$(function(){
    MYSpace.event.myfile();
    MYSpace.event.mycheckbox();
    MYSpace.event.myradio();
	MYSpace.event.myselect();
    MYSpace.event.mytab();
    MYSpace.event.mymore();
	MYSpace.event.mymarquee();
	MYSpace.event.mytoggle();
	
})

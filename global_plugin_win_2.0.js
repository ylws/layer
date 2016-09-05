/*
 * 名称：弹窗控件/shineonWin
 * 作者：djl
 * 邮箱：474569696@qq.com
 * 日期：2016/4/14
 */
$.fn.shineonWin = function(options,fahterid) 
{			
	var defaults = {
	"width":"287px",//弹窗宽度
	"height":"215px",//弹窗高度
	"type":"txt",//弹窗类型input/txt/iframe/html
	"typemargin":"0px",
	"typepadding":"0px",
	"typeval":"",//input操作后的值/iframe的src地址
	"typewid":"100%",
	"typehei":"32px",
	"title":"标题",
	"placehloder":"",
	"position":"auto",//auto为水平垂直居中，self为自定义传参+positionx,positiony
	"positionx":"auto",
	"positiony":"auto",
	"content":'',//嵌入的html代码,文本
	"btnshow":"block",//按钮显示隐藏block/none
	"btn":[["cancel","取&nbsp;&nbsp;消"],["save","保&nbsp;&nbsp;存"]],//按钮自定义
	"headshow":"block",
	"scroll":"no",//no,yes,auto
	"sure":function(){},
	"cancel":function(){},
	"timeout":0,//无按钮，几秒后消失
	"timefn":function(){},//消失后回调
	"param":""//弹窗临时调用数据，供iframe内部调用或其他页面调用
	},
	winlen=0,
	settings  = $.extend({},defaults,options),
	appendhtml=function(){
		if($(".win").length!=0)
		{
			winlen+=1;
		}
		var seeheight=document.documentElement.clientHeight;
		var allhei=document.body.scrollHeight,heis;
		heis=document.body.scrollTop+seeheight/2-parseInt(settings['height'])/2+"px";
		var html="<div class=\"win\" id=\"win"+winlen+"\" param=\""+settings['param']+"\">";
		if(settings['position']=="auto")
		{
			html+="<div class=\"win_content\" style=\"height: "+settings['height']+";width:"+settings['width']+";margin:auto\">";
		}
		else
		{//待处理
			
			html+="<div class=\"win_content\" style=\"height: "+settings['height']+";width:"+settings['width']+";left:"+(settings['positionx']=="auto"?($(window).width()/2-parseInt(settings['width'])/2)+"px":settings['positionx'])+";top:"+(settings['positiony']=="auto"?heis:settings['positiony'])+"\">";
		}
			html+=	"<div class=\"title\" style=\"display:"+settings['headshow']+"\">";
			html+=		"<span class=\"menuname\">"+settings['title']+"</span>";
			html+=		"<span class=\"close\"></span>";
			html+=	"</div>";
			if(settings['type']=="txt")
			{
				html+="<div class=\"txt\">"+settings['content']+"</div>";
			}
			else if(settings['type']=="input")
			{
				// +";padding:"+settings['typepadding']+"
				html+=	"<input type=\"text\" value=\""+settings['typeval']+"\" class=\"input\" placeholder=\""+settings['placehloder']+"\" style=\"margin:"+settings['typemargin']+";padding:"+settings['typepadding']+";width:"+settings['typewid']+";height:"+settings['typehei']+"\"/>";
			}
			else if(settings['type']=="iframe")
			{
				html+=	'<iframe scrolling="'+settings['scroll']+'" frameborder="0" src="'+settings['typeval']+'" class="iframe" style="margin:'+settings['typemargin']+';padding:'+settings['typepadding']+';width:'+settings['typewid']+';height:'+settings['typehei']+'"/>';
			}
			else
			{
				html+="<div class=\"content\">"+settings['content']+"</div>";
			}
			html+= "<div class=\"btnline\"  style=\"display:"+settings['btnshow']+"\">"
			for(var i =0;i<settings['btn'].length;i++)
			{
				if(settings['btn'][i][2]!=undefined){
					html+=	 "<div class=\""+settings['btn'][i][0]+"\" style=\"margin-left:"+settings['btn'][i][2]+"\">"+settings['btn'][i][1]+"</div>";
				}
				else
				{
					html+=	 "<div class=\""+settings['btn'][i][0]+"\" >"+settings['btn'][i][1]+"</div>";
				}
				
			}
			html+= "</div>";
			html+="</div>";
			html+="</div>";
			
			$("body").append(html);
			var seeheight=$("body").height();
			var allhei=document.body.scrollHeight;
			if(allhei<seeheight)
			{
				$("#win"+winlen).height(seeheight);
			}
			else
			{
				$("#win"+winlen).height(allhei);
			}
			$("#win"+winlen).show();
	};
	appendhtml();
	if(settings['timeout']!=0)
	{
		settings['btnshow']="none";
		$("#win"+winlen +" .btnline").hide();
		setTimeout(function(){
			$("#win"+winlen).remove();
			if(typeof settings['timefn']==="function"){
				settings['timefn'](fahterid);
			}
		},settings['timeout'])
		
	}
	//点击关闭，隐藏播放窗口
	var winobj=document.getElementsByClassName("win");
	for(var i=0;i<winobj.length;i++ ){
		winobj[i].getElementsByClassName("close")[0].onclick=function(){
			var parentid=this.parentNode.parentNode.parentNode.getAttribute("id");
			settings['cancel'](parentid);
		}
	}
	//点击确定，隐藏播放窗口
	for(var i=0;i<winobj.length;i++ ){
		if(winobj[i].getElementsByClassName("save").length>0){
			winobj[i].getElementsByClassName("save")[0].onclick=function(){
				var parentid=this.parentNode.parentNode.parentNode.getAttribute("id");
				settings['sure'](parentid);
			}
		}
		
	}
	
	//点击取消，隐藏播放窗口
	for(var i=0;i<winobj.length;i++ ){
		if(winobj[i].getElementsByClassName("cancel").length>0){
			winobj[i].getElementsByClassName("cancel")[0].onclick=function(){
				var parentid=this.parentNode.parentNode.parentNode.getAttribute("id");
				settings['cancel'](parentid);
			}
		}
	}
}

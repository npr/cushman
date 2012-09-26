/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.happyworm.com/jquery/jplayer
 *
 * Copyright (c) 2009 - 2010 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 2.0.0
 * Date: 20th December 2010
 */

(function(c,h){c.fn.jPlayer=function(a){var b=typeof a==="string",d=Array.prototype.slice.call(arguments,1),f=this;a=!b&&d.length?c.extend.apply(null,[true,a].concat(d)):a;if(b&&a.charAt(0)==="_")return f;b?this.each(function(){var e=c.data(this,"jPlayer"),g=e&&c.isFunction(e[a])?e[a].apply(e,d):e;if(g!==e&&g!==h){f=g;return false}}):this.each(function(){var e=c.data(this,"jPlayer");if(e){e.option(a||{})._init();e.option(a||{})}else c.data(this,"jPlayer",new c.jPlayer(a,this))});return f};c.jPlayer=
function(a,b){if(arguments.length){this.element=c(b);this.options=c.extend(true,{},this.options,a);var d=this;this.element.bind("remove.jPlayer",function(){d.destroy()});this._init()}};c.jPlayer.event={ready:"jPlayer_ready",resize:"jPlayer_resize",error:"jPlayer_error",warning:"jPlayer_warning",loadstart:"jPlayer_loadstart",progress:"jPlayer_progress",suspend:"jPlayer_suspend",abort:"jPlayer_abort",emptied:"jPlayer_emptied",stalled:"jPlayer_stalled",play:"jPlayer_play",pause:"jPlayer_pause",loadedmetadata:"jPlayer_loadedmetadata",
loadeddata:"jPlayer_loadeddata",waiting:"jPlayer_waiting",playing:"jPlayer_playing",canplay:"jPlayer_canplay",canplaythrough:"jPlayer_canplaythrough",seeking:"jPlayer_seeking",seeked:"jPlayer_seeked",timeupdate:"jPlayer_timeupdate",ended:"jPlayer_ended",ratechange:"jPlayer_ratechange",durationchange:"jPlayer_durationchange",volumechange:"jPlayer_volumechange"};c.jPlayer.htmlEvent=["loadstart","abort","emptied","stalled","loadedmetadata","loadeddata","canplaythrough","ratechange"];c.jPlayer.pause=
function(){c.each(c.jPlayer.prototype.instances,function(a,b){b.data("jPlayer").status.srcSet&&b.jPlayer("pause")})};c.jPlayer.timeFormat={showHour:false,showMin:true,showSec:true,padHour:false,padMin:true,padSec:true,sepHour:":",sepMin:":",sepSec:""};c.jPlayer.convertTime=function(a){a=new Date(a*1E3);var b=a.getUTCHours(),d=a.getUTCMinutes();a=a.getUTCSeconds();b=c.jPlayer.timeFormat.padHour&&b<10?"0"+b:b;d=c.jPlayer.timeFormat.padMin&&d<10?"0"+d:d;a=c.jPlayer.timeFormat.padSec&&a<10?"0"+a:a;return(c.jPlayer.timeFormat.showHour?
b+c.jPlayer.timeFormat.sepHour:"")+(c.jPlayer.timeFormat.showMin?d+c.jPlayer.timeFormat.sepMin:"")+(c.jPlayer.timeFormat.showSec?a+c.jPlayer.timeFormat.sepSec:"")};c.jPlayer.uaMatch=function(a){a=a.toLowerCase();var b=/(opera)(?:.*version)?[ \/]([\w.]+)/,d=/(msie) ([\w.]+)/,f=/(mozilla)(?:.*? rv:([\w.]+))?/;a=/(webkit)[ \/]([\w.]+)/.exec(a)||b.exec(a)||d.exec(a)||a.indexOf("compatible")<0&&f.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}};c.jPlayer.browser={};var m=c.jPlayer.uaMatch(navigator.userAgent);
if(m.browser){c.jPlayer.browser[m.browser]=true;c.jPlayer.browser.version=m.version}c.jPlayer.prototype={count:0,version:{script:"2.0.0",needFlash:"2.0.0",flash:"unknown"},options:{swfPath:"js",solution:"html, flash",supplied:"mp3",preload:"metadata",volume:0.8,muted:false,backgroundColor:"#000000",cssSelectorAncestor:"#jp_interface_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",
volumeBar:".jp-volume-bar",volumeBarValue:".jp-volume-bar-value",currentTime:".jp-current-time",duration:".jp-duration"},idPrefix:"jp",errorAlerts:false,warningAlerts:false},instances:{},status:{src:"",media:{},paused:true,format:{},formatType:"",waitForPlay:true,waitForLoad:true,srcSet:false,video:false,seekPercent:0,currentPercentRelative:0,currentPercentAbsolute:0,currentTime:0,duration:0},_status:{volume:h,muted:false,width:0,height:0},internal:{ready:false,instance:h,htmlDlyCmdId:h},solution:{html:true,
flash:true},format:{mp3:{codec:'audio/mpeg; codecs="mp3"',flashCanPlay:true,media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:true,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis"',flashCanPlay:false,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:false,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:false,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:true,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',
flashCanPlay:false,media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:false,media:"video"}},_init:function(){var a=this;this.element.empty();this.status=c.extend({},this.status,this._status);this.internal=c.extend({},this.internal);this.formats=[];this.solutions=[];this.require={};this.htmlElement={};this.html={};this.html.audio={};this.html.video={};this.flash={};this.css={};this.css.cs={};this.css.jq={};this.status.volume=this._limitValue(this.options.volume,0,1);this.status.muted=
this.options.muted;this.status.width=this.element.css("width");this.status.height=this.element.css("height");this.element.css({"background-color":this.options.backgroundColor});c.each(this.options.supplied.toLowerCase().split(","),function(e,g){var i=g.replace(/^\s+|\s+$/g,"");if(a.format[i]){var j=false;c.each(a.formats,function(n,k){if(i===k){j=true;return false}});j||a.formats.push(i)}});c.each(this.options.solution.toLowerCase().split(","),function(e,g){var i=g.replace(/^\s+|\s+$/g,"");if(a.solution[i]){var j=
false;c.each(a.solutions,function(n,k){if(i===k){j=true;return false}});j||a.solutions.push(i)}});this.internal.instance="jp_"+this.count;this.instances[this.internal.instance]=this.element;this.element.attr("id")===""&&this.element.attr("id",this.options.idPrefix+"_jplayer_"+this.count);this.internal.self=c.extend({},{id:this.element.attr("id"),jq:this.element});this.internal.audio=c.extend({},{id:this.options.idPrefix+"_audio_"+this.count,jq:h});this.internal.video=c.extend({},{id:this.options.idPrefix+
"_video_"+this.count,jq:h});this.internal.flash=c.extend({},{id:this.options.idPrefix+"_flash_"+this.count,jq:h,swf:this.options.swfPath+(this.options.swfPath!==""&&this.options.swfPath.slice(-1)!=="/"?"/":"")+"Jplayer.swf"});this.internal.poster=c.extend({},{id:this.options.idPrefix+"_poster_"+this.count,jq:h});c.each(c.jPlayer.event,function(e,g){if(a.options[e]!==h){a.element.bind(g+".jPlayer",a.options[e]);a.options[e]=h}});this.htmlElement.poster=document.createElement("img");this.htmlElement.poster.id=
this.internal.poster.id;this.htmlElement.poster.onload=function(){if(!a.status.video||a.status.waitForPlay)a.internal.poster.jq.show()};this.element.append(this.htmlElement.poster);this.internal.poster.jq=c("#"+this.internal.poster.id);this.internal.poster.jq.css({width:this.status.width,height:this.status.height});this.internal.poster.jq.hide();this.require.audio=false;this.require.video=false;c.each(this.formats,function(e,g){a.require[a.format[g].media]=true});this.html.audio.available=false;if(this.require.audio){this.htmlElement.audio=
document.createElement("audio");this.htmlElement.audio.id=this.internal.audio.id;this.html.audio.available=!!this.htmlElement.audio.canPlayType}this.html.video.available=false;if(this.require.video){this.htmlElement.video=document.createElement("video");this.htmlElement.video.id=this.internal.video.id;this.html.video.available=!!this.htmlElement.video.canPlayType}this.flash.available=this._checkForFlash(10);this.html.canPlay={};this.flash.canPlay={};c.each(this.formats,function(e,g){a.html.canPlay[g]=
a.html[a.format[g].media].available&&""!==a.htmlElement[a.format[g].media].canPlayType(a.format[g].codec);a.flash.canPlay[g]=a.format[g].flashCanPlay&&a.flash.available});this.html.desired=false;this.flash.desired=false;c.each(this.solutions,function(e,g){if(e===0)a[g].desired=true;else{var i=false,j=false;c.each(a.formats,function(n,k){if(a[a.solutions[0]].canPlay[k])if(a.format[k].media==="video")j=true;else i=true});a[g].desired=a.require.audio&&!i||a.require.video&&!j}});this.html.support={};
this.flash.support={};c.each(this.formats,function(e,g){a.html.support[g]=a.html.canPlay[g]&&a.html.desired;a.flash.support[g]=a.flash.canPlay[g]&&a.flash.desired});this.html.used=false;this.flash.used=false;c.each(this.solutions,function(e,g){c.each(a.formats,function(i,j){if(a[g].support[j]){a[g].used=true;return false}})});this.html.used||this.flash.used||this._error({type:c.jPlayer.error.NO_SOLUTION,context:"{solution:'"+this.options.solution+"', supplied:'"+this.options.supplied+"'}",message:c.jPlayer.errorMsg.NO_SOLUTION,
hint:c.jPlayer.errorHint.NO_SOLUTION});this.html.active=false;this.html.audio.gate=false;this.html.video.gate=false;this.flash.active=false;this.flash.gate=false;if(this.flash.used){var b="id="+escape(this.internal.self.id)+"&vol="+this.status.volume+"&muted="+this.status.muted;if(c.browser.msie&&Number(c.browser.version)<=8){var d='<object id="'+this.internal.flash.id+'"';d+=' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';d+=' codebase="'+document.URL.substring(0,document.URL.indexOf(":"))+
'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"';d+=' type="application/x-shockwave-flash"';d+=' width="0" height="0">';d+="</object>";var f=[];f[0]='<param name="movie" value="'+this.internal.flash.swf+'" />';f[1]='<param name="quality" value="high" />';f[2]='<param name="FlashVars" value="'+b+'" />';f[3]='<param name="allowScriptAccess" value="always" />';f[4]='<param name="bgcolor" value="'+this.options.backgroundColor+'" />';b=document.createElement(d);for(d=0;d<f.length;d++)b.appendChild(document.createElement(f[d]));
this.element.append(b)}else{f='<embed name="'+this.internal.flash.id+'" id="'+this.internal.flash.id+'" src="'+this.internal.flash.swf+'"';f+=' width="0" height="0" bgcolor="'+this.options.backgroundColor+'"';f+=' quality="high" FlashVars="'+b+'"';f+=' allowScriptAccess="always"';f+=' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';this.element.append(f)}this.internal.flash.jq=c("#"+this.internal.flash.id);this.internal.flash.jq.css({width:"0px",
height:"0px"})}if(this.html.used){if(this.html.audio.available){this._addHtmlEventListeners(this.htmlElement.audio,this.html.audio);this.element.append(this.htmlElement.audio);this.internal.audio.jq=c("#"+this.internal.audio.id)}if(this.html.video.available){this._addHtmlEventListeners(this.htmlElement.video,this.html.video);this.element.append(this.htmlElement.video);this.internal.video.jq=c("#"+this.internal.video.id);this.internal.video.jq.css({width:"0px",height:"0px"})}}this.html.used&&!this.flash.used&&
window.setTimeout(function(){a.internal.ready=true;a.version.flash="n/a";a._trigger(c.jPlayer.event.ready)},100);c.each(this.options.cssSelector,function(e,g){a._cssSelector(e,g)});this._updateInterface();this._updateButtons(false);this._updateVolume(this.status.volume);this._updateMute(this.status.muted);this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide();c.jPlayer.prototype.count++},destroy:function(){this._resetStatus();this._updateInterface();this._seeked();this.css.jq.currentTime.length&&
this.css.jq.currentTime.text("");this.css.jq.duration.length&&this.css.jq.duration.text("");this.status.srcSet&&this.pause();c.each(this.css.jq,function(a,b){b.unbind(".jPlayer")});this.element.removeData("jPlayer");this.element.unbind(".jPlayer");this.element.empty();this.instances[this.internal.instance]=h},enable:function(){},disable:function(){},_addHtmlEventListeners:function(a,b){var d=this;a.preload=this.options.preload;a.muted=this.options.muted;a.addEventListener("progress",function(){if(b.gate&&
!d.status.waitForLoad){d._getHtmlStatus(a);d._updateInterface();d._trigger(c.jPlayer.event.progress)}},false);a.addEventListener("timeupdate",function(){if(b.gate&&!d.status.waitForLoad){d._getHtmlStatus(a);d._updateInterface();d._trigger(c.jPlayer.event.timeupdate)}},false);a.addEventListener("durationchange",function(){if(b.gate&&!d.status.waitForLoad){d.status.duration=this.duration;d._getHtmlStatus(a);d._updateInterface();d._trigger(c.jPlayer.event.durationchange)}},false);a.addEventListener("play",
function(){if(b.gate&&!d.status.waitForLoad){d._updateButtons(true);d._trigger(c.jPlayer.event.play)}},false);a.addEventListener("playing",function(){if(b.gate&&!d.status.waitForLoad){d._updateButtons(true);d._seeked();d._trigger(c.jPlayer.event.playing)}},false);a.addEventListener("pause",function(){if(b.gate&&!d.status.waitForLoad){d._updateButtons(false);d._trigger(c.jPlayer.event.pause)}},false);a.addEventListener("waiting",function(){if(b.gate&&!d.status.waitForLoad){d._seeking();d._trigger(c.jPlayer.event.waiting)}},
false);a.addEventListener("canplay",function(){if(b.gate&&!d.status.waitForLoad){a.volume=d._volumeFix(d.status.volume);d._trigger(c.jPlayer.event.canplay)}},false);a.addEventListener("seeking",function(){if(b.gate&&!d.status.waitForLoad){d._seeking();d._trigger(c.jPlayer.event.seeking)}},false);a.addEventListener("seeked",function(){if(b.gate&&!d.status.waitForLoad){d._seeked();d._trigger(c.jPlayer.event.seeked)}},false);a.addEventListener("suspend",function(){if(b.gate&&!d.status.waitForLoad){d._seeked();
d._trigger(c.jPlayer.event.suspend)}},false);a.addEventListener("ended",function(){if(b.gate&&!d.status.waitForLoad){if(!c.jPlayer.browser.webkit)d.htmlElement.media.currentTime=0;d.htmlElement.media.pause();d._updateButtons(false);d._getHtmlStatus(a,true);d._updateInterface();d._trigger(c.jPlayer.event.ended)}},false);a.addEventListener("error",function(){if(b.gate&&!d.status.waitForLoad){d._updateButtons(false);d._seeked();if(d.status.srcSet){d.status.waitForLoad=true;d.status.waitForPlay=true;
d.status.video&&d.internal.video.jq.css({width:"0px",height:"0px"});d._validString(d.status.media.poster)&&d.internal.poster.jq.show();d.css.jq.videoPlay.length&&d.css.jq.videoPlay.show();d._error({type:c.jPlayer.error.URL,context:d.status.src,message:c.jPlayer.errorMsg.URL,hint:c.jPlayer.errorHint.URL})}}},false);c.each(c.jPlayer.htmlEvent,function(f,e){a.addEventListener(this,function(){b.gate&&!d.status.waitForLoad&&d._trigger(c.jPlayer.event[e])},false)})},_getHtmlStatus:function(a,b){var d=0,
f=0,e=0,g=0;d=a.currentTime;f=this.status.duration>0?100*d/this.status.duration:0;if(typeof a.seekable==="object"&&a.seekable.length>0){e=this.status.duration>0?100*a.seekable.end(a.seekable.length-1)/this.status.duration:100;g=100*a.currentTime/a.seekable.end(a.seekable.length-1)}else{e=100;g=f}if(b)f=g=d=0;this.status.seekPercent=e;this.status.currentPercentRelative=g;this.status.currentPercentAbsolute=f;this.status.currentTime=d},_resetStatus:function(){this.status=c.extend({},this.status,c.jPlayer.prototype.status)},
_trigger:function(a,b,d){a=c.Event(a);a.jPlayer={};a.jPlayer.version=c.extend({},this.version);a.jPlayer.status=c.extend(true,{},this.status);a.jPlayer.html=c.extend(true,{},this.html);a.jPlayer.flash=c.extend(true,{},this.flash);if(b)a.jPlayer.error=c.extend({},b);if(d)a.jPlayer.warning=c.extend({},d);this.element.trigger(a)},jPlayerFlashEvent:function(a,b){if(a===c.jPlayer.event.ready&&!this.internal.ready){this.internal.ready=true;this.version.flash=b.version;this.version.needFlash!==this.version.flash&&
this._error({type:c.jPlayer.error.VERSION,context:this.version.flash,message:c.jPlayer.errorMsg.VERSION+this.version.flash,hint:c.jPlayer.errorHint.VERSION});this._trigger(a)}if(this.flash.gate)switch(a){case c.jPlayer.event.progress:this._getFlashStatus(b);this._updateInterface();this._trigger(a);break;case c.jPlayer.event.timeupdate:this._getFlashStatus(b);this._updateInterface();this._trigger(a);break;case c.jPlayer.event.play:this._seeked();this._updateButtons(true);this._trigger(a);break;case c.jPlayer.event.pause:this._updateButtons(false);
this._trigger(a);break;case c.jPlayer.event.ended:this._updateButtons(false);this._trigger(a);break;case c.jPlayer.event.error:this.status.waitForLoad=true;this.status.waitForPlay=true;this.status.video&&this.internal.flash.jq.css({width:"0px",height:"0px"});this._validString(this.status.media.poster)&&this.internal.poster.jq.show();this.css.jq.videoPlay.length&&this.css.jq.videoPlay.show();this.status.video?this._flash_setVideo(this.status.media):this._flash_setAudio(this.status.media);this._error({type:c.jPlayer.error.URL,
context:b.src,message:c.jPlayer.errorMsg.URL,hint:c.jPlayer.errorHint.URL});break;case c.jPlayer.event.seeking:this._seeking();this._trigger(a);break;case c.jPlayer.event.seeked:this._seeked();this._trigger(a);break;default:this._trigger(a)}return false},_getFlashStatus:function(a){this.status.seekPercent=a.seekPercent;this.status.currentPercentRelative=a.currentPercentRelative;this.status.currentPercentAbsolute=a.currentPercentAbsolute;this.status.currentTime=a.currentTime;this.status.duration=a.duration},
_updateButtons:function(a){this.status.paused=!a;if(this.css.jq.play.length&&this.css.jq.pause.length)if(a){this.css.jq.play.hide();this.css.jq.pause.show()}else{this.css.jq.play.show();this.css.jq.pause.hide()}},_updateInterface:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.width(this.status.seekPercent+"%");this.css.jq.playBar.length&&this.css.jq.playBar.width(this.status.currentPercentRelative+"%");this.css.jq.currentTime.length&&this.css.jq.currentTime.text(c.jPlayer.convertTime(this.status.currentTime));
this.css.jq.duration.length&&this.css.jq.duration.text(c.jPlayer.convertTime(this.status.duration))},_seeking:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.addClass("jp-seeking-bg")},_seeked:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.removeClass("jp-seeking-bg")},setMedia:function(a){var b=this;this._seeked();clearTimeout(this.internal.htmlDlyCmdId);var d=this.html.audio.gate,f=this.html.video.gate,e=false;c.each(this.formats,function(g,i){var j=b.format[i].media==="video";
c.each(b.solutions,function(n,k){if(b[k].support[i]&&b._validString(a[i])){var l=k==="html";if(j)if(l){b.html.audio.gate=false;b.html.video.gate=true;b.flash.gate=false}else{b.html.audio.gate=false;b.html.video.gate=false;b.flash.gate=true}else if(l){b.html.audio.gate=true;b.html.video.gate=false;b.flash.gate=false}else{b.html.audio.gate=false;b.html.video.gate=false;b.flash.gate=true}if(b.flash.active||b.html.active&&b.flash.gate||d===b.html.audio.gate&&f===b.html.video.gate)b.clearMedia();else if(d!==
b.html.audio.gate&&f!==b.html.video.gate){b._html_pause();b.status.video&&b.internal.video.jq.css({width:"0px",height:"0px"});b._resetStatus()}if(j){if(l){b._html_setVideo(a);b.html.active=true;b.flash.active=false}else{b._flash_setVideo(a);b.html.active=false;b.flash.active=true}b.css.jq.videoPlay.length&&b.css.jq.videoPlay.show();b.status.video=true}else{if(l){b._html_setAudio(a);b.html.active=true;b.flash.active=false}else{b._flash_setAudio(a);b.html.active=false;b.flash.active=true}b.css.jq.videoPlay.length&&
b.css.jq.videoPlay.hide();b.status.video=false}e=true;return false}});if(e)return false});if(e){if(this._validString(a.poster))if(this.htmlElement.poster.src!==a.poster)this.htmlElement.poster.src=a.poster;else this.internal.poster.jq.show();else this.internal.poster.jq.hide();this.status.srcSet=true;this.status.media=c.extend({},a);this._updateButtons(false);this._updateInterface()}else{this.status.srcSet&&!this.status.waitForPlay&&this.pause();this.html.audio.gate=false;this.html.video.gate=false;
this.flash.gate=false;this.html.active=false;this.flash.active=false;this._resetStatus();this._updateInterface();this._updateButtons(false);this.internal.poster.jq.hide();this.html.used&&this.require.video&&this.internal.video.jq.css({width:"0px",height:"0px"});this.flash.used&&this.internal.flash.jq.css({width:"0px",height:"0px"});this._error({type:c.jPlayer.error.NO_SUPPORT,context:"{supplied:'"+this.options.supplied+"'}",message:c.jPlayer.errorMsg.NO_SUPPORT,hint:c.jPlayer.errorHint.NO_SUPPORT})}},
clearMedia:function(){this._resetStatus();this._updateButtons(false);this.internal.poster.jq.hide();clearTimeout(this.internal.htmlDlyCmdId);if(this.html.active)this._html_clearMedia();else this.flash.active&&this._flash_clearMedia()},load:function(){if(this.status.srcSet)if(this.html.active)this._html_load();else this.flash.active&&this._flash_load();else this._urlNotSetError("load")},play:function(a){a=typeof a==="number"?a:NaN;if(this.status.srcSet)if(this.html.active)this._html_play(a);else this.flash.active&&
this._flash_play(a);else this._urlNotSetError("play")},videoPlay:function(){this.play()},pause:function(a){a=typeof a==="number"?a:NaN;if(this.status.srcSet)if(this.html.active)this._html_pause(a);else this.flash.active&&this._flash_pause(a);else this._urlNotSetError("pause")},pauseOthers:function(){var a=this;c.each(this.instances,function(b,d){a.element!==d&&d.data("jPlayer").status.srcSet&&d.jPlayer("pause")})},stop:function(){if(this.status.srcSet)if(this.html.active)this._html_pause(0);else this.flash.active&&
this._flash_pause(0);else this._urlNotSetError("stop")},playHead:function(a){a=this._limitValue(a,0,100);if(this.status.srcSet)if(this.html.active)this._html_playHead(a);else this.flash.active&&this._flash_playHead(a);else this._urlNotSetError("playHead")},mute:function(){this.status.muted=true;this.html.used&&this._html_mute(true);this.flash.used&&this._flash_mute(true);this._updateMute(true);this._updateVolume(0);this._trigger(c.jPlayer.event.volumechange)},unmute:function(){this.status.muted=false;
this.html.used&&this._html_mute(false);this.flash.used&&this._flash_mute(false);this._updateMute(false);this._updateVolume(this.status.volume);this._trigger(c.jPlayer.event.volumechange)},_updateMute:function(a){if(this.css.jq.mute.length&&this.css.jq.unmute.length)if(a){this.css.jq.mute.hide();this.css.jq.unmute.show()}else{this.css.jq.mute.show();this.css.jq.unmute.hide()}},volume:function(a){a=this._limitValue(a,0,1);this.status.volume=a;this.html.used&&this._html_volume(a);this.flash.used&&this._flash_volume(a);
this.status.muted||this._updateVolume(a);this._trigger(c.jPlayer.event.volumechange)},volumeBar:function(a){if(!this.status.muted&&this.css.jq.volumeBar){var b=this.css.jq.volumeBar.offset();a=a.pageX-b.left;b=this.css.jq.volumeBar.width();this.volume(a/b)}},volumeBarValue:function(a){this.volumeBar(a)},_updateVolume:function(a){this.css.jq.volumeBarValue.length&&this.css.jq.volumeBarValue.width(a*100+"%")},_volumeFix:function(a){var b=0.0010*Math.random();return a+(a<0.5?b:-b)},_cssSelectorAncestor:function(a,
b){this.options.cssSelectorAncestor=a;b&&c.each(this.options.cssSelector,function(d,f){self._cssSelector(d,f)})},_cssSelector:function(a,b){var d=this;if(typeof b==="string")if(c.jPlayer.prototype.options.cssSelector[a]){this.css.jq[a]&&this.css.jq[a].length&&this.css.jq[a].unbind(".jPlayer");this.options.cssSelector[a]=b;this.css.cs[a]=this.options.cssSelectorAncestor+" "+b;this.css.jq[a]=b?c(this.css.cs[a]):[];this.css.jq[a].length&&this.css.jq[a].bind("click.jPlayer",function(f){d[a](f);c(this).blur();
return false});b&&this.css.jq[a].length!==1&&this._warning({type:c.jPlayer.warning.CSS_SELECTOR_COUNT,context:this.css.cs[a],message:c.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.css.jq[a].length+" found for "+a+" method.",hint:c.jPlayer.warningHint.CSS_SELECTOR_COUNT})}else this._warning({type:c.jPlayer.warning.CSS_SELECTOR_METHOD,context:a,message:c.jPlayer.warningMsg.CSS_SELECTOR_METHOD,hint:c.jPlayer.warningHint.CSS_SELECTOR_METHOD});else this._warning({type:c.jPlayer.warning.CSS_SELECTOR_STRING,
context:b,message:c.jPlayer.warningMsg.CSS_SELECTOR_STRING,hint:c.jPlayer.warningHint.CSS_SELECTOR_STRING})},seekBar:function(a){if(this.css.jq.seekBar){var b=this.css.jq.seekBar.offset();a=a.pageX-b.left;b=this.css.jq.seekBar.width();this.playHead(100*a/b)}},playBar:function(a){this.seekBar(a)},currentTime:function(){},duration:function(){},option:function(a,b){var d=a;if(arguments.length===0)return c.extend(true,{},this.options);if(typeof a==="string"){var f=a.split(".");if(b===h){for(var e=c.extend(true,
{},this.options),g=0;g<f.length;g++)if(e[f[g]]!==h)e=e[f[g]];else{this._warning({type:c.jPlayer.warning.OPTION_KEY,context:a,message:c.jPlayer.warningMsg.OPTION_KEY,hint:c.jPlayer.warningHint.OPTION_KEY});return h}return e}e=d={};for(g=0;g<f.length;g++)if(g<f.length-1){e[f[g]]={};e=e[f[g]]}else e[f[g]]=b}this._setOptions(d);return this},_setOptions:function(a){var b=this;c.each(a,function(d,f){b._setOption(d,f)});return this},_setOption:function(a,b){var d=this;switch(a){case "cssSelectorAncestor":this.options[a]=
b;c.each(d.options.cssSelector,function(f,e){d._cssSelector(f,e)});break;case "cssSelector":c.each(b,function(f,e){d._cssSelector(f,e)})}return this},resize:function(a){this.html.active&&this._resizeHtml(a);this.flash.active&&this._resizeFlash(a);this._trigger(c.jPlayer.event.resize)},_resizePoster:function(){},_resizeHtml:function(){},_resizeFlash:function(a){this.internal.flash.jq.css({width:a.width,height:a.height})},_html_initMedia:function(){this.status.srcSet&&!this.status.waitForPlay&&this.htmlElement.media.pause();
this.options.preload!=="none"&&this._html_load();this._trigger(c.jPlayer.event.timeupdate)},_html_setAudio:function(a){var b=this;c.each(this.formats,function(d,f){if(b.html.support[f]&&a[f]){b.status.src=a[f];b.status.format[f]=true;b.status.formatType=f;return false}});this.htmlElement.media=this.htmlElement.audio;this._html_initMedia()},_html_setVideo:function(a){var b=this;c.each(this.formats,function(d,f){if(b.html.support[f]&&a[f]){b.status.src=a[f];b.status.format[f]=true;b.status.formatType=
f;return false}});this.htmlElement.media=this.htmlElement.video;this._html_initMedia()},_html_clearMedia:function(){if(this.htmlElement.media){this.htmlElement.media.id===this.internal.video.id&&this.internal.video.jq.css({width:"0px",height:"0px"});this.htmlElement.media.pause();this.htmlElement.media.src="";c.browser.msie&&Number(c.browser.version)>=9||this.htmlElement.media.load()}},_html_load:function(){if(this.status.waitForLoad){this.status.waitForLoad=false;this.htmlElement.media.src=this.status.src;
try{this.htmlElement.media.load()}catch(a){}}clearTimeout(this.internal.htmlDlyCmdId)},_html_play:function(a){var b=this;this._html_load();this.htmlElement.media.play();if(!isNaN(a))try{this.htmlElement.media.currentTime=a}catch(d){this.internal.htmlDlyCmdId=setTimeout(function(){b.play(a)},100);return}this._html_checkWaitForPlay()},_html_pause:function(a){var b=this;a>0?this._html_load():clearTimeout(this.internal.htmlDlyCmdId);this.htmlElement.media.pause();if(!isNaN(a))try{this.htmlElement.media.currentTime=
a}catch(d){this.internal.htmlDlyCmdId=setTimeout(function(){b.pause(a)},100);return}a>0&&this._html_checkWaitForPlay()},_html_playHead:function(a){var b=this;this._html_load();try{if(typeof this.htmlElement.media.seekable==="object"&&this.htmlElement.media.seekable.length>0)this.htmlElement.media.currentTime=a*this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length-1)/100;else if(this.htmlElement.media.duration>0&&!isNaN(this.htmlElement.media.duration))this.htmlElement.media.currentTime=
a*this.htmlElement.media.duration/100;else throw"e";}catch(d){this.internal.htmlDlyCmdId=setTimeout(function(){b.playHead(a)},100);return}this.status.waitForLoad||this._html_checkWaitForPlay()},_html_checkWaitForPlay:function(){if(this.status.waitForPlay){this.status.waitForPlay=false;this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide();if(this.status.video){this.internal.poster.jq.hide();this.internal.video.jq.css({width:this.status.width,height:this.status.height})}}},_html_volume:function(a){if(this.html.audio.available)this.htmlElement.audio.volume=
a;if(this.html.video.available)this.htmlElement.video.volume=a},_html_mute:function(a){if(this.html.audio.available)this.htmlElement.audio.muted=a;if(this.html.video.available)this.htmlElement.video.muted=a},_flash_setAudio:function(a){var b=this;try{c.each(this.formats,function(f,e){if(b.flash.support[e]&&a[e]){switch(e){case "m4a":b._getMovie().fl_setAudio_m4a(a[e]);break;case "mp3":b._getMovie().fl_setAudio_mp3(a[e])}b.status.src=a[e];b.status.format[e]=true;b.status.formatType=e;return false}});
if(this.options.preload==="auto"){this._flash_load();this.status.waitForLoad=false}}catch(d){this._flashError(d)}},_flash_setVideo:function(a){var b=this;try{c.each(this.formats,function(f,e){if(b.flash.support[e]&&a[e]){switch(e){case "m4v":b._getMovie().fl_setVideo_m4v(a[e])}b.status.src=a[e];b.status.format[e]=true;b.status.formatType=e;return false}});if(this.options.preload==="auto"){this._flash_load();this.status.waitForLoad=false}}catch(d){this._flashError(d)}},_flash_clearMedia:function(){this.internal.flash.jq.css({width:"0px",
height:"0px"});try{this._getMovie().fl_clearMedia()}catch(a){this._flashError(a)}},_flash_load:function(){try{this._getMovie().fl_load()}catch(a){this._flashError(a)}this.status.waitForLoad=false},_flash_play:function(a){try{this._getMovie().fl_play(a)}catch(b){this._flashError(b)}this.status.waitForLoad=false;this._flash_checkWaitForPlay()},_flash_pause:function(a){try{this._getMovie().fl_pause(a)}catch(b){this._flashError(b)}if(a>0){this.status.waitForLoad=false;this._flash_checkWaitForPlay()}},
_flash_playHead:function(a){try{this._getMovie().fl_play_head(a)}catch(b){this._flashError(b)}this.status.waitForLoad||this._flash_checkWaitForPlay()},_flash_checkWaitForPlay:function(){if(this.status.waitForPlay){this.status.waitForPlay=false;this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide();if(this.status.video){this.internal.poster.jq.hide();this.internal.flash.jq.css({width:this.status.width,height:this.status.height})}}},_flash_volume:function(a){try{this._getMovie().fl_volume(a)}catch(b){this._flashError(b)}},
_flash_mute:function(a){try{this._getMovie().fl_mute(a)}catch(b){this._flashError(b)}},_getMovie:function(){return document[this.internal.flash.id]},_checkForFlash:function(a){var b=false,d;if(window.ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+a);b=true}catch(f){}else if(navigator.plugins&&navigator.mimeTypes.length>0)if(d=navigator.plugins["Shockwave Flash"])if(navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,"$1")>=a)b=true;return c.browser.msie&&
Number(c.browser.version)>=9?false:b},_validString:function(a){return a&&typeof a==="string"},_limitValue:function(a,b,d){return a<b?b:a>d?d:a},_urlNotSetError:function(a){this._error({type:c.jPlayer.error.URL_NOT_SET,context:a,message:c.jPlayer.errorMsg.URL_NOT_SET,hint:c.jPlayer.errorHint.URL_NOT_SET})},_flashError:function(a){this._error({type:c.jPlayer.error.FLASH,context:this.internal.flash.swf,message:c.jPlayer.errorMsg.FLASH+a.message,hint:c.jPlayer.errorHint.FLASH})},_error:function(a){this._trigger(c.jPlayer.event.error,
a);if(this.options.errorAlerts)this._alert("Error!"+(a.message?"\n\n"+a.message:"")+(a.hint?"\n\n"+a.hint:"")+"\n\nContext: "+a.context)},_warning:function(a){this._trigger(c.jPlayer.event.warning,h,a);if(this.options.errorAlerts)this._alert("Warning!"+(a.message?"\n\n"+a.message:"")+(a.hint?"\n\n"+a.hint:"")+"\n\nContext: "+a.context)},_alert:function(a){alert("jPlayer "+this.version.script+" : id='"+this.internal.self.id+"' : "+a)}};c.jPlayer.error={FLASH:"e_flash",NO_SOLUTION:"e_no_solution",NO_SUPPORT:"e_no_support",
URL:"e_url",URL_NOT_SET:"e_url_not_set",VERSION:"e_version"};c.jPlayer.errorMsg={FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",URL:"Media URL could not be loaded.",URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.",
VERSION:"jPlayer "+c.jPlayer.prototype.version.script+" needs Jplayer.swf version "+c.jPlayer.prototype.version.needFlash+" but found "};c.jPlayer.errorHint={FLASH:"Check your swfPath option and that Jplayer.swf is there.",NO_SOLUTION:"Review the jPlayer options: support and supplied.",NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.",URL:"Check media URL is valid.",URL_NOT_SET:"Use setMedia() to set the media URL.",VERSION:"Update jPlayer files."};c.jPlayer.warning=
{CSS_SELECTOR_COUNT:"e_css_selector_count",CSS_SELECTOR_METHOD:"e_css_selector_method",CSS_SELECTOR_STRING:"e_css_selector_string",OPTION_KEY:"e_option_key"};c.jPlayer.warningMsg={CSS_SELECTOR_COUNT:"The number of methodCssSelectors found did not equal one: ",CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",OPTION_KEY:"The option requested in jPlayer('option') is undefined."};
c.jPlayer.warningHint={CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.",CSS_SELECTOR_METHOD:"Check your method name.",CSS_SELECTOR_STRING:"Check your css selector is a string.",OPTION_KEY:"Check your option name."}})(jQuery);

/*! Smooth Scroll - v1.4.6 - 2012-08-23
* Copyright (c) 2012 Karl Swedberg; Licensed MIT, GPL */
(function(a){function f(a){return a.replace(/(:|\.)/g,"\\$1")}var b="1.4.6",c={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficent:2},d=function(b){var c=[],d=!1,e=b.dir&&b.dir=="left"?"scrollLeft":"scrollTop";return this.each(function(){if(this==document||this==window)return;var b=a(this);b[e]()>0?c.push(this):(b[e](1),d=b[e]()>0,d&&c.push(this),b[e](0))}),c.length||this.each(function(a){this.nodeName==="BODY"&&(c=[this])}),b.el==="first"&&c.length>1&&(c=[c[0]]),c},e="ontouchend"in document;a.fn.extend({scrollable:function(a){var b=d.call(this,{dir:a});return this.pushStack(b)},firstScrollable:function(a){var b=d.call(this,{el:"first",dir:a});return this.pushStack(b)},smoothScroll:function(b){b=b||{};var c=a.extend({},a.fn.smoothScroll.defaults,b),d=a.smoothScroll.filterPath(location.pathname);return this.unbind("click.smoothscroll").bind("click.smoothscroll",function(b){var e=this,g=a(this),h=c.exclude,i=c.excludeWithin,j=0,k=0,l=!0,m={},n=location.hostname===e.hostname||!e.hostname,o=c.scrollTarget||(a.smoothScroll.filterPath(e.pathname)||d)===d,p=f(e.hash);if(!c.scrollTarget&&(!n||!o||!p))l=!1;else{while(l&&j<h.length)g.is(f(h[j++]))&&(l=!1);while(l&&k<i.length)g.closest(i[k++]).length&&(l=!1)}l&&(b.preventDefault(),a.extend(m,c,{scrollTarget:c.scrollTarget||p,link:e}),a.smoothScroll(m))}),this}}),a.smoothScroll=function(b,c){var d,e,f,g,h=0,i="offset",j="scrollTop",k={},l={},m=[];typeof b=="number"?(d=a.fn.smoothScroll.defaults,f=b):(d=a.extend({},a.fn.smoothScroll.defaults,b||{}),d.scrollElement&&(i="position",d.scrollElement.css("position")=="static"&&d.scrollElement.css("position","relative")),f=c||a(d.scrollTarget)[i]()&&a(d.scrollTarget)[i]()[d.direction]||0),d=a.extend({link:null},d),j=d.direction=="left"?"scrollLeft":j,d.scrollElement?(e=d.scrollElement,h=e[j]()):e=a("html, body").firstScrollable(),k[j]=f+h+d.offset,d.beforeScroll.call(e,d),g=d.speed,g==="auto"&&(g=k[j]||e.scrollTop(),g=g/d.autoCoefficent),l={duration:g,easing:d.easing,complete:function(){d.afterScroll.call(d.link,d)}},d.step&&(l.step=d.step),e.length?e.stop().animate(k,l):d.afterScroll.call(d.link,d)},a.smoothScroll.version=b,a.smoothScroll.filterPath=function(a){return a.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},a.fn.smoothScroll.defaults=c})(jQuery);

/*! Ajax-include pattern. Copyright 2012, Scott Jehl, Filament Group, Inc. Dual licensed under MIT and GPLv2 */
/*
  * Original idea by Scott Gonzalez :)
  * To use, place attributes on content, pointing to a URL
    * that should either replace, or insert before or after that anchor
    * after the page has loaded
    * Replace:	<a href="..." data-replace="articles/latest/fragment">Latest Articles</a>
    * Before:	<a href="..." data-before="articles/latest/fragment">Latest Articles</a>
    * After:	<a href="..." data-after="articles/latest/fragment">Latest Articles</a>
    * Also, the data-threshold attr allows a min width for this to apply.
    * After domready, you can use it like this: 
         $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
*/
(function( $ ){
	$.fn.ajaxInclude = function( proxy ) {
		
		var filelist = [],
			els = this;
		
		return this.each(function( k ) {
			var el			= $( this ),
				target		= el.data( "target" ),
				targetEl	= target && $( target ) || el,
				threshold	= screen.width > parseFloat( el.data( "threshold" ) || 0 ),
				methods		= [ "append", "replace", "before", "after" ],
				method,
				url;

			if ( threshold ) {

				for( var ml = methods.length, i=0; i < ml; i++ ){
					if( el.is( "[data-" + methods[ i ] + "]" ) ){
						method	= methods[ i ];
						url		= el.attr( "data-" + method );
					}
				}

				if( method === "replace" ){
					method += "With";
				}

				if( url && method ){
					
					el
						.data( "method", method )
						.data( "url", url )
						.bind( "ajaxInclude", function(e, data){
							var content = $(data);
							
							if( $(this).data( "proxy" ) ){
								content = content.filter( "entry[url=\"" + $(this).data( "url" ) + "\"]" ).html();
							}
							$( this )[ $(this).data( "method" ) ]( content );	
						});
					
					if( proxy ){
						
						el.data( "proxy", proxy );
						
						if( $.inArray( url, filelist ) === -1 ){
							filelist.push( url );
						}
						
						if( k === els.length - 1 ){
							url = proxy + filelist.join();
						}
					}
					
					if( !proxy || k === els.length-1 ){
						$.get( url, function( data ) {	
							( proxy ? els : el ).trigger( "ajaxInclude", [data] );
						});
					}
				}

			}
		});
	};
})( jQuery );

/*! Responsive Carousel - v0.1.0 - 2012-08-16
* https://github.com/filamentgroup/responsive-carousel
* Copyright (c) 2012 Filament Group, Inc.; Licensed MIT, GPL */
(function(a){var b="carousel",c="."+b,d="data-transition",e=b+"-transitioning",f=b+"-item",g=b+"-active",h=b+"-in",i=b+"-out",j=b+"-nav",k=function(){var a=" -webkit- -moz- -o- -ms- ".split(" "),b=!1;while(a.length)a.shift()+"transition"in document.documentElement.style!==undefined&&(b=!0);return b}(),l={_create:function(){a(this).trigger("beforecreate."+b)[b]("_init")[b]("_addNextPrev").trigger("create."+b)},_init:function(){var c=a(this).attr(d);return c||(k=!1),a(this).addClass(b+" "+(c?b+"-"+c:"")+" ").children().addClass(f).first().addClass(g)},next:function(){a(this)[b]("goTo","+1")},prev:function(){a(this)[b]("goTo","-1")},goTo:function(c){var e=a(this),j=e.attr(d),l=" "+b+"-"+j+"-reverse";a(this).find("."+f).removeClass([i,h,l].join(" "));var m=a(this).find("."+g),n=m.prevAll().length,o=(n||0)+1,p=typeof c=="number"?c:o+parseFloat(c),q=a(this).find(".carousel-item").eq(p-1),r=typeof c=="string"&&!parseFloat(c)||p>o?"":l;q.length||(q=a(this).find("."+f)[r.length?"last":"first"]()),k?e[b]("_transitionStart",m,q,r):(q.addClass(g),e[b]("_transitionEnd",m,q,r)),e.trigger("goto."+b,q)},update:function(){return a(this).children().not("."+j).addClass(f),a(this).trigger("update."+b)},_transitionStart:function(c,d,e){var f=a(this);d.one(navigator.userAgent.indexOf("AppleWebKit")>-1?"webkitTransitionEnd":"transitionend",function(){f[b]("_transitionEnd",c,d,e)}),a(this).addClass(e),c.addClass(i),d.addClass(h)},_transitionEnd:function(b,c,d){a(this).removeClass(d),b.removeClass(i+" "+g),c.removeClass(h).addClass(g)},_bindEventListeners:function(){var c=a(this).bind("click",function(d){var e=a(d.target).closest("a[href='#next'],a[href='#prev']");e.length&&(c[b](e.is("[href='#next']")?"next":"prev"),d.preventDefault())});return this},_addNextPrev:function(){return a(this).append("<nav class='"+j+"'><a href='#prev' class='prev' title='Previous'>Prev</a><a href='#next' class='next' title='Next'>Next</a></nav>")[b]("_bindEventListeners")},destroy:function(){}};a.fn[b]=function(c,d,e,f){return this.each(function(){if(c&&typeof c=="string")return a.fn[b].prototype[c].call(this,d,e,f);if(a(this).data(b+"data"))return a(this);a(this).data(b+"active",!0),a.fn[b].prototype._create.call(this)})},a.extend(a.fn[b].prototype,l),a(function(){a(c)[b]()})})(jQuery),function(a){var b="carousel",c="."+b,d=b+"-no-transition",e=/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,f={_dragBehavior:function(){var b=a(this),f,g={},h,i,j=function(b){var d=b.touches||b.originalEvent.touches,e=a(b.target).closest(c);b.type==="touchstart"&&(f={x:d[0].pageX,y:d[0].pageY}),d[0]&&d[0].pageX&&(g.touches=d,g.deltaX=d[0].pageX-f.x,g.deltaY=d[0].pageY-f.y,g.w=e.width(),g.h=e.height(),g.xPercent=g.deltaX/g.w,g.yPercent=g.deltaY/g.h,g.srcEvent=b)},k=function(b){j(b),a(b.target).closest(c).trigger("drag"+b.type.split("touch")[1],g)};a(this).bind("touchstart",function(b){a(this).addClass(d),k(b)}).bind("touchmove",function(a){j(a),k(a),e||(a.preventDefault(),window.scrollBy(0,-g.deltaY))}).bind("touchend",function(b){a(this).removeClass(d),k(b)})}};a.extend(a.fn[b].prototype,f),a(c).live("create."+b,function(){a(this)[b]("_dragBehavior")})}(jQuery),function(a){var b="carousel",c="."+b,d=b+"-active",e=b+"-item",f=function(a){return Math.abs(a)>4},g=function(a,c){var d=a.find("."+b+"-active"),f=d.prevAll().length+1,g=c<0,h=f+(g?1:-1),i=a.find("."+e).eq(h-1);return i.length||(i=a.find("."+e)[g?"first":"last"]()),[d,i]};a(c).live("dragmove",function(b,c){if(!f(c.deltaX))return;var d=g(a(this),c.deltaX);d[0].css("left",c.deltaX+"px"),d[1].css("left",c.deltaX<0?c.w+c.deltaX+"px":-c.w+c.deltaX+"px")}).live("dragend",function(b,c){if(!f(c.deltaX))return;var e=g(a(this),c.deltaX),h=Math.abs(c.deltaX)>45;a(this).one(navigator.userAgent.indexOf("AppleWebKit")?"webkitTransitionEnd":"transitionEnd",function(){e[0].add(e[1]).css("left","")}),h?(e[0].removeClass(d).css("left",c.deltaX>0?c.w+"px":-c.w+"px"),e[1].addClass(d).css("left",0)):(e[0].css("left",0),e[1].css("left",c.deltaX>0?-c.w+"px":c.w+"px"))})}(jQuery);

/*
 * responsive-carousel autoplay extension
 * https://github.com/filamentgroup/responsive-carousel
 *
 * Copyright (c) 2012 Filament Group, Inc.
 * Licensed under the MIT, GPL licenses.
 */

(function( $, undefined ) {
	var pluginName = "carousel",
		initSelector = "." + pluginName,
		interval = 4000,
		autoPlayMethods = {
			play: function(){
				var $self = $( this ),
					intAttr = $self.attr( "data-interval" ),
					thisInt = parseFloat( intAttr ) || interval;
				return $self.data(
					"timer", 
					setInterval( function(){
						$self[ pluginName ]( "next" );
					},
					thisInt )
				);
			},
			
			stop: function(){
				clearTimeout( $( this ).data( "timer" ) );
			},
			
			_bindStopListener: function(){
				return $(this).bind( "mousedown", function(){
					$( this )[ pluginName ]( "stop" );
				} );
			},
			
			_initAutoPlay: function(){
				var autoplay = $( this ).attr( "data-autoplay");
				if( autoplay !== undefined && autoplay !== false ){
					$( this )
						[ pluginName ]( "_bindStopListener" )
						[ pluginName ]( "play" );
				}
			}
		};
			
	// add methods
	$.extend( $.fn[ pluginName ].prototype, autoPlayMethods ); 
	
	// DOM-ready auto-init
	$( initSelector ).live( "create." + pluginName, function(){
		$( this )[ pluginName ]( "_initAutoPlay" );
	} );

}(jQuery));

/*
 * responsive-carousel ajax include extension
 * https://github.com/filamentgroup/responsive-carousel
 *
 * Copyright (c) 2012 Filament Group, Inc.
 * Licensed under the MIT, GPL licenses.
 */

(function($) {
	
	var pluginName = "carousel",
		initSelector = "." + pluginName;
	
	// DOM-ready auto-init
	$( initSelector ).live( "ajaxInclude", function(){
		$( this )[ pluginName ]( "update" );
	} );
	
	// kick off ajaxIncs at dom ready
	$( function(){
		$( "[data-after],[data-before]", initSelector ).ajaxInclude();
	} );

}(jQuery));
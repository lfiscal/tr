var createCounter = function(){
	currentNum = localStorage.getItem('NEU Task');
	$("<span id='current' contenteditable='false' tabindex='-1' style='padding:6px 8px;border-radius:5px;border:1px solid light gray;margin:0px 10px;font-weight:bold'></span").insertBefore("#app-root > div > div.application-wrapper--content > div > div > div.action-bar > div > div.col.text-right")
$('#current').text(currentNum);
}

var counter = {
        docObj: $("<span id='mainNum' contenteditable='true' tabindex='-1' style='padding: 6px 8px;border-radius:5px;border:1px solid lightgray; margin: 0px 10px;'>0</span"),
        projectName: $("#app-root > div > div.application-wrapper--content > div > div > div.action-bar > div > div.col-auto > div > div:nth-child(1) > span.labeled-attribute--attribute").text(),
        skip: !0,
        id: "",
        init: function() {
            this.docObj.insertBefore("#app-root > div > div.application-wrapper--content > div > div > div.action-bar > div > div.col.text-right"), localStorage.getItem(this.projectName) ? this.docObj.text(localStorage.getItem(this.projectName)) : localStorage.setItem(this.projectName, this.docObj.text()), this.onload()
        },
        incr: function() {
            this.docObj.text(String(parseInt(this.docObj.text()) + 1)), localStorage.setItem(this.projectName, this.docObj.text())
        },
        onload: function() {
            this.incr()
	    totalSeconds = 0;;
        }
    },
    s_ajaxListener = {
        tempOpen: XMLHttpRequest.prototype.open,
        tempSend: XMLHttpRequest.prototype.send,
        callback: function() {
          console.log(this.url)
          this.url.includes("task_ratings") && counter.onload()
          createCounter();
        }
    };
XMLHttpRequest.prototype.open = function(e, t) {
    if (!e) e = "";
    if (!t) t = "";
    s_ajaxListener.tempOpen.apply(this, arguments), s_ajaxListener.method = e, s_ajaxListener.url = t, "get" == e.toLowerCase() && (s_ajaxListener.data = t.split("?"), s_ajaxListener.data = s_ajaxListener.data[1])
}, XMLHttpRequest.prototype.send = function(e, t) {
    if (!e) e = "";
    if (!t) t = "";
    s_ajaxListener.tempSend.apply(this, arguments), "post" == s_ajaxListener.method.toLowerCase() && (s_ajaxListener.data = e), s_ajaxListener.callback()
}, hideParseSetting = !1, counter.init();
if ( $( "#mainNum" ).length == 0 ) {
    createCounter();
}

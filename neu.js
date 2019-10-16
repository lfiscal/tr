$( document ).ready(function() {
   $('#app-root > div > div.application-wrapper--content > div > div > div.action-bar > div > div.col.text-right').prepend('<label id="minutes">00</label>:<label id="seconds">00</label >&nbsp;&nbsp;&nbsp;')

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

if (counter) throw counter.init(), "resetting";

var counter = {
        docObj: $("<span contenteditable='true' tabindex='-1' style='padding: 6px 8px;border-radius:5px;border:1px solid lightgray; margin: 0px 10px;'>0</span"),
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
	    $('#app-root > div > div.application-wrapper--content > div > div > div.action-bar > div > div.col.text-right').prepend('<label id="minutes">00</label>:<label id="seconds">00</label >&nbsp;&nbsp;&nbsp;');
	    $("<span contenteditable='true' tabindex='-1' style='padding: 6px 8px;border-radius:5px;border:1px solid lightgray; margin: 0px 10px;'>0</span");
		
        }
    },
    s_ajaxListener = {
        tempOpen: XMLHttpRequest.prototype.open,
        tempSend: XMLHttpRequest.prototype.send,
        callback: function() {
          console.log(this.url)
          this.url.includes("task_ratings") && counter.onload()
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
});

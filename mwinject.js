var __mwinject = {
    _java : null,
    _style : {},
    _el : null,
    _el_txt_buff : [],
    _el_txt_buff_pos : 0,
    _lbl_obrazek : 'Obrazek',
    _lbl_video : 'Video',
    _lbl_link : 'Odkaz',
    _lbl_button : 'Button',
    _lbl_iframe: 'Ifrejm',

    cleanupJustice: function(){

        try{ document.getElementById('AdvancedSearch').remove(); }catch(ex){}
        try{ document.getElementById('page-h').remove(); }catch(ex){}
        try{ document.getElementById('frag-rejstrik-switchComp-wholebead').childNodes[0].remove(); }catch(ex){}
        try{ document.getElementById('page-f').remove(); }catch(ex){}

    },

    cleanupParlamentky: function(){

        try{

            if(googletag){
                googletag.pubads().disableInitialLoad();
            }

            var i, drop = [], noel, el, e;

            noel = document.getElementsByTagName("H2");

            var ttl = ""
            for(i=0; i < noel.length; ++i){
                ttl = noel[i].innerText.trim();

                if(ttl.startsWith("Článek obsahuje štítky")){
                    drop.push(noel[i].parentElement.parentElement);
                }
                else if(ttl.startsWith("Anketa")){
                    drop.push(noel[i].parentElement.parentElement);
                }
                else if(ttl.startsWith("Psali jsme:")){
                    drop.push(noel[i].parentElement);
                }
                else if(ttl.startsWith("Jinde na netu:")){
                    drop.push(noel[i].parentElement);
                }
            }

            noel = document.getElementsByTagName("legend");

            for(i=0; i < noel.length; ++i){
                ttl = noel[i].innerText.trim();
                if(ttl.startsWith("Nový příspěvek") && noel[i].parentElement.tagName == "FORM"){
                    drop.push(noel[i].parentElement.parentElement);
                }
            }


            noel = document.getElementsByClassName("profile-thumb-card");
            for (i = 0; i <  noel.length; i++) {
                drop.push(noel[i]);
            }

            noel = document.getElementsByTagName("noscript");
            for (i = 0; i <  noel.length; i++) {
                drop.push(noel[i]);
            }


            drop.push(document.getElementById("AdTrackGenericFixedMobileWrap"));

            for(i=drop.length-1; i > -1 ; --i){
                try{
                    drop[i].remove();
                }catch(ex) {}
            }

        }catch(ex){}
    },

    isVisible(el){
        var v = !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );

        var s = window.getComputedStyle(el);
        v2 = s.opacity !== "0" && s.display!=='none' && s.visibility!== 'hidden';

        return v && v2;
    },

    cleanup: function(){

        try
        {
            try{

                if(document.location.href.match("/.+\\.parlamentnilisty\\.cz.+/") !== null){
                    console.log("cistim parlamentky");
                    this.cleanupParlamentky();
                }
                else if(document.location.href.match("/.+\\.justice\\.cz.+/") !== null){
                    console.log("cistim justici");
                    this.cleanupJustice();
                }

            }catch(ex){}

            var i, drop = [], noel, el, e;

            /*
            noel = document.getElementsByTagName('IFRAME');
            for (i = 0; i <  noel.length; i++) {
                drop.push(noel[i]);
            }*/


            el = document.body.getElementsByTagName("*");

            for(i=0; i < el.length; ++i){
                try{
                    e = el[i];
                    if(e.hasAttribute("id") && e.getAttribute("id").match("/fb-root/")){
                        drop.push(e);
                        continue;
                    }
                    else if(e.hasAttribute("id") && e.getAttribute("id").match("/banner/")){
                        drop.push(e);
                        continue;
                    }

                    e.style.backgroundImage = 'none !important';
                    e.style.background = 'none !important';
                    e.style.backgroundUrl = 'none !important';
                    e.style.backgroundColor = '#FFF !important';

                }catch(ex) {}
            }

            for(i=drop.length-1; i > -1 ; --i){
                try{
                    drop[i].remove();
                }catch(ex) {}
            }

    }catch(ex) {}


    },

    getElement : function() {
        return this._el;
    },

    _invokeClick : function(){

       if(this._el){

            if(this._el.nodeType == 1 ){

                if(this.isVideo()){

                    if(this._el.nodeName == 'VIDEOPLAYER'){
                        try{
                            var e = this._el;

                            var evObj = document.createEvent('Events');
                            evObj.initEvent('click', true, false);
                            e.dispatchEvent(evObj);
                            /*

                            e.dispatchEvent(new MouseEvent("mouseover"));
                            e.dispatchEvent(new MouseEvent("mousedown"));
                            e.dispatchEvent(new MouseEvent("click"));
                            e.dispatchEvent(new MouseEvent("mouseup"));
                            */

                         }catch(ex){}

                    }
                    else{

                        var isplaying = false;

                        try{
                            isplaying = !!(this._el.currentTime > 0 && !this._el.paused && !this._el.ended && this._el.readyState > 2);
                        }
                        catch(ex){}

                        if(isplaying){
                            this._el.pause();
                        }else{
                            this._el.play();
                        }
                    }

                }
                else{
                    try{
                        var e = this._el;

                        var evObj = document.createEvent('Events');
                        evObj.initEvent('click', true, false);
                        e.dispatchEvent(evObj);

                        e.click();
                        /*

                        e.dispatchEvent(new MouseEvent("mouseover"));
                        e.dispatchEvent(new MouseEvent("mousedown"));
                        e.dispatchEvent(new MouseEvent("click"));
                        e.dispatchEvent(new MouseEvent("mouseup"));
                        */

                     }catch(ex){}

                }

            }
            else{

                try{
                    var e = this._el.parentElement;

                    var evObj = document.createEvent('Events');
                    evObj.initEvent('click', true, false);
                    e.dispatchEvent(evObj);
                    e.click();
                    /*

                    e.dispatchEvent(new MouseEvent("mouseover"));
                    e.dispatchEvent(new MouseEvent("mousedown"));
                    e.dispatchEvent(new MouseEvent("click"));
                    e.dispatchEvent(new MouseEvent("mouseup"));
                    */

                }catch(ex){}

            }

        }
    },

    getCurrentText: function(){

        if(this._el_txt_buff && this._el_txt_buff.length > 0)
            return this._el_txt_buff[this._el_txt_buff_pos];

        return this.getText();
    },

    openLink : function() {
       this._invokeClick();
    },

    getPrevText : function(){

        var bf = this.getBufferedText(-1);

        if(bf != null){
            return bf;
        }
        else if(this._el != null){
            try{
                this.restoreStyle();
                this.getPrev();
                this.highlightStyle();
                this.setBufferText(this.getText(), -1);

            }catch(ex){}
        }
        else{
            this.getPrev();
            this.highlightStyle();
            this.setBufferText(this.getText(), -1);
        }

        if(this._el === null){
            return "";
        }

       this.scrollTo();
       var v = this.getBufferedText(-1);

       return v == null ? this.getPrevText() : v;
    },

    getNextText : function(){


        var bf = this.getBufferedText(1);

        if(bf != null){
            return bf;
        }
        else if(this._el != null){
            try{

                this.restoreStyle();
                this.getNext();
                this.highlightStyle();
                this.setBufferText(this.getText(), 1);

            }catch(ex){}
        }
        else{
            this.getNext();
            this.highlightStyle();
            this.setBufferText(this.getText(), 1);
        }



        if(this._el === null){
            return "";
        }

       this.scrollTo();
       var v = this.getBufferedText(1);

       return v == null ? this.getNextText() : v;
    },

    setBufferText: function(str, nav){
        this._el_txt_buff_pos = -1;
        this._el_txt_buff = null;

        if(str == null || str.trim().length == 0){
            return null;
        }

        this._el_txt_buff = [];

        if(this.isLink() || this.isImage() || this.isVideo() || this.isButton()){

             this._el_txt_buff.push(str);
        }
        else
        {
            var bf = str.trim().split(/\?|\.|\!/);
            var tmp = "";

            for(var i=0; i < bf.length; ++i){
                tmp = bf[i].trim();

                if(tmp.length == 0){
                    continue;
                }
                this._el_txt_buff.push(tmp);
            }
        }


        if(this._el_txt_buff.length < 1){
            return null;
        }

        if(nav < 0){
             this._el_txt_buff_pos = this._el_txt_buff.length;
        }

    },

    getBufferedText : function(nav){

        if(nav < 0){
            this._el_txt_buff_pos--;
        }
        else{
            this._el_txt_buff_pos++;
        }

        if(this._el_txt_buff == null || this._el_txt_buff_pos < 0 || this._el_txt_buff_pos >= this._el_txt_buff.length){
            this._el_txt_buff_pos = 0;
            this._el_txt_buff = null;
            return null;
        }

        var v = this._el_txt_buff[this._el_txt_buff_pos].toLowerCase().trim();
        return v.length > 0 ? v + '.' : null;
    },

    restoreStyle : function(){
        if(this._el == null)
            return;

        var e =  this._el.nodeType == 1 ? this._el : this._el.parentElement;

        e.style.borderWidth = this._style.borderWidth;
        e.style.borderColor = this._style.borderColor;
        e.style.borderStyle = this._style.borderStyle;

    },


    highlightStyle : function(){
        if(this._el == null)
            return;

        var e =  this._el.nodeType == 1 ? this._el : this._el.parentElement;

        this._style.borderWidth = e.style.borderWidth;
        this._style.borderColor = e.style.borderColor;
        this._style.borderStyle = e.style.borderStyle;

        e.style.borderWidth = "4px";
        e.style.borderColor = "#8500CC";
        e.style.borderStyle = "solid";
    },

    getHTML : function(){
        return '<html>'+document.getElementsByTagName('html')[0].innerHTML+'</html>';
    },

    getTypeInfo: function(){

        var e = this._el;
        if(e == null){
            return "element je NULL";
        }

        return  " nodeType: " + e.nodeType + "  nodeName: " + e.nodeName + " visibility: "+e.style.visibility + " display: "+e.style.display;
    },

    _isLink : function(e){

      if(e == null)
          return 0;

      return (e.nodeType == 1 && e.hasAttribute("href")) || e.nodeName == 'A' || e.parentElement.hasAttribute("href") ? 1 : 0;
    },

    getLink : function(){

        if(!this.isLink()){
            return "";
        }

        return this._el.href;
    },

    isLink: function(){
      return this._isLink(this._el);
    },

    _isImage: function(e){

      if(e == null)
          return false;

      return (e.nodeType == 1 && e.nodeName == 'IMG');
    },

    isImage: function(){
       return this._isImage(this._el);
    },

    _isIframe: function(e){


        if(e == null)
            return false;

        return e.nodeType == 1 && e.nodeName == 'IFRAME';
      },

      isIframe: function(){
         return this._isIframe(this._el);
      },


    _isButton: function(e){


      if(e == null)
          return false;

      return e.nodeType == 1 &&
              (e.nodeName == 'BUTTON' ||
                (e.nodeName == 'INPUT' && ("submit" == e.type || "button" == e.type ||  "reset" == e.type)));
    },

    isButton: function(){
       return this._isButton(this._el);
    },

    _isVideo: function(e){

      if(e == null)
          return 0;

      return (e.nodeType == 1 && (e.nodeName == 'VIDEO' || e.nodeName == 'VIDEOPLAYER')) ? 1 : 0 ;
    },

    isVideo: function(){
      return this._isVideo(this._el);
    },

    playVideo: function(){
        try{
            this._el.play();
        }catch(ex){
            try{
                var e = this._el;

                var evObj = document.createEvent('Events');
                evObj.initEvent('click', true, false);
                e.dispatchEvent(evObj);
                /*

                e.dispatchEvent(new MouseEvent("mouseover"));
                e.dispatchEvent(new MouseEvent("mousedown"));
                e.dispatchEvent(new MouseEvent("click"));
                e.dispatchEvent(new MouseEvent("mouseup"));
                */

             }catch(ex){}
        }

    },

    pauseVideo: function(){
        try{
            this._el.pause();
        }catch(ex){
            try{
                var e = this._el;

                var evObj = document.createEvent('Events');
                evObj.initEvent('click', true, false);
                e.dispatchEvent(evObj);
                /*

                e.dispatchEvent(new MouseEvent("mouseover"));
                e.dispatchEvent(new MouseEvent("mousedown"));
                e.dispatchEvent(new MouseEvent("click"));
                e.dispatchEvent(new MouseEvent("mouseup"));
                */

             }catch(ex){}
        }

    },

    getLinkURL: function(){

        var e = this._el;

        if(e == null)
          return null;

        if(e.nodeType == 1 && e.hasAttribute("href")){

            var sb = document.location.href.substr(0, document.location.href.lastIndexOf("/"));

            var href = e.getAttribute("href");
            if(/^https?:\/\//.test(href)){
                return href;
            }

            if(href.startsWith("/")){
                return sb + href;
            }

            return sb + "/" + href;
        }
        else if(e.parentElement.hasAttribute("href")){


            var sb = document.location.href.substr(0, document.location.href.lastIndexOf("/"));

            var href = e.parentElement.getAttribute("href");
            if(/^https?:\/\//.test(href)){
                return href;
            }

            if(href.startsWith("/")){
                return sb + href;
            }

            return sb + "/" + href;
        }

        return null;
    },
    getText : function() {

        var e = this._el;

        if(e === null){
            return "";
        }

        var x;
        if(this.isVideo()){
            return this._lbl_video +  " ";
        }

        if(this.isImage()){
            x = e.getAttribute("title");
            return (this._lbl_obrazek + " " + (x == null ? "" : x)).replace(/\s\s+/g,' ');
        }

        if(this.isButton()){
            x = e.getAttribute("value");
            x = x == null ? e.textContent : x;
            return (this._lbl_button + " " + (x == null ? "" : x)).replace(/\s\s+/g,' ');
        }

        if(this.isLink()){
            return (this._lbl_link + " " + e.textContent).replace(/\s\s+/g,' ');
        }

      var v = e.nodeType == 1 ?  e.innerText : e.nodeValue;
      return v == null ? "" : v.replace(/\s\s+/g,' ').toLowerCase() ;
    },

    getNext : function(){

        var o = this;
        var oldEl = this._el;

        if(this._el !== null){

            var p = o._el.parentNode;
            if(this._el === p.lastChild){
                this._el = this._getNextChild(this._getParentNext(p));
            }
            else{
                this._el = this._getNextChild(this._el.nextSibling);
            }
        }

        if(this._el === null){

            if(oldEl && !this._el && window['mwMiniworkInject'] && mwMiniworkInject.jsemNaKonciStranky){
                 mwMiniworkInject.jsemNaKonciStranky();
            }
            else{
                this._el = o._getTopFirst();
            }

        }

        return this._el;
    },
    getPrev : function(){

        var o = this;
        var oldEl = this._el;
        if(this._el !== null){

            var p = o._el.parentNode;
            if(this._el === p.firstChild){
                this._el = this._getPrevChild(this._getParentPrev(p));

            }
            else{
                this._el = this._getPrevChild(this._el.previousSibling);
            }
        }

        if(this._el == null){
            if(oldEl && !this._el && window['mwMiniworkInject'] && mwMiniworkInject.jsemNaZacatkuStranky){
                 mwMiniworkInject.jsemNaZacatkuStranky();
            }
            else{
                this._el = o._getTopLast();
            }
        }

        return this._el;
    },


    scrollTo : function(){
        if(this._el !== null){
            if(this._el instanceof HTMLElement ){
                this._el.scrollIntoView();
            }
            else{
                this._el.parentElement.scrollIntoView();
            }
        }
    },

    _getTopFirst : function(){
        return this._getNextChild(document.body.firstChild);
    },

    _getTopLast : function(){
        return this._getPrevChild(document.body.lastChild);
    },

    _getNextChild : function(el){


        if(el == null){
            return null;
        }

        if(el.nodeType == 1 && !this.isVisible(el)){

            var pp = el.parentNode;
            if(el === pp.lastChild){
                return this._getNextChild(this._getParentNext(pp));
            }

            return this._getNextChild(el.nextSibling);

        }


        if(el.nodeType == 1 && (this._isVideo(el) || this._isImage(el) || this._isButton(el) || this._isLink(el) || this._isIframe(el))){
            return el;
        }

        if(el.childNodes.length > 0 && !this._isScript(el) && !this._isLink(el) && !this._isVideo(el)){
            return this._getNextChild(el.childNodes[0]);
        }

        if(this._isThat(el))
        {
            return el;
        }

        var pp = el.parentNode;
        if(el === pp.lastChild){
            return this._getNextChild(this._getParentNext(pp));
        }

        return this._getNextChild(el.nextSibling);
    },

    _getPrevChild : function(el){

        if(el == null){
            return null;
        }

        if(el.nodeType == 1 && !this.isVisible(el)){

            var pp = el.parentNode;
            if(el === pp.childNodes[0]){
                return this._getPrevChild(this._getParentPrev(pp));
            }

            return this._getPrevChild(el.previousSibling);

        }

        if(el.nodeType == 1 && (this._isVideo(el) || this._isImage(el) || this._isButton(el) || this._isLink(el) || this._isIframe(el))){
            return el;
        }

        if(el.childNodes.length > 0 && !this._isScript(el) && (!this._isLink(el) && !this._isVideo(el))){
            return this._getPrevChild(el.lastChild);
        }

        if(this._isThat(el))
        {
            return el;
        }

        var pp = el.parentNode;
        if(el === pp.childNodes[0]){
            return this._getPrevChild(this._getParentPrev(pp));
        }

        return this._getPrevChild(el.previousSibling);
    },

    _getParentNext : function(el) {


        if(el === document.body){
            return null;
        }

        var next = el.nextSibling;
        if(next != null){
            return next;
        }

        return this._getParentNext(el.parentNode);

    },

    _getParentPrev : function(el) {


        if(el === document.body){
            return null;
        }

        var prev = el.previousSibling;
        if(prev != null){
            return prev;
        }

        return this._getParentPrev(el.parentNode);

    },

    _isThat : function(el){

        if(el == null)
            return false;

        if(/NOSCRIPT/.test(el.nodeName) || /SCRIPT/.test(el.nodeName) || /STYLE/.test(el.nodeName))
            return false;

        if(el.nodeType === 1 && this.isVisible(el)){

            return  !(!el.textContent || /^\s*$/.test(el.textContent))  || this._isImage(el) || this._isVideo(el) || this._isButton(el);
        }
        else if(el.nodeType === 3){
              return !(!el.nodeValue || /^\s*$/.test(el.nodeValue));
        }

        return false;

    },

    _isScript: function(el){
        return /NOSCRIPT/.test(el.nodeName) || /SCRIPT/.test(el.nodeName) || /STYLE/.test(el.nodeName);
    },

    getFastNavNextChildText : function(){


        try{

            this.restoreStyle();
            this._el = this._getNextChild(this._el);
            this.highlightStyle();
            this.setBufferText(this.getText(), 1);

        }catch(ex){}

        if(this._el === null){
            return "";
        }

        this.scrollTo();
        var v = this.getBufferedText(1);

       return v == null ? this.getNextText() : v;
    },

    getFastNavNextText : function() {

        this.getFastNavNext();
        this.scrollTo();

        return this._el.innerText.replace(/\s\s+/g,' ');
    },

    getFastNavNext : function() {

        this.restoreStyle();

        var e = document.body;
        if(this._el === null){
            this._el = document.body;
            e =  this.__getFastNavNext(this._el);
        }
        else{

            if(this._el.nextElementSibling){
                e = this.__getFastNavNext(this._el.nextElementSibling);
            }
            else{
                e = this.__getFastNavNextParent(this._el);

                if(e != null){
                    e = this.__getFastNavNext(e);
                }
            }

        }

        if(e == null){
            e = document.body;
        }

        if(e == this._el){
            e = document.body.firstChild;
        }

        this._el = e;
        this.highlightStyle();
        return this._el;

    },

    getFastNavPrevText : function() {

        this.getFastNavPrev();
        this.scrollTo();

        return this._el.innerText.replace(/\s\s+/g,' ');
    },

    getFastNavPrev : function() {

        this.restoreStyle();

        var e = document.body;
        if(this._el === null){
            this._el = document.body;
            e =  this.__getFastNavPrev(this._el);
        }
        else{

            if(this._el.previousElementSibling){
                e = this.__getFastNavPrev(this._el.previousElementSibling);
            }
            else{
                e = this.__getFastNavPrevParent(this._el);

                if(e != null){
                    e = this.__getFastNavPrev(e);
                }
            }

        }

        if(e == null){
            e = document.body;
        }

        if(e == this._el){
            e = document.body.lastChild;
        }
        this._el = e;
        this.highlightStyle();
        return this._el;

    },

    __getFastNavNext : function(el){

        if(this.__isFastNavElement(el)){
            return el;
        }
        else if(el.childElementCount > 0){
            return this.__getFastNavNext(el.firstElementChild);
        }
        else if (el.nextElementSibling) {
            return this.__getFastNavNext(el.nextElementSibling);
        }

        var e = this.__getFastNavNextParent(el);

        if(e == null){
            return null;
        }

        return this.__getFastNavNext(e);
    },

    __getFastNavPrev : function(el){

        if(this.__isFastNavElement(el)){
            return el;
        }
        else if(el.childElementCount > 0){
            return this.__getFastNavPrev(el.lastElementChild);
        }
        else if (el.previousElementSibling) {
            return this.__getFastNavPrev(el.previousElementSibling);
        }

        var e = this.__getFastNavPrevParent(el);

        if(e == null){
            return null;
        }

        return this.__getFastNavPrev(e);
    },

    __getFastNavNextParent : function(el){

        if(document.body == el){
            return null;
        }

        var p = el.parentElement;
        if(p == null){
            return null;
        }

        if(p.nextElementSibling){
            return p.nextElementSibling;
        }

        return this.__getFastNavNextParent(p);
    },

    __getFastNavPrevParent : function(el){

        if(document.body == el){
            return null;
        }

        var p = el.parentElement;
        if(p === null){
            return null;
        }

        if(p.previousElementSibling){
            return p.previousElementSibling;
        }

        return this.__getFastNavPrevParent(p);
    },

    __isFastNavElement : function(el){
        return el && (/H[1-2]/.test(el.tagName));
    },


};

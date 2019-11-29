class InitGrep {
    hasMenuOpacityEnabled = false;
    hoveredIn = false;

    updateScrollChangeEvents() {

        document.addEventListener(
            "scroll",
            () => {
                console.log("onscroll called");
                const scrollTop =
                    document.documentElement["scrollTop"] || document.body["scrollTop"];
                const scrollBottom =
                    (document.documentElement["scrollHeight"] ||
                        document.body["scrollHeight"]) - document.documentElement.clientHeight;
                const scrollPercent = scrollTop / scrollBottom * 100;
                const scrollPercentString = scrollTop / scrollBottom * 100 + "%";

                //    console.log("scrolltop ",scrollTop);
                //    console.log("scrollBottom ",scrollBottom, scrollPercent);

                this.updateProgressScrollBar(scrollPercentString);
                this.changeMenuOpacityOnScroll(scrollTop);
            },
            { passive: true }
        );
    }

    updateProgressScrollBar(scrollPercent) {
        document
            .getElementById("progress")
            .style.setProperty("--scroll", scrollPercent);
    }

    changeMenuOpacityOnScroll(scrollPercent) {
        if (scrollPercent >= 500 && !this.hasMenuOpacityEnabled) {
            console.log("add the opacity");
            this.hasMenuOpacityEnabled = true;
            $('.menu-component').addClass('scroll-opactity');
        }
        if (scrollPercent < 500 && this.hasMenuOpacityEnabled) {
            this.hasMenuOpacityEnabled = false;
            console.log("remove the opacity");
            $('.menu-component').removeClass('scroll-opactity');
        }
    }

    changeMenuOpactiyOnHover() {
        $('.menu-component').hover(
            () => {
                if (this.hasMenuOpacityEnabled) {
                    $('.menu-component').removeClass('scroll-opactity');
                    this.hasMenuOpacityEnabled = false;
                    this.hoveredIn = true;
                }
            },
            () => {
                if (!this.hasMenuOpacityEnabled && this.hoveredIn) {
                    $('.menu-component').addClass('scroll-opactity');
                    this.hasMenuOpacityEnabled = true;
                    this.hoveredIn = false;
                }
            }
        );
    }

    hideSearchWrapper() {
        // $('.search-overlay').hide();
        $('.search-overlay').hide();
    }

    hideSettingWrapper() {
        $('.setting-overlay').hide();
    }

    hideBasicOverlay() {
        $('.basic-overlay').hide();
    }
    openSearchWrapper() {
        $('.search-open-wrapper').click(function () {
            $('.search-overlay').show(300);
            $('.basic-overlay').show(300);
        });
    }
    closeSearchWrapper() {
        $('.close-search-button').click(function () {
            $('.search-overlay').hide(300);
            $('.basic-overlay').hide();
        })
    }

    openSettingWrapper() {
        $('.setting-open-wrapper').click(function () {
            $('.setting-overlay').show();
            $('.basic-overlay').show();
        });
    }
    closeSettingWrapper() {
        $('.close-setting-button').click(function () {
            $('.setting-overlay').hide();
            $('.basic-overlay').hide();
        })
    }

     changeTheme(cssFile, cssLinkIndex, isDark) {
        const oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
        const finalPath = `/assets/style/${cssFile}.css`;
        const newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", finalPath);
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
        this.setTheToggle(isDark);

        newlink.onload = function(){
            console.log("load");
        }


        newlink.onprogress = function(){
            console.log("progress mela");
        }
        

        newlink.onloadstart = function(){
            console.log("load start");
        }


        newlink.onloadend = function(){
            console.log("load end");
        }
    }

    setTheToggle(isDark){
        if(isDark){
            $('#nightSwtich').attr("checked",true);  
            localStorage.setItem("theme", "dark");
        }else{
            $('#nightSwtich').attr("checked",false);
            localStorage.setItem("theme", "light");
        }
    }

    switchTheme(){
        $('#nightSwtich').click(()=>{
            const isChecked = $('#nightSwtich').prop('checked');
            console.log("isChecked = ",isChecked);
            if(isChecked){
                this.changeTheme('dark_theme',0,true);
                
            }else{
                this.changeTheme('light_theme',0, false);
        
            }
        })
    }

    loadThemeOnLoad(){
        const currentTheme = localStorage.getItem("theme");
        if(currentTheme === "dark"){
            // document.body.style.setProperty('background',"#16141a");
            this.changeTheme("dark_theme",0, true);
        }else{
            this.changeTheme("light_theme",0, false); 
        }
        
    }

}


//run scripts below
//run scripts below
$(function(){
    const initgrep = new InitGrep();
    initgrep.loadThemeOnLoad();
    initgrep.updateScrollChangeEvents();
    initgrep.hideBasicOverlay();
    initgrep.hideSearchWrapper();
    initgrep.hideSettingWrapper();
    initgrep.closeSearchWrapper();
    initgrep.openSearchWrapper();
    initgrep.openSettingWrapper();
    initgrep.closeSettingWrapper();
    initgrep.changeMenuOpactiyOnHover();
    initgrep.switchTheme();

});
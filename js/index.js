/**
 * Created by um_brella on 2017/6/5.
 */
//地鼠随机出现
// 地鼠的样式
var obj1={width:65,top:81,left:62,display:"block"};
var obj2={width:65,top:73,left:166,display:"block"};
var obj3={width:65,top:81,left:286,display:"block"};
var obj4={width:65,top:74,left:391,display:"block"};
var obj5={width:65,top:74,left:493,display:"block"};
var obj6={width:82,top:177,left:70,display:"block"};
var obj7={width:82,top:177,left:211,display:"block"};
var obj8={width:82,top:174,left:362,display:"block"};
var obj9={width:82,top:177,left:502,display:"block"};
var obj10={width:109,top:284,left:88,display:"block"};
var obj11={width:109,top:284,left:263,display:"block"};
var obj12={width:109,top:280,left:451,display:"block"};
var ary=[obj1,obj2,obj3,obj4,obj5,obj6,obj7,obj8,obj9,obj10,obj11,obj12];
//获取元素
var hitHamster=document.getElementById("hitHamster");
var hamster=document.getElementById("hamster");
var header=document.getElementById("header");
var startGame=header.getElementsByTagName("input")[0];
var stopGame=header.getElementsByTagName("input")[1];
var formTabel=header.getElementsByTagName("form")[0];
var scoreVal=formTabel.getElementsByTagName("input")[0];
var selectedVal=formTabel.getElementsByTagName("input")[1];
var countdownVal=formTabel.getElementsByTagName("input")[2];
var value=0;
var seconds=60;
var selected=0;
var all=0;
var startv=1;

var offset=public.offset(hitHamster);
//点击开始游戏事件
startGame.onclick=function () {
    value=0;
    seconds=60;
    selected=0;
    all=1;
    scoreVal.value=value;
    selectedVal.value="0%";
    countdownVal.value=seconds+"秒";
    public.css(hamster,ary[Math.round(Math.random()*11)]);
    selectedVal.value=Math.round(selected/startv*10000)/100+"%";
    window.timer=window.setInterval(function () {
        public.css(hamster,ary[Math.round(Math.random()*11)]);
        selectedVal.value=Math.round(selected/all*10000)/100+"%";
        all+=1;
    },2000);
    //倒计时
    window.countdownTimer=window.setInterval(function () {
        seconds-=1;
        countdownVal.value=seconds+"秒";
        //自然结束
        if(seconds===0){
            window.clearTimeout(timer);
            window.clearTimeout(scoreTimer);
            window.clearTimeout(countdownTimer);
            public .css(hamster,{display:"none"});
        }
    },1000);
};
//点击结束游戏事件
stopGame.onclick=function () {
    window.clearTimeout(timer);
    window.clearTimeout(scoreTimer);
    window.clearTimeout(countdownTimer);
    public .css(hamster,{display:"none"});
};
//鼠标划入显示锤子
function movehammer(hammer,e) {
    var l=e.clientX-offset.left-hammer.offsetWidth/2+20;
    var t=e.clientY-offset.top-hammer.offsetHeight/2-7;
    var minL=0,minT=0;
    var maxL=hitHamster.offsetWidth-hammer.offsetWidth;
    var maxT=hitHamster.offsetHeight-hammer.offsetHeight;
    l=l<minL?0:(l>maxL?maxL:l);
    t=t<minT?0:(t>maxT?maxT:t);
    public.css(hammer,{left:l,top:t});
}
hitHamster.onmouseenter=function (e) {
    e=e||window.event;
    var hammer=document.createElement("img");
    hammer.src="img/hammer.png";
    hammer.id="hammer";
    this.appendChild(hammer);
    movehammer(hammer,e);
    public .css(this,{cursor: 'none'});
};
hitHamster.onmousemove=function (e) {
    e=e||window.event;
    var hammer=document.getElementById("hammer");
    if(hammer){
        movehammer(hammer,e);
        var leftHamster=public.css(hamster,"left");
        var topHamster=public.css(hamster,"top");
        if((leftHamster<e.clientX-offset.left&&e.clientX-offset.left<(leftHamster+hammer.offsetWidth))&&(topHamster<e.clientY-offset.top&&e.clientY-offset.top<(topHamster+hammer.offsetHeight))){
            hammer.onclick=function () {
                var score=document.getElementById("score");
                if (score){
                    hitHamster.removeChild(score);
                }
                scoreHave();
            }
        }
    }
};
hitHamster.onmouseleave=function () {
    var hammer=document.getElementById("hammer");
    if(hammer){
        this.removeChild(hammer);
    }
};
//锤子砸中显示分数，图像消失
function scoreHave() {
    value+=5;
    selected+=1;
    var leftHamster=public.css(hamster,"left");
    var topHamster=public.css(hamster,"top");
    public .css(hamster,{display:"none"});
    var score=document.createElement("p");
    score.id="score";
    score.innerText="恭喜+5分";
    public.css(score,{left:leftHamster+5,top:topHamster,display:"block"});
    window.scoreTimer=setTimeout(function () {
        public.css(score,{display:"none"});
    },800);
    hitHamster.appendChild(score);
    scoreVal.value=value;
}




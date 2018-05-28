/* Created by Cobbler on 2018/4/18 */

const re = require('./re');
//const $pattern = /\<ul\s+class=\"liveGiftEffectList\"\>.*?\<div\s+.*?data-product=\"(.*?)\".*?data-dmid=\"(.*?)\".*?\<p\s+class=\"name\"\>(.*?)\<\/p\>.*?\<p\s+class=\"text\"\>(.*?)\<\/p\>/g;
// const $pattern = /\<ul.*?liveGiftEffectList\>.*?\<div.*?data-product="(.*?)".*?data-dmid="(.*?)".*?\<p class=\"name\"\>(.*?)\<\/p\>.*?\<p class=\"text\"\>(.*?)\<\/p\>.*?\<\/ul\>/g;
const str = `<ul class="liveGiftEffectList">
    <li class="liveGiftEffectItem first">
        <div id="giftmsg-599117893-1450927910" class="giftEffectWrap clearfix price-0-49 little-gift current"
             data-user="599117893" data-product="1450927910" data-dmid="599117893"
             data-token="5f814d011056be7add0d19989516c451" data-timestamp="1523498938729" style="opacity: 1; left: 0px;"
             data-timeout="7935">
            <div class="userBox" data-id="599117893">
                <img class="userImg"
                     src="https://img.momocdn.com/album/F7/D8/F7D848B8-3C26-D88D-B026-C596C76C4EBA20180330_S.jpg">
                <div class="content">
                    <p class="name">专治牛皮癣、青春痘皮肤病</p>
                    <p class="text">赠送了 <span>掌声</span></p>
                </div>
            </div>
            <div class="giftBox" data-id="1450927910">
                <img class="giftImg"
                     src="https://img.momocdn.com/live/50/54/505436A5-75F6-12E3-1708-8C5E6730152320171012_S.png">
                <p class="giftCount">x1</p>
            </div>
        </div>
    </li>
    <li class="liveGiftEffectItem second">
    </li>
    <li class="liveGiftEffectItem third">
    </li>
</ul>`;

const result = re(str);
console.log(result[1]);
console.log(result[2]);
console.log(result[3]);
console.log(result[4]);



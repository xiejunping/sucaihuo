const re = function(str) {
    const $pattern = /\<ul\s+class=\"liveGiftEffectList\"\>.*?\<div\s+.*?data-product=\"(.*?)\".*?data-dmid=\"(.*?)\".*?\<p\s+class=\"name\"\>(.*?)\<\/p\>.*?\<p\s+class=\"text\"\>(.*?)\<\/p\>/g;
    const htmlToStr = str.replace(/\n/g, '');

    return $pattern.exec(htmlToStr);
}

module.exports = re;
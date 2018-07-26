

var utils = {
    getTurnCardIndex: function (tn, an, bn) {
        var arr = [];

        if (typeof tn !== 'number') return;
        if (typeof an !== 'number') return;
        if (typeof bn !== 'number') return;
        if (tn < 0 || tn > 8) return;
        if (an > tn || bn > tn) return;

        switch (tn) {
            case 1:
                arr = [0];
                break;
            case 2:
                arr = [0, 1];
                break;
            case 3:
                arr = [0, 2, 1];
                break;
            case 4:
                arr = [0, 2, 1, 3];
                break;
            case 5:
                arr = [0, 2, 4, 1, 3];
                break;
            case 6:
                arr = [0, 2, 4, 1, 5, 3];
                break;
            case 7:
                arr = [0, 6, 2, 4, 1, 5, 3];
                break;
            case 8:
                arr = [0, 6, 2, 4, 1, 5, 3, 7];
                break;
        }

        var index = arr.concat(arr).indexOf(an);
        var turnArr = arr.concat(arr).slice(index);

        return turnArr.indexOf(bn);
    }
}

console.log(utils.getTurnCardIndex(8, 0, 4));
console.log(utils.getTurnCardIndex(8, 7, 0));
console.log(utils.getTurnCardIndex(8, 3, 0));
console.log(utils.getTurnCardIndex(8, 6, 0));
console.log(utils.getTurnCardIndex(8, 1, 0));
console.log(utils.getTurnCardIndex(8, 0, 0));
console.log(utils.getTurnCardIndex(8, 0, 7));

console.log(utils.getTurnCardIndex(2, 0, 3));
console.log(utils.getTurnCardIndex(2, 0, 1));
console.log(utils.getTurnCardIndex(3, 1, 2));
console.log(utils.getTurnCardIndex(4, 0, 3));
console.log(utils.getTurnCardIndex(4, 3, 0));

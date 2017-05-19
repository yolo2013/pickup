// 原出发点：
// 在 109876543219876543210 中间加上 + 号，使得最终表达式的值为2017

var str = '109876543219876543210'

var array = []

for(let i = 0; i < '109876543219876543210'.length - 1; i++) {
    array.push(i + 1)
}

for(let i = 8; i < array.length - 2; i++) {

    var ret = groupSplit(array, i)

    ret.forEach(function(item) {

        let total = 0

        for(let j = 0; j < item.length; j++) {
            if(total > 2017) {
                break
            }
            if(j === 0) {
                total += parseInt(str.substring(0, item[j]))
            } else if(j === item.length - 1) {
                total += parseInt(str.substring(item[j - 1], str.length))
            } else {
                total += parseInt(str.substring(item[j - 1], item[j]))
            }
        }

        if(total === 2017) {
            console.log(item.join('，'))
        }
    })
}

function groupSplit (arr, size) {
    var r = []; //result

    function _(t, a, n) { //tempArr, arr, num
        if (n === 0) {
            var flag = true
            for(var i = 0; i < t.length; i++) {

                if(i === 0 && t[i] > 4) {
                    flag = false
                    break
                }

                if(t[i] - t[i - 1] > 4) {
                    flag = false
                    break
                }
            }

            if(flag) {
                r[r.length] = t;
            }

            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }
    _([], arr, size);
    return r;
}
// 原出发点：
// 把 how are you 处理成 you are how ，并尽量少（甚至没有）的分配堆内存

// 这个代码的可阅读性并不好，只是为了只使用若干个栈空间，完成字符串的翻转，
// 实际几乎没有使用场景

let str = 'how are you'

// function index(str) {
  let temp, i, j, base, len

  // 整体翻转
  // 'how are you' => 'uoy era woh'
  for (i = 0, len = str.length; i < len / 2; i++) {
    temp = str.charAt(i)
    str = str.substring(0, i) + str.charAt(len - i - 1) + str.substring(i + 1)
    str = str.substring(0, len - i - 1) + temp + str.substring(len - i)
  }

  // 再根据空格局部反转
  // 'uoy' => 'you'
  for (j = 0, i = 0, len = 0; j < str.length; j++) {
    if (str.charAt(j) === ' ' || j === str.length - 1) {

      // 记录每个单词的结尾位置
      // 特别处理了最后一个单词的情况
      len = j === str.length - 1 ? (j + 1) : j

      // 每个单词的起始位置
      base = i

      for (; (i - base) < (len - base) / 2; i++) {
        temp = str.charAt(i)
        str = str.substring(0, i) + str.charAt(len - i - 1 + base) + str.substring(i + 1)
        str = str.substring(0, len - i - 1 + base) + temp + str.substring(len - i + base)
      }

      i = len + 1
    }
  }

  console.log(str)
// }

// index(str)
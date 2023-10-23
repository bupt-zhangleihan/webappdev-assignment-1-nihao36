const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
  'Rickroll.',
];
// 储存单字列表及目前要输入的单字索引
let words = [];
let wordIndex = 0;
// 开始时间
let startTime = Date.now();
// 网页物件连结
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
// 在 script.js 末端
document.getElementById('start').addEventListener('click',function ()  {
//开启文字框
  typedValueElement.disabled = false;
  // 取得一行引文
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // 将引文分成许多单字，存在矩阵中。
  words = quote.split(' ');
  // 重制单字索引来做追踪
  wordIndex = 0;
  // 更新使用者介面
  // 建立 span 元素的矩阵，设定 class 用。
  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  // 转换成字串并以 innerHTML 显示引文
  quoteElement.innerHTML = spanWords.join('');
  // 标记第一个单字
  quoteElement.childNodes[0].className = 'highlight';
  // 清除讯息栏之前的讯息
  messageElement.innerText = '';
  // 设定文字框
  // 清除文字框
  typedValueElement.value = '';
  // 设定 focus
  typedValueElement.focus();
  // 设定事件驱动程式
  // 开始计时器
  startTime = new Date().getTime();
});
  // 添加代码以在玩家完成引文时关闭文字框
  typedValueElement.addEventListener('input', (e) => {
// 取得目前的单字
const currentWord = words[wordIndex];
// 取得目前输入的数值
const typedValue = typedValueElement.value;
if (typedValue === currentWord && wordIndex === words.length - 1) {
      // 玩家完成了引文，禁用文字框
      typedValueElement.disabled = true;
		const elapsedTime = new Date().getTime() - startTime;
		const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
// 查找当前最短时间记录，更新结束后最短记录
const currentBestTime = localStorage.getItem('bestTime');   
if (!currentBestTime || elapsedTime < currentBestTime) {
  localStorage.setItem('bestTime', elapsedTime);
}
const bestTime = localStorage.getItem('bestTime');
if (bestTime) {
  const bestTimeElement = document.getElementById('bestTime');
  bestTimeElement.innerText = `Best Score: ${bestTime / 1000} seconds`;
}
// 弹出对话框
alert(message);
// 关闭监听器
typedValueElement.removeEventListener('input', () => { });
} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
// end of word
// clear the typedValueElement for the new word
typedValueElement.value = '';
// move to the next word
wordIndex++;
// reset the class name for all elements in quote
for (const wordElement of quoteElement.childNodes) {
  wordElement.className = '';
}
// highlight the new word
quoteElement.childNodes[wordIndex].className = 'highlight';
} else if (currentWord.startsWith(typedValue)) {
// currently correct
// highlight the next word
typedValueElement.className = '';
} else {
  // error state
  typedValueElement.className = 'error';
}
});
import marked from 'marked'
import hljs from 'highlight.js'
// 配置
hljs.configure({
  tabReplace: '    ' // 4 spaces，把tab替换成4个空格
})

marked.setOptions({
  renderer: new marked.Renderer(), // 自定义的方式渲染内容 通过该对象来配置
  gfm: true, // 允许github标准的markdown
  pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  tables: true, // 允许支持表格语法
  breaks: true, // 允许回车换行
  smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
  smartypants: true, // 使用更为时髦的标点，比如在引用语法中加入破折号。
  highlight: (code, lang) => {
    return hljs.highlightAuto(code).value
  }
})

export default marked

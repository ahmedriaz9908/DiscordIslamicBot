exports.check = function check(message, args) {
  if (!args[0]) return "false"
  if (!args[1]) return "false"
  let book = args[1].slice(0, args[1].indexOf(':'));
  if (!book || isNaN(book)) return "false"
  let chapter = args[1].slice(args[1].indexOf(":") + 1);  
  if (chapter.toLowerCase().includes(`-`)) return "false"
  if (!message.content.includes(":")) return "false"
  if (!chapter || isNaN(chapter)) return "false"
  return [chapter, book]
}
  

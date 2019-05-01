exports.check = function check(message, args) {
  
    if (!args[0]) return "false"
    var ayah = args[0].slice(args[0].indexOf(":") + 1);
    if (!ayah) return "false"
    var surah = args[0].slice(0, args[0].indexOf(':'))
    if (!surah) return "false"
    if (isNaN(surah)) return "false"
    if (surah > 114) return "false"
    return [surah, ayah]
}
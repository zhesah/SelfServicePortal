ace.define("ace/mode/lisp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var L=function(){var k="case|do|let|loop|if|else|when";var a="eq|neq|and|or";var c="null|nil";var s="cons|car|cdr|cond|lambda|format|setq|setf|quote|eval|append|list|listp|memberp|t|load|progn";var b=this.createKeywordMapper({"keyword.control":k,"keyword.operator":a,"constant.language":c,"support.function":s},"identifier",true);this.$rules={"start":[{token:"comment",regex:";.*$"},{token:["storage.type.function-type.lisp","text","entity.name.function.lisp"],regex:"(?:\\b(?:(defun|defmethod|defmacro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"},{token:["punctuation.definition.constant.character.lisp","constant.character.lisp"],regex:"(#)((?:\\w|[\\\\+-=<>'\"&#])+)"},{token:["punctuation.definition.variable.lisp","variable.other.global.lisp","punctuation.definition.variable.lisp"],regex:"(\\*)(\\S*)(\\*)"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:b,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"string",regex:'"(?=.)',next:"qqstring"}],"qqstring":[{token:"constant.character.escape.lisp",regex:"\\\\."},{token:"string",regex:'[^"\\\\]+'},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"start"}]}};o.inherits(L,T);e.LispHighlightRules=L;});ace.define("ace/mode/lisp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/lisp_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var L=r("./lisp_highlight_rules").LispHighlightRules;var M=function(){this.HighlightRules=L;this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.lineCommentStart=";";this.$id="ace/mode/lisp";}).call(M.prototype);e.Mode=M;});

ace.define("ace/snippets/drools",["require","exports","module"],function(r,e,m){"use strict";e.snippetText="\nsnippet rule\n	rule \"${1?:rule_name}\"\n	when\n		${2:// when...} \n	then\n		${3:// then...}\n	end\n\nsnippet query\n	query ${1?:query_name}\n		${2:// find} \n	end\n	\nsnippet declare\n	declare ${1?:type_name}\n		${2:// attributes} \n	end\n\n";e.scope="drools";});

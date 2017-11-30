#!/usr/bin/env node

//developer note: log to `stderr` to display in terminal without wrecking stream

const pandoc = require('pandoc-filter');
const Prism = require('prismjs');

//need to explicitly include any languages used. Default included are:
//[ 'clike', 'css', 'html', 'javascript', 'js', 'markup', 'mathml', 'svg', 'xml' ]
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-json');
require('prismjs/components/prism-java');


/**
 * Transformation method applied to each element handled by pandoc (organized in a JSON tree).
 * See: https://github.com/mvhenderson/pandoc-filter-node/blob/master/index.js
 * 
 * To view the JSON interpretation of a Markdown file, use:
 *    pandoc -s file.md -t json
 *    
 * @argument type - A string of the "type" of element (e.g., `Str`, `Para`, `CodeBlock`). 
 *    See https://github.com/jgm/pandoc-types/blob/master/Text/Pandoc/Definition.hs#L94 
 *    for complete list
 * @argument content - the JSON formatted content. Often an array. For `CodeBlock`,
 *    is an array of two elements: ["",["lang"],[]] and the body of the code block
 * @argument format - Specified output format (e.g., `html`)
 * @argument meta - Document metadata
 * 
 * @returns `undefined` if the element should not be modified, or an Object representing
 *    the parsed element. Object should have format 
 *    {
 *      t: 'Type' //type of element; 
 *      c: [] //array of content elements (e.g., lines)
 *    }
 */
function action(type,content,format,meta) {
  //if(type !== 'html') return; //only apply to HTML?

  //could handle inline 'Code' elements here...

  if(type === 'CodeBlock'){
    let lang = content[0][1][0]; //extract language
    let code = content[1]; //extract codeblock body

    //console.error(lang); 
  
    if(lang) { //if language is defiend
      let highlighted = Prism.highlight(code, Prism.languages[lang]);
      //console.error(highlighted); 
      //console.error('=============================');   
  
      return { //construct object
        t: 'RawBlock', //raw html (so not escaped)
        c: ['html', `<pre class="language-${lang}"><code>${highlighted}</code></pre>`]
      }  
    } 
    //otherwise, just let it pass through (this will escape HTML characters)

    //example passthroughs:
    //return {t:type,c:content};
    //return pandoc.CodeBlock(...content); (send both parts as separate args)
    //return undefined;
  }
}

//run the action on the input stream
pandoc.stdio(action);

//Note that the `.css` stylesheet will need to be added separately

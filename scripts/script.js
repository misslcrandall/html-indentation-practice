const htmlCodeEditor = document.getElementById("htmlCode");
const previewWindow = document.getElementById("previewWindow").contentWindow.document;

function runEditor() {
    // Open the iframe document to rewrite its contents
    previewWindow.open();
    
    // Inject structural HTML elements, custom styles, and execution scripts
    previewWindow.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="css/iframe-styles.css">
        </head>
        <body>
            ${htmlCodeEditor.value}
        </body>
        </html>
    `);
    
    // Close the document stream to finalize parsing
    previewWindow.close();
}

function handleIndent(e) {
    if (e.key === 'Tab') {
        e.preventDefault(); // Stop focus change
    
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const value = this.value;
    
        // Find the start of the first selected line
        const startLinePos = value.lastIndexOf('\n', start - 1) + 1;
        // Find the end of the last selected line
        let endLinePos = value.indexOf('\n', end);
        if (endLinePos === -1) endLinePos = value.length;
    
        // Isolate the text of the selected lines
        const targetText = value.substring(startLinePos, endLinePos);
        const lines = targetText.split('\n');
        
        let updatedText = '';
        let startOffset = 0;
        let endOffset = 0;
    
        if (e.shiftKey) {
          // --- SHIFT + TAB: Unindent Lines ---
          const processedLines = lines.map((line, index) => {
            // Match up to 4 leading spaces
            const match = line.match(/^ {1,4}/);
            if (match) {
              const removedLength = match[0].length;
              
              // Adjust selection boundaries based on removed spaces
              if (index === 0) startOffset -= removedLength;
              endOffset -= removedLength;
              
              return line.substring(removedLength);
            }
            return line;
          });
          updatedText = processedLines.join('\n');
        } else {
          // --- TAB: Indent Lines ---
          const processedLines = lines.map((line, index) => {
            // Adjust selection boundaries based on added spaces
            if (index === 0) startOffset += 4;
            endOffset += 4;
            
            return '    ' + line;
          });
          updatedText = processedLines.join('\n');
        }
    
        // Update the textarea value
        this.value = value.substring(0, startLinePos) + updatedText + value.substring(endLinePos);
    
        // Restore the selection perfectly
        this.selectionStart = Math.max(startLinePos, start + startOffset);
        this.selectionEnd = end + endOffset;
    }
}

//Run Functions 
document.addEventListener('DOMContentLoaded', () => {
    //Remove initial indentation from HTML
    htmlCodeEditor.value = htmlCodeEditor.value.replace(/^[\t ]+/gm, '');
    //Display Content on Initial Load
    runEditor();
    //Watch for changes
    htmlCodeEditor.addEventListener("keyup", runEditor);
    htmlCodeEditor.addEventListener('keydown', handleIndent);
});
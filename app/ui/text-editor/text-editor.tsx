'use client'
import { useEffect } from "react";

interface textAreaProps {
  value: string; // Required string
  onChange: (e: any) => void;  // Function taking no arguments
  onKeyDown: (e: any) => void;  // Function taking no arguments
}

export default function TextEditor({ value, onChange, onKeyDown }: textAreaProps) {

    useEffect(() => {
        const handleIndent = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLTextAreaElement) {
                if (e.key === 'Tab') {
                    e.preventDefault(); // Stop focus change
                
                    const start = e.target.selectionStart;
                    const end = e.target.selectionEnd;
                    const value = e.target.value;
                
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
                    e.target.value = value.substring(0, startLinePos) + updatedText + value.substring(endLinePos);
                
                    // Restore the selection perfectly
                    e.target.selectionStart = Math.max(startLinePos, start + startOffset);
                    e.target.selectionEnd = end + endOffset;
                }
            }
        };

        // Add listener on mount
        window.addEventListener("keydown", handleIndent);

        // Clean up listener on unmount to prevent memory leaks
        return () => {
        window.removeEventListener("keydown", handleIndent);
        };
    }, []);

    return (
        <textarea 
            defaultValue={value.replace(/^[\t ]+/gm, '')} 
            onChange={onChange} 
            onKeyDown={onKeyDown} 
        />
    );
}

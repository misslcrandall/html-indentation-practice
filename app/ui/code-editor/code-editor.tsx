'use client'
import styles from './code-editor.module.scss';
import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import ClientLinter from '@/app/ui/linter-errors/linter-errors';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap' 
});

export default function CodeEditor({ challengeSolved, codeBlock }) {
    const [content, setContent] = useState(codeBlock);
    const [debouncedContent, setDebouncedContent] = useState(codeBlock);
    
    useEffect(() => {
        if (codeBlock) {
            setContent(codeBlock);
            setDebouncedContent(codeBlock);
        }
    }, [codeBlock]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedContent(content);
        }, 400); // 400ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [content]);

    const iframeSetup = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                html{
                    background-color: #AEC8D0;
                    color: #081A1E;
                    padding: 20px;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            ${debouncedContent}
        </body>
        </html>
    `;

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function handleEditorChange(value, event) {
        setContent(value ?? '');
    }

    return(
        <>
            <div className={`${styles.editor}`}>
                <section className="editor-row__input"> 
                    <Editor
                        height="300px"
                        defaultLanguage="html"
                        value={content}
                        theme="vs-dark"
                        onChange={handleEditorChange}
                        onMount={handleEditorDidMount}
                        options={{
                            wordWrap: "on",
                            fontSize: 16,
                            minimap: { enabled: false },
                            automaticLayout: true,
                        }}
                    />
                    <ClientLinter 
                        codeInput={content}
                        challengeSolved={challengeSolved}
                    /> 
                </section>
                <section className="editor-row__output">
                    <iframe 
                        id="previewWindow"
                        srcDoc={iframeSetup}
                    />
                </section>
            </div>
        </>
    );
}

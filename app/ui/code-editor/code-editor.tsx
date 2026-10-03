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
                    background-color: #aec8d0;
                    color: #081a1e;
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
                <section className={`${styles.editorRowInput}`}> 
                    <Editor
                        className={styles.editorRowEditor}
                        height="100%"
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
                            padding: { bottom: 30, top: 30 },
                            scrollBeyondLastLine: false,
                        }}
                    />
                    <button onClick={() => setContent(codeBlock)}>Reset Code Editor</button>
                </section>
                <section className={`${styles.editorRowOutput}`}>
                    <iframe 
                        id="previewWindow"
                        srcDoc={iframeSetup}
                    />
                    <div className={`${styles.linter}`}>
                        <ClientLinter 
                            codeInput={content}
                            challengeSolved={challengeSolved}
                        /> 
                    </div>
                </section>
            </div>
        </>
    );
}

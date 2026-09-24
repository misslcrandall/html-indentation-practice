'use client'
import styles from './code-editor.module.scss';
import { useState, useEffect, useRef, forwardRef } from 'react';
import TextEditor from "@/app/ui/text-editor/text-editor";
import ClientLinter from '@/app/ui/linter-errors/linter-errors';

export default function CodeEditor({ challengeSolved, codeBlock }) {
    const [content, setContent] = useState(codeBlock);
    
    useEffect(() => {
        if (codeBlock) {
            setContent(codeBlock);
        }
    }, [codeBlock]);

    const handleInputChange = (e) => {
        if (e.type === 'keydown' && e.key === 'Tab') {
            setContent(e.target.value)
        }

        if (e.type === 'change') {
            setContent(e.target.value)
        }
    };

    return(
        <>
            <div className={styles.editor}>
                <section className="editor-row__input">
                    <TextEditor 
                        value={content} 
                        onChange={handleInputChange}
                        onKeyDown={handleInputChange} 
                    />
                    <ClientLinter 
                        codeInput={content} 
                        onChange={handleInputChange}
                        onKeyDown={handleInputChange} 
                        challengeSolved={challengeSolved}
                    /> 
                </section>
                <section className="editor-row__output">
                    <iframe id="previewWindow" srcDoc={content}></iframe>
                </section>
            </div>
        </>
    );
}

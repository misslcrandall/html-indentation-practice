"use client";

import styles from './linter-errors.module.scss';
import { useEffect } from "react"; // Added useEffect
import { Linter } from "eslint-linter-browserify";
import htmlParser from "@html-eslint/parser";
import htmlPlugin from "@html-eslint/eslint-plugin";

interface TextAreaProps {
  challengeSolved: (solved: boolean) => void;
  codeInput: string;
}

export default function ClientLinter({ codeInput, challengeSolved }: TextAreaProps) {
  const linter = new Linter();

  const messages = linter.verify(codeInput, {
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      html: htmlPlugin,
    },
    rules: {
      "html/require-closing-tags": "error",
      "html/no-duplicate-attrs": "error",
      "html/indent": "error",
    },
  });

  useEffect(() => {
    if (messages.length === 0) {
      challengeSolved(true);
    } else {
      //challengeSolved(false); // Optional: sets back to false if new errors are made
    }
  }, [messages.length, challengeSolved]);

  return (
    <div className="linter">
      <Errors messages={messages} />
    </div>
  );
}

function Errors({ messages }: { messages: any[] }) {
  if (messages.length === 0) {
    return <h2>Errors Resolved!</h2>;
  }

  return (
    <details open className={styles.errorDisplay}>
        <summary>
          <h2>{messages.length} Errors</h2>
        </summary>
        {messages.map((message, index) => (
          <div key={index}>
            Line {message.line}, column {message.column}: {message.message}
          </div>
        ))}
    </details>
  );
}

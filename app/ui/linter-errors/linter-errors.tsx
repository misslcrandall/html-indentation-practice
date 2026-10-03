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
      "html/no-skip-heading-levels": "error",
      "html/indent": "error",
      "html/require-li-container": "error",
      "html/no-multiple-h1": "error"
    },
  });

  useEffect(() => {
    if (messages.length === 0) {
      challengeSolved(true);
    } else {
      challengeSolved(false); // Sets back to false if new errors are made
    }
  }, [messages.length, challengeSolved]);

  return (
    <Errors messages={messages} />
  );
}

function Errors({ messages }: { messages: any[] }) {
  if (messages.length === 0) {
    return (
      <div className={styles.errorsResolved}>
          <h2>Errors Resolved!</h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">{/*!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.*/}<path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
      </div>
    )
  }

  return (
    <details className={styles.errorDisplay}>
        <summary>
          <h2>{messages.length} Errors</h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            {/*!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.*/}
            <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z"/></svg>
        </summary>
        <div className={styles.errorList}>
          {messages.map((message, index) => (
            <div key={index}>
              Line {message.line}, column {message.column}: {message.message}
            </div>
          ))}
        </div>
    </details>
  );
}

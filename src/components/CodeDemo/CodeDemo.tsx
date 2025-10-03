import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import sampleOutputRaw from "../../content/overview_blurb.txt?raw";
import pythonCodeRaw from "../../content/overview_snippet.py?raw";
import styles from "./CodeDemo.module.css";

const pythonCode = pythonCodeRaw;
const sampleOutput = sampleOutputRaw.trim();

interface CodeDemoProps {
  className?: string;
}

const CodeDemo: React.FC<CodeDemoProps> = ({ className }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = sampleOutput.split(" ");

  const handleRun = () => {
    if (isRunning) return;

    setIsRunning(true);
    setOutput("");
    setCurrentWordIndex(0);
  };

  useEffect(() => {
    if (!isRunning || currentWordIndex >= words.length) {
      if (currentWordIndex >= words.length) {
        setIsRunning(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      const newWord = words[currentWordIndex];
      setOutput((prev) => prev + (prev ? " " : "") + newWord);
      setCurrentWordIndex((prev) => prev + 1);
    }, 150); // Adjust speed here (milliseconds between words)

    return () => clearTimeout(timer);
  }, [isRunning, currentWordIndex, words]);

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleClear = () => {
    setOutput("");
    setCurrentWordIndex(0);
    setIsRunning(false);
  };

  return (
    <div className={`${styles.editorContainer} ${className || ""}`}>
      {/* Left Pane - Code Editor */}
      <div className={styles.codePane}>
        <div className={styles.codeHeader}>
          <span className={styles.filename}>overview.py</span>
          <div className={styles.controls}>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`${styles.runButton} ${
                isRunning ? styles.disabled : ""
              }`}
            >
              {isRunning ? (
                <>
                  <div className={styles.spinner}></div>
                  Running...
                </>
              ) : (
                <>
                  <svg
                    className={styles.playIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Run Code
                </>
              )}
            </button>
            {isRunning && (
              <button onClick={handleStop} className={styles.stopButton}>
                Stop
              </button>
            )}
            <button onClick={handleClear} className={styles.clearButton}>
              Clear
            </button>
          </div>
        </div>

        <div className={styles.codeContainer}>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLongLines={true}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: "transparent",
              fontSize: "14px",
              fontFamily:
                'Fira Code, Monaco, Consolas, "Courier New", monospace',
            }}
          >
            {pythonCode}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Right Pane - Output */}
      <div className={styles.outputPane}>
        <div className={styles.outputHeader}>
          <span className={styles.outputTitle}>Output</span>
          <div className={styles.outputControls}>
            <div
              className={`${styles.statusIndicator} ${
                isRunning ? styles.running : styles.idle
              }`}
            >
              {isRunning ? "Generating..." : "Ready"}
            </div>
          </div>
        </div>
        <div className={styles.outputContainer}>
          <div className={styles.outputContent}>
            {output}
            {isRunning && <span className={styles.cursor}>|</span>}
          </div>
          {!output && !isRunning && (
            <div className={styles.placeholder}>
              Click "Run Code" to see the LLM generate a response...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { CodeDemo };

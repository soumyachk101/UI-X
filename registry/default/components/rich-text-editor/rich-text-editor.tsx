"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  className?: string;
}

function RichTextEditor({
  content = "",
  onChange,
  className,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  React.useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const toolbarBtn =
    "inline-flex size-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  return (
    <div className={cn("rounded-lg border border-border shadow-sm", className)}>
      <div className="flex items-center gap-0.5 border-b border-border p-1">
        <button
          type="button"
          onClick={() => exec("bold")}
          aria-label="Bold"
          className={cn(toolbarBtn, "font-bold")}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          aria-label="Italic"
          className={cn(toolbarBtn, "italic")}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => exec("underline")}
          aria-label="Underline"
          className={cn(toolbarBtn, "underline")}
          title="Underline"
        >
          U
        </button>
        <div className="mx-1 h-5 w-px bg-border" />
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          aria-label="Bullet list"
          className={toolbarBtn}
          title="Bullet list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleChange}
        role="textbox"
        aria-multiline
        className="min-h-32 w-full rounded-b-lg bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };

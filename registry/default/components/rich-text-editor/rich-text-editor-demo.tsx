"use client";

import * as React from "react";
import { RichTextEditor } from "./rich-text-editor";

export default function RichTextEditorDemo() {
  const [content, setContent] = React.useState("");

  return (
    <div className="w-full max-w-2xl">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Rich text editor
      </label>
      <RichTextEditor
        content={content}
        onChange={setContent}
      />
      {content && (
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-muted-foreground">
            View HTML output
          </summary>
          <pre className="mt-1 max-h-32 overflow-auto rounded-md bg-muted p-2 text-xs">
            {content}
          </pre>
        </details>
      )}
    </div>
  );
}

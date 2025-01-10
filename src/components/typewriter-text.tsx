"use client";

import { useEffect, useState, useCallback } from "react";

import { cn } from "@/lib/utils";

interface TypewriterTextProps extends Partial<TypewriterOptions> {
  className?: string;
  texts: string[];
}

export function TypewriterText({
  className,
  texts,
  ...options
}: TypewriterTextProps) {
  const [text, setText] = useState("");
  const [typewriter] = useState(
    new Typewriter(
      texts,
      (text) => {
        setText(text);
      },
      options,
    ),
  );

  useEffect(() => {
    typewriter.start();
  }, []);

  return (
    <div className={cn("flex flex-wrap", className)}>
      <span>{text}</span>

      {/* Cursor */}
      <span className="cursor-blink">|</span>
    </div>
  );
}

interface TypewriterOptions {
  typeLetterDelay: number;
  deleteLetterDelay: number;
  pauseDuration: number;
}

const defaultOptions: TypewriterOptions = {
  typeLetterDelay: 80,
  deleteLetterDelay: 40,
  pauseDuration: 2000,
};

class Typewriter {
  #texts: string[] = [];
  #onUpdateText?: (text: string) => void;
  #options: TypewriterOptions;

  #textIndex: number = 0;
  #letterIndex: number = 0;
  #typedText: string = "";

  constructor(
    texts: string[],
    onUpdateText?: (text: string) => void,
    options?: Partial<TypewriterOptions>,
  ) {
    if (texts.length === 0) {
      throw new Error("no texts provided");
    }

    this.#texts = texts;
    this.#onUpdateText = onUpdateText;

    // Resolve options
    this.#options = {
      ...defaultOptions,
      ...options,
    };
  }

  start() {
    this.type();
  }

  private type() {
    setTimeout(() => {
      // Increment the letter index
      this.#letterIndex++;

      // Get the current text to type
      const text = this.#texts[this.#textIndex];

      // Check if the end of the text is reached
      if (this.#letterIndex >= text.length) {
        // Pause for a while before deleting
        setTimeout(() => {
          this.delete();
        }, this.#options.pauseDuration);

        return;
      }

      // Type the letter
      this.#typedText = text.slice(0, this.#letterIndex + 1);

      // Invoke the callback
      this.#onUpdateText?.(this.#typedText);

      // Continue typing
      this.type();
    }, this.#options.typeLetterDelay);
  }

  private delete() {
    setTimeout(() => {
      // Decrement the letter index
      this.#letterIndex--;

      // Get the current text to type
      const text = this.#texts[this.#textIndex];

      // Check if the text is deleted
      if (this.#letterIndex < 0) {
        // Update the text index
        this.#textIndex = (this.#textIndex + 1) % this.#texts.length;

        // Start typing
        this.type();

        return;
      }

      // Delete the letter
      this.#typedText = text.slice(0, this.#letterIndex);

      // Invoke the callback
      this.#onUpdateText?.(this.#typedText);

      // Continue deleting
      this.delete();
    }, this.#options.deleteLetterDelay);
  }
}

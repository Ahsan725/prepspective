/* eslint-enable @typescript-eslint/no-explicit-any */

export class SpeechRecognition extends EventTarget {
  continuous: boolean = false;
  interimResults: boolean = false;
  lang: string = 'en-US';
  onstart: (() => void) | null = null;
  onresult: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  onend: (() => void) | null = null;

  start() {}
  stop() {}
  abort() {}
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
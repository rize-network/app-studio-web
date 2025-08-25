interface MediaRecorderEventMap {
  dataavailable: BlobEvent;
  pause: Event;
  resume: Event;
  start: Event;
  stop: Event;
  error: MediaRecorderErrorEvent;
}

declare class MediaRecorder extends EventTarget {
  readonly mimeType: string;
  readonly state: 'inactive' | 'recording' | 'paused';
  readonly stream: MediaStream;
  ignoreMutedMedia: boolean;
  videoBitsPerSecond: number;
  audioBitsPerSecond: number;

  constructor(stream: MediaStream, options?: MediaRecorderOptions);

  start(timeslice?: number): void;
  stop(): void;
  pause(): void;
  resume(): void;
  requestData(): void;

  static isTypeSupported(type: string): boolean;

  ondataavailable: ((this: MediaRecorder, ev: BlobEvent) => any) | null;
  onpause: ((this: MediaRecorder, ev: Event) => any) | null;
  onresume: ((this: MediaRecorder, ev: Event) => any) | null;
  onstart: ((this: MediaRecorder, ev: Event) => any) | null;
  onstop: ((this: MediaRecorder, ev: Event) => any) | null;
  onerror: ((this: MediaRecorder, ev: MediaRecorderErrorEvent) => any) | null;

  addEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

interface MediaRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
  bitsPerSecond?: number;
}

interface MediaRecorderErrorEvent extends Event {
  readonly error: DOMException;
}

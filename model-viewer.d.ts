// Type definitions for <model-viewer> web component
// https://modelviewer.dev/

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

interface ModelViewerJSX {
  src?: string;
  poster?: string;
  alt?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'ar-scale'?: string;
  autoplay?: boolean;
  'auto-rotate'?: boolean;
  'auto-rotate-delay'?: number;
  'camera-controls'?: boolean;
  'camera-orbit'?: string;
  'camera-target'?: string;
  'disable-pan'?: boolean;
  'disable-tap'?: boolean;
  'disable-zoom'?: boolean;
  'environment-image'?: string;
  exposure?: string;
  'field-of-view'?: string;
  'interaction-policy'?: string;
  'interaction-prompt'?: string;
  'interaction-prompt-style'?: string;
  'interaction-prompt-threshold'?: number;
  loading?: 'auto' | 'lazy' | 'eager';
  'max-camera-orbit'?: string;
  'max-field-of-view'?: string;
  'min-camera-orbit'?: string;
  'min-field-of-view'?: string;
  'shadow-intensity'?: string;
  'shadow-softness'?: string;
  skybox?: boolean;
  'skybox-image'?: string;
  reveal?: 'auto' | 'interaction' | 'manual';
  touchAction?: string;
}

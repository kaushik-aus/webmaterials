declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        poster?: string;
        ar?: boolean;
        autoplay?: boolean;
        "camera-controls"?: boolean;
        exposure?: string;
        "shadow-intensity"?: string;
      },
      HTMLElement
    >;
  }
}

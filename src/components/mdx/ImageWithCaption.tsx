interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageWithCaption({ src, alt, caption }: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="rounded-lg w-full"
        loading="lazy"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
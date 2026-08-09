"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
  type WheelEvent,
} from "react";

type ProductGalleryProps = {
  name: string;
  images: string[];
  soldOut?: boolean;
  badge?: string;
};

export function ProductGallery({
  name,
  images,
  soldOut = false,
  badge,
}: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const multi = images.length > 1;
  const current = images[index] ?? images[0];

  function go(next: number) {
    if (!multi) return;
    const len = images.length;
    setIndex(((next % len) + len) % len);
  }

  function onMediaClick() {
    if (!multi) return;
    go(index + 1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!multi) return;
    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  function onTouchStart(event: TouchEvent) {
    touchX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    if (touchX.current == null || !multi) return;
    const endX = event.changedTouches[0]?.clientX ?? touchX.current;
    const delta = endX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) < 40) return;
    go(delta < 0 ? index + 1 : index - 1);
  }

  function onWheel(event: WheelEvent) {
    if (!multi) return;
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    event.preventDefault();
    if (event.deltaX > 20) go(index + 1);
    if (event.deltaX < -20) go(index - 1);
  }

  return (
    <div
      className={`product-media ${soldOut ? "is-sold" : ""} ${multi ? "is-gallery" : ""}`}
      role={multi ? "group" : undefined}
      aria-roledescription={multi ? "carousel" : undefined}
      aria-label={`${name} images`}
      tabIndex={multi ? 0 : undefined}
      onClick={onMediaClick}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      {current ? (
        <Image
          src={current}
          alt={`White Beauty ${name}${soldOut ? " (sold out)" : ""}${
            multi ? ` — image ${index + 1} of ${images.length}` : ""
          }`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="product-main-image object-cover object-center transition duration-500"
          priority={index === 0}
        />
      ) : null}

      {badge ? (
        <span className={`sold-badge${soldOut ? "" : " is-preorder"}`}>
          {badge}
        </span>
      ) : null}

      {multi ? (
        <>
          <button
            type="button"
            className="gallery-nav gallery-nav-prev"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              go(index - 1);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-nav gallery-nav-next"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              go(index + 1);
            }}
          >
            ›
          </button>
          <div className="gallery-dots" aria-hidden="true">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                className={`gallery-dot ${i === index ? "is-active" : ""}`}
                aria-label={`Show image ${i + 1}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setIndex(i);
                }}
              />
            ))}
          </div>
          <span className="gallery-count">
            {index + 1}/{images.length}
          </span>
        </>
      ) : null}
    </div>
  );
}

import { Window } from "@/components/site/ui/Primitives";
import s from "./Device.module.css";

/* A real screenshot in a browser window, with the phone version standing on
   its lower right corner. Sized in cqw of its own frame, so window and phone
   keep their proportions at every width. On the phone (under 768 px) one of
   the two stays: `phoneFirst` keeps the drawn phone (the client's real
   mobile page), otherwise the window alone. Purely presentational: the
   link around it, if any, is the caller's. */

type Shot = { src: string; width: number; height: number; alt: string };

export function Device({
  address,
  desktop,
  phone,
  ratio = "16 / 10",
  phoneFirst = false,
  zoomOnPhone = false,
  eager = false,
}: {
  address: string;
  desktop: Shot;
  phone?: Shot;
  /** The window screen's aspect ratio; the screenshot is cropped from its top. */
  ratio?: string;
  phoneFirst?: boolean;
  /** Under 768 px show the left-top part of the screenshot larger (pages
   *  whose content sits in the left half). */
  zoomOnPhone?: boolean;
  eager?: boolean;
}) {
  const load = eager ? "eager" : "lazy";
  return (
    <div className={`${s.frame} ${phone ? s.withPhone : ""} ${phoneFirst ? s.phoneFirst : s.winFirst} ${zoomOnPhone ? s.zoom : ""}`}>
      <div className={s.device}>
        <div className={s.winBox}>
          <Window className={s.win} address={address}>
            <div className={s.screen} style={{ aspectRatio: ratio }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, files are pre-sized */}
              <img
                className={s.img}
                src={desktop.src}
                width={desktop.width}
                height={desktop.height}
                alt={desktop.alt}
                loading={load}
                decoding="async"
                fetchPriority={eager ? "high" : undefined}
              />
            </div>
          </Window>
        </div>
        {phone ? (
          <div className={s.phone}>
            <div className={s.phScreen}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, files are pre-sized */}
              <img
                className={s.phImg}
                src={phone.src}
                width={phone.width}
                height={phone.height}
                alt={phone.alt}
                loading={load}
                decoding="async"
              />
              <span className={s.island} aria-hidden="true" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

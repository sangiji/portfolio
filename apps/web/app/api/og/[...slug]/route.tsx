import { ImageResponse } from "next/og";
import { getSiteConfig } from "@cenaei/config";

export const runtime = "edge";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const path = slug?.join("/") ?? "";
  let title = "Cenaei";
  try {
    title = getSiteConfig().name;
  } catch {
    /* use default */
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "#0a0a0a",
          color: "#ededed",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>{title}</div>
        {path ? <div style={{ fontSize: 24, marginTop: 16, opacity: 0.8 }}>/{path}</div> : null}
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

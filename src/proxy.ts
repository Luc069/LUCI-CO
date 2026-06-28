import { NextResponse, type NextRequest } from "next/server";

import type { Locale } from "@/lib/locale";

const SLOVENIA_COUNTRY_CODE = "SI";
const SLOVENIAN_LOCALE_PATH = "/si";
const ENGLISH_LOCALE_PATH = "/en";
const GEOLOCATION_TIMEOUT_MS = 650;

function getVisitorCountry(request: NextRequest) {
  return (
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("cloudfront-viewer-country") ??
    request.headers.get("x-country-code")
  )?.toUpperCase();
}

function getVisitorIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    forwardedIp
  );
}

function isLocalhost(request: NextRequest) {
  const hostname = request.nextUrl.hostname;

  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function isPublicIp(ip: string) {
  return (
    Boolean(ip) &&
    !ip.startsWith("10.") &&
    !ip.startsWith("127.") &&
    !ip.startsWith("172.16.") &&
    !ip.startsWith("172.17.") &&
    !ip.startsWith("172.18.") &&
    !ip.startsWith("172.19.") &&
    !ip.startsWith("172.20.") &&
    !ip.startsWith("172.21.") &&
    !ip.startsWith("172.22.") &&
    !ip.startsWith("172.23.") &&
    !ip.startsWith("172.24.") &&
    !ip.startsWith("172.25.") &&
    !ip.startsWith("172.26.") &&
    !ip.startsWith("172.27.") &&
    !ip.startsWith("172.28.") &&
    !ip.startsWith("172.29.") &&
    !ip.startsWith("172.30.") &&
    !ip.startsWith("172.31.") &&
    !ip.startsWith("192.168.") &&
    ip !== "::1"
  );
}

async function getCountryFromIp(ip: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEOLOCATION_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://get.geojs.io/v1/ip/country/${ip}.json`,
      {
        cache: "no-store",
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { country?: string };
    const country = data.country?.trim().toUpperCase();

    return country && /^[A-Z]{2}$/.test(country) ? country : null;
  } catch {
    try {
      const response = await fetch(`https://ipwho.is/${ip}?fields=country_code`, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as { country_code?: string };
      const country = data.country_code?.trim().toUpperCase();

      return country && /^[A-Z]{2}$/.test(country) ? country : null;
    } catch {
      return null;
    }
  } finally {
    clearTimeout(timeout);
  }
}

function acceptsSlovenian(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");

  return acceptLanguage
    ? acceptLanguage
        .split(",")
        .map((language) => language.split(";")[0]?.trim().toLowerCase())
        .some((language) => language === "sl" || language?.startsWith("sl-"))
    : false;
}

async function prefersSlovenian(request: NextRequest) {
  const country = getVisitorCountry(request);

  if (country) {
    return country === SLOVENIA_COUNTRY_CODE;
  }

  if (isLocalhost(request)) {
    return true;
  }

  const visitorIp = getVisitorIp(request);

  if (visitorIp && isPublicIp(visitorIp)) {
    const ipCountry = await getCountryFromIp(visitorIp);

    if (ipCountry) {
      return ipCountry === SLOVENIA_COUNTRY_CODE;
    }
  }

  return acceptsSlovenian(request);
}

function nextWithLocale(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-luci-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === SLOVENIAN_LOCALE_PATH) {
    return nextWithLocale(request, "si");
  }

  if (request.nextUrl.pathname === ENGLISH_LOCALE_PATH) {
    return nextWithLocale(request, "en");
  }

  const localePath = (await prefersSlovenian(request))
    ? SLOVENIAN_LOCALE_PATH
    : ENGLISH_LOCALE_PATH;

  return NextResponse.redirect(new URL(localePath, request.url));
}

export const config = {
  matcher: ["/", "/si", "/en"],
};

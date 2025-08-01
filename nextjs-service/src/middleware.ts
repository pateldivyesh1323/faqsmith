import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";

const rateLimit = new LRUCache({
    max: 500,
    ttl: 1000 * 60 * 60,
});

const MAX_REQUESTS = 5;

export function middleware(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const requests = ((rateLimit.get(ip) as number) || 0) + 1;
    rateLimit.set(ip, requests);

    console.log("Requests:", rateLimit.get(ip), requests);

    if (requests > MAX_REQUESTS) {
        return new NextResponse(
            JSON.stringify({
                message:
                    "Too many requests, please try later or contact support.",
            }),
            { status: 429, headers: { "Content-Type": "application/json" } }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*"],
};

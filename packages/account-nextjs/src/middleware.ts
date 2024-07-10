import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (response.ok) {
    return response;
  }
  try {
    // console.log(JSON.stringify(response, null, 2));
    // const responseBody = response?.ok
    //   ? {
    //       data: await response.json(),
    //       code: response.status,
    //       message: response.statusText,
    //     }
    //   : { data: null, code: response.status, message: response.statusText };
    // console.log("responseBody", responseBody);
    // return (
    //   Response.json(responseBody) || response || NextResponse.json({ data: 12 })
    // );
  } catch (error) {
    console.log("error", error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};

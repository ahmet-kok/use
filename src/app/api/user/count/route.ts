import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/session";
import { countUsers } from "@/lib/user";
import { ApiResponse } from "@/lib/utils";
import { NextRequest } from "next/server";

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response(ApiResponse.error(401, "Not authenticated"), { 
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    const count = await countUsers();

    return new Response(ApiResponse.success(count), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Error in user count API:", error);
    return new Response(ApiResponse.error(500, "Internal server error"), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
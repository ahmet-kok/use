import { auth } from "@/auth";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { ApiResponse } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";

export const runtime = 'edge';

export async function DELETE(req: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response(ApiResponse.error(401, "Not authenticated"), { 
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    await db.delete(users).where(eq(users.id, currentUser.id as string));
  } catch (error) {
    return new Response(ApiResponse.error(500, "Internal server error"), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return new Response(ApiResponse.successWithMessage("User deleted successfully!", null), { 
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
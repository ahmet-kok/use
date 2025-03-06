import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/db/db";
import { apiKeys } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { ApiResponse } from "@/lib/utils";
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return new Response(ApiResponse.error(401, "Not authenticated"), { 
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const user = await getCurrentUser();
  if (!user) {
    return new Response(ApiResponse.error(401, "Not authenticated"), { 
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const { id: keyId } = await params;

  if (!keyId) {
    return new Response(ApiResponse.error(400, "Missing API key ID"), { 
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const resp = await db.delete(apiKeys).where(
      and(
        eq(apiKeys.id, keyId),
        eq(apiKeys.userId, user.id as string)
      )
    );
    if (!resp || resp.rowCount === 0) {
      return new Response(ApiResponse.error(404, "API key not found"), { 
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    return new Response(ApiResponse.successWithoutData(), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(ApiResponse.error(500, "Internal server error"), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  return NextResponse.json({ error:false ,message: "Page updated", request }, { status: 200 });
}
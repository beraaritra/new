import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Page from "../../../../../models/accioFinancePage";

export async function GET(request, { params }) {
  try {
    const url = request.nextUrl.searchParams.get("url");
    await connectMongoDB();
    const page = await Page.findOne({ url: url });

    if (page) {
      return NextResponse.json(
        { message: "got page successfully", page },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}

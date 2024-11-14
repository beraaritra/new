import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lead from "../../../../../models/lead";

export async function PUT(request, { params }) {
    const { id } = params;
    const requestBody = await request.json();
    await connectMongoDB();
    const updatedDocument = await Lead.findByIdAndUpdate(id, requestBody, { new: true });
  
    if (updatedDocument) {
      return NextResponse.json({ message: "Lead updated", updatedDocument }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }
  }


  export async function GET(request, { params }) {
    try {
      const { id } = params;
      await connectMongoDB();
  
      // Find the lead by ID
      const lead = await Lead.findById(id);
  
      if (!lead) {
        return NextResponse.json({ message: "Lead not found" }, { status: 404 });
      }
  
      // Exclude the 'versions' field from the lead data
      const leadWithoutVersions = lead.toObject();
      delete leadWithoutVersions.versions;
  
      return NextResponse.json({ lead: leadWithoutVersions }, { status: 200 });
    } catch (error) {
      console.error("Error fetching lead:", error);
      return NextResponse.json({ message: "Failed to fetch lead", error: error.message }, { status: 500 });
    }
  }
  
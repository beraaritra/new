import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Page from "../../../../../models/accioFinancePage";
import auth from '../../../../../middleware/adminauth';
import { headers } from "next/headers";

export async function PATCH(request, { params }) {
  try {

    const headersList = headers();
    const referer = headersList.get("authorization");
    console.log(referer,"aaaa");
    const verifytoken = await auth(referer);
    console.log("verifytoken", verifytoken);


    const { id } = params;
    const requestBody = await request.json();



    await connectMongoDB();
    const updatedDocument = await Page.findByIdAndUpdate(id, requestBody, { new: true });

    if (updatedDocument) {
      return NextResponse.json({ error:false ,message: "Page updated", updatedDocument }, { status: 200 });
    } else {
      return NextResponse.json({error:true , message: "Page not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    if(error.authenticationError){
      return NextResponse.json(
              { message: error.message , error: error.message },
              { status: error.status }
            );
    }else{
    return NextResponse.json(
      { error: true, message: "Internal server error",error: error.message },
      { status: 500 }
    );
    }
  }
}


// catch (error) {
  //   console.error('Error fetching leads:', error);
  //   if(error.authenticationError){
  //     return NextResponse.json(
  //       { message: error.message , error: error.message },
  //       { status: error.status }
  //     );
  //   }else{
  //     return NextResponse.json(
  //       { message: 'Failed to fetch leads', error: error.message },
  //       { status: 500 }
  //     );
  //   }
    
  // }


export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const page = await Page.findOne({ _id: id });

  if (page ) {
    return NextResponse.json({ message: "got page successfully", page  }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Page not found" }, { status: 404 });
  }
  
}
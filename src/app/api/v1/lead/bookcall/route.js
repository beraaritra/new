import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lead from "../../../../../models/lead";
import userHTML from "../../../../../common/userHtml";
import adminHTML from "../../../../../common/adminHtml";
import { SendMailClient } from "zeptomail";

export async function POST(request) {
  try {
    const requestBody = await request.json(); // Parse the entire request body
    console.log(requestBody);
    await connectMongoDB();

    let modifiedUserHTML;
    let modifiedAdminHTML;
    let User_subject;
    let Admin_subject;

    User_subject = "Your Call Booking Confirmation";
    Admin_subject = "Details the register who booked a call";
    // requestBody.leadsDescription = "Booked for instant call";
    modifiedUserHTML = userHTML.replace(/{name}/g, requestBody.name);
    modifiedAdminHTML = adminHTML.replace(/{name}/g, "Admin");

    console.log("requestBody.leadsDescription", requestBody.leadsDescription)
    if (!requestBody.leadsDescription) {
      User_subject = "Your Call Booking Confirmation";

      modifiedUserHTML = modifiedUserHTML.replace(
        /{comment}/g,
        `Thank you for booking a call with us.
        <br>
        <br>Our finance guide will reach out to you within 24-48 hours.<br>
        <br>
        Looking forward to speaking with you soon.
        <br>
        <br>
        Best regards,
        <br>
        Team Accio Finance
       `
      );
    } else {
      User_subject = "Here is Your Free Personal Branding eBook";

      modifiedUserHTML = modifiedUserHTML.replace(
        /{comment}/g,
        `I'm excited to share my free eBook on personal branding with you.

      <br>
      Inside, you'll learn:
      <br>
      <br>
      - Why personal branding matters
      <br>
      - How to define your professional identity
      <br>
      - Strategies to enhance your brand
      <br>
      <br>
       <a href="https://accio-content.s3.ap-south-1.amazonaws.com/PB_by_PK.pdf">Click here to view eBook</a>
      <br>
      <br>
      Questions? Feel free to reach out.
      <br>
      <br>
      Best,
      <br>
      Priyanka Karwa
      <br>
     
       `
      );
    }

    modifiedAdminHTML = modifiedAdminHTML.replace(
      /{comment}/g,
      `
        <br>
        <br>
        Here are the details who wants to connect with you
        

        <table style="width:100%;">
        <tr>
            <td>Name:</td>
            <td><strong>${requestBody.name}</strong></td>
        </tr>
        <tr>
            <td>Email:</td>
            <td><strong>${requestBody.email}</strong></td>
        </tr>
        <tr>
            <td>Phone:</td>
            <td><strong>${requestBody.countryCode}${requestBody.phone}</strong></td>
        </tr>
    </table>
       `
    );

    await Lead.create(requestBody); // Pass the entire body object

    const useremail = requestBody.email;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminEmail2 = process.env.ADMIN_EMAIL_2
    const emailAddresses = [`${useremail}`, `${adminEmail}`, `${adminEmail2}`];

    const url = process.env.ZEPTO_MAIL_URL;
    const token = process.env.ZEPTO_MAIL_TOKEN;
    let client = new SendMailClient({ url, token });



    for (const email of emailAddresses) {
      // Create a copy of htmlContent for each recipient
      let final_subject;
      console.log(email);
      let emailContent;

      if (email === adminEmail || email === adminEmail2) {
        emailContent = modifiedAdminHTML;
        final_subject = Admin_subject;
      } else {
        emailContent = modifiedUserHTML;
        final_subject = User_subject;
      }

      client
        .sendMail({
          from: {
            address: "support@acciofinance.com",
            name: "AccioFinance",
          },
          to: [
            {
              email_address: {
                address: `${email}`,
              },
            },
          ],
          reply_to: {
            address: "support@acciofinance.com",
            name: "Support Acciofinance",
          },
          subject: `${final_subject}`,
          htmlbody: `${emailContent}`,
        })
        .then((resp) => console.log("success"))
        .catch((error) => console.log("error", error));
    }

    return NextResponse.json(
      { message: "Lead added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { message: "Failed to add lead", error: error.message },
      { status: 500 }
    );
  }
}

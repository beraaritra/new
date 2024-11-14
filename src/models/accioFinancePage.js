import mongoose, { Schema } from "mongoose";

const accioFinancePageSchema = new Schema(
  {
    name: {
      type:String,
      unique: true,
      required: true
    },
    url: {
      type: String,
      unique: true, // Ensure uniqueness
      required: true
    },
    content: String,
    pagestyle:{
      type: String,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    jsFilePaths: {
      type: [String], // Array of links for JavaScript files
    },
    cssFilePaths: {
      type: [String], // Array of links for CSS files
    },
    includeHeaderFooter: {
      type: Boolean, // true/false for including header/footer
      default: true // Default value is false
    },
  },
  {
    timestamps: true,
  }
);

const AccioFinancePage = mongoose.models.AccioFinancePage || mongoose.model("AccioFinancePage", accioFinancePageSchema);

export default AccioFinancePage;

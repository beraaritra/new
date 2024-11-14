import mongoose from 'mongoose';
const acioleadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  combinedPhoneNo: {
    type: String
  },
  leadsDescription: {
    type: String,
    default: "Booked for instant call",
  },
  source: {
    type: String,
    default: "AccioFinance",
  },
  utm_source: {
    type: String,
    default: null,
  },
  utm_medium: {
    type: String,
    default: null,
  },
  utm_campaign: {
    type: String,
    default: null,
  },
  utm_content: {
    type: String,
    default: null,
  }
}, {
  timestamps: true
});
// Middleware to set combinedPhoneNo before saving
acioleadSchema.pre('save', function (next) {
  this.combinedPhoneNo = `${this.countryCode}${this.phone}`;
  next();
});

// Use the same model name in both `mongoose.models` and `mongoose.model`
const modelName = 'AccioFinanceLead';
const AcioLead = mongoose.models[modelName] || mongoose.model(modelName, acioleadSchema);

export default AcioLead;

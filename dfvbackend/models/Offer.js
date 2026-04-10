import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  image: { type: String, required: true }, 
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  discountValue: { type: Number, required: true }, 
  minQty: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Offer || mongoose.model('Offer', offerSchema);

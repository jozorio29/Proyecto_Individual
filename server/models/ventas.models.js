import mongoose from "mongoose";

const VentaSchema = new mongoose.Schema({
  quantity: Number,
  product: String,
  flavor1: String,
  flavor2: String,
  sandwichType: String,
  drinkType: String,
  drinkOption: String,
  paymentMethod: String,
  saleType: String,
  customerName: String,
  }
);

const Ventas = mongoose.model("Ventas", VentaSchema);

export default Ventas;

import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
      }
    });

const Producto = mongoose.model('Producto', ProductoSchema);
    
export default Producto

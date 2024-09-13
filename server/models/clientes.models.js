import mongoose from 'mongoose';


const ClientesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: Number
      },
    }, { timestamps: true });

const Clientes = mongoose.model('Clientes', ClientesSchema);

export default Clientes
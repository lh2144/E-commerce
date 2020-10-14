import mongoose from 'mongoose';

export default mongoose.connect('mongodb+srv://lh2144:5136200Zhu@cluster0.0ecan.mongodb.net/E-commerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

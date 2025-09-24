import mongoose from 'mongoose';


const bookSchema = new mongoose.Schema(
{
title: { type: String, required: true, index: true },
author: { type: String, required: true, index: true },
genre: { type: String },
description: { type: String },
},
{ timestamps: true }
);


export default mongoose.model('Book', bookSchema);
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({

    
    title:String,
    status:String,
    description:String,
});
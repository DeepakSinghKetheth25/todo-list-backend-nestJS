import { IsEmail, IsEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username : String,
    password : String
});
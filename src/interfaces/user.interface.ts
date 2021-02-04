import { Document } from 'mongoose';

export interface IUsers extends Document{
    readonly username:string;
    readonly password:string;
}
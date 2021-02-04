import { Document } from 'mongoose';

export interface ITodos extends Document{
    readonly id:string;
    readonly title:string;
    readonly description:string;
    readonly status:string;
    
}
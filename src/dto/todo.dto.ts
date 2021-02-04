import { IsNotEmpty } from "class-validator";

export class TodoDTO{
    
    readonly id:string;
    
//    @IsNotEmpty()
    readonly title:string;

//    @IsNotEmpty()
    readonly description:string;

//    @IsNotEmpty()
    readonly status:string;

    
    
}
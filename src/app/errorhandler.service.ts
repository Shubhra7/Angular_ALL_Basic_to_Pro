import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        console.log(error);

        alert('Something went wrong! Please try again. Message from Global Error Handler');
        
    }
}
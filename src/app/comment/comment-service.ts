import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentSchema } from './commentSchema';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient)

  getComment(){
    return this.http.get<CommentSchema[]>('https://jsonplaceholder.typicode.com/comments')
  }
  
}

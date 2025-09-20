import { Component } from '@angular/core';
import { CommentService } from './comment-service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-comment',
  imports: [AsyncPipe],
  templateUrl: './comment.html',
  styleUrl: './comment.scss'
})
export class Comments {

  comments$ 

  constructor(private commentService: CommentService, private activatedRoute : ActivatedRoute){
    // console.log(this.activatedRoute.data);
    
    this.comments$ = this.activatedRoute.data.pipe(pluck('comments'));
  }

  ngOnInit(){
   
  }

}

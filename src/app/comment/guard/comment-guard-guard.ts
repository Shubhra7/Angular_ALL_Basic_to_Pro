import { CanActivateFn, ResolveFn } from '@angular/router';
import { CommentSchema } from '../commentSchema';
import { inject } from '@angular/core';
import { CommentService } from '../comment-service';

export const commentGuardGuard: ResolveFn<CommentSchema[]> = (route, state) => {

  const commentsService = inject(CommentService);
  return commentsService.getComment();
};

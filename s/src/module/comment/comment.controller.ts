import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Comment } from 'entities/Comment.entity';
import { Result } from 'src/model/Result';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {}

    @Get('get')
    getComments(@Query('for') forId?: number, @Query('from') fromId?: number) {
        if (forId) {
            return this.commentService.getCommentForJingdian(forId)
        } else if(fromId) {
            return this.commentService.getCommentByUser(fromId)
        } else {
            return Result.fail('parameter [for|from] is needed.')
        }
    }

    @Post('add')
    addComment(@Body() body: Comment) {
        if (body.forId && body.fromId && body.content) {
            let comment = this.commentService.addComment(body.fromId, body.forId, body.content)
            return comment ? Result.success(comment) : Result.fail('failed to add comment')
        } else {
            return Result.fail('wrong parameter')
        }
    }
}

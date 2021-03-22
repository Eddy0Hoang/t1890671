import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'entities/Comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>
    ) {}
    addComment(fromId: number, forId: number, content: string) {
        let comment = new Comment()
        comment.fromId = fromId
        comment.forId = forId
        comment.content = content
        comment.createTime = Date.now()
        return this.commentRepo.save(comment)
    }
    getCommentByUser(uid: number) {
        return this.commentRepo.find({
            where: {
                fromId: uid
            }
        })
    }
    getCommentForJingdian(forId: number) {
        return this.commentRepo.find({
            where: {
                forId
            }
        })
    }
}

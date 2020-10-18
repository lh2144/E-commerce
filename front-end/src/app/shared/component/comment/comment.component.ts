import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'service';
@Component({
    selector: 'my-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
    @Input() public comment: Comment;
    public constructor() {}

    public ngOnInit(): void {}
}

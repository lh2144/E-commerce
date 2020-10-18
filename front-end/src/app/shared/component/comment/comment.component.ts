import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from 'service';
@Component({
    selector: 'my-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnChanges {
    @Input() public comment: Comment;
    public rating: number;
    public starCount: any[];
    public constructor() {}

    public ngOnInit(): void {}

    public ngOnChanges(changes: SimpleChanges): void {
      if (changes['comment']) {
        this.rating = this.comment.rating | 0;
        this.starCount = new Array(this.rating).fill(undefined);
      }
    }
}

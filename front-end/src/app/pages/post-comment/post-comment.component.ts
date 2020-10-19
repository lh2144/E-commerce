import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'my-post-comment',
    templateUrl: './post-comment.component.html',
    styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit {
    public commentForm: FormGroup;
    public startMap: any = {};
    public activeMap: any;
    public constructor(public fb: FormBuilder, public render: Renderer2) {}

    public ngOnInit(): void {
        this.commentForm = this.fb.group({
            rating: [''],
            nickName: ['', Validators.required],
            title: ['', Validators.required],
            detail: ['', Validators.required],
        });
        // this.startMap[1] = '&#9733;'.repeat(1);
        // this.startMap[2] = '&#9733;'.repeat(2);
        // this.startMap[3] = '&#9733;'.repeat(3);
        // this.startMap[4] = '&#9733;'.repeat(4);
        // this.startMap[5] = '&#9733;'.repeat(5);
        // this.commentForm.get('rating').valueChanges.subscribe((value))
    }

    public radioChange(value: Event): void {
      if (this.activeMap) {
        this.render.removeClass(this.activeMap, 'active');
      }
      this.render.addClass(value.target, 'active');
      this.activeMap = value.target;
    }
}

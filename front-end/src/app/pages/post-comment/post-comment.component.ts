import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  public commentForm: FormGroup;
  public constructor(public fb: FormBuilder) { }

  public ngOnInit(): void {
    this.commentForm = this.fb.group({
      rating: [''],
      nickName: [''],
      title: [''],
      detail: ['']
    });
  }

}

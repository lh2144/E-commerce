import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-post-comment',
    templateUrl: './post-comment.component.html',
    styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit {
    public commentForm: FormGroup;
    public startMap: any = {};
    public activeMap: any;
    public productId: string;

    public constructor(public fb: FormBuilder, public render: Renderer2, public activeRoute: ActivatedRoute) {}

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
        this.activeRoute.params.subscribe(value => {
          this.productId = value['id'];
        });
    }
    get f(): {[key: string]: AbstractControl} {
      return this.commentForm.controls;
    }
    public radioChange(value: Event): void {
      if (this.activeMap) {
        this.render.removeClass(this.activeMap, 'active');
      }
      this.render.addClass(value.target, 'active');
      this.activeMap = value.target;
    }

    public createReview(): void {
      const payload = {};
      payload['rating'] = this.f['rating'].value;
      payload['nickName'] = this.f['nickName'].value;
      payload['title'] = this.f['title'].value;
      payload['detail'] = this.f['detail'].value;
      payload['productId'] = this.f['productId'].value;
    }
}

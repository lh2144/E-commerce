import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
@Component({
    selector: 'my-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('cardInfo') public cardInfo: ElementRef;
    public card: any;
    public activeDelivery;
    public showCard;
    public cardHandler = this.onChange.bind(this);
    public cardError: string;
    public constructor(private cd: ChangeDetectorRef) {}

    public ngOnInit(): void {}

    public initiateCardElement() {
        const style = {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
        };
        this.card = elements.create('card', {cardStyle: style });
        this.card.mount('#card-element');
        this.card.addEventListener('change', this.cardHandler);
    }

    public onChange({ error }) {
        if (error) {
            this.cardError = error.message;
        } else {
            this.cardError = null;
        }
        this.cd.detectChanges();
    }

    public ngAfterViewInit() {
        // this.initiateCardElement();
    }
    public mountCard(): void {
      setTimeout(this.initiateCardElement, 0);
    }
    public ngOnDestroy(): void {
        if (this.card) {
            // We remove event listener here to keep memory clean
            this.card.removeEventListener('change', this.cardHandler);
            this.card.destroy();
        }
    }

    public placeOrder(): void {
      
    }
}

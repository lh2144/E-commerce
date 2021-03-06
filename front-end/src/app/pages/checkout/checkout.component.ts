import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { PaymentService } from 'src/app/shared/service/payment.service';
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
    public cardHandler;
    public cardError: string;

    public constructor(private cd: ChangeDetectorRef, public paymentService: PaymentService) {}

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
        this.card = elements.create('card', { style });
        this.card.mount('#card-element');
        this.card.on('change', this.onChanges.bind(this));
    }

    public onChanges({ error }) {
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
      setTimeout(this.initiateCardElement.bind(this), 0);
    }

    public ngOnDestroy(): void {
        if (this.card) {
            // We remove event listener here to keep memory clean
            this.card.removeEventListener('change', this.cardHandler);
            this.card.destroy();
        }
    }

    public placeOrder(): void {
      this.paymentService.getClientSecret().subscribe((res) => {
        if (res.client_secret) {
          stripe.confirmCardPayment(res.client_secret, {
            payment_method: {
              card: this.card,
              billing_details: {
                name: 'hang'
              }
            }
          }).then(result => {
            console.log(result);
            if (result.error) {
            } else {
              if (result.paymentIntent.status === 'succeeded') {

              }
            }
          });
        }
      });
    }
}

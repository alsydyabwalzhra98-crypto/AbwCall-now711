import stripe
from typing import Dict, Any

from app.core.config import settings


class PaymentService:
    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY

    def create_payment_intent(self, amount: float, user_id: int) -> stripe.PaymentIntent:
        """
        Create a Stripe payment intent
        """
        try:
            # Convert amount to cents
            amount_cents = int(amount * 100)
            
            payment_intent = stripe.PaymentIntent.create(
                amount=amount_cents,
                currency="usd",
                metadata={"user_id": str(user_id)},
                automatic_payment_methods={"enabled": True}
            )
            return payment_intent
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")

    def construct_webhook_event(self, payload: bytes, sig_header: str) -> stripe.Event:
        """
        Construct and verify webhook event
        """
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
            return event
        except stripe.error.SignatureVerificationError as e:
            raise Exception(f"Webhook signature verification failed: {str(e)}")

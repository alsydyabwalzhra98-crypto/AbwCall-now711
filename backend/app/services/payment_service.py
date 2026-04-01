from typing import Any


class PaymentService:
    def __init__(self):
        pass

    def create_payment_intent(self, amount: float, user_id: int) -> Any:
        try:
            import stripe
            from app.core.config import settings
            stripe.api_key = settings.STRIPE_SECRET_KEY
            amount_cents = int(amount * 100)
            payment_intent = stripe.PaymentIntent.create(
                amount=amount_cents,
                currency="usd",
                metadata={"user_id": str(user_id)},
                automatic_payment_methods={"enabled": True}
            )
            return payment_intent
        except ImportError:
            raise Exception("Stripe is not installed")
        except Exception as e:
            raise Exception(f"Payment error: {str(e)}")

from typing import List, Optional
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
import phonenumbers

from app.core.config import settings
from app.schemas.call import CallRate


class TwilioService:
    def __init__(self):
        self.client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        self.twilio_phone_number = settings.TWILIO_PHONE_NUMBER

    def make_call(self, to: str, from_number: str, callback_url: str):
        """
        Make a phone call using Twilio
        """
        try:
            call = self.client.calls.create(
                to=to,
                from_=from_number,
                url=callback_url,
                method="POST"
            )
            return call
        except TwilioRestException as e:
            raise Exception(f"Twilio error: {str(e)}")

    def end_call(self, call_sid: str):
        """
        End an active call
        """
        try:
            call = self.client.calls(call_sid).update(status="completed")
            return call
        except TwilioRestException as e:
            raise Exception(f"Twilio error: {str(e)}")

    def get_call_rate(self, phone_number: str) -> Optional[CallRate]:
        """
        Get call rate for a phone number
        """
        try:
            # Parse phone number to get country code
            parsed_number = phonenumbers.parse(phone_number)
            country_code = parsed_number.country_code
            
            # Get country name
            country_name = phonenumbers.region_code_for_number(parsed_number)
            
            # Here you would typically fetch rates from your database or Twilio API
            # For now, returning a sample rate
            rates = {
                "US": 0.01,
                "GB": 0.02,
                "CA": 0.015,
                "AU": 0.025,
                "DE": 0.03,
                "FR": 0.03,
                "SA": 0.05,  # Saudi Arabia
                "AE": 0.04,  # UAE
                "EG": 0.06,  # Egypt
                "JO": 0.05,  # Jordan
            }
            
            rate = rates.get(country_name, 0.10)  # Default rate
            
            return CallRate(
                country=country_name,
                country_code=f"+{country_code}",
                rate=rate,
                currency="USD"
            )
        except Exception:
            return None

    def get_all_call_rates(self) -> List[CallRate]:
        """
        Get all available call rates
        """
        # Sample rates - in production, fetch from database
        return [
            CallRate(country="US", country_code="+1", rate=0.01, currency="USD"),
            CallRate(country="GB", country_code="+44", rate=0.02, currency="USD"),
            CallRate(country="CA", country_code="+1", rate=0.015, currency="USD"),
            CallRate(country="AU", country_code="+61", rate=0.025, currency="USD"),
            CallRate(country="DE", country_code="+49", rate=0.03, currency="USD"),
            CallRate(country="FR", country_code="+33", rate=0.03, currency="USD"),
            CallRate(country="SA", country_code="+966", rate=0.05, currency="USD"),
            CallRate(country="AE", country_code="+971", rate=0.04, currency="USD"),
            CallRate(country="EG", country_code="+20", rate=0.06, currency="USD"),
            CallRate(country="JO", country_code="+962", rate=0.05, currency="USD"),
        ]

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from config.config import Config

class EmailService:
    @staticmethod
    def send_photos(recipient_email, photo_paths, subject="Photos from Drishyamitra"):
        if not Config.GMAIL_USER or not Config.GMAIL_PASSWORD:
            return False, "Gmail credentials not configured"

        msg = MIMEMultipart()
        msg['From'] = Config.GMAIL_USER
        msg['To'] = recipient_email
        msg['Subject'] = subject

        body = "Please find the requested photos attached."
        msg.attach(MIMEText(body, 'plain'))

        for path in photo_paths:
            try:
                with open(path, 'rb') as f:
                    img_data = f.read()
                    image = MIMEImage(img_data, name=os.path.basename(path))
                    msg.attach(image)
            except Exception as e:
                print(f"Error attaching photo {path}: {e}")

        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(Config.GMAIL_USER, Config.GMAIL_PASSWORD)
                server.send_message(msg)
            return True, "Email sent successfully"
        except Exception as e:
            return False, str(e)

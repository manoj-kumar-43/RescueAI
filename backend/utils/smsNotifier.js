import nodemailer from 'nodemailer';

let twilioClient = null;

async function getTwilioClient() {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    if (!twilioClient) {
      const twilio = await import('twilio');
      twilioClient = twilio.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    return twilioClient;
  }
  return null;
}

async function getMailTransporter() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
}

async function sendSMS(phoneNumber, message) {
  const client = await getTwilioClient();
  if (!client) {
    console.log(`[SMS STUB] To: ${phoneNumber} | Message: ${message}`);
    return { success: true, stub: true, phone: phoneNumber };
  }

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    return { success: true, phone: phoneNumber };
  } catch (error) {
    console.error(`SMS send failed to ${phoneNumber}:`, error.message);
    return { success: false, phone: phoneNumber, error: error.message };
  }
}

async function sendEmail(emailAddress, message) {
  const transporter = await getMailTransporter();
  if (!transporter) {
    console.log(`[EMAIL STUB] To: ${emailAddress} | Message: ${message}`);
    return { success: true, stub: true, email: emailAddress };
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailAddress,
      subject: 'RescueAI Emergency Alert',
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`
    });
    return { success: true, email: emailAddress };
  } catch (error) {
    console.error(`Email send failed to ${emailAddress}:`, error.message);
    return { success: false, email: emailAddress, error: error.message };
  }
}

export async function sendEmergencyAlert(contacts, message) {
  const results = [];

  for (const contact of contacts) {
    const smsResult = await sendSMS(contact.phone, message);
    results.push({ contact: contact.name, channel: 'sms', ...smsResult });

    if (contact.email) {
      const emailResult = await sendEmail(contact.email, message);
      results.push({ contact: contact.name, channel: 'email', ...emailResult });
    }
  }

  return results;
}

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const resend = getResend();

    // Send confirmation email to the contact person
    const confirmationEmail = await resend.emails.send({
      from: 'noreply@tranminhkhoi.dev',
      to: [email],
      subject: 'Thank you for reaching out - Tran Minh Khoi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">Thank you for your interest!</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Hello,
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Thank you for reaching out! I've received your contact request from <strong>${email}</strong>.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            I'll get back to you within <strong>1-2 business days</strong> to discuss potential collaboration opportunities or answer any questions you might have.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            I appreciate your interest in working together!
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; text-align: center;">
              Best regards,<br>
              <strong>Tran Minh Khoi</strong><br>
              Developer & Designer
            </p>
          </div>
        </div>
      `,
    });

    // Send notification email to the owner
    const notificationEmail = await resend.emails.send({
      from: 'noreply@tranminhkhoi.dev',
      to: ['win070802@gmail.com'],
      subject: '🔔 New Contact Request - Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">New Contact Request</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Hi Khoi,
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Someone wants to connect with you through your portfolio website.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #333; margin: 0; font-weight: 600;">
              📧 Contact Email: <span style="color: #0066cc;">${email}</span>
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            A confirmation email has been automatically sent to them letting them know you'll respond within 1-2 business days.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; text-align: center;">
              Portfolio Contact System<br>
              <em>This is an automated notification</em>
            </p>
          </div>
        </div>
      `,
    });

    // Check if both emails were sent successfully
    if (confirmationEmail.error || notificationEmail.error) {
      console.error('Resend errors:', {
        confirmation: confirmationEmail.error,
        notification: notificationEmail.error
      });
      return NextResponse.json(
        { error: 'Failed to send emails' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Contact request submitted successfully',
        confirmationEmailId: confirmationEmail.data?.id,
        notificationEmailId: notificationEmail.data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 

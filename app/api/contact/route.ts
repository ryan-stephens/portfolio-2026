import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // TODO: Integrate with external service (Resend, SendGrid, etc.)
    // For now, we'll just log the message and return success
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      ...validatedData,
    });

    // Example integration with Resend (uncomment and configure when ready):
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     from: 'contact@ryan-stephens.dev',
    //     to: 'ryan.stephens15@gmail.com',
    //     subject: `New contact form submission from ${validatedData.name}`,
    //     html: `
    //       <h2>New Contact Form Submission</h2>
    //       <p><strong>Name:</strong> ${validatedData.name}</p>
    //       <p><strong>Email:</strong> ${validatedData.email}</p>
    //       <p><strong>Message:</strong></p>
    //       <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
    //     `,
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error('Failed to send email');
    // }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. I will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}

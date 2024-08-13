type Email = {
  from?: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  }[];
  subject: string;
  textContent: string;
  htmlContent: string;
  attachments?: File[];
};

type Emails = Email[];

type EmailWithMailjet = {
  Messages: {
    From: {
      Email: string;
      Name: string;
    };
    To: {
      Email: string;
      Name: string;
    }[];
    Subject: string;
    TextPart: string;
    HTMLPart: string;
    Attachments?: {
      ContentType: string;
      Filename: string;
      Base64Content: string;
    }[];
  }[];
};

type EmailWithMailjetResponse = {
  Messages: [
    {
      Bc?: string[];
      Cc?: string[];
      Status: 'success' | 'error';
      Errors?: [
        {
          ErrorIdentifier: string;
          ErrorCode: string;
          StatusCode: number;
          ErrorMessage: string;
        },
      ];
      To?: [
        {
          Email: string;
          MessageHref: string;
          MessageID: number;
          MessageUUID: string;
        },
      ];
    }[],
  ];
};

type SendEmailProps = {
  data: Email | Emails;
  provider?: 'mailjet';
};

const _base64Encode = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const _sendEmailWithMailjet = async (emails: Emails): Promise<boolean> => {
  const mailjet = require('node-mailjet').connect(
    process.env.MAILJET_API_KEY_PUBLIC,
    process.env.MAILJET_API_KEY_PRIVATE,
  );

  const prepareAttachments = async (attachments: File[]) => {
    if (!attachments || !attachments.length) return [];

    return attachments.map(async attachment => ({
      ContentType: attachment.type,
      Filename: attachment.name,
      Base64Content: await _base64Encode(attachment),
    }));
  };

  const messages: any = { Messages: [] };

  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    const attachments = await prepareAttachments(email.attachments || []);

    messages.Messages.push({
      Attachments: attachments,
      From: {
        Email: email.from?.email || '',
        Name: email.from?.name || '',
      },
      HTMLPart: email.htmlContent,
      To: email.to.map(to => ({
        Email: to.email,
        Name: to.name,
      })),
      Subject: email.subject,
      TextPart: email.textContent,
    });
  }

  const request = mailjet.post('send', { version: 'v3.1' }).request(messages);

  return request
    .then((result: EmailWithMailjetResponse) => {
      console.log(result.Messages);
      return true;
    })
    .catch((err: any) => {
      console.log(err.statusCode);
      return false;
    });
};

const sendEmail = ({
  data,
  provider = 'mailjet',
}: SendEmailProps): Promise<boolean> => {
  const emails = Array.isArray(data) ? data : [data];
  switch (provider) {
    case 'mailjet':
      return _sendEmailWithMailjet(emails);
    default:
      throw new Error('Invalid email provider');
  }
};

export { sendEmail };

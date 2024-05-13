import emailjs from 'emailjs-com';

const ComposeEmail = ({ qrCodeImageUrl, clientEmail }) => {
  const sendEmail = () => {
    // Your EmailJS service ID
    const serviceId = 'service_a6rqk3l';
    // Your EmailJS template ID
    const templateId = 'template_h0gtw4o';

    emailjs.send(serviceId, templateId, {
      qrCodeImage: qrCodeImageUrl,
      clientEmail: clientEmail,
    }).then((response) => {
      console.log('Email sent successfully:', response);
    }).catch((error) => {
      console.error('Error sending email:', error);
    });
  };

  return (
    <div>
     
      <p>Hello,</p>
      <p>Please find your QR code below:</p>
      <img src={qrCodeImageUrl} alt="QR Code" />
      <p>Thank you.</p>

      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default ComposeEmail;

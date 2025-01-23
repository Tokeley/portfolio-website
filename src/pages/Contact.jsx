import { useContext  } from 'react';
import { Input, Textarea, Button } from '@chakra-ui/react';
import { RiMailLine, RiCheckLine } from "react-icons/ri";
import emailjs from 'emailjs-com';
import { useState } from 'react';
import { Field } from "@/components/ui/field"
import { SoundContext } from '../contexts/SoundContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const { muted, setMuted } = useContext(SoundContext);
  const sendEmailSound = new Audio('/resources/audio/SendEmail.mp3');
  const emailSentSound = new Audio('/resources/audio/EmailSent.mp3');

  const [submitted, setSubmitted] = useState(false); // Added state to track submission status

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    if ( !muted ) {
      sendEmailSound.play().catch((error) => { console.error("Failed to play sound on:", error); });
     };

    emailjs.send(
      'service_t1pv2nb',  
      'template_tf9fich',  
      templateParams,
      'l24TP84Z8Ia6A2Kkh'
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      if ( !muted ) {
        emailSentSound.play().catch((error) => { console.error("Failed to play sound on:", error); });
      };
      setSubmitted(true); 
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section id="Contact" className="section h-screen flex justify-center pt-20">
      <div className="lg:w-2/3 w-10/12 justify-center p-0">
        <h1 className='pb-6 lg:text-6xl text-4xl font-montserratMedium text-gray-700 dark:text-offwhite p-2 text-center'>
          Contact
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="lg:flex lg:space-y-0 space-y-4">
            <Field label="First Name" required className='lg:mr-2'>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter First Name"
                variant="outline"
                className='font-montserratMedium w-full border-2 dark:border-gray-800 px-2 bg-white/70 dark:bg-gray-700/70'
              />
            </Field>
            <Field label="Last Name" required className='lg:ml-2'>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
                variant="outline"
                className='font-montserratMedium w-full  border-2 dark:border-gray-800 px-2 bg-white/70 dark:bg-gray-700/70'
              />
            </Field>
          </div>
          <div className="lg:flex lg:space-y-0 space-y-4 mt-4">
            <Field label="Email" required className='lg:mr-2'>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                variant="outline"
                className='font-montserratMedium w-full border-2 dark:border-gray-800 px-2 bg-white/70 dark:bg-gray-700/70'
              />
            </Field>
            <Field label="Subject" required className='lg:ml-2'>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter Subject"
                variant="outline"
                className='font-montserratMedium w-full border-2 dark:border-gray-800 px-2 bg-white/70 dark:bg-gray-700/70'
              />
            </Field>
          </div>
          <div className='mt-4'>
            <Field label="Message" required>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter Message"
                variant="outline"
                className='font-montserratMedium sm:h-48 w-full border-2 p-2 dark:border-gray-800 bg-white/70 dark:bg-gray-700/70'
              />
            </Field>
          </div>
          <div className='flex justify-center'>
            <Button
              type="submit"
              variant="solid"
              className='transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 hover:scale-105 hover:shadow-xl border-2 dark:border-gray-800 font-montserratMedium mt-4 bg-offwhite dark:bg-gray-800 text-gray-600 dark:text-gray-200 p-4'
            >
              {submitted ? (
                <>
                  <RiCheckLine /> Sent!
                </>
              ) : (
                <>
                  <RiMailLine /> Send
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;

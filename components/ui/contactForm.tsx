'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [result, setResult] = useState(''); // For form submission status
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control modal visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('Sending...');

    const formDataToSend = new FormData();
    formDataToSend.append('access_key', '89b85a1d-9630-4362-85b2-76ff6fc9f6ee'); // Replace with your actual access key
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Form Submitted Successfully');
        toast({
          title: 'Message Sent',
          description: 'Your message has been successfully sent.',
          variant: 'default',
        });
        setFormData({ name: '', email: '', message: '' }); // Reset form data
        setIsDialogOpen(false); // Close the modal
      } else {
        console.error('Error:', data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResult('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {/* Modal Trigger */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Contact Us</Button>
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              Fill out the form below to send us your message.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-indigo-700">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-indigo-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Message Input */}
            <div>
              <label htmlFor="message" className="text-sm font-semibold text-indigo-700">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Submit Button */}
            <Button type="submit" variant="default" className="w-full">
              Send Message
            </Button>
          </form>
          <span className="text-sm text-gray-600">{result}</span>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactForm;

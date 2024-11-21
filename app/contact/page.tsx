'use client';
// this uses popover and not modal will likley be removed
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send the data to an API)
    toast({
      title: 'Message Sent',
      description: 'Your message has been successfully sent.',
      variant: 'default',
    });
    setIsPopoverOpen(false); // Close the popover
    setFormData({ name: '', email: '', message: '' }); // Reset the form
  };

  return (
    <div>
      {/* Popover Trigger */}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">Contact Us</Button>
        </PopoverTrigger>
        {/* Popover Content */}
        <PopoverContent className="w-96 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold text-center">Contact Us</h3>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
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
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
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
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ContactForm;

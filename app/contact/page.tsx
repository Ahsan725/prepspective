'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('access_key', '89b85a1d-9630-4362-85b2-76ff6fc9f6ee');
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
        toast({
          title: 'Message Sent 🎉',
          description: 'We probably have 1 intern checking this inbox. Sit tight!',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast({
          title: 'Error Sending Message',
          description: data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Server Error 😅',
        description: 'Our one overworked engineer is probably asleep. Try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left side text */}
        <div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            Want to ask something? Praise us? Complain? Rant about your last interview?
            Send it all here. We read every single message... eventually.
          </p>
          <p className="text-gray-500">
            Please note: we have a small team. And by small, we mean someone’s cat is our unofficial PR rep 🐱.
          </p>
        </div>

        {/* Contact form */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Message</label>
              <Textarea
                id="message"
                name="message"
                placeholder="What's on your mind?"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-3 rounded-lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

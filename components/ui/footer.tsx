'use client';

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const sections = [
  {
    title: 'Product',
    links: [
      { name: 'Overview', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Marketplace', href: '#' },
      { name: 'Features', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Team', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'Advertise', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <section className="relative py-32 bg-white overflow-hidden pb-4">
      <div className="container mx-auto px-4">
        <footer>
          <div className="flex flex-col items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
            {/* Logo and Description */}
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div className="flex items-center gap-2 lg:justify-start">
                <span className="text-2xl font-extrabold text-indigo-700">
                  {'{P}rep'}
                  <span className="font-bold text-indigo-700">Spective</span>
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Built to help you land your next role — with tools, resources, and people who’ve done it before.
              </p>
              <ul className="flex items-center space-x-6 text-indigo-700">
                <li className="hover:text-indigo-800">
                  <a href="#"><FaInstagram className="size-6" /></a>
                </li>
                <li className="hover:text-indigo-800">
                  <a href="#"><FaFacebook className="size-6" /></a>
                </li>
                <li className="hover:text-indigo-800">
                  <a href="#"><FaTwitter className="size-6" /></a>
                </li>
                <li className="hover:text-indigo-800">
                  <a href="#"><FaLinkedin className="size-6" /></a>
                </li>
              </ul>
            </div>

            {/* Link Sections */}
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold text-indigo-700">{section.title}</h3>
                  <ul className="space-y-4 text-sm text-gray-600">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx} className="font-medium hover:text-indigo-500">
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-gray-500 lg:flex-row lg:items-center lg:text-left">
            <p>© 2024 PrepSpective. All rights reserved.</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-indigo-600">
                <a href="#">Terms and Conditions</a>
              </li>
              <li className="hover:text-indigo-600">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;

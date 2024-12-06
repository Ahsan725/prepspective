import { FormData } from '../types';

export const ensureHttpsAndValidate = (url: string): string | null => {
  const allowedDomains = ['leetcode.com', 'geeksforgeeks.org'];
  let updatedUrl = url.trim();

  if (!updatedUrl.startsWith('https://') && !updatedUrl.startsWith('http://')) {
    updatedUrl = `https://${updatedUrl}`;
  }

  const domainPart = updatedUrl.replace(/https?:\/\//, '');
  if (!domainPart.startsWith('www.')) {
    updatedUrl = updatedUrl.replace(/(https?:\/\/)/, '$1www.');
  }

  const domain = domainPart.split('/')[0];
  if (!allowedDomains.some((allowedDomain) => domain.endsWith(allowedDomain))) {
    return null;
  }

  return updatedUrl;
};

export const validateRequiredFields = (formData: FormData): Set<keyof FormData> => {
  const requiredFields: (keyof FormData)[] = ['company', 'interviewDate', 'level', 'overallExperience'];
  const invalidFields = new Set<keyof FormData>();

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      invalidFields.add(field);
    }
  });

  return invalidFields;
};
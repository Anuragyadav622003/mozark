import type { OcrImage, OcrTextBlock, OcrResults } from './types';

export const textBlocks: OcrTextBlock[] = [
  {
    id: 1,
    title: 'Horizontal Text',
    content:
      'This is a sample of horizontal text that can be detected by optical character recognition systems. The quick brown fox jumps over the lazy dog.',
    orientation: 'horizontal',
  },
  {
    id: 2,
    title: 'Vertical Text',
    content:
      'V\ne\nr\nt\ni\nc\na\nl\n \nt\ne\nx\nt\n \nc\na\nn\n \nb\ne\n \nr\ne\na\nd\n \ni\nn\n \nd\ni\nf\nf\ne\nr\ne\nn\nt\n \no\nr\ni\ne\nn\nt\na\nt\ni\no\nn\ns',
    orientation: 'vertical',
  },
  {
    id: 3,
    title: 'Mixed Content',
    content:
      'Text recognition systems can handle various fonts, sizes, and styles. This includes bold text, italic text, and different languages like español, français, and русский.',
    orientation: 'horizontal',
  },
];

export const images: OcrImage[] = [
  {
    id: 1,
    title: 'Document Scan',
    text: 'INVOICE\nDate: 2024-01-15\nAmount: $299.99\nThank you for your business!',
    backgroundColor: '#e8f4f8',
    clickable: true,
  },
  {
    id: 2,
    title: 'Business Card',
    text: 'John Doe\nCEO & Founder\nTech Innovations Inc.\njohn@techinnovations.com\n+1 (555) 123-4567',
    backgroundColor: '#f0e8ff',
    clickable: false,
  },
  {
    id: 3,
    title: 'Receipt',
    text: 'RECEIPT #12345\nCoffee Shop\nLatte - $4.50\nCroissant - $3.25\nTotal: $7.75\nTax: $0.62',
    backgroundColor: '#fff8e8',
    clickable: false,
  },
];

export const ocrResults: OcrResults = {
  confidence: 98.7,
  language: 'English',
  textBlocks: [
    {
      text: 'INVOICE',
      confidence: 99.2,
      bounds: { x: 50, y: 20, width: 100, height: 30 },
    },
    {
      text: 'Date: 2024-01-15',
      confidence: 97.8,
      bounds: { x: 50, y: 60, width: 150, height: 20 },
    },
    {
      text: 'Amount: $299.99',
      confidence: 98.5,
      bounds: { x: 50, y: 90, width: 130, height: 20 },
    },
    {
      text: 'Thank you for your business!',
      confidence: 96.3,
      bounds: { x: 30, y: 130, width: 200, height: 25 },
    },
  ],
  processingTime: '0.23s',
  totalCharacters: 67,
};

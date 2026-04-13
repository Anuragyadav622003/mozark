export type OcrImage = {
  id: number;
  title: string;
  text: string;
  backgroundColor: string;
  clickable: boolean;
};

export type OcrTextBlock = {
  id: number;
  title: string;
  content: string;
  orientation: 'horizontal' | 'vertical';
};

export type OcrResultBlock = {
  text: string;
  confidence: number;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type OcrResults = {
  confidence: number;
  language: string;
  textBlocks: OcrResultBlock[];
  processingTime: string;
  totalCharacters: number;
};

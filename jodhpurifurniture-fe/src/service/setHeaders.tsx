import { AxiosRequestHeaders } from 'axios';

export default function setHeader(
  header:
    | {
        verifytoken?: string;
        contentType?: string;
      }
    | undefined
): AxiosRequestHeaders {
  return {
    'Content-Type': header?.contentType || 'application/json',
    verifytoken: `${header?.verifytoken}`,
  };
}

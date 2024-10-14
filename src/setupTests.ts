import { TextDecoder, TextEncoder } from 'text-encoding';
import '@testing-library/jest-dom';
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

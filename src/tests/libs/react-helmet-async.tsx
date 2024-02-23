import { wrap } from '../wrap';
import helmet from 'react-helmet-async';

export const HelmetProvider = wrap(helmet.HelmetProvider);

import { Photo } from './photo';

export interface Product {
    id?: number;
    title?: string;
    price?: number; 
    description?: string;
    postedOn?: Date
    userId?: number;
    photos?: Photo[];
}
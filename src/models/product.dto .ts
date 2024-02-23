export interface ProductDto {
  id: string;
  title: string;
  description: string;
  quantity: number;
  discount: number;
  price: number;
  discountedPrice: number;
  coverImgUrl: string;
  size: string[];
  colour: { position: string; colour: string }[];
  images: { position: string; imageUrl: string }[];
  subCategoryId: string;
}

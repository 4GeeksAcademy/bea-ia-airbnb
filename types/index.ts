export interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface Stay {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
  superhost?: boolean;
}

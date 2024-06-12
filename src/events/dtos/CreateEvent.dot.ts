// src/events/dtos/CreateEvent.dot.ts
export interface CreateEventDto {
  name: string;
  description: string;
  date: string;
  location: string;
  duration: string;
  rating: string; // Keeping it as a string to parse later
}

// src/events/dtos/UpdateEvent.dot.ts
export interface UpdateEventDto {
  name?: string;
  description?: string;
  date?: string;
  location?: string;
  duration?: string;
  rating?: string; // Keeping it as a string to parse later
}

// src/events/types/response.ts
export interface Event {
  id: number;
  name: string;
  description: string;
  date: Date;
  location: string;
  duration: string;
  rating: number; // Adding rating to the Event interface
}

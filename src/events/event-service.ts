// src/events/event-service.ts
import { CreateEventDto } from './dtos/CreateEvent.dot';
import { Event } from './types/response';

class EventService {
    eventsInDatabase: Event[] = [
        {
            id: 1,
            name: "Art Fair",
            description: "Explore the latest works from local and international artists",
            date: new Date(),
            location: "Almaty, KBTU",
            duration: "10:00 AM - 6:00PM",
            rating: 4.5
        },
        {
            id: 2,
            name: "Backend Lecture",
            description: "",
            date: new Date("2024-06-11"),
            location: "Almaty, Satbayev University",
            duration: "9:15 AM - 11:15AM",
            rating: 4.7
        },
        {
            id: 3,
            name: "Demo Day",
            description: "",
            date: new Date("2024-08-09"),
            location: "Astana, Nazarbayev University",
            duration: "9:00 AM - 12:00 PM",
            rating: 4.9
        },
    ];

    getEventById(id: number): Event | null {
        return this.eventsInDatabase.find((event) => event.id === id) || null;
    }

    getEvents(page: number, limit: number, sortBy: string, sortDirection: 'asc' | 'desc'): Event[] {
        const sortedEvents = this.eventsInDatabase.sort((a, b) => {
            if (sortBy in a && sortBy in b) {
                const aValue = a[sortBy as keyof Event];
                const bValue = b[sortBy as keyof Event];

                if (sortDirection === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            }
            return 0;
        });

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return sortedEvents.slice(startIndex, endIndex);
    }

    createEvent(eventDto: CreateEventDto): Event {
        const newId = this.eventsInDatabase.length > 0 ? Math.max(...this.eventsInDatabase.map(event => event.id)) + 1 : 1;
        const newEvent: Event = {
            id: newId,
            name: eventDto.name,
            description: eventDto.description,
            date: new Date(eventDto.date),
            location: eventDto.location,
            duration: eventDto.duration,
            rating: parseFloat(eventDto.rating) // Ensure rating is a number
        };
        this.eventsInDatabase.push(newEvent);
        return newEvent;
    }

    async getEventsByUserCity(userCity: string): Promise<Event[]> {
        return this.eventsInDatabase.filter(event => {
            const eventCity = event.location.split(',')[0].trim();
            return eventCity.toLowerCase() === userCity.toLowerCase();
        });
    }
}

export default EventService;

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all movies
export async function GET() {
  try {
    const movies = await prisma.movie_List.findMany(); 
    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch movies' }), { status: 500 });
  }
}

// POST - Add a new movie
export async function POST(req) {
  try {
    const newMovie = await req.json(); // Parse the incoming request body

    const movie = await prisma.movie_List.create({
      data: newMovie,
    });

    return new Response(JSON.stringify(movie), { status: 201 }); // Correct way to return JSON response
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add movie' }), { status: 500 });
  }
}

// DELETE - Delete a movie by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json(); // Parse the incoming JSON body to get movie ID

    if (!id) {
      return new Response(JSON.stringify({ error: 'Movie ID is required' }), { status: 400 });
    }

    const deletedMovie = await prisma.movie_List.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify(deletedMovie), { status: 200 });
  } catch (error) {
    console.error('Error deleting movie:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete movie' }), { status: 500 });
  }
}

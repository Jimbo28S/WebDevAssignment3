import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const movies = await prisma.movie_List.findMany(); 
    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch movies' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newMovie = await req.json();

    const movie = await prisma.movie_List.create({
      data: {
        actor_list: newMovie.actor_list,
        movie_title: newMovie.movie_title,
        release_year: newMovie.release_year,
      },
    });

    return new Response(JSON.stringify(movie), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add movie' }), { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();

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

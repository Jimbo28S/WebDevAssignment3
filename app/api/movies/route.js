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
    const { movie_title, release_year, actor_list } = await req.json();

    const newMovie = await prisma.movie_List.create({
      data: {
        movie_title,            
        release_year: parseInt(release_year, 10),
        actor_list: actor_list.split(','),
      },
    });

    return Response.json(newMovie, { status: 201 });
  } 
  catch (error) {
    return Response.json({ error: 'Failed to add movie' }, { status: 500 });
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

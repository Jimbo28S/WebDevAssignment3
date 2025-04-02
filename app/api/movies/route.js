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

    const newMovie = await prisma.movie_List.create({
      data: req.body,
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
      return Response.json({ error: 'Movie ID is required' }, { status: 400 });
    }

    const deletedMovie = await prisma.movie_List.delete({
      where: {
        id: id,
      },
    });

    return Response.json(deletedMovie, { status: 200 });
  } catch (error) {
    console.error('Error deleting movie:', error);
    return Response.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}


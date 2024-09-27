// src/app/api/youtube/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        type: 'video',
        maxResults: 1,
        q: query,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    return NextResponse.json({ message: 'Failed to fetch data from YouTube API.' }, { status: 500 });
  }
}

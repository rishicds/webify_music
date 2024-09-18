// lib/spotify.ts
import querystring from 'querystring';

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI as string;

export const getLoginUrl = (): string => {
  const scope = ['user-read-playback-state', 'user-modify-playback-state'].join(' ');

  return `https://accounts.spotify.com/authorize?${querystring.stringify({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope,
  })}`;
};

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export const getAccessToken = async (code: string): Promise<AccessTokenResponse> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });
  
  return response.json();
};

// lib/spotify.ts

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  preview_url: string | null;
}

// Fetch currently playing track
export const getCurrentlyPlayingTrack = async (accessToken: string): Promise<{ item: SpotifyTrack } | null> => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (response.status === 204 || response.status > 400) {
    return null;
  }
  
  return response.json();
};

// Fetch track by ID
export const getTrackById = async (trackId: string, accessToken: string): Promise<SpotifyTrack> => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
};

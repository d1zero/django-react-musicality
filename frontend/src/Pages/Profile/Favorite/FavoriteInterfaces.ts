export interface album {
    id: number,
    name: string,
}

export interface fav_album {
    id: string,
    album: number
}

export interface artist {
    id: number,
    nickname: string,
}

export interface fav_artist {
    id: string,
    artist: number
}

export interface genre {
    id: number,
    name: string,
}

export interface fav_genre {
    id: string,
    genre: number
}

export interface playlist {
    id: number,
    name: string,
}

export interface fav_playlist {
    id: string,
    playlist: number
}

export interface fav_track {
    id: string,
    track: number
}

export interface track {
    id: number,
    title: string,
}
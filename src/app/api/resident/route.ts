import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // const searchParams = request.nextUrl.searchParams
        // const name = searchParams.get('name')
        // const character = searchParams.get('character')
        // const episode = searchParams.get('episode')
        // const page = searchParams.get('page')

        // let pageNumber: number | undefined;
        // if (page && Number.isInteger(parseInt(page))) {
        //     pageNumber = parseInt(page);
        // }

        // let characterId: number | undefined;
        // if (character && Number.isInteger(parseInt(character))) {
        //     characterId = parseInt(character);
        //     return Response.json({ data: "character " + characterId })
        // }

        // let episodeId: number | undefined;
        // if (episode && Number.isInteger(parseInt(episode))) {
        //     episodeId = parseInt(episode);
        //     return Response.json({ data: "episode " + episodeId })
        // }



        // return Response.json({ data: "all locations" })
    } catch (error) {
        return Response.json({ error: error }, { status: 500 })
    }

}
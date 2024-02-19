import { rickAndMortyEndpoint } from '@/config';
import { Locations, LocationsQueryDocument, LocationsQueryQueryVariables } from '@/app/_graphql/types/graphql';
import { request as gqlRequest } from 'graphql-request';
import { NextRequest } from 'next/server';

//TODO REPLACE THIS WITH GRAPHQL, GRAPHQL FETCHES DATA MORE EFFECTIVELY,
//less network calls
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const name = searchParams.get('name')
        const character = searchParams.get('character')
        const episode = searchParams.get('episode')
        const page = searchParams.get('page')
        let locations;

        let pageNumber: number | undefined;
        if (page && Number.isInteger(parseInt(page))) {
            pageNumber = parseInt(page);
            //todo handle invalid page number
        }

        let characterId: number | undefined;
        if (character && Number.isInteger(parseInt(character))) {
            characterId = parseInt(character);
            //todo fetch from character and page

            return Response.json({ data: "character " + characterId })
        }

        let episodeId: number | undefined;
        if (episode && Number.isInteger(parseInt(episode))) {
            episodeId = parseInt(episode);
            //todo fetch from episideid and page
            return Response.json({ data: "episode " + episodeId })
        }


        const variables: LocationsQueryQueryVariables = {
            page: pageNumber,
            name: name
        }
        const data = await gqlRequest<Locations>(rickAndMortyEndpoint, LocationsQueryDocument, variables)

        return Response.json({ data })
    } catch (error) {
        return Response.json({ error: error }, { status: 500 })
    }

}
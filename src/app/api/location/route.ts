import { Character, Characters, Episode, Episodes, Location, Locations, LocationsByCharacterQueryDocument, LocationsByCharacterQueryQueryVariables, LocationsByEpisodeQueryDocument, LocationsByEpisodeQueryQueryVariables, LocationsQueryDocument, LocationsQueryQueryVariables } from '@/app/_graphql/types/graphql';
import { rickAndMortyEndpoint } from '@/config';
import { request as gqlRequest } from 'graphql-request';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const name = searchParams.get('name')
        const character = searchParams.get('character')
        const episode = searchParams.get('episode')
        const page = searchParams.get('page')
        let locations: Locations | undefined;

        let pageNumber: number | undefined;
        if (page && Number.isInteger(parseInt(page))) {
            pageNumber = parseInt(page);
        }

        if (character) {
            const variables: LocationsByCharacterQueryQueryVariables = {
                page: pageNumber,
                name: character
            }
            const charactersData = await gqlRequest(rickAndMortyEndpoint, LocationsByCharacterQueryDocument, variables)
            console.log("charctersData", JSON.stringify(charactersData))
            locations = transformCharactersResponseToLocation(charactersData.characters as Characters)

        } else if (episode) {
            const variables: LocationsByEpisodeQueryQueryVariables = {
                page: pageNumber,
                name: episode
            }
            const episodesData = await gqlRequest(rickAndMortyEndpoint, LocationsByEpisodeQueryDocument, variables)
            console.log("episodesData", episodesData)
            locations = transformEpisodesResponseToLocation(episodesData.episodes as Episodes)
        } else {
            const variables: LocationsQueryQueryVariables = {
                page: pageNumber,
                name: name
            }
            locations = (await gqlRequest(rickAndMortyEndpoint, LocationsQueryDocument, variables)).locations as Locations
        }


        return Response.json({ locations })
    } catch (error) {
        return Response.json({ error: error }, { status: 500 })
    }

}


function transformCharactersResponseToLocation(characters: Characters): Locations {
    const locations: Locations = { info: characters.info, results: [] }

    if (!characters.results) {
        return locations;
    }

    //@ts-ignore
    for (let _character of characters.results) {
        if (!_character) {
            continue
        }

        const characterInfo: Character = { id: _character.id, image: _character.image, name: _character.name, status: _character.status, episode: [] }
        //@ts-ignore
        const locationIndex: number = locations.results?.findIndex((_location) => _location?.id === _character.location?.id) as number

        if (locationIndex !== -1) {
            (locations.results as Location[])[locationIndex].residents.push(characterInfo);
        } else {
            locations.results?.push({ ..._character.location, residents: [characterInfo] })
        }

    }

    return locations;
}

function transformEpisodesResponseToLocation(episodes: Episodes): Locations {
    const locations: Locations = { info: episodes.info, results: [] }

    if (episodes.results) {
        return locations;
    }

    let _episode: Episode
    //@ts-ignore
    for (_episode of episodes.results) {
        for (let _character of _episode.characters) {
            if (!_character) {
                continue
            }

            const characterInfo: Character = { id: _character.id, image: _character.image, name: _character.name, status: _character.status, episode: [] }
            //@ts-ignore
            const locationIndex: number = locations.results?.findIndex((_location) => _location?.id === _character.location?.id) as number

            if (locationIndex !== -1) {
                (locations.results as Location[])[locationIndex].residents.push(characterInfo);
            } else {
                locations.results?.push({ ..._character.location, residents: [characterInfo] })
            }

        }
    }

    return locations;
}
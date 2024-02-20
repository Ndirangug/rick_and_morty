import { Character, CharcterQueryDocument, CharcterQueryQueryVariables } from '@/app/_graphql/types/graphql';
import { rickAndMortyEndpoint } from '@/config';
import { request as gqlRequest } from 'graphql-request';
import { NextRequest } from 'next/server';


interface CharacterWithNotes extends Character {
    notes?: String
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        if (!id) {
            Response.json({ error: "Parameter id is required" }, { status: 400 })
        }

        const variables: CharcterQueryQueryVariables = {
            id
        }

        const character = (await gqlRequest(rickAndMortyEndpoint, CharcterQueryDocument, variables)).character as Character

        return Response.json({ character })
    } catch (error) {
        return Response.json({ error: error }, { status: 500 })
    }

}